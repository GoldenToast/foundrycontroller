import CopyBunPlugin from "@takinabradley/copybunplugin";
import { watch } from "fs/promises";
//import { rm } from "node:fs/promises";

const rootDir = 'C:\\Users\\sasch\\AppData\\Local\\FoundryVTT\\Data\\modules\\foundry-controller';

// Delete a directory and all its contents
//await rm(rootDir, { recursive: true, force: true });

const watcher = watch(import.meta.dir);

for await (const event of watcher) {
    console.log(`Detected ${event.eventType} in ${event.filename}`);
    build().then(r => console.log("Build Done"))
}

async function build() {
    await Bun.build({
        entrypoints: ['./src/main.js'],
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
