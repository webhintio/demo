const path = require('path');

module.exports = {
  context: path.resolve(__dirname, ''),
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  entry: ['./app.js', './../scss/base.scss', './../scss/index.scss'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '')
  },
  module: {
		rules: [
			{
				test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
					{
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
					}
				]
      }
    ]
  },
};