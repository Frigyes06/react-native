const {
  override,
  babelInclude,
  addDecoratorsLegacy,
  disableEsLint,
  removeModuleScopePlugin,
  addWebpackExternals,
  addWebpackAlias,
} = require('customize-cra')
const path = require('path')

module.exports = override(
  removeModuleScopePlugin(),
  addDecoratorsLegacy(),
  disableEsLint(),
  babelInclude([path.resolve('src'), path.resolve('web')]),
  addWebpackExternals({
    realm: 'RealmStub',
  }),
  addWebpackAlias({
    ['animations']: path.resolve(__dirname, './src/animations'),
    ['api']: path.resolve(__dirname, './src/api'),
    ['assets']: path.resolve(__dirname, './src/assets'),
    ['components']: path.resolve(__dirname, './src/components'),
    ['config']: path.resolve(__dirname, './src/config'),
    ['crypto']: path.resolve(__dirname, './src/crypto'),
    ['hooks']: path.resolve(__dirname, './src/hooks'),
    ['lib']: path.resolve(__dirname, './src/lib'),
    ['realm']: path.resolve(__dirname, './src/realm'),
    ['services']: path.resolve(__dirname, './src/services'),
    ['store']: path.resolve(__dirname, './src/store'),
    ['stores']: path.resolve(__dirname, './src/stores'),
    ['theme']: path.resolve(__dirname, './src/theme'),
    ['types']: path.resolve(__dirname, './src/types'),
  })
)

// const path = require('path');
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

// module.exports = {
//     webpack: override(
//         addDecoratorsLegacy(),
//         disableEsLint(),
//         removeModuleScopePlugin(),
//     ),
//     paths: function (paths, env) {
//         paths.appIndexJs = path.resolve(__dirname, 'web/index.tsx');
//         paths.appSrc = path.resolve(__dirname, 'web');
//         return paths;
//     },
// }
