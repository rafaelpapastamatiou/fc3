export type NotificationErrorInstance = {
  message: string;
  context: string;
};

export class Notification {
  private _errors: NotificationErrorInstance[] = [];

  addError(error: NotificationErrorInstance) {
    this._errors.push(error);
  }

  getMessages(context?: string): string {
    const messages: string[] = [];

    for (const error of this._errors) {
      if (context && error.context !== context) continue;

      messages.push(`${error.context}: ${error.message}`);
    }

    return messages.join(", ");
  }

  hasErrors(): boolean {
    return this._errors.length > 0;
  }

  get errors() { return this._errors }
}