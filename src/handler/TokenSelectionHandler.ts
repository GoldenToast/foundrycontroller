import { BaseHandler } from './BaseHandler.ts';
import { CUser } from '../CUser.ts';

export class TokenSelectionHandler extends BaseHandler {

  private skipped: number = 0;
  private maxFrame: number = 24;

  handle(user:CUser) {
    if(this.skipped <= 0 && user.input.buttons[0].pressed){
      this.skipped += this.maxFrame
      user.circleTokenSelection()
      user.getSelectedToken().control()
    }
    this.skipped = (this.skipped > 0) ? this.skipped - 1 : 0 ;
    super.handle(user);
  }
}