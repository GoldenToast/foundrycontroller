import { UserPosition } from '../UserPosition.ts';
import { Vector } from '../Vector.ts';
import { BaseHandler } from './BaseHandler.ts';
import { CUser } from '../CUser.ts';

export class UserPositionHandler extends BaseHandler {

  handle(user:CUser) {
    const input = user.input
    const v1 = this.handleVector(user.userPosition, new Vector(input.axes[0], input.axes[1]));
    const v2 = this.handleVector(user.userPosition, new Vector(input.axes[2], input.axes[3]));
    input.axes = [v1.x,v1.y,v2.x,v2.y]
    super.handle(user)
  }

  private handleVector(userPosition: UserPosition, vector: Vector) :Vector {
    let newVector: Vector = new Vector();
    if (vector) {
      //UserPosition.Bottom
      switch (userPosition) {
        case UserPosition.Bottom:
          newVector.x = vector.x;
          newVector.y = vector.y;
          break;
        case UserPosition.Top:
          newVector.x = vector.x * -1;
          newVector.y = vector.y * -1;
          break;
        case UserPosition.Left:
          newVector.x = vector.y * -1;
          newVector.y = vector.x;
          break;
        case UserPosition.Right:
          newVector.x = vector.y;
          newVector.y = vector.x - 1;
          break;
      }
    }
    return newVector;
  }
}