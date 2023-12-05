const Encore = require('@symfony/webpack-encore');
const {resolve} = require("path");
const globImporter = require('node-sass-glob-importer');
const dotenv = require('dotenv');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/app.js')
    .addEntry('galaxy', './assets/js/components/Galaxy/index.tsx')
    .enableStimulusBridge('./assets/controllers.json')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })
    .enableSassLoader((options) => {
        options.implementation = require('sass');
        options.sassOptions = {
            importer: globImporter(),
        };
    })
    .addAliases({
        '@canopee_app': resolve(__dirname),
        '@canopee_fonts': resolve(__dirname, 'assets/fonts'),
        '@canopee_images': resolve(__dirname, 'assets/images'),
    })
    .enableTypeScriptLoader()
    .enableReactPreset()
    .configureDefinePlugin(options => {
        const env = dotenv.config();
        
        if (env.error) {
            throw env.error;
        }
        
        options['process.env.HOST'] = JSON.stringify(env.parsed.HOST);
    })
;

module.exports = Encore.getWebpackConfig();
