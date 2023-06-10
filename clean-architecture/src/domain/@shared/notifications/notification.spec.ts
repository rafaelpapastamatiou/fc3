import { Notification } from "./notification";

describe("Notification unit tests", () => {

  it("should create a notification", () => {
    const notification = new Notification();

    const error = {
      message: "Error message",
      context: "customer",
    };
    notification.addError(error);

    expect(
      notification.getMessages("customer")
    ).toBe("customer: Error message")

    const error2 = {
      message: "Error message 2",
      context: "customer",
    };
    notification.addError(error2);

    expect(
      notification.getMessages("customer")
    ).toBe("customer: Error message, customer: Error message 2")

    const error3 = {
      message: "Error message 3",
      context: "order",
    };

    notification.addError(error3);

    expect(
      notification.getMessages("customer")
    ).toBe("customer: Error message, customer: Error message 2")

    expect(
      notification.getMessages()
    ).toBe("customer: Error message, customer: Error message 2, order: Error message 3")
  });

  it("should check if notification has errors", () => {
    const notification = new Notification();

    expect(notification.hasErrors()).toBe(false);

    notification.addError({
      message: "Error message",
      context: "customer",
    });

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors", () => {
    const notification = new Notification();

    const error = {
      message: "Error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.errors).toEqual([error]);
  });
});