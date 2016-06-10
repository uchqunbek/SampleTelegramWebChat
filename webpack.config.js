/**
 * Created by Uchqun on 10.06.2016.
 */
module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                excludes: /node_modules/,
                loader: 'babel'
            }
        ]
    }
};