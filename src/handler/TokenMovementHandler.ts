import { Vector } from '../Vector.ts';
import { BaseHandler } from './BaseHandler.ts';
import { CUser } from '../CUser.ts';

export class TokenMovementHandler extends BaseHandler {

  private linkRotation: boolean = true;
  private snap: number = 15;
  private skipped: number = 0;
  private maxFrame: number = 16;

  handle(user:CUser) {
    if(this.skipped <= 0){
      this.skipped += this.maxFrame
      const token = user.getSelectedToken()
      const input = user.input
      this.move(token, new Vector(input.axes[0], input.axes[1]))
      if (this.linkRotation){
        this.rotate(token, new Vector(input.axes[0], input.axes[1]))
      }else {
        this.rotate(token, new Vector(input.axes[2], input.axes[3]))
      }
    }
    this.skipped = (this.skipped > 0) ? this.skipped - 1 : 0 ;
    super.handle(user)
  }

  private move(token:Token, vector:Vector) {
    if(vector.isZero()) return;
    const roundX = Math.round(vector.x)
    const roundY = Math.round(vector.y)
    const toCenterPointX =  token.center.x + token.w * roundX
    const toCenterPointY =  token.center.y + token.h * roundY
    const toCenterPoint = new PIXI.Point(toCenterPointX, toCenterPointY)
    const toSnapPoint = token.getSnappedPosition(toCenterPoint)
    if (toSnapPoint && !token.checkCollision(toCenterPoint, { origin: token.center, type: "move", mode: "any" })) {
      token.document.update(toSnapPoint)
    }
    //Debug pings
    //canvas.ping(token.center, {name: "from"})
    //canvas.ping(toCenterPoint, {color: "#FF0000" ,name: "to"})
  }

  private rotate(token:Token, vector:Vector) {
    if(!vector.isZero()){
      token.rotate(vector.getDegree(),this.snap);
    }
  }
}