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
    public stuIntro: any,
    public stuGrade: any,
    public stuAge: any,
    public stuHome: any,
    public stuGpa: any,
    public identity: any
  ) { }
}

export class Prize {
  constructor(
    public prizeId: any,
    public prizeName: any,
    public prizeClass: any,
    public prizeLevel: any,
    public prizeLevel2: any,
    public prizeFile: any,
    public prizeIntro: any,
    public status: any,
    public prizeDate: any,
    public reason: any,
    public submitDate: any,
    public reviewDate: any,
    public reviewer: any,
    public stuId: any,
    public stuName: any,
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
    public orgIntro: any,
    public orgHonor: any,
    public file: any
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

export class Paper {
  constructor(
    public id: any,
    public name: any,
    public author: any,
    public periodical: any,
    public level: any,
    public date: any,
    public status: any,
    public reviewDate: any,
    public reviewer: any,
    public submitDate: any,
    public reason: any,
    public stuId: any,
    public accessNumber: any,
    public authorLevel: any,
    public paperId: any,
    public url: any,
    public intro: any,
  ) { }
}

export class Project {
  constructor(
    public id: string = null,
    public name: string = null,
    public startDate: any = null,
    public endDate: any = null,
    public intro: string = null,
    public env: string = null,
    public frame: string = null,
    public role: string = null,
    public roleDetl: string = null,
    public duty: string = null,
    public stuId: string = null,
    public stuName: string = null,
    public supp: string = null,
    public projLink: string = null,
    public srcLink: string = null,
    public prizeId: any = null,
    public status: any = null,
    public submitDate: any = null,
    public reviewDate: any = null,
    public reviewer: string = null,
    public reason: string = null,
    public file: string = null
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
/*{
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
},*/
/*{
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
},*/
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

export const prizeLevel2List = ['一等奖', '二等奖', '三等奖', '其他'];

export const orgTypeList = ['科研、项目组织', '文体类组织', '社会实践组织', '学生组织', '志愿者组织', '班干部', '其它'];

export const authorTypeList = ['通讯作者', '第一作者', '第二作者', '第三作者', '第四作者', '第五作者', '第六作者', '第七作者'];

export const authorTypeMap = [
  { text: '通讯作者', value: '0' },
  { text: '第一作者', value: '1' },
  { text: '第二作者', value: '2' },
  { text: '第三作者', value: '3' },
  { text: '第四作者', value: '4' },
  { text: '第五作者', value: '5' },
  { text: '第六作者', value: '6' },
  { text: '第七作者', value: '7' },
]

export function dateTrans(oriDate: any) {
  if (oriDate == null) {return '无';}
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

function commonTrans(list: any) {
  for (const i in list) {
    list[i].submitDate = dateTrans(list[i].submitDate);
    list[i].reviewDate = dateTrans(list[i].reviewDate);
  }
}

export function prizeTrans(prizeList: any) {
  for (const i in prizeList) {
    prizeList[i].prizeDate = dateTrans(prizeList[i].prizeDate);
    prizeList[i].submitDate = dateTrans(prizeList[i].submitDate);
    prizeList[i].reviewDate = dateTrans(prizeList[i].reviewDate);
  }
  return prizeList;
}
export function orgTrans(prizeList: any) {

}
export function paperTrans(prizeList: any) {

}
export function projectTrans(projectList: any) {
  for (const i in projectList) {
    projectList[i].date = dateTrans(projectList[i].date);
    projectList[i].submitDate = dateTrans(projectList[i].submitDate);
    projectList[i].reviewDate = dateTrans(projectList[i].reviewDate);
  }
  return projectList;
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

export const roleDetlList = [
  {
    value: '后端开发',
    label: '后端开发',
    children: [
      {value: 'JAVA', label: 'JAVA', isLeaf: true},
      {value: 'PHP', label: 'PHP', isLeaf: true},
      {value: 'C|C++', label: 'C|C++', isLeaf: true},
      {value: 'C#|.NET', label: 'C#|.NET', isLeaf: true},
      {value: 'Python', label: 'Python', isLeaf: true},
      {value: 'Node.js', label: 'Node.js', isLeaf: true},
      {value: '全栈', label: '全栈', isLeaf: true},
      {value: 'Ruby', label: 'Ruby', isLeaf: true},
      {value: 'GO|Golang', label: 'GO|Golang', isLeaf: true},
      {value: 'ASP', label: 'ASP', isLeaf: true},
      {value: 'Perl', label: 'Perl', isLeaf: true},
      {value: 'Delphi', label: 'Delphi', isLeaf: true},
      {value: 'Shell', label: 'Shell', isLeaf: true},
      {value: 'VB', label: 'VB', isLeaf: true},
      {value: 'Erlang', label: 'Erlang', isLeaf: true},
      {value: 'LUA', label: 'LUA', isLeaf: true},
      {value: 'Hadoop', label: 'Hadoop', isLeaf: true},
      {value: '搜索算法', label: '搜索算法', isLeaf: true},
      {value: '推荐算法', label: '推荐算法', isLeaf: true},
      {value: '语言|视频|图形开发', label: '语言|视频|图形开发', isLeaf: true},
      {value: '数据采集', label: '数据采集', isLeaf: true},
      {value: '区块链开发', label: '区块链开发', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
      ]
  },
  {
    value: '移动前端开发',
    label: '移动前端开发',
    children: [
      {value: 'HTML5', label: 'HTML5', isLeaf: true},
      {value: 'Android', label: 'Android', isLeaf: true},
      {value: 'IOS', label: 'IOS', isLeaf: true},
      {value: 'WEB前端', label: 'WEB前端', isLeaf: true},
      {value: 'JavaScript', label: 'JavaScript', isLeaf: true},
      {value: 'FLASH', label: 'FLASH', isLeaf: true},
      {value: 'U3D', label: 'U3D', isLeaf: true},
      {value: 'COCOS2D-X', label: 'COCOS2D-X', isLeaf: true},
      {value: 'UE4', label: 'UE4', isLeaf: true},
      {value: 'React Native', label: 'React Native', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
      ]
  },
  {
    value: '前端开发',
    label: '前端开发',
    children: [
      {value: 'WEB前端', label: 'WEB前端', isLeaf: true},
      {value: 'JavaScript', label: 'JavaScript', isLeaf: true},
      {value: 'FLASH', label: 'FLASH', isLeaf: true},
      {value: 'HTML5', label: 'HTML5', isLeaf: true},
      {value: 'React', label: 'React', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
    ]
  },
  {
    value: '数据开发',
    label: '数据开发',
    children: [
      {value: '数据挖掘', label: '数据挖掘', isLeaf: true},
      {value: '数据分析', label: '数据分析', isLeaf: true},
      {value: '机器学习', label: '机器学习', isLeaf: true},
      {value: '模式识别', label: '模式识别', isLeaf: true},
      {value: 'ETL', label: 'ETL', isLeaf: true},
      {value: 'Hadoop', label: 'Hadoop', isLeaf: true},
      {value: '爬虫', label: '爬虫', isLeaf: true},
      {value: '建模', label: '建模', isLeaf: true},
      {value: '数据治理', label: '数据治理', isLeaf: true},
      {value: 'BI工程师', label: 'BI工程师', isLeaf: true},
      {value: '数据采集', label: '数据采集', isLeaf: true},
      {value: 'Codol', label: 'Codol', isLeaf: true},
      {value: '反作弊算法', label: '反作弊算法', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
    ]
  },
  {
    value: '人工智能',
    label: '人工智能',
    children: [
      {value: '机器学习', label: '机器学习', isLeaf: true},
      {value: '深度学习', label: '深度学习', isLeaf: true},
      {value: '图像算法', label: '图像算法', isLeaf: true},
      {value: '图像处理', label: '图像处理', isLeaf: true},
      {value: '语音识别', label: '语音识别', isLeaf: true},
      {value: '图像识别', label: '图像识别', isLeaf: true},
      {value: '算法研究员', label: '算法研究员', isLeaf: true},
      {value: '机器视觉', label: '机器视觉', isLeaf: true},
      {value: '算法工程师', label: '算法工程师', isLeaf: true},
      {value: '自然语言处理(NLP)', label: '自然语言处理(NLP)', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
    ]
  },
  {
    value: '硬件开发',
    label: '硬件开发',
    children: [
      {value: '硬件开发', label: '硬件开发', isLeaf: true},
      {value: '嵌入式', label: '嵌入式', isLeaf: true},
      {value: '自动化', label: '自动化', isLeaf: true},
      {value: '单片机', label: '单片机', isLeaf: true},
      {value: '电路设计', label: '电路设计', isLeaf: true},
      {value: '驱动开发', label: '驱动开发', isLeaf: true},
      {value: '系统集成', label: '系统集成', isLeaf: true},
      {value: 'FPGA', label: 'FPGA',},
      {value: 'ARM', label: 'ARM', isLeaf: true},
      {value: 'PCB工艺', label: 'PCB工艺', isLeaf: true},
      {value: '模具设计', label: '模具设计', isLeaf: true},
      {value: '热传导', label: '热传导', isLeaf: true},
      {value: '射频', label: '射频', isLeaf: true},
      {value: '机械', label: '机械', isLeaf: true},
      {value: 'PLC', label: 'PLC', isLeaf: true},
      {value: 'DSP开发', label: 'DSP开发', isLeaf: true},
      {value: '材料工程师', label: '材料工程师', isLeaf: true},
      {value: '精益工程师', label: '精益工程师', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
    ]
  },
  {
    value: '测试',
    label: '测试',
    children: [
      {value: '自动化测试', label: '自动化测试', isLeaf: true},
      {value: '功能测试', label: '功能测试', isLeaf: true},
      {value: '性能测试', label: '性能测试', isLeaf: true},
      {value: '测试开发', label: '测试开发', isLeaf: true},
      {value: '移动端测试', label: '移动端测试', isLeaf: true},
      {value: '游戏测试', label: '游戏测试', isLeaf: true},
      {value: '硬件测试', label: '硬件测试', isLeaf: true},
      {value: '软件测试', label: '软件测试', isLeaf: true},
      {value: '白盒测试', label: '白盒测试', isLeaf: true},
      {value: '灰盒测试', label: '灰盒测试', isLeaf: true},
      {value: '黑盒测试', label: '黑盒测试', isLeaf: true},
      {value: '安全测试', label: '安全测试', isLeaf: true},
      {value: '压力测试', label: '压力测试', isLeaf: true},
      {value: '回归测试', label: '回归测试', isLeaf: true},
      {value: '渗透测试', label: '渗透测试', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
    ]
  },
  {
    value: '运维',
    label: '运维',
    children: [
      {value: '运维开发工程师', label: '运维开发工程师', isLeaf: true},
      {value: '网络工程师', label: '网络工程师', isLeaf: true},
      {value: '系统工程师', label: '系统工程师', isLeaf: true},
      {value: '系统管理员', label: '系统管理员', isLeaf: true},
      {value: 'IDC', label: 'IDC', isLeaf: true},
      {value: 'CDN', label: 'CDN', isLeaf: true},
      {value: 'F5', label: 'F5', isLeaf: true},
      {value: '网络安全', label: '网络安全', isLeaf: true},
      {value: '系统安全', label: '系统安全', isLeaf: true},
      {value: '信息安全', label: '信息安全', isLeaf: true},
      {value: '病毒分析', label: '病毒分析', isLeaf: true},
      {value: 'WEB安全', label: 'WEB安全', isLeaf: true},
      {value: '数据仓库', label: '数据仓库', isLeaf: true},
      {value: 'Mysql', label: 'Mysql', isLeaf: true},
      {value: 'ORACLE', label: 'ORACLE', isLeaf: true},
      {value: 'SQL SERVER', label: 'SQL SERVER', isLeaf: true},
      {value: 'MongoDB', label: 'MongoDB', isLeaf: true},
      {value: 'DBA', label: 'DBA', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
    ]
  },
  {
    value: '视觉',
    label: '视觉',
    children: [
      {value: 'UI', label: 'UI', isLeaf: true},
      {value: 'UE', label: 'UE', isLeaf: true},
      {value: 'GUI', label: 'GUI', isLeaf: true},
      {value: '视觉设计', label: '视觉设计', isLeaf: true},
      {value: '平面设计', label: '平面设计', isLeaf: true},
      {value: '网页设计', label: '网页设计', isLeaf: true},
      {value: 'APP设计', label: 'APP设计', isLeaf: true},
      {value: 'Flash设计', label: 'Flash设计', isLeaf: true},
      {value: '美工设计', label: '美工设计', isLeaf: true},
      {value: '广告设计', label: '广告设计', isLeaf: true},
      {value: '设计师助理', label: '设计师助理', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
    ]
  },
  {
    value: '交互',
    label: '交互',
    children: [
      {value: '移动交互设计', label: '移动交互设计', isLeaf: true},
      {value: '网页交互设计', label: '网页交互设计', isLeaf: true},
      {value: '硬件交互设计', label: '硬件交互设计', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
    ]
  },
  {
    value: '原画|美术|特效',
    label: '原画|美术|特效',
    children: [
      {value: '多媒体设计师', label: '多媒体设计师', isLeaf: true},
      {value: '原画师', label: '原画师', isLeaf: true},
      {value: '手绘师', label: '手绘师', isLeaf: true},
      {value: '美术特效', label: '美术特效', isLeaf: true},
      {value: '视频', label: '视频', isLeaf: true},
      {value: '音频', label: '音频', isLeaf: true},
      {value: '后期', label: '后期', isLeaf: true},
      {value: '动画', label: '动画', isLeaf: true},
      {value: '插画', label: '插画', isLeaf: true},
      {value: '游戏特效', label: '游戏特效', isLeaf: true},
      {value: '游戏界面', label: '游戏界面', isLeaf: true},
      {value: '游戏场景', label: '游戏场景', isLeaf: true},
      {value: '游戏角色', label: '游戏角色', isLeaf: true},
      {value: '游戏动作', label: '游戏动作', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
    ]
  },
  {
    value: '其他设计',
    label: '其他设计',
    children: [
      {value: '工业设计(ID)', label: '工业', isLeaf: true},
      {value: 'CAD设计', label: 'CAD设计', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},

    ]
  },
  {
    value: '游戏策划',
    label: '游戏策划',
    children: [
      {value: '剧情策划', label: '剧情策划', isLeaf: true},
      {value: '数值策划', label: '数值策划', isLeaf: true},
      {value: '系统策划', label: '系统策划', isLeaf: true},
      {value: '关卡策划', label: '关卡策划', isLeaf: true},
      {value: '游戏文案策划', label: '游戏文案策划', isLeaf: true},
      {value: '其他', label: '其他', isLeaf: true},
    ]
  },
  {
    value: '其他',
    label: '其他',
    isLeaf: true
  }
];
