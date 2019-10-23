const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "style.css",
  disable: process.env.NODE_ENV === "development"
});

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
/*       {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
        options: {
          "presets": ["env", "stage-3"]
        }
      }, */
      {
        test: /\.s[ac]ss$/i,
        use: extractSass.extract({
          use: [
            'css-loader',
            'sass-loader',
          ],
          fallback: "style-loader",
        })
      },
      {
        test: /\.pug$/,
        use: ['html-loader?attrs=false', 'pug-html-loader?pretty=true']
      
      }
    ],
  },

  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.pug',
      inject: false
    }),
 ]
};

module.exports = config;