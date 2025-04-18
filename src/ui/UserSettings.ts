
export class UserSettings {

  static getUserPositionSetting(user:User){
    // @ts-ignore
    return {
      id: "pos_" + user.id,
      name: user.name,
      hint: "",
      scope: 'world',
      type: String,
      default: '0',
      config: true,
      choices: {
        '0':'Bottom',
        '1':'Top',
        '2':'Left',
        '3':'Right'
      }
    };
  }

  static getUserGampadIndex(user: User){
    return {
      id: "padIndex_" + user.id,
      name: "Gamepad Index",
      hint: "",
      scope: 'world',
      type: Number,
      default: 0,
      config: true,
    };
  }

  static getUserColorSetting(user: User){
    return {
      id: "col_" + user.id,
      name: "Color",
      hint: "",
      scope: 'world',
      type: Number,
      default: 0,
      config: true,
      range: {
        min: 0,
        step: 1,
        max: 100
      },
    };
  }
}
