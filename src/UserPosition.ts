export enum UserPosition {
  Bottom,
  Top,
  Left,
  Right,
}

export namespace UserPosition {
  export function fromIndex(index: number): UserPosition {
    // @ts-ignore
    return UserPosition[UserPosition[index]]
  }
}