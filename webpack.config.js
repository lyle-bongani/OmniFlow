module.exports = {
  // ...existing code...
  module: {
    rules: [
      // ...existing code...
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
      // ...existing code...
    ]
  }
  // ...existing code...
};
