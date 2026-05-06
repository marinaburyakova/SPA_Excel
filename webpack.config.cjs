const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWEbpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

// Функция для генерации имен файлов (хеши только для продакшена)
const filename = (ext) =>
  isDev ? `bundle.${ext}` : `bundle.[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: isDev ? "development" : "production",
  // Исправляет проблему с автоматическим обновлением (HMR) в Webpack 5
  target: isDev ? "web" : "browserslist",
  entry: "./index.js",
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/core"),
    },
  },
  devtool: isDev ? "source-map" : false,
  devServer: {
    port: 3000,
    hot: true, // Включаем Hot Module Replacement
    open: true, // Автоматически открывать браузер при старте
    watchFiles: ["./src/**/*"], // Следить за изменениями всех файлов в src
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWEbpackPlugin({
      template: "index.html",
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      fix: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
