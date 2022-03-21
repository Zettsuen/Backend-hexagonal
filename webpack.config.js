'use strict';
const path = require('path');

module.exports = [{
    devtool: 'inline-source-map',
    target: "node15.11",
	entry: {
        "community": "./src/index.ts",
        //"test": "./test/index.ts"
    },
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    externals: {
        _http_common: 'commonjs2 _http_common'
      }
}];