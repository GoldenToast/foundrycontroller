import CopyBunPlugin from "@takinabradley/copybunplugin";
import { watch } from "fs/promises";

let rootDir = './dist'

// Delete a directory and all its contents
//await rm(rootDir, { recursive: true, force: true });
if (process.env.WATCH) {
    const watcher = watch(import.meta.dir + '/src',{ recursive: true });
    for await (const event of watcher) {
        console.log(`Detected ${event.eventType} in ${event.filename}`);
        build();
    }
}else {
    build()
}

function build() {
    Bun.build({
        entrypoints: ['./src/main.ts'],
        outdir: rootDir,
        plugins: [CopyBunPlugin({
            patterns: [
                {
                    // files are copied to outdir using their original file name
                    from: 'module.json',
                    to: rootDir + '/module.json'
                }
            ]
        })]
    }).then(r => {
        if (!r.success) {
            console.error('Build failed:', r.logs);
            process.exit(1);
        }
        console.log("Build Done")
    })
}
