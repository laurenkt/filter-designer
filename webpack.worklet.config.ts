import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    mode: "production", // Always production for worklets
    entry: {
        "filter-worklet": path.resolve(__dirname, "src", "workers", "filter-worklet.ts"),
        "noise-worklet": path.resolve(__dirname, "src", "workers", "noise-worklet.ts"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: false, // Don't minimize to debug easier
    },
}