/*
 * @Author: George Zhao
 * @Date: 2021-10-15 21:37:20
 * @LastEditors: George Zhao
 * @LastEditTime: 2022-11-04 13:17:05
 * @Description:
 * @Email: 2018221138@email.szu.edu.cn
 * @Company: SZU
 * @Version: 1.0
 */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

base_path = "/PCMA/";

func_js = (pathData) => {
  return pathData.chunk.name === "index"
    ? "[name].bundle.[contenthash].js"
    : "[name]/[name].bundle.[contenthash].js";
};

let config = {
  name: "web_client",
  entry: {
    assets: "./src/js/assets.js",
    help: "./src/js/help.js",
    predictor: "./src/js/predictor.js",
    result: "./src/js/result.js",
    download:"./src/js/download_page.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist/PCMA/"),
    filename: func_js,
    publicPath: base_path,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      usedExports: true,
    },
    usedExports: true,
    minimizer: [new UglifyJsPlugin(), new TerserPlugin()],
  },
  mode: "none",
  devServer: {
    static: "./dist",
    hot: true,
    compress: true,
    port: 11084,
    allowedHosts: "all",
    open: "/PCMA/predictor/index.html",
    liveReload: true,
    proxy: {
      "/PCMA/api/**": {
        target: "http://127.0.0.1:6668",
        // router: () => "http://127.0.0.1:8888",
        pathRewrite: { '^/PCMA': '' },
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
      },
      "/PCMA/var/**": {
        target: "http://127.0.0.1:6668",
        // router: () => "http://127.0.0.1:8888",
        pathRewrite: { '^/PCMA': '' },
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
      },
      "/PCMA/**": {
        target: "http://127.0.0.1:6668",
        // router: () => "http://127.0.0.1:8888",
        pathRewrite: { '^/PCMA': '.' },
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerPort: 12083,
      analyzerMode: "static",
      reportFilename: ".htbundlereport.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/assets",
          to: "assets",
          globOptions: {
            // dot: true,
            // gitignore: true,
            ignore: ["**/src/assets/js/**", "**/src/assets/css/**"],
          },
        },
      ],
    }),
    
   
    new HtmlWebpackPlugin({
      base: base_path,
      filename: "help.html",
      template: "src/templates/base.html",
      inject: "body",
      chunks: ["help", "assets"],
    }),
    new HtmlWebpackPlugin({
      base: base_path,
      filename: "predictor/index.html",
      template: "src/templates/base.html",
      inject: "body",
      chunks: ["predictor", "assets"],
    }),
    new HtmlWebpackPlugin({
      base: base_path,
      filename: "download/index.html",
      template: "src/templates/base.html",
      inject: "body",
      chunks: ["download", "assets"],
    }),
    new HtmlWebpackPlugin({
      base: base_path,
      filename: "result/index.html",
      template: "src/templates/base.html",
      inject: "body",
      chunks: ["result", "assets"],
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-syntax-dynamic-import",
              "babel-plugin-minify-dead-code-elimination",
            ],
            // modules: false,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false, // leaflet uses relative paths
              // minimize: false,
              // modules: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false, // leaflet uses relative paths
              // minimize: false,
              // modules: false,
            },
          },
        ],
      },
    ],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
    config.target = "web";
  }

  if (argv.mode === "production") {
    config.target = ["browserslist"];
    config.optimization.minimize = true;
  }

  return config;
};
