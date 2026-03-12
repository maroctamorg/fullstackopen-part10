import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import SignInForm from "../components/SignIn/SignInForm";

describe("SignIn", () => {
  describe("SignInForm", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmitMock = jest.fn();

      render(<SignInForm onSubmit={onSubmitMock} />);

      const usernameInput = screen.getByTestId("usernameInput");
      const passwordInput = screen.getByTestId("passwordInput");
      const submitButton = screen.getByTestId("submitButton");

      fireEvent.changeText(usernameInput, "testuser");
      fireEvent.changeText(passwordInput, "testpassword");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock.mock.calls[0][0]).toEqual({
          username: "testuser",
          password: "testpassword",
        });
      });
    });
  });
});
