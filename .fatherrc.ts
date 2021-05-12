
export default {
  esm: {
    type: 'babel',
    importLibToEs: true
  },
  cjs: {
    type: 'babel',
    lazy: true
  },
  // umd: {
  //   globals: {
  //     react: "React",
  //     antd: "antd",
  //     "@ant-design/icons": "@ant-design/icons"
  //   },
  //   minFile: true,
  //   file: "antd-more",
  //   name: "antdMore",
  //   sourcemap: true
  // },
  // extractCSS: true,
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
