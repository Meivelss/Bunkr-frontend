import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

import TableComponent from "@/components/Table.vue";

describe("TableComponent tests", () => {
  it("should mount the table component", () => {
    const { container } = render(TableComponent);

    expect(container.querySelector("table")).toBeInTheDocument();
  });

  it("should render at least one column", () => {
    render(TableComponent);

    expect(screen.getAllByRole("row").length).toBeGreaterThan(0);
  });
  it("should render all expected columns", async () => {
    render(TableComponent);

    const headers = await screen.findAllByRole("columnheader");
    const headerTexts = headers.map((header) => header.textContent?.trim());

    expect(headerTexts).toEqual(
      // todo add filters
      expect.arrayContaining([
        "ID",
        "ID Przedmiotu",
        "Nazwa",
        "Stan",
        "Budynek",
        "Komora",
        "Półka",
        "", // action column
      ]),
    );
  });
  it("should render the number of found records", () => {
    render(TableComponent);

    expect(screen.getByText(/\d wyników/)).toBeInTheDocument();
  });

  it("should disable Previous on first page and enables after Next", async () => {
    render(TableComponent);

    const prev = await screen.findByLabelText("Previous page");
    const next = await screen.findByLabelText("Next page");

    expect(prev).toBeDisabled();

    await userEvent.click(next);
    expect(prev).not.toBeDisabled();
  });
});
