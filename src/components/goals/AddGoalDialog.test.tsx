import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { renderWithProviders } from "@/test/utils";
import { AddGoalDialog } from "./AddGoalDialog";

describe("AddGoalDialog", () => {
  it("renders the Add Goal trigger button", () => {
    renderWithProviders(<AddGoalDialog quarter="Q2 2026" onAdd={() => {}} />);
    expect(screen.getByRole("button", { name: /add goal/i })).toBeInTheDocument();
  });

  it("opens the dialog when the trigger is clicked", async () => {
    renderWithProviders(<AddGoalDialog quarter="Q2 2026" onAdd={() => {}} />);
    await userEvent.click(screen.getByRole("button", { name: /add goal/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/add new goal/i)).toBeInTheDocument();
    expect(screen.getByText(/create a new goal for q2 2026/i)).toBeInTheDocument();
  });

  it("disables submit when title is blank and submits the trimmed values when filled", async () => {
    const onAdd = vi.fn();
    renderWithProviders(<AddGoalDialog quarter="Q2 2026" onAdd={onAdd} />);
    await userEvent.click(screen.getByRole("button", { name: /add goal/i }));

    const submit = screen.getByRole("button", { name: /create goal/i });
    expect(submit).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/title/i), "  Ship v2  ");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "  details  ",
    );
    expect(submit).toBeEnabled();

    await userEvent.click(submit);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith({
      title: "Ship v2",
      description: "details",
      status: "not-started",
      percentComplete: 0,
      quarter: "Q2 2026",
    });
  });

  it("closes the dialog without calling onAdd when Cancel is clicked", async () => {
    const onAdd = vi.fn();
    renderWithProviders(<AddGoalDialog quarter="Q2 2026" onAdd={onAdd} />);
    await userEvent.click(screen.getByRole("button", { name: /add goal/i }));
    await userEvent.type(screen.getByLabelText(/title/i), "Discarded");
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no axe violations when the dialog is open", async () => {
    const { baseElement } = renderWithProviders(
      <AddGoalDialog quarter="Q2 2026" onAdd={() => {}} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /add goal/i }));
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
