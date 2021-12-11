const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@test': path.resolve(__dirname, 'src/components/HelloWorld.vue'),
                '@styles': path.resolve(__dirname, 'src/assets/styles/main.scss'),
                '@uikit': path.resolve(__dirname, 'src/components/ui-kit')
            },
        }
    },
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            css: {
                localsConvention: 'camelCaseOnly'
            }
        }
    }
}