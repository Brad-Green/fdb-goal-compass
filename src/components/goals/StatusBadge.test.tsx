import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders the human-readable label for each status", () => {
    const { rerender } = render(<StatusBadge status="not-started" />);
    expect(screen.getByText("Not Started")).toBeInTheDocument();

    rerender(<StatusBadge status="in-progress" />);
    expect(screen.getByText("In Progress")).toBeInTheDocument();

    rerender(<StatusBadge status="complete" />);
    expect(screen.getByText("Complete")).toBeInTheDocument();

    rerender(<StatusBadge status="cancelled" />);
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });

  it("applies a custom className alongside status styles", () => {
    const { container } = render(
      <StatusBadge status="in-progress" className="custom-class" />,
    );
    const badge = container.firstElementChild;
    expect(badge).toHaveClass("custom-class");
  });

  it("has no axe violations", async () => {
    const { container } = render(<StatusBadge status="in-progress" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
