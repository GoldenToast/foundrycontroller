import { CInput } from './CInput.ts';
import { UserPosition } from './UserPosition.ts';

export class CUser {
  get gamepadIndex(): number {
    return this._gamepadIndex;
  }
  get userPosition(): UserPosition {
    return this._userPosition;
  }
  get input(): CInput {
    return this._input;
  }

  private _userId: String;
  private _userPosition:UserPosition;
  private _gamepadIndex:number;

  private _input: CInput
  private _tokens: Token[]

  constructor(userId: string, gamepadIndex:number, userPosition:UserPosition = UserPosition.Bottom, userInput: CInput) {
    this._userId = userId;
    this._userPosition = userPosition;
    this._gamepadIndex = gamepadIndex;
    this._input = userInput;
    this._tokens = [];
  }

  hasToken(): boolean {
    return this._tokens.length > 0;
  }

  addOwnedTokens(tokens:Token[]){
    this._tokens = tokens.filter(t => this.isTokenOwner(t))
  }

  getSelectedToken():Token {
    return this._tokens[0]
  }

  private isTokenOwner(token:Token):boolean{
    // @ts-ignore
    return token.actor?.ownership[this._userId] === 3;
  }
}