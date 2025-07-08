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
        "", // row index column
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

    expect(screen.getByText(/\d wyniki/)).toBeInTheDocument();
  });

  it("should have working pagination buttons", async () => {
    render(TableComponent);

    const first = await screen.findByLabelText("Początek listy");
    const prev = await screen.findByLabelText("Poprzednia strona");
    const next = await screen.findByLabelText("Następna strona");
    const last = await screen.findByLabelText("Koniec");

    // defaulut state, we are at the first page
    expect(first).toBeDisabled();
    expect(prev).toBeDisabled();
    expect(next).not.toBeDisabled();
    expect(last).not.toBeDisabled();

    // we open the second page
    await userEvent.click(next);
    expect(first).not.toBeDisabled();
    expect(prev).not.toBeDisabled();
    expect(next).not.toBeDisabled();
    expect(last).not.toBeDisabled();

    // we are at the last page
    await userEvent.click(last);
    expect(first).not.toBeDisabled();
    expect(prev).not.toBeDisabled();
    expect(next).toBeDisabled();
    expect(last).toBeDisabled();
  });
});
