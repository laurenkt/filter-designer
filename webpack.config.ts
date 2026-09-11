import path from "path"
import { fileURLToPath } from "url"
import HtmlPlugin from "html-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import webpack from "webpack"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProduction = process.env.NODE_ENV === "production"

const config = {
    mode: isProduction ? "production" : "development",
    entry: {
        bundle: path.resolve(__dirname, "src", "index.tsx"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        clean: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                enforce: "pre",
                test: /\.js$/,
                use: "source-map-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg|otf)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
            {
                test: /\.wav$/,
                type: "asset/inline",
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlPlugin({
            template: "src/index.html",
            chunks: ["bundle"],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: "src/assets",
                    to: "assets",
                    noErrorOnMissing: true
                },
            ],
        }),
    ],
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        hot: true,
        open: true,
        port: 3000,
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp"
        },
    },
}

export default config
