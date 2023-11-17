import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildLoaders } from './BuildLoaders';
import { buildPlugins } from './BuildPlugins';
import { buildResolvers } from './BuildResolvers';
import { buildDevServer } from './BuildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash:8].js',
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(),
        devtool: isDev ? 'inline-source-map' : undefined, // "карта", чтобы отслеживать ошибки
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
