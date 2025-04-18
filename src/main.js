import { UserSettings } from './ui/UserSettings.js';
import { CInput } from './CInput.ts';
import { CUser } from './CUser.ts';
import { UserPosition } from './UserPosition.js';
import { TokenMovementHandler } from './handler/TokenMovementHandler.js';
import { UserPositionHandler } from './handler/UserPositionHandler.js';
import { TokenSelectionHandler } from './handler/TokenSelectionHandler.js';

CONFIG.debug.hooks = false;

export const NAMESPACE = "foundry-controller"

//User handler chain
const tokenMovementHandler = new TokenMovementHandler();
const userPositionHandler = new UserPositionHandler(tokenMovementHandler);
const tokenSelectionHandler = new TokenSelectionHandler(userPositionHandler);

//Internal user array
let users = [];

Hooks.on("canvasInit", async function () {
  addUserSettingsUI()
  createUsers()
  updateUser()
  requestAnimationFrame(handleInput);
});

Hooks.on("drawToken", function(token) {
  addUserToken(token);
});

Hooks.on("preUpdateScene", function() {
  console.log("preUpdateScene");
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
      tokenSelectionHandler.handle(user);
    }
  })
  requestAnimationFrame(handleInput);
}

function createUsers() {
  let gamepadIndex = 0;
  users = game["users"].map((user) => {
      return new CUser(user.id, gamepadIndex++, new CInput())
    }
  )
}

function updateUser(){
  users.forEach(user => {
    user.userPosition = UserPosition.fromIndex(game.settings.get(NAMESPACE, "pos_"+user.id))
    const hue = game.settings.get(NAMESPACE, "col_"+user.id)
    user.color = Color.fromHSV([hue/100, 1,1])
  })
}

function addUserToken(token){
  users.forEach(user => {user.addOwnedToken(token)})
}

function clearUserTokens(){
  users.forEach(user => {user.clearTokens()})
}

function addUserSettingsUI(){
  game["users"].forEach(user => {
    const posSetting = UserSettings.getUserPositionSetting(user)
    game.settings.register(NAMESPACE, posSetting.id, posSetting)
    const colorSetting = UserSettings.getUserColorSetting(user)
    game.settings.register(NAMESPACE, colorSetting.id, colorSetting)
  })
}


