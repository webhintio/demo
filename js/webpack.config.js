const path = require('path');

module.exports = {
  context: path.resolve(__dirname, ''),
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  entry: ['./app.tsx', './../scss/base.scss', './../scss/index.scss'],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '')
  },
  module: {
		rules: [
      {
        test: /\.ts|\.tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
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