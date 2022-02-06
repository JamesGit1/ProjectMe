const { resolve } = require('path')

module.exports = {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                submit: resolve(__dirname, 'submit.html')
            }
        }
    }
}