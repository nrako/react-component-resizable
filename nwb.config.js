module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'react-component-resizable',
      externals: {
        react: 'React'
      }
    }
  }
}
