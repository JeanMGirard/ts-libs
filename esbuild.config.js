const esbuild = require('esbuild')

// Automatically exclude all node_modules from the bundled version
// const { nodeExternalsPlugin } = require('esbuild-node-externals')

Promise.all([
    // esbuild.build({
    //     entryPoints: ['./src/index.ts'],
    //     outfile: 'dist/cjs/index.js',
    //     bundle: true,
    //     minify: true,
    //     format: "cjs",
    //    // platform: "node",
    //     sourcemap: true,
    //     target: ['es2020','node12'],
    //    // plugins: [nodeExternalsPlugin()]
    // }),
    esbuild.build({
        entryPoints: ['src/index.ts'],
        outdir: 'dist/esm',
        bundle: true,
        sourcemap: true,
        minify: true,
        splitting: true,
        format: 'esm',
        target: ['esnext']
    })
]).catch(() => process.exit(1))
    


