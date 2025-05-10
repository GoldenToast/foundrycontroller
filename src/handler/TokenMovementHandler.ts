import { Vector } from '../Vector.ts';
import { BaseHandler } from './BaseHandler.ts';
import { CUser } from '../CUser.ts';


export class TokenMovementHandler extends BaseHandler {

  private linkRotation: boolean = true;
  private snap: number = 15;
  private skipped: number = 0;
  private maxFrame: number = 24;

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
    vector.normalize()
    let newX = token.x + token.w * vector.x
    let newY = token.y + token.h * vector.y
    const newPoint = token.getSnappedPosition(new PIXI.Point(newX, newY))
    if (newPoint &&
      !token.checkCollision(newPoint, { origin: token.center, type: "move", mode: "any" })) {
      token.document.update(newPoint)
      }
  }

  private rotate(token:Token, vector:Vector) {
    if(!vector.isZero()){
      token.rotate(vector.getDegree(),this.snap);
    }
  }
}