const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/js/main.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.[fullhash].js'
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.ts'],
    },
    devServer: {
        static: {
            directory: __dirname + 'dist',
        },
        hot: false,
        compress: true,
        port: 9000,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'fangkehou-新年新气象',
            template: 'public/index.html',
            inject: 'body',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    'ts-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
        ]
    }
}