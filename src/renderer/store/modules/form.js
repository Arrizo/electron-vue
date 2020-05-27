
const state = {
  subForm: {
    // 中间变量
    tel1: '',
    tel: '',
    term: '',
    // 身份证图片路径
    imagePath: '',
    // 营业执照图片路径
    businessImgPath: '',
    // 上级信息
    parent: {
      type: '1',
      // 法人或单位名称
      corporationUnitName: '',
      // 组织机构代码
      organizationCode: '',
      // 基本账户开户许可证核准号
      licenseNumber: '',
      legalOrContactPerson: '',
      superCardType: '1',
      superName: '',
      superCardNumber: '',
      superCardTermDate: ''
    },
    idCardPerson: [
    ],
    // 企业信息
    enter: {
      // 文件类型 '14'三证合一 '01'营业执照
      docType: '01',
      // 商业旺季
      busySeason: [],
      // 是否已上市
      listedCompany: '0',
      // 统一社会信用代码
      creditCode: '',
      // 企业名称
      enterpriseName: '',
      // 登记状态
      registrationStatus: '',
      // 公司成立日期
      establishmentDate: '',
      // 注册资本
      registeredCapital: '',
      // 登记机关
      registrationAuthority: '',
      // 核准日期
      approvalDate: '',
      // 从业人数
      engagedNumber: '',
      // 年销售额
      annualSales: '',
      // 法定代表人
      legalPersonName: '',
      // 邮政编码
      postCode: '',
      // 企业类型
      enterpriseType: '',
      // 营业期限开始日期
      businessStartDate: '',
      // 营业期限截止日期
      businessEndDate: '',
      // 通讯地址
      postalAddress: '',
      postalAddressProvince: '',
      postalAddressCity: '',
      postalAddressDetailed: '',
      // 经营范围
      operationScope: '',
      // 企业电话
      enterpriseTel: '',
      enterpriseTelArea: '',
      enterpriseTelDetail: '',
      // 注册地址
      registeredAddress: '',
      registeredAddressProvince: '',
      registeredAddressCity: '',
      registeredAddressDetailed: '',
      // 地区代码
      addressCode: '',
      // 首页：  币种类型
      currencyType: '001',
      // 开户类型 1基本 2一般 3专用
      accountType: 1,
      // 开户许可证号
      licenseNumber: '',
      // 专用账户资金性质
      specialFundProperty: '',
      // 临时账户到期日
      tempAccTermDate: '',
      // 存款人类别
      depositPeopleType: '01',
      // 行业分类
      tradeType: 'A',
      // 办理人身份
      transactorIdentity: '1',
      // 企业网银
      entOnlineBank: '1',
      // 单位结算卡
      debitCard: '1',
      // 公司短信通
      companySms: '1',
      // 电子回单箱
      receiptBox: '1',
      // 电话银行
      telephoneBank: '0',
      // 选择产品 :个人代发工资
      personalPayroll: '0',
      // 选择产品 :支付密码
      payPassword: '0',
      // 理财产品
      financialProducts: '0',
      // 对账方式
      reconciliationWay: '0',
      // 国标1
      nationalGroupType1: '',
      // 国标2
      nationalGroupType2: '',
      // 国标3
      nationalGroupType3: '',
      // 行内行业分类
      insideType: '',
      // 基本户开户行号
      openBranchNo: '',
      // 纳税人类型
      taxpayerType: '',
      // 税收居民身份类型
      checkFlag: '',
      // 机构税务合规分类
      bussClass: '',
      // 实际控制人 身份
      actualController: '',
      // 注册地省份代码
      regProvinceCode: '',
      // 经营地省份代码
      postalProvinceCode: ''
      // // 自选靓号
      // goodNumber: ''
    },
    // 法人信息
    legalStaffInfo: {
      cardType: 1,
      name: '',
      cardNumber: '',
      telephone: '',
      birthday: '',
      country: 'CN',
      cardTermDate: '',
      // 网银对账人（1-是，0-不是）
      reconciliation_contacts: '0',
      // 电子回单箱（1-是，0-不是）
      receiptBox: '0',
      // 对账联系人
      onlineBankReconciliation: '0',
      // 短信接收人
      smsRecipient: '0',
      // 主卡持有人
      cardHolder: '0',
      // 网银经办人/授权人
      onlineBankIdentity: '0',
      // 授权书项目
      authorizationItems: [],
      authorizationOtherContent: '',
      isPartner: '0',
      shareholdings: '',
      personStatus: '1',
      cardAddress: ''
    },
    // 财务负责人信息
    moneyStaffInfo: {
      cardType: 1,
      name: '',
      cardNumber: '',
      telephone: '',
      birthday: '',
      country: 'CN',
      cardTermDate: '',
      // 网银对账人（1-是，0-不是）
      reconciliation_contacts: '0',
      // 电子回单箱（1-是，0-不是）
      receiptBox: '0',
      // 对账联系人
      onlineBankReconciliation: '0',
      // 短信接收人
      smsRecipient: '0',
      // 主卡持有人
      cardHolder: '0',
      // 网银经办人/授权人
      onlineBankIdentity: '0',
      // 授权书项目
      authorizationItems: [],
      authorizationOtherContent: '',
      isPartner: '0',
      shareholdings: '',
      moneyIsEnter: '0',
      personStatus: '2',
      // 中间变量
      items: [],
      personC: '',
      financialSealC: '',
      isDisableA: true,
      isDisableC: true,
      checkResult: '',
      cardAddress: ''
    },
    // 企业联系人信息
    enterStaffInfo: {
      cardType: 1,
      name: '',
      cardNumber: '',
      telephone: '',
      birthday: '',
      country: 'CN',
      cardTermDate: '',
      // 网银对账人（1-是，0-不是）
      reconciliation_contacts: '0',
      // 电子回单箱（1-是，0-不是）
      receiptBox: '0',
      // 对账联系人
      onlineBankReconciliation: '0',
      // 短信接收人
      smsRecipient: '0',
      // 主卡持有人
      cardHolder: '0',
      // 网银经办人/授权人
      onlineBankIdentity: '0',
      // 授权书项目
      authorizationItems: [],
      authorizationOtherContent: '',
      isPartner: '0',
      shareholdings: '',
      personStatus: '3',
      // 中间变量
      items: [],
      personC: '',
      financialSealC: '',
      isDisableA: true,
      isDisableC: true,
      checkResult: '',
      cardAddress: ''
    },
    // 被授权人信息
    authoStaffInfo: {
      cardType: 1,
      name: '',
      cardNumber: '',
      telephone: '',
      birthday: '',
      country: 'CN',
      cardTermDate: '',
      // 网银对账人（1-是，0-不是）
      reconciliation_contacts: '0',
      // 电子回单箱（1-是，0-不是）
      receiptBox: '0',
      // 对账联系人
      onlineBankReconciliation: '0',
      // 短信接收人
      smsRecipient: '0',
      // 主卡持有人
      cardHolder: '0',
      // 网银经办人/授权人
      onlineBankIdentity: '0',
      // 授权书项目
      authorizationItems: [],
      authorizationOtherContent: '',
      isPartner: '0',
      shareholdings: '',
      personStatus: '4',
      // 中间变量
      items: [],
      personC: '',
      financialSealC: '',
      isDisableA: true,
      isDisableC: true,
      checkResult: '',
      cardAddress: ''
    },
    // 被授权人(1)信息
    authoStaffInfo1: {
      cardType: 1,
      name: '',
      cardNumber: '',
      telephone: '',
      birthday: '',
      country: 'CN',
      cardTermDate: '',
      // 网银对账人（1-是，0-不是）
      reconciliation_contacts: '0',
      // 电子回单箱（1-是，0-不是）
      receiptBox: '0',
      // 对账联系人
      onlineBankReconciliation: '0',
      // 短信接收人
      smsRecipient: '0',
      // 主卡持有人
      cardHolder: '0',
      // 网银经办人/授权人
      onlineBankIdentity: '0',
      // 授权书项目
      authorizationItems: [],
      authorizationOtherContent: '',
      isPartner: '0',
      shareholdings: '',
      personStatus: '44',
      // 中间变量
      items: [],
      personC: '',
      financialSealC: '',
      isDisableA: true,
      isDisableC: true,
      checkResult: '',
      cardAddress: ''
    },
    // 股东(1)信息
    shareHolder: {
      cardType: 1,
      name: '',
      cardNumber: '',
      telephone: '',
      birthday: '',
      country: 'CN',
      cardTermDate: '',
      reconciliation_contacts: '0',
      receiptBox: '0',
      onlineBankReconciliation: '0',
      smsRecipient: '0',
      cardHolder: '0',
      onlineBankIdentity: '0',
      isPartner: '1',
      shareholdings: '',
      personStatus: '55',
      isPersonOrEnter: '1'
    },
    // 股东(2)信息
    shareHolder1: {
      cardType: 1,
      name: '',
      cardNumber: '',
      telephone: '',
      birthday: '',
      country: 'CN',
      cardTermDate: '',
      reconciliation_contacts: '0',
      receiptBox: '0',
      onlineBankReconciliation: '0',
      smsRecipient: '0',
      cardHolder: '0',
      onlineBankIdentity: '0',
      isPartner: '1',
      shareholdings: '',
      personStatus: '555',
      isPersonOrEnter: '1'
    },
    // 股东(3)信息
    shareHolder2: {
      cardType: 1,
      name: '',
      cardNumber: '',
      telephone: '',
      birthday: '',
      country: 'CN',
      cardTermDate: '',
      reconciliation_contacts: '0',
      receiptBox: '0',
      onlineBankReconciliation: '0',
      smsRecipient: '0',
      cardHolder: '0',
      onlineBankIdentity: '0',
      isPartner: '1',
      shareholdings: '',
      personStatus: '5555',
      isPersonOrEnter: '1'
    }
  },
  stateProductList: new Array(8).fill(false)
}
var defaultState = JSON.parse(JSON.stringify(state.subForm))
const mutations = {
  SUBMIT_FORM: (state, form) => {
    state.subForm = form
  },
  RESET_FORM: (state, form) => {
    console.log('-=--', defaultState)
    state.subForm = defaultState
    console.log('-=-====-', state.subForm)
  },
  DEFAULT_FORM: (state, form) => {
    state.stateProductList[(form.i)] = form.v
    console.log('-=-====-', state.stateProductList)
  }
}
const actions = {
  ChangeSubForm({ commit }, form) {
    commit('SUBMIT_FORM', form)
  }
}

export default {
  state,
  mutations,
  actions
}
