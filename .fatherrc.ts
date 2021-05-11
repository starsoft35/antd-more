export default {
  esm: {
    type: 'babel',
    importLibToEs: true
  },
  cjs: {
    type: 'babel',
    lazy: true
  },
  // 暂不支持 umd，需要重新配置
  // umd: {
  //   file: 'antd-more',
  //   globals: {
  //     react: 'React',
  //     antd: 'antd',
  //     // '@ant-design/icons': '@ant-design/icons' // ?
  //   },
  //   sourcemap: true,
  //   minFile: true
  // },
  runtimeHelpers: true,
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ]
};
