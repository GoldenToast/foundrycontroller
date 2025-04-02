import { CInput } from './CInput.ts';
import { UserPosition } from './UserPosition.ts';

export class CUser {
  get id(): string {
    return this._id;
  }
  get gamepadIndex(): number {
    return this._gamepadIndex;
  }
  get userPosition(): UserPosition {
    return this._userPosition;
  }
  set userPosition(userPosition: UserPosition) {
    this._userPosition = userPosition;
  }
  get input(): CInput {
    return this._input;
  }

  private _id: string;
  private _userPosition:UserPosition;
  private _gamepadIndex:number;

  private _input: CInput
  private _tokens: Token[]
  private selectionIndex: number;

  constructor(id: string, gamepadIndex:number, userInput: CInput, userPosition:UserPosition = UserPosition.Bottom, ) {
    this._id = id;
    this._gamepadIndex = gamepadIndex;
    this._input = userInput;
    this._userPosition = userPosition;
    this._tokens = [];
    this.selectionIndex = 0
  }

  hasToken(): boolean {
    return this._tokens.length > 0;
  }

  addOwnedToken(token:Token) {
    if(this.isTokenOwner(token)) {
      this._tokens.push(token)
    }
  }

  getSelectedToken():Token {
    return this._tokens[this.selectionIndex]
  }

  clearTokens(){
    this._tokens = [];
  }

  circleTokenSelection():Token{
    this.selectionIndex = (this.selectionIndex < this._tokens.length - 1) ? this.selectionIndex + 1 : 0;
    return this._tokens[this.selectionIndex];
  }

  private isTokenOwner(token:Token):boolean{
    // @ts-ignore
    return token.actor?.ownership[this._id] === 3;
  }
}