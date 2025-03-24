CONFIG.debug.hooks = false;

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins its initialization workflow.");
});

Hooks.on("ready", function() {
  console.log("This code runs once core initialization is ready and game data is available.");
    window.setInterval(() => {
       listenGamepadUpdates()
    }, 100)
});

function listenGamepadUpdates(){
    for (const gp of  navigator.getGamepads()) {
        if (gp){
            let a = 0;
            let b = 0;
            if (gp.axes[0] !== 0) {
                console.log(gp.axes[0])
            }
            if (gp.axes[1] !== 0) {
                console.log(gp.axes[1])
            }
            if (gp.axes[2] !== 0) {
                console.log(gp.axes[2])
            }
            if (gp.axes[3] !== 0) {
                console.log(gp.axes[3])
            }
        }
    }
}

//get gamepads when connected
const gamepads = [];

function gamepadHandler(event, connected) {
  const gamepad = event.gamepad;
  if (connected) {
    gamepads[gamepad.index] = gamepad;
  } else {
    delete gamepads[gamepad.index];
  }
  console.log(`Gamepad connected: ${connected}`);
}

window.addEventListener(
    "gamepadconnected",
    (e) => {
      gamepadHandler(e, true);
    },
    false,
);

window.addEventListener(
    "gamepaddisconnected",
    (e) => {
      gamepadHandler(e, false);
    },
    false,
);