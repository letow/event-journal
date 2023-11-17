import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const babelLoader = {
        test: /\.(js|jsx|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
            },
        },
    };

    const svgLoader = {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        dependency: { not: ["url"] },
        use: [
            {
                loader: "file-loader",
            },
        ],
    };

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    const scssLoader = {
        test: /\.s[ac]ss|css$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: Boolean(/\.module\./i),
                        localIdentName: isDev
                            ? "[path][name]__[local]--[hash:base64:8]"
                            : "[hash:base64:8]",
                    }, // css modules
                },
            },
            "sass-loader",
        ],
    };

    return [babelLoader, fileLoader, svgLoader, typescriptLoader, scssLoader];
}
