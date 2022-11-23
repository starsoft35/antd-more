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

const version = process.env.BUILD_DOC_VERSION ? versionSiteRoot : 'latest';

const serverRootDirect =
  !isDev ? 'https://doly-dev.github.io/antd-more/' : '/';
const logo = 'https://doly-dev.github.io/logo.png';
const favicons = ['https://doly-dev.github.io/favicon.ico'];

const outputPath = 'site';
const publicPath = serverRootDirect + version + '/';


export default defineConfig({
  hash: true,
  // history: {
  //   type: 'hash'
  // },
  base: isDev ? '/' : '/antd-more/',
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
  favicons,
  // lessLoader: {
  //   modifyVars: v4Token
  // },
  themeConfig: {
    name: 'antd-more',
    logo,
    footer: 'Open-source MIT Licensed | Copyright © 2020-present',
    nav: [
      {
        title: '文档',
        link: '/docs'
      },
      {
        title: '组件',
        link: '/components'
      },
      {
        title: '更多场景',
        link: '/scenes'
      },
      {
        title: `v${preMajorVersionNumber}.x`,
        link: `https://doly-dev.github.io/antd-more/${preVersionSiteRoot}/index.html`
      },
      {
        title: 'GitHub',
        link: 'https://github.com/doly-dev/antd-more'
      },
      {
        title: '更新日志',
        link: 'https://github.com/doly-dev/antd-more/releases'
      }
    ],
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
