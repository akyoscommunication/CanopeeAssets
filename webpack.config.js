const Encore = require('@symfony/webpack-encore');
const {resolve} = require("path");
const globImporter = require('node-sass-glob-importer');
const WebpackRTLPlugin = require('@automattic/webpack-rtl-plugin');

Encore
    .setOutputPath('./src/Resources/public/')
    .setPublicPath('/')
    .setManifestKeyPrefix('')
    
    .cleanupOutputBeforeBuild()
    .enableSassLoader()
    .enableSourceMaps(false)
    .enableVersioning(true)
    .disableSingleRuntimeChunk()
    
    .addPlugin(new WebpackRTLPlugin())

    .enableSassLoader((options) => {
        options.implementation = require('sass');
        options.sassOptions = {
            importer: globImporter(),
        };
    })
    .addAliases({
        '@canopee_app': resolve(__dirname),
        '@canopee_fonts': resolve(__dirname, 'assets/fonts'),
        '@canopee_css': resolve(__dirname, 'assets/css'),
        '@canopee_images': resolve(__dirname, 'assets/images'),
    })
    .enableTypeScriptLoader()
    .enableReactPreset()
    
    .addEntry('app', './assets/app.js')
    .addEntry('galaxy', './assets/js/components/Galaxy/index.tsx')
    
    .enableStimulusBridge('./assets/controllers.json')
;

module.exports = Encore.getWebpackConfig();
