import { defineConfig } from 'dumi';
import pkg from './package.json';
// import { theme } from 'antd';
// import { convertLegacyToken } from '@ant-design/compatible';

// // ref: https://ant.design/docs/react/migration-v5-cn
// // 开始升级
// const { defaultAlgorithm, defaultSeed } = theme;
// const mapToken = defaultAlgorithm(defaultSeed);
// const v4Token = convertLegacyToken(mapToken);

const isDev = process.env.NODE_ENV === 'development';

const MajorVersionNumber = Number(pkg.version.split('.')[0]);
const versionSiteRoot = `refs/heads/v${MajorVersionNumber}`;

const preMajorVersionNumber = MajorVersionNumber - 1;
const preVersionSiteRoot = `refs/heads/v${preMajorVersionNumber}`;

const version = process.env.BUIDL_DOC_VERSION ? versionSiteRoot : 'latest';

const serverRootDirect =
  !isDev ? 'https://doly-dev.github.io/antd-more/' : '/';
const logo = 'https://doly-dev.github.io/logo.png';
const favicons = ['https://doly-dev.github.io/favicon.ico'];

const outputPath = 'site';
const publicPath = serverRootDirect + version + '/';


export default defineConfig({
  hash: true,
  history: {
    type: 'hash'
  },
  publicPath,
  outputPath,
  legacy: {
    buildOnly: true,
    nodeModulesTransform: true,
  },
  mfsu: false,
  targets: {
    ie: 11
  },
  polyfill: {
    imports: ['element-remove', 'core-js']
  },
  // lessLoader: {
  //   modifyVars: v4Token
  // },
  themeConfig: {
    logo,
    // sidebar: {
    //   '/components': [
    //     {
    //       title: '数据展示',
    //       children: ['biz-field', 'biz-descriptions', 'biz-table/index', 'biz-table']
    //     },
    //     {
    //       title: '数据录入',
    //       children: [
    //         'biz-form',
    //         'biz-form/docs/item',
    //         'biz-form/docs/list',
    //         'biz-form/docs/modalForm',
    //         'biz-form/docs/queryForm',
    //         'biz-form/docs/stepsForm'
    //       ]
    //     },
    //     {
    //       title: '布局',
    //       children: ['biz-user-layout']
    //     },
    //     {
    //       title: '通用',
    //       children: ['color', 'dictionary', 'captcha-button', 'input-icon', 'tree-table']
    //     }
    //   ]
    // },
    // navs: [
    //   // null, // null 值代表保留约定式生成的导航，只做增量配置
    //   {
    //     title: '文档',
    //     path: '/docs'
    //   },
    //   {
    //     title: '组件',
    //     path: '/components'
    //   },
    //   {
    //     title: '更多场景',
    //     path: '/scenes'
    //   },
    //   {
    //     title: `v${preMajorVersionNumber}.x`,
    //     path: `https://doly-dev.github.io/antd-more/${preVersionSiteRoot}/index.html`
    //   },
    //   {
    //     title: 'GitHub',
    //     path: 'https://github.com/doly-dev/antd-more'
    //   },
    //   {
    //     title: '更新日志',
    //     path: 'https://github.com/doly-dev/antd-more/releases'
    //   }
    // ],
  },

  headScripts: isDev ? [] : [
    { src: 'https://www.googletagmanager.com/gtag/js?id=G-N328Y9JJTL' },
    {
      content: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-N328Y9JJTL');
    `
    }
  ]
});
