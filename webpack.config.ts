import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // Don't bundle these into the output
    externals: {},
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    // Load any js files through babel for polyfills etc
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader']
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.png$/,
                loader: 'file-loader'
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.wav/,
                use: {
                    loader: 'url-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.md$/,
                use: ['html-loader', 'markdown-loader']
            }
        ]
    },
    // Hot module reloading for CSS etc
    plugins: [
        new HtmlPlugin({ template: 'src/index.html' }),
        new CopyWebpackPlugin([
            { from: 'src/assets/**/*', to: 'assets/[name].[ext]' }
        ])
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true, // Enable HMR
        watchContentBase: true // Needed to auto update when index.html changes
    }
};
