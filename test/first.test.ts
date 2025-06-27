import Counter from "@/components/Counter.vue";
import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";

/* example */
// test("this one fails", () => {
//   expect("university").toBe("fun");
// });

describe("Counter", () => {
  it("should render counter", async () => {
    render(Counter);
    screen.getByText("0");
    const button = screen.getByText("+");
    await fireEvent.click(button);
    await fireEvent.click(button);
    await fireEvent.click(button);
    screen.getByText("3");
  });
});
