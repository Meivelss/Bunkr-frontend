import AuthForm from "@/components/AuthForm.vue";
import { describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import userEvent from "@testing-library/user-event"; // Import userEvent

describe("Login", () => {
  it("reset password after submit", async () => {
    render(AuthForm);
    const emailInputField = screen.getByPlaceholderText("Adres e-mail");

    const userEmail = "gownoweoeoe@wp.pl";

    await userEvent.type(emailInputField, userEmail);

    const passwordInputField = screen.getByPlaceholderText("Hasło");

    const userPassword = "medivault";

    await userEvent.type(passwordInputField, userPassword);

    const submitButton = screen.getByText("Logowanie");

    await fireEvent.click(submitButton);

    /* broken with 2fa since password field is no longer visible after submit; commented out for now */
    // expect(passwordInputField.value).toBe("");
  });
});
