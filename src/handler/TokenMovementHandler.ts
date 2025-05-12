import { Vector } from '../Vector.ts';
import { BaseHandler } from './BaseHandler.ts';
import { CUser } from '../CUser.ts';

export class TokenMovementHandler extends BaseHandler {

  private linkRotation: boolean = false;
  private snap: number = 15;

  private skipped: number = 0;
  private maxFrame: number = 16;

  handle(user:CUser) {
    if(this.skipped++ > this.maxFrame){
      this.skipped = 0
      const token = user.getSelectedToken()
      const input = user.input
      this.move(token, new Vector(input.axes[0], input.axes[1]))
      if (this.linkRotation){
        this.rotate(token, new Vector(input.axes[0], input.axes[1]))
      }else {
        this.rotate(token, new Vector(input.axes[2], input.axes[3]))
      }
    }
    super.handle(user)
  }

  private async move(token: Token, vector: Vector) {
    if (vector.isZero()) {return;}
    const vectorX = Math.round(vector.x)
    const vectorY = Math.round(vector.y)
    const fromTokenCenter = new PIXI.Point(token.center.x, token.center.y)
    const toCenterPointX = fromTokenCenter.x + token.w * vectorX
    const toCenterPointY = fromTokenCenter.y + token.h * vectorY
    const toCenterPoint = new PIXI.Point(toCenterPointX, toCenterPointY)
    const toSnapPoint = token.getSnappedPosition(toCenterPoint)
    //const collisionResult = CONFIG.Canvas.polygonBackends["move"].testCollision(fromTokenCenter,, { mode: "any", type: "move" } ) //Remove if same function
    const collisionResult = token.checkCollision(toCenterPoint, {origin: fromTokenCenter, type: "move", mode: "any"})
    if (toSnapPoint && !collisionResult) {
      token.document.update(toSnapPoint)
    }
  }

  private async rotate(token:Token, vector:Vector) {
    if(!vector.isZero()){
      token.rotate(vector.getDegree(), this.snap);
    }
  }
}