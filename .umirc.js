const pkg = require('./package.json');

const MajorVersionNumber = Number(pkg.version.split('.')[0]);
const versionSiteRoot = `refs/heads/v${MajorVersionNumber}`;

const preMajorVersionNumber = MajorVersionNumber - 1;
const preVersionSiteRoot = `refs/heads/v${preMajorVersionNumber}`;

const version = process.env.BUIDL_DOC_VERSION ? versionSiteRoot : 'latest';

const serverRootDirect =
  process.env.NODE_ENV === 'production' ? 'https://doly-dev.github.io/antd-more/' : '/';
const logo = 'https://www.caijinfeng.com/assets/images/logo-doly@3x.png';
const favicon = 'https://www.caijinfeng.com/assets/images/doly-touch-icon_48x48.png';

const outputPath = 'site';
const publicPath = serverRootDirect + version + '/';

const umiConfig = {
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ],
  mode: 'site',
  history: {
    type: 'hash'
  },
  logo,
  favicon,
  publicPath,
  outputPath,
  hash: true,
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English']
  ],
  nodeModulesTransform: {
    type: 'none',
    exclude: []
  },
  theme: {
    '@s-site-menu-width': '258px'
  },
  navs: [
    // null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: '文档',
      path: '/docs'
    },
    {
      title: '组件',
      path: '/components'
    },
    {
      title: '更多场景',
      path: '/scenes'
    },
    {
      title: `v${preMajorVersionNumber}.x`,
      path: `https://doly-dev.github.io/antd-more/${preVersionSiteRoot}/index.html`
    },
    {
      title: 'GitHub',
      path: 'https://github.com/doly-dev/antd-more'
    },
    {
      title: '更新日志',
      path: 'https://github.com/doly-dev/antd-more/releases'
    }
  ],
  menus: {
    '/components': [
      {
        title: '数据展示',
        children: ['biz-field', 'biz-descriptions', 'biz-table/index', 'biz-table']
      },
      {
        title: '数据录入',
        children: [
          'biz-form',
          'biz-form/docs/item',
          'biz-form/docs/list',
          'biz-form/docs/modalForm',
          'biz-form/docs/queryForm',
          'biz-form/docs/stepsForm'
        ]
      },
      {
        title: '布局',
        children: ['biz-user-layout']
      },
      {
        title: '通用',
        children: ['color', 'dictionary', 'captcha-button', 'input-icon', 'tree-table']
      }
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  umiConfig.headScripts = [
    { src: 'https://www.googletagmanager.com/gtag/js?id=G-N328Y9JJTL' },
    {
      content: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-N328Y9JJTL');
    `
    }
  ];
  umiConfig.chunks = ['vendors', 'umi'];
  umiConfig.chainWebpack = function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /node_modules/,
              chunks: 'all',
              name: 'vendors',
              priority: -10,
              enforce: true
            }
          }
        }
      }
    });
  };
}

export default umiConfig;
