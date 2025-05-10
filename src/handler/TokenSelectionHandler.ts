import { BaseHandler } from './BaseHandler.ts';
import { CUser } from '../CUser.ts';

export class TokenSelectionHandler extends BaseHandler {

  private skipped: number = 0;
  private maxFrame: number = 24;

  handle(user:CUser) {
    if(this.skipped <= 0 && user.input.buttons[0].pressed){
      this.skipped += this.maxFrame
      //turn off old token border
      //const oldToken = user.getSelectedToken()
      // if(oldToken.border){
      //   oldToken.border.visible = false
      // }
      //Switch token
      user.circleTokenSelection()
      //turn on new token border
      const newToken = user.getSelectedToken()
      newToken.control({releaseOthers: true})
      // if(newToken.border){
      //   // @ts-ignore
      //   newToken.border.lineStyle(10, user.color.valueOf(), 1.0).drawShape(newToken.shape);
      //   newToken.border.visible = true
      // }
    }
    this.skipped = (this.skipped > 0) ? this.skipped - 1 : 0 ;
    super.handle(user);
  }
}