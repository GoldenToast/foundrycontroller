import { CInput } from './CInput.ts';
import { TokenMovementHandler } from './handler/TokenMovementHandler.js';
import { UserPositionHandler } from './handler/UserPositionHandler.js';
import { CUser } from './CUser.ts';
import { UserPosition } from './UserPosition.js';

CONFIG.debug.hooks = false;

export const NAMESPACE = "foundry-controller"

const tokenMovementHandler = new TokenMovementHandler();
const userPositionHandler = new UserPositionHandler(tokenMovementHandler);

let activeLoop = false
let users;

Hooks.on("ready", async function(){
  setTimeout(()=>{
    game[NAMESPACE]=game[NAMESPACE]||{};
    game[NAMESPACE].Settings = new GamepadSettings();
  },1000);
});

Hooks.on("activateTokenLayer", function(tokenLayer) {
  let gamepadIndex = 0;
  users = game["users"].map((user) =>
    new CUser(user.id, gamepadIndex++, UserPosition.Bottom, new CInput())
  )
  const ownedTokens = tokenLayer.ownedTokens
  users.forEach(user => {user.addOwnedTokens(ownedTokens)})
  if(!activeLoop){
    activeLoop = true
    requestAnimationFrame(handleInput);
  }
});

Hooks.on("deactivateTokenLayer", function(tokenLayer) {
  activeLoop = false
});

function handleInput(){
  const gps = navigator.getGamepads();
  users.forEach(user => {
    const gp = gps[user.gamepadIndex]
    if(gp && user.hasToken()){
      user.input.axes = gp.axes
      userPositionHandler.handle(user);
    }
  })
  if(activeLoop){
    requestAnimationFrame(handleInput);
  }else{
  }
}


