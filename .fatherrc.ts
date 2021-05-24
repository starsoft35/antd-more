
export default [{
  esm: {
    type: 'babel',
    importLibToEs: true
  },
  cjs: {
    type: 'babel',
    lazy: true
  },
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
  // },
  // {
  // extraExternals: ["react", "react-dom", "antd", "@ant-design/icons"],
  // // extractCSS: true,
  // umd: {
  //   globals: {
  //     react: "React",
  //     "react-dom": "ReactDom",
  //     antd: "antd",
  //     "@ant-design/icons": "icons"
  //   },
  //   minFile: true,
  //   file: "antd-more",
  //   name: "antdMore",
  //   sourcemap: true
  // },
}];
