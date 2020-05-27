export function getCardType(type) {
  switch (type) {
    case 1 :
      return '居民身份证'
    case 2 :
      return '临时身份证'
    case 3 :
      return '护照'
    case 4 :
      return '户口簿'
    case 5 :
      return '军人身份证'
    case 6 :
      return '武装警察身份证'
    case 8 :
      return '外交人员身份证'
    case 9 :
      return '外国人居留许可证'
    case 10 :
      return '边民出入境通行证'
    case 11 :
      return '其它'
    case 47 :
      return '港澳居民来往内地通行证（香港）'
    case 48 :
      return '港澳居民来往内地通行证（澳门）'
    case 49 :
      return '台湾居民来往大陆通行证'
    default:
      return ''
  }
}

export function getDepositorType(depositPeopleType) {
  switch (depositPeopleType) {
    case '01':
      return '企业法人'
    case '02' :
      return '非法人企业'
    case '03' :
      return '机关'
    case '04' :
      return '实行预算管理的事业单位'
    case '05' :
      return '非预算管理的事业单位'
    case '06' :
      return '团级(含)以上军队及分散执勤的支(分)队'
    case '07' :
      return '团级(含)以上武警部队及分散执勤的支(分)队'
    case '08' :
      return '社会团体'
    case '09' :
      return '宗教组织'
    case '10' :
      return '民办非企业组织'
    case '11' :
      return '外地常设机构'
    case '12' :
      return '外国驻华机构'
    case '13' :
      return '有字号的个体工商户'
    case '14' :
      return '无字号的个体工商户'
    case '15' :
      return '居民委员会、村民委员会、社区委员会'
    case '16' :
      return '单位设立的独立核算的附属机构'
    case '17' :
      return '其他组织'
    case '18' :
      return '境外机构'
    default:
      return ''
  }
}

export function getAccountTypeFlag1(accountType) {
  if (accountType === 1) {
    return '√'
  }
}

export function getAccountTypeFlag3(accountType) {
  if (accountType === 2 || accountType === 3) {
    return '√'
  }
}

export function getAccountTypeFlag2(accountType) {
  if (accountType === 4 || accountType === 5) {
    return '√'
  }
}

export function getAccountTypeFlag4(accountType) {
  if (accountType === 7) {
    return '√'
  }
}
