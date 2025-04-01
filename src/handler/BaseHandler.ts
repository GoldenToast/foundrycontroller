import { Handler } from './Handler.ts';
import { CUser } from '../CUser.ts';

export class BaseHandler implements Handler {
  protected next?: Handler;

  constructor(next?: Handler) {
    this.next = next;
  }

  setNext(handler: Handler) {
    this.next = handler;
  }

  handle(user:CUser) {
    if (this.next){
      this.next.handle(user)
    }
  }
}