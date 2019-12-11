const path = require("path");


const defaultConfig = {
    mode: "production",
    entry: [path.join(__dirname, "index.ts")],
    context: __dirname,
    externals: {},
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: [".", "node_modules"],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: "tsconfig.webpack.json"
                    }
                }
            }
        ]
    }
};


module.exports = [
    Object.assign({}, defaultConfig, {
        target: "web",
        output: {
            filename: "schemascript.browser.js",
            library: 'schemascript',
            path: path.join(__dirname, "dist")
        },
    }),
    Object.assign({}, defaultConfig, {
        target: "node",
        output: {
            filename: "schemascript.es5.js",
            path: path.join(__dirname, "dist"),
            libraryTarget: 'umd',
            library: 'schemascript',
            umdNamedDefine: true
        },
    })
];
