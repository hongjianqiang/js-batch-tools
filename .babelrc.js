module.exports = function(api) {
    console.log(`Version: v${api.version}\n`);

    api.cache(true);

    return {
        presets: [
            // '@babel/preset-env'
        ],

        plugins: [
            // './plugins/accurate-operator'
            './plugins/operator-reload'
        ]
    };
}
