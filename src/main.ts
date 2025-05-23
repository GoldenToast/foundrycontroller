import { UserSettings } from './ui/UserSettings.js';
import { CInput } from './CInput.ts';
import { CUser } from './CUser.ts';
import { UserPosition } from './UserPosition.js';
import { TokenMovementHandler } from './handler/TokenMovementHandler.js';
import { UserPositionHandler } from './handler/UserPositionHandler.js';
import { TokenSelectionHandler } from './handler/TokenSelectionHandler.js';

CONFIG.debug.hooks = false;

export const NAMESPACE = "foundry-controller"
const filterNames = ["Gamemaster","VTT"]

//Internal user array
let users:CUser[] = [];

Hooks.on("canvasInit", async function () {
  addUserSettingsUI()
  createUsers()
  updateUser()
  handleInput()
});

Hooks.on("drawToken", function(token:Token) {
  addUserToken(token);
});

Hooks.on("preUpdateScene", function() {
  clearUserTokens();
});

Hooks.on("closeSettingsConfig", function() {
  updateUser()
})

function handleInput() {
  const gps = navigator.getGamepads();
  users.forEach(user => {
    const gp = gps[user.gamepadIndex]
    if(gp && user.hasToken()){
      user.input.axes = gp.axes
      user.input.buttons = gp.buttons;
      user.update()
    }
  })
  requestAnimationFrame(handleInput);
}

function createUsers() {
  let gamepadIndex = 0;
  // @ts-ignore
  users = getFoundryUsers().map((user) => {
    const tokenMovementHandler = new TokenMovementHandler();
    const userPositionHandler = new UserPositionHandler(tokenMovementHandler);
    const tokenSelectionHandler = new TokenSelectionHandler(userPositionHandler);
    return new CUser(user.id, gamepadIndex++, new CInput(), tokenSelectionHandler)
    }
  )
}

function updateUser(){
  users.forEach(user => {
    // @ts-ignore
    user.userPosition = UserPosition.fromIndex(getFoundrySetting().get(NAMESPACE, "pos_"+user.id))
    // @ts-ignore
    user.gamepadIndex = getFoundrySetting().get(NAMESPACE, "padIndex_"+user.id)
    // @ts-ignore
    const hue = getFoundrySetting().get(NAMESPACE, "col_"+user.id)
    // @ts-ignore
    user.color = Color.fromHSV([hue/100, 1,1])
  })
}

function addUserToken(token:Token){
  users.forEach(user => {user.addOwnedToken(token)})
}

function clearUserTokens(){
  users.forEach(user => {user.clearTokens()})
}

function addUserSettingsUI(){
  getFoundryUsers().forEach(user => {
    // @ts-ignore
    const posSetting = UserSettings.getUserPositionSetting(user)
    // @ts-ignore
    getFoundrySetting().register(NAMESPACE, posSetting.id, posSetting)
    // @ts-ignore
    const gamepadSetting = UserSettings.getUserGampadIndex(user)
    // @ts-ignore
    getFoundrySetting().register(NAMESPACE, gamepadSetting.id, gamepadSetting)
    // @ts-ignore
    const colorSetting = UserSettings.getUserColorSetting(user)
    // @ts-ignore
    getFoundrySetting().register(NAMESPACE, colorSetting.id, colorSetting)
  })
}

function getFoundryUsers(): Users{
  // @ts-ignore
  const users = game.users?.filter(u => !filterNames.includes(u.name));
  if(users){
    // @ts-ignore
    return users;
  }
  throw new Error("No users found");
}

function getFoundrySetting():ClientSettings {
    const settings =  game.settings;
    if(settings){
      return settings;
    }
    throw new Error("No user settings found");
}
