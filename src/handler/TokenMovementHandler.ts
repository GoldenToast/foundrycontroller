import { Vector } from '../Vector.ts';
import { BaseHandler } from './BaseHandler.ts';
import { CUser } from '../CUser.ts';


export class TokenMovementHandler extends BaseHandler {

  private snap: number = 15;

  handle(user:CUser) {
    const token = user.getSelectedToken()
    const input = user.input
    this.move(token, new Vector(input.axes[0], input.axes[1]))
    this.rotate(token, new Vector(input.axes[2], input.axes[3]))
    super.handle(user)
  }

  private move(token:Token, vector:Vector) {
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