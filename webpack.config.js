const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // plugin que limpa o cache do webpack / recomendado
module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx', // entrada da aplicação
  output: {
    path: path.join(__dirname, 'public/js'), // path onde será gerado o bundle.js
    publicPath: '/public/js',
    filename: 'bundle.js' // nome do arquivo
  },
  resolve: { // extensões que dará suporte
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: { // modularização do paths de import
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },{
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true // permite que quando faça import de um estilo, as classes dele possam ser usadas com javascript
            }
          },
          {
            loader: 'sass-loader'
          },
        ]
      }
    ]
  },
  devServer: {
    contentBase: './public', // determina o diretorio que será todado no navegador
    writeToDisk: true, // armazena o build em memoria e em disco
    historyApiFallback: true, // permite que detecte as rotas
    port: 8080, // obvio
    open: true, // fala pro desgraçado abrir o link no navegador
    liveReload: true // atualização em tempo real
  },
  externals: { // as bibliotecas que tem aqui, não são incluidas no bundle
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [ // usa os plugins packages
    new CleanWebpackPlugin()
  ]
}