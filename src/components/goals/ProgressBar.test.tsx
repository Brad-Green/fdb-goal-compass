import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders a progressbar with correct aria values", () => {
    render(<ProgressBar value={42} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "42");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("clamps values below 0 and above 100", () => {
    const { rerender } = render(<ProgressBar value={-20} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");

    rerender(<ProgressBar value={250} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });

  it("shows a percentage label by default and hides it when showLabel is false", () => {
    const { rerender } = render(<ProgressBar value={55} />);
    expect(screen.getByText("55%")).toBeInTheDocument();

    rerender(<ProgressBar value={55} showLabel={false} />);
    expect(screen.queryByText("55%")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<ProgressBar value={65} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
