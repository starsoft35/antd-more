export default {
  esm: {
    type: 'babel',
    importLibToEs: true
  },
  cjs: {
    type: 'babel',
    lazy: true
  },
  // 不支持 umd
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
