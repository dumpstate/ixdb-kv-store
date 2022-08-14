module.exports = function (config) {
    config.set({
        browsers: ['ChromeHeadless'],
        frameworks: [
            'mocha',
            'karma-typescript',
        ],
        files: [
            { pattern: 'node_modules/expect.js/index.js' },
            { pattern: 'src/**/*.ts' },
            { pattern: 'test/**/*.ts' },
        ],
        preprocessors: {
            'src/**/*.ts': [
                'karma-typescript',
            ],
            'test/**/*.ts': [
                'karma-typescript',
            ],
        },
        singleRun: true,
    })
}
