import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

interface RenderWithProvidersOptions extends RenderOptions {
  initialRoute?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  options: RenderWithProvidersOptions = {},
): RenderResult {
  const { initialRoute = "/", ...renderOptions } = options;

  function Wrapper({ children }: { children: ReactNode }) {
    return <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
