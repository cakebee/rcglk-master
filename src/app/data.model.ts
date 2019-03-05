export class Student {
  constructor(
    public stuId: any,
    public stuName: any,
    public stuGender: any,
    public stuMajor: any,
    public stuClass: any,
    public stuStatus: any,
    public stuDorm: any,
    public stuTel: any,
    public stuQq: any,
    public stuIntro: any
  ) { }
}

export class Prize {
  constructor(
    public prizeName: any,
    public prizeClass: any,
    public prizeLevel: any,
    public prizeFile: any,
    public prizeIntro: any,
    public status: any,
    public prizeDate: any,
    public reason: any
  ) { }
}

// export const prizes: Prize[] = [];

export class Org {
  constructor(
    public orgClass: any,
    public orgName: any,
    public orgDuty: any,
    public orgBegin: any,
    public orgEnd: any,
    public orgIntro: any
  ) { }
}

export class Essay {
  constructor(
    public essayAuthor: any,
    public stuId: any,
    public essayTitle: any,
    public periodical: any,
    public essayLevel: any,
    public essayDate: any
  ) { }
}

export class Quality {
  constructor(
    public stuId: any,
    public stuName: any,
    public q_scientific: any,
    public q_grade: any,
    public q_org: any,
    public quality: any
  ) { }
}

export const prizeTypeList = [{
  value: '科研类',
  label: '科研类',
  children: [{
    value: '科研竞赛',
    label: '科研竞赛',
    isLeaf: true
  },
  {
    value: '学术论文',
    label: '学术论文',
    isLeaf: true
  },
  {
    value: '科技发明专利',
    label: '科技发明专利',
    isLeaf: true
  },
  {
    value: '校级项目',
    label: '校级项目',
    isLeaf: true
  },
  {
    value: '其它',
    label: '其它',
    isLeaf: true
  }]
},
{
  value: '文体类',
  label: '文体类',
  children: [{
    value: '新生杯系列体育比赛',
    label: '新生杯系列体育比赛',
    isLeaf: true
  },
  {
    value: '征文比赛',
    label: '征文比赛',
    isLeaf: true
  },
  {
    value: '辩论赛',
    label: '辩论赛',
    isLeaf: true
  },
  {
    value: '合唱比赛',
    label: '合唱比赛',
    isLeaf: true
  },
  {
    value: '运动会比赛',
    label: '运动会比赛',
    isLeaf: true
  },
  {
    value: '其它',
    label: '其它',
    isLeaf: true
  }]
},
{
  value: '应用技能类',
  label: '应用技能类',
  children: [{
    value: '英语',
    label: '英语',
    isLeaf: true
  },
  {
    value: '计算机',
    label: '计算机',
    isLeaf: true
  },
  {
    value: '其它',
    label: '其它',
    isLeaf: true
  }]
},
{
  value: '组织管理类',
  label: '组织管理类',
  children: [{
    value: '组织优秀个人',
    label: '组织优秀个人',
    isLeaf: true
  },
  {
    value: '优秀干部',
    label: '优秀干部',
    isLeaf: true
  },
  {
    value: '优秀组织',
    label: '优秀组织',
    isLeaf: true
  },
  {
    value: '其它',
    label: '其它',
    isLeaf: true
  }]
},
{
  value: '社会实践类',
  label: '社会实践类',
  children: [{
    value: '优秀个人',
    label: '优秀个人',
    isLeaf: true
  },
  {
    value: '优秀干部',
    label: '优秀干部',
    isLeaf: true
  },
  {
    value: '优秀实践队',
    label: '优秀实践队',
    isLeaf: true
  },
  {
    value: '其它',
    label: '其它',
    isLeaf: true
  }]
},
{
  value: '其它',
  label: '其它',
  isLeaf: true
}]

export const prizeLevelList = ['国际级', '国家级', '省级', '市级', '校级', '院级'];

export const orgTypeList = ['科研、项目组织', '文体类组织', '社会实践组织', '学生组织', '志愿者组织', '班干部', '其它'];

export function dateTrans(oriDate: any) {
  oriDate = new Date(oriDate);
  var year = oriDate.getFullYear();
  var month = oriDate.getMonth() + 1;
  var date = oriDate.getDate();
  return ([year, month, date].join('-'));
}

export function statusTrans(oriStatus: any) {
  if (oriStatus == "1") {
    return "审核通过";
  } else if (oriStatus == "2") {
    return "审核未通过";
  } else {
    return "未审核";
  }
}

export function dateToString(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
}
// export function ajaxRequest(url:string, method:string, data:any) {
//     var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象

//     request.onreadystatechange = function () { // 状态发生变化时，函数被回调
//       if (request.readyState === 4) { // 成功完成
//         // 判断响应结果:
//         if (request.status === 200) {
//           // 成功，通过responseText拿到响应的文本:
//           return request.responseText;
//         } else {
//           // 失败，根据响应码判断失败原因:
//           return request.status;
//         }
//       }
//     }
//   request.open(method, url);
//   request.send(data);
// }

// { 
//   "stuId": "2016220202004", 
//   "essayTitle": "浅谈web安全", 
//   "essayDate": "2018-11-23", 
//   "essayLevel": "E5", 
//   "periodical": "当代计算机", 
//   "essayAuthor": [
//     { "order": "第一作者", "name": "zhang" }, 
//     { "order": "第二作者", "name": "tiger" },
//     { "order": "第三作者", "name": "rain" }
//   ]
// }
