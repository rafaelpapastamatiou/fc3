import { NotificationErrorInstance } from "./notification";

export class NotificationError extends Error {
  constructor(errors: NotificationErrorInstance[]) {
    super(
      errors.map(error => `${error.context}: ${error.message}`).join(", ")
    );
  }
}