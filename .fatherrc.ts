export default {
  esm: {
    type: 'babel',
    importLibToEs: true
  },
  cjs: {
    type: 'babel',
    lazy: true
  },
  // 如要开启，需将 https://github.com/umijs/fabric/blob/master/tsconfig.json 存到根目录
  // umi: {
  //   name: 'antdMore',
  //   file: 'antd-more',
  //   globals: {
  //     react: 'React',
  //     antd: 'antd'
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
