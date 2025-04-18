import CopyBunPlugin from "@takinabradley/copybunplugin";
import { watch } from "fs/promises";

let rootDir = ""
if (process.platform === "darwin") {
    rootDir = `${process.env.HOME}/Library/Application Support/FoundryVTT/Data/modules/foundry-controller`;
}else{
    rootDir = `${process.env.LOCALAPPDATA}\\FoundryVTT\\Data\\modules\\foundry-controller`;
}
console.log(`Build destination: ${rootDir}`)

// Delete a directory and all its contents
//await rm(rootDir, { recursive: true, force: true });
const watcher = watch(import.meta.dir,{ recursive: true });

for await (const event of watcher) {
    console.log(`Detected ${event.eventType} in ${event.filename}`);
    build().then(r => console.log("Build Done"))
}

async function build() {
    await Bun.build({
        entrypoints: ['./src/main.ts'],
        outdir: rootDir + '/src',
        plugins: [CopyBunPlugin({
            patterns: [
                {
                    // files are copied to outdir using their original file name
                    from: 'module.json',
                    to: rootDir + '/module.json'
                }
            ]
        })]
    })
}
