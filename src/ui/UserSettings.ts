export class UserSettings {

  static getUserSettingEntries(users: User[]){
    return users.map(( user) => {
        return {
          id: user.id,
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
    );
  }
}
