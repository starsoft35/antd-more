const pkg = require('./package.json');
const version = process.env.BUILD_MODE === 'version' ? `v${pkg.version.split('.')[0]}` : 'latest';

const serverRootDirect = process.env.NODE_ENV === 'production' ? 'https://doly-dev.github.io/antd-more/' : '/';
const logo = 'https://www.caijinfeng.com/assets/images/logo-doly@3x.png';
const favicon = 'https://www.caijinfeng.com/assets/images/doly-touch-icon_48x48.png';

const outputPath = 'site/' + version;
// const outputPath = 'site';
const publicPath = serverRootDirect + outputPath + '/';
const manifestLink = `${publicPath}asset-manifest.json`;

const links = process.env.NODE_ENV === 'production' ? [{ rel: 'manifest', href: manifestLink }] : [];

const umiConfig = {
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'antd-more',
        libraryDirectory: 'es',
        style: true,
      },
      'antd-more'
    ]
  ],
  mode: 'site',
  history: {
    type: 'hash'
  },
  title: pkg.name,
  logo,
  favicon,
  publicPath,
  outputPath,
  manifest: {
    publicPath
  },
  links,
  hash: true,
  locales: [['zh-CN', '中文'], ['en-US', 'English']],
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  theme: {
    '@s-site-menu-width': '258px',
  },
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'v1.x',
      path: 'https://doly-dev.github.io/antd-more/site/v1/index.html',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/doly-dev/antd-more',
    },
    {
      title: '更新日志',
      path: 'https://github.com/doly-dev/antd-more/releases',
    },
  ],
  menus: {
    '/components': [
      {
        title: '数据展示',
        children: [
          'biz-field',
          'biz-descriptions',
          'biz-table/index',
          'biz-table'
        ]
      },
      {
        title: '数据录入',
        children: [
          'biz-form',
          'biz-form/docs/item',
          'biz-form/docs/modalForm',
          'biz-form/docs/queryForm',
          'biz-form/docs/stepsForm',
        ]
      },
      {
        title: '通用',
        children: [
          'color',
          'dictionary',
          'captcha-button',
          'input-icon'
        ]
      }
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  umiConfig.chunks = ['vendors', 'umi'];
  umiConfig.chainWebpack = function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /node_modules/,
              chunks: "all",
              name: "vendors",
              priority: -10,
              enforce: true
            }
          }
        }
      }
    });
  }
}

export default umiConfig;