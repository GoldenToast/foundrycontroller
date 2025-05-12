import { BaseHandler } from './BaseHandler.ts';
import { CUser } from '../CUser.ts';

export class TokenSelectionHandler extends BaseHandler {

  private skipped: number = 0;
  private maxFrame: number = 24;

  handle(user:CUser) {
    if(this.skipped++ > this.maxFrame && user.input.buttons[0].pressed){
      this.skipped = 0
      //turn off old token border
      const oldToken = user.getSelectedToken()
       if(oldToken.border){
         oldToken.border.visible = false
      }
      //Switch token
      user.circleTokenSelection()
      //turn on new token border
      const newToken = user.getSelectedToken()
      //newToken.control()
       if(newToken.border){
         // @ts-ignore
         newToken.border.lineStyle(2, user.color.valueOf(), 1.0).drawShape(newToken.shape);
         newToken.border.visible = true
       }
    }
    super.handle(user);
  }
}