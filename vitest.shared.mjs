import inspector from 'node:inspector';
import { defineConfig } from 'vitest/config';
import pkg from './package.json';

export default defineConfig({
    test: {
        // Don't time out if we detect a debugger attached
        testTimeout: inspector.url()
            ? // Largest allowed delay, see https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#maximum_delay_value
              2147483647
            : undefined,
        include: ['**/*.{test,spec}.{mjs,js,ts}'],
        snapshotFormat: {
            printBasicPrototype: true,
            callToJSON: true,
        },
        // To properly resolve `const enum`, we need to point to the TypeScript source files
        // See https://github.com/vitest-dev/vitest/discussions/3964
        // Using `src` also ensures that the test coverage is accurately reported
        alias: Object.fromEntries(
            [
                'aria-reflection',
                'babel-plugin-component',
                'compiler',
                'errors',
                'features',
                'module-resolver',
                'rollup-plugin',
                'shared',
                'signals',
                'ssr-compiler',
                'ssr-runtime',
                'style-compiler',
                'synthetic-shadow',
                'template-compiler',
                'wire-service',
            ].map((dep) => [`@lwc/${dep}`, `@lwc/${dep}/src`])
        ),
    },
    define: {
        'process.env.LWC_VERSION': JSON.stringify(pkg.version),
    },
});
