const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  target: 'web', // Change target to 'web' for browser compatibility
  mode: 'production',
  entry: './example/index.ts', // Your entry point
  output: {
  
    filename: 'bundle.js', // Fixed filename instead of using contenthash
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      name: 'MyLibrary', // This will be the global variable name
      type: 'var', // The type of the output library (var, umd, etc.)
    }
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      "buffer": require.resolve("buffer/"),
      "process": require.resolve("process/browser"),
      "stream": require.resolve("stream-browserify"), // Add this line for stream
      "fs": false,  // You can also set fs to false if you don’t use any fs functions
      "path": require.resolve("path-browserify")  // Add this line for path
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
};

