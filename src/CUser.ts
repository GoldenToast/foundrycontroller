import { CInput } from './CInput.ts';
import { UserPosition } from './UserPosition.ts';
import { Handler } from './handler/Handler.ts';

export class CUser {
  get id(): string {
    return this._id;
  }
  get userPosition(): UserPosition {
    return this._userPosition;
  }
  set userPosition(userPosition: UserPosition) {
    this._userPosition = userPosition;
  }
  get gamepadIndex(): number {
    return this._gamepadIndex;
  }
  set gamepadIndex(value: number) {
    this._gamepadIndex = value;
  }
  get color(): number {
    return this._color;
  }
  set color(value: Color) {
    this._color = value;
  }
  get input(): CInput {
    return this._input;
  }

  private readonly _id: string;
  private _userPosition: UserPosition;
  private _gamepadIndex: number;
  private _color: Color;

  private _input: CInput;
  private _tokens: Token[];
  private selectionIndex: number;

  private _handler: Handler | undefined;

  constructor(
    id: string,
    gamepadIndex: number,
    userInput: CInput,
    handler: Handler,
    userPosition: UserPosition = UserPosition.Bottom,
  ) {
    this._id = id;
    this._gamepadIndex = gamepadIndex;
    this._input = userInput;
    this._handler = handler;
    this._userPosition = userPosition;
    this._color = Color.fromRGBvalues(1, 1, 1);
    this._tokens = [];
    this.selectionIndex = 0;
  }

  update() {
    if (this._handler) {
      this._handler.handle(this);
    }
  }

  hasToken(): boolean {
    return this._tokens.length > 0;
  }

  addOwnedToken(token: Token) {
    if (this.isTokenOwner(token)) {
      this._tokens.push(token);
    }
  }

  getSelectedToken(): Token {
    return this._tokens[this.selectionIndex];
  }

  clearTokens() {
    this._tokens = [];
  }

  circleTokenSelection(): Token {
    this.selectionIndex =
      this.selectionIndex < this._tokens.length - 1
        ? this.selectionIndex + 1 : 0;
    return this._tokens[this.selectionIndex];
  }

  private isTokenOwner(token: Token): boolean {
    // @ts-ignore
    return token.actor?.ownership[this._id] === 3;
  }
}