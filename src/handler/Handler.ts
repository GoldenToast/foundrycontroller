import { CUser } from '../CUser.ts';

export interface Handler {

  setNext: (handler: Handler) => void;
  handle(user:CUser):void;
}