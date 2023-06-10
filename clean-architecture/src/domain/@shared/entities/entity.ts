import { Notification } from "../notifications/notification";

export abstract class Entity {
  private _id: string;
  private _notification: Notification;

  constructor(id: string) {
    this._id = id;
    this._notification = new Notification();
  }

  get id() { return this._id }
  get notification() { return this._notification }
}