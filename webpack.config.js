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
    extensions: ['.ts', '.tsx', '.js'],
    alias: { // modularização do paths de import
      '@': path.join(__dirname, 'src')
    }
  },
  devServer: {
    contentBase: './public', // determina o diretorio que será todado no navegador
    writeToDisk: true, // armazena o build em memoria e em disco
    historyApiFallback: true // permite que detecte as rotas
  },
  externals: { // as bibliotecas que tem aqui, não são incluidas no bundle
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [ // usa os plugins packages
    new CleanWebpackPlugin()
  ]
}