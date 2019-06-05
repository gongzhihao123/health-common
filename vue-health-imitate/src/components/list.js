const projectList = [
  { projectId: 'xz',
    projectName: '心脏',
    contentList: [
      { code: '0', name: '正常' },
      { code: '1', name: '先心病术后无杂音' },
      { code: '2', name: '先心病术后有杂音' },
      { code: '3', name: '心前区收缩期二级以上杂音' },
      { code: '4', name: '心前区舒张期杂音' },
      { code: '5', name: '心律不齐' },
      { code: '6', name: '早搏' },
      { code: '7', name: '心动过速' },
      { code: '8', name: '心动过缓' },
      { code: '9', name: '其他' }
    ]
  },
  { projectId: 'f',
    projectName: '肺',
    contentList: [
      { code: '0', name: '(-)' },
      { code: '1', name: '肺部呼吸音增粗或增强' },
      { code: '2', name: '支气管哮鸣音' },
      { code: '3', name: '肺部啰音' },
      { code: '4', name: '肺部呼吸音减低' },
      { code: '5', name: '其他' }
    ]
  },
  { projectId: 'sy',
    projectName: '沙眼',
    contentList: [
      { code: '0', name: '无' },
      { code: '1', name: '沙眼性炎症--滤泡(TF)' },
      { code: '2', name: '沙眼性炎症--剧烈的(TI)' },
      { code: '3', name: '沙眼性疤痕(TS)' },
      { code: '4', name: '沙眼性倒睫(TT)' },
      { code: '5', name: '角膜混浊(CO)' }
    ]
  },
  { projectId: 'sj',
    projectName: '色觉',
    contentList: [
      { code: '0', name: '正常' },
      { code: '1', name: '色弱' },
      { code: '2', name: '色盲' }
    ]
  },
  { projectId: 'gp',
    projectName: '肝脾',
    contentList: [
      { code: '0', name: '肝脾未触及' },
      { code: '1', name: '肝可触及(肋缘下1cm以上)' },
      { code: '2', name: '脾可触及' },
      { code: '3', name: '肝脾可触及' }
    ]
  },
  { projectId: 'tj',
    projectName: '头颈',
    contentList: [
      { code: '0', name: '正常' },
      { code: '1', name: '斜颈' },
      { code: '2', name: '斜颈术后' },
      { code: '3', name: '甲状腺肿大' },
      { code: '4', name: '其他' }
    ]
  },
  { projectId: 'jz',
    projectName: '脊柱',
    contentList: [
      { code: '0', name: '正常' },
      { code: '1', name: '侧弯' },
      { code: '2', name: '前凸' },
      { code: '3', name: '后凸' },
      { code: '4', name: '其他' }
    ]
  },
  { projectId: 'pf',
    projectName: '皮肤',
    contentList: [
      { code: '0', name: '正常' },
      { code: '1', name: '术后瘢痕' },
      { code: '2', name: '湿疹' },
      { code: '3', name: '银屑病' },
      { code: '4', name: '白癜风' },
      { code: '5', name: '其他' }
    ]
  },
  { projectId: 'szgj',
    projectName: '四肢关节',
    contentList: [
      { code: '0', name: '四肢关节活动良好' },
      { code: '1', name: '功能受限' },
      { code: '2', name: '其他' }
    ]
  },
  { projectId: 'xb',
    projectName: '胸部',
    contentList: [
      { code: '0', name: '胸廓未见异常' },
      { code: '1', name: '鸡胸' },
      { code: '2', name: '扁平胸' },
      { code: '3', name: '漏斗胸' },
      { code: '4', name: '其他' }
    ]
  },
  { projectId: 'jmy',
    projectName: '结膜炎',
    contentList: [
      { code: '0', name: '无' },
      { code: '1', name: '有' }
    ]
  },
  { projectId: 'ggn',
    projectName: '肝功能',
    contentList: [
      { code: '0', name: '正常' },
      { code: '1', name: '异常' },
      { code: '2', name: '未检测' }
    ]
  },
  { projectId: 'qc',
    projectName: '龋齿',
    contentList: [
      { code: '00', name: '无龋齿' },
      { code: '01', name: '窝沟龋' },
      { code: '02', name: '光滑面龋、因龋所致的残根' },
      { code: '03', name: '已填充牙有龋' },
      { code: '04', name: '已填充牙无龋' },
      { code: '05', name: '龋失牙' },
      { code: '06', name: '因其他原因丧失恒牙' },
      { code: '09', name: '未萌出牙空无龋齿' },
      { code: '30', name: '窝沟封闭完好的牙' },
      { code: '31', name: '窝沟封闭不完好的牙' },
      { code: '99', name: '未检查' }
    ]
  },
  { projectId: 'yy',
    projectName: '牙龈',
    contentList: [
      { code: '0', name: '牙龈正常' },
      { code: '1', name: '轻度炎症，轻微充血水肿，无自发出血' },
      { code: '2', name: '中度炎症，充血水肿光亮，无自发出血' },
      { code: '3', name: '充血水肿溃疡，自发出血' },
      { code: '9', name: '未检查' }
    ]
  },
  { projectId: 'bj',
    projectName: '便检',
    contentList: [
      { code: '0', name: '肠道蠕虫卵阴性' },
      { code: '1', name: '肠道蠕虫卵阳性' }
    ]
  },
  { projectId: 'ppd',
    projectName: 'ppd试验',
    contentList: [
      { code: '0', name: '阴性' },
      { code: '1', name: '弱阳性' },
      { code: '2', name: '阳性' },
      { code: '3', name: '强阳性' }
    ]
  },
  { projectId: 'xl',
    projectName: '心率',
    contentList: []
  }
]
export default projectList
