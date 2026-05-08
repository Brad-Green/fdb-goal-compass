import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { renderWithProviders } from "@/test/utils";
import { goalInProgress, goalNotStarted } from "@/test/fixtures";
import { GoalCard } from "./GoalCard";

describe("GoalCard", () => {
  it("renders title, quarter, status, and description", () => {
    renderWithProviders(<GoalCard goal={goalInProgress} onClick={() => {}} />);
    expect(screen.getByText(goalInProgress.title)).toBeInTheDocument();
    expect(screen.getByText(goalInProgress.quarter)).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText(goalInProgress.description!)).toBeInTheDocument();
  });

  it("omits the description paragraph when goal has no description", () => {
    renderWithProviders(<GoalCard goal={goalNotStarted} onClick={() => {}} />);
    expect(screen.queryByText(/finish the advanced/i)).not.toBeInTheDocument();
  });

  it("fires onClick when the card is clicked", async () => {
    const onClick = vi.fn();
    renderWithProviders(<GoalCard goal={goalInProgress} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: /complete react certification/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick on Enter and Space keydown", async () => {
    const onClick = vi.fn();
    renderWithProviders(<GoalCard goal={goalInProgress} onClick={onClick} />);
    const card = screen.getByRole("button", { name: /complete react certification/i });
    card.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("has no axe violations", async () => {
    const { container } = renderWithProviders(
      <GoalCard goal={goalInProgress} onClick={() => {}} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
