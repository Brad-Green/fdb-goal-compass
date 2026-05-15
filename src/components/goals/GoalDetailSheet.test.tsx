import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { renderWithProviders } from "@/test/utils";
import { goalInProgress } from "@/test/fixtures";
import { GoalDetailSheet } from "./GoalDetailSheet";

describe("GoalDetailSheet", () => {
  it("renders nothing when no goal is selected", () => {
    const { container } = renderWithProviders(
      <GoalDetailSheet goal={null} open onOpenChange={() => {}} onUpdate={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the goal's title, status, and quarter when open", () => {
    renderWithProviders(
      <GoalDetailSheet
        goal={goalInProgress}
        open
        onOpenChange={() => {}}
        onUpdate={() => {}}
      />,
    );
    const titleInput = screen.getByLabelText(/^title$/i) as HTMLInputElement;
    expect(titleInput.value).toBe(goalInProgress.title);
    // "In Progress" appears in both the StatusBadge and the Radix Select
    // trigger's rendered value — assert at least one is present.
    expect(screen.getAllByText("In Progress").length).toBeGreaterThan(0);
    expect(screen.getByText(goalInProgress.quarter)).toBeInTheDocument();
  });

  it("calls onUpdate when the title field is edited", async () => {
    const onUpdate = vi.fn();
    renderWithProviders(
      <GoalDetailSheet
        goal={goalInProgress}
        open
        onOpenChange={() => {}}
        onUpdate={onUpdate}
      />,
    );
    const titleInput = screen.getByLabelText(/^title$/i);
    await userEvent.type(titleInput, "!");
    expect(onUpdate).toHaveBeenCalled();
    const lastCall = onUpdate.mock.calls.at(-1);
    expect(lastCall?.[0]).toBe(goalInProgress.id);
    expect(lastCall?.[1]).toEqual({
      title: `${goalInProgress.title}!`,
    });
  });

  it("calls onUpdate when the comments field is edited", async () => {
    const onUpdate = vi.fn();
    renderWithProviders(
      <GoalDetailSheet
        goal={goalInProgress}
        open
        onOpenChange={() => {}}
        onUpdate={onUpdate}
      />,
    );
    await userEvent.type(screen.getByLabelText(/comments/i), "X");
    const lastCall = onUpdate.mock.calls.at(-1);
    expect(lastCall?.[0]).toBe(goalInProgress.id);
    expect(lastCall?.[1]).toHaveProperty("comments");
  });

  it("has no axe violations when open", async () => {
    const { baseElement } = renderWithProviders(
      <GoalDetailSheet
        goal={goalInProgress}
        open
        onOpenChange={() => {}}
        onUpdate={() => {}}
      />,
    );
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
