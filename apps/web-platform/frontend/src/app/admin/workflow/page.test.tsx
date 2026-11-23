import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/adminSession", () => ({
  getAdminSessionToken: vi.fn().mockResolvedValue("mock-admin-token"),
}));

import { getAdminSessionToken } from "@/lib/adminSession";
import AdminWorkflowPage from "./page";

beforeAll(() => {
  if (!globalThis.ResizeObserver) {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as typeof ResizeObserver;
  }
});

afterEach(() => {
  vi.mocked(getAdminSessionToken).mockResolvedValue("mock-admin-token");
  vi.unstubAllGlobals();
});

describe("Logistics Workflow Orchestrator", () => {
  it("renders the interactive pipeline simulator by default", () => {
    render(<AdminWorkflowPage />);
    expect(screen.getByText("Pipeline Simulator")).toBeInTheDocument();
    expect(screen.getByText("Graph Canvas")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Simulate Pipeline/i })).toBeInTheDocument();
    expect(screen.getByText(/Execution Pipeline \(Sequential\)/i)).toBeInTheDocument();
  });

  it("switches to Graph Canvas mode when clicked", () => {
    render(<AdminWorkflowPage />);
    const canvasBtn = screen.getByText("Graph Canvas");
    fireEvent.click(canvasBtn);
    expect(screen.getByText("Interactive Graph Canvas")).toBeInTheDocument();
    expect(screen.getByText(/Visual node connections powered by @xyflow\/react/i)).toBeInTheDocument();
  });

  it("allows switching back to Pipeline Simulator", () => {
    render(<AdminWorkflowPage />);
    const canvasBtn = screen.getByText("Graph Canvas");
    fireEvent.click(canvasBtn);
    const pipelineBtn = screen.getByText("Pipeline Simulator");
    fireEvent.click(pipelineBtn);
    expect(screen.getByText(/Execution Pipeline \(Sequential\)/i)).toBeInTheDocument();
  });
});
