import Mock from 'mockjs';

const applyList = ({ page: { pageNum, pageSize }, data = {} }) => (
  Mock.mock({
    [`data|${pageSize}`]: [{
      applyCode: '@word(6)',
      applicantName: '@cname',
      approverName: '@cname',
      createTime: '@datetime',
      approveTime: '@datetime',
      "approveResult|1-3": 1
    }],
    pageInfo: {
      total: 50,
      pages: 10
    },
  })
);

export function getApplyList(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(applyList(params));
    }, 1000);
  })
}
