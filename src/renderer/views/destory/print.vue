/*
 * @Author: dachuant 
 * @Date: 2019-01-14 13:36:21 
 * @Last Modified by: chensi
 * @Last Modified time: 2019-05-19 17:56:38
 */
<template>
    <div>
        
        <div class="hidden t">
            <div data-label="销户申请书" class="a4-page">
                <div class="header">
                    <div class="header-left"> <img :src="logo" alt="logo"></div><div class="header-center">撤销单位银行结算账户申请书</div><div class="header-right">编号：</div>
                </div>
                <table align="center">
                    <tbody>
                    <tr>
                        <td align="center" valign="top" rowspan="1" colspan="1">
                            账户名称
                        </td>
                        <td valign="top" rowspan="1" colspan="5"><input type="text" class="input" v-model="accountName"/></td>

                        <td valign="middle" class="td2" align="center" rowspan="12" colspan="5">
                          <div class="two">第 一 联&nbsp;&nbsp;开 户 银 行 留 存</div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" rowspan="1" colspan="1">
                            开户银行名称
                        </td>
                        <td valign="top" rowspan="1" colspan="5"><input type="text" class="input" v-model="bankName"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" rowspan="1" colspan="1">
                            开户银行代码
                        </td>
                        <td valign="top" rowspan="1" colspan="2"><input type="text" class="input" v-model="bankCode"/></td>

                        <td align="center" rowspan="1" valign="top">
                            账号
                        </td>
                        <td valign="top" colspan="2" rowspan="1"><input type="text" class="input" v-model="accountNumber"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            账户性质
                        </td>
                        <td valign="top" colspan="5" rowspan="1">
                            &nbsp; &nbsp; &nbsp;基本（<span>{{custActType1}}</span>）&nbsp; &nbsp; &nbsp; 一般（<span>{{custActType2}}</span>）&nbsp; &nbsp; &nbsp;专用（<span>{{custActType3}}</span>）&nbsp; &nbsp; 临时（<span>{{custActType4}}</span>）&nbsp; &nbsp; 个人（<span>{{custActType5}}</span>）
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            开户许可证核准号
                        </td>
                        <td valign="top" colspan="5" rowspan="1"><input type="text" class="input" v-model="licenseNumber"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            销户原因
                        </td>
                        <td valign="top" colspan="5" rowspan="1"><input type="text" class="input" v-model="cancelType1"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="center" colspan="1" rowspan="1">
                            <p>
                                有(否)未用重要空白凭证
                            </p>
                        </td>
                        <td valign="top" colspan="5" rowspan="1">
                            <div>
                                （<span>{{importType1}}</span>）无&nbsp;
                            </div>
                            <div>
                                （<span>{{importType2}}</span>）有，相关凭证号码详见另附清单。&nbsp;
                            </div>
                            <div>
                                （<span>{{importType3}}</span>）有，相关凭证号码详见另附清单，但凭证实物已遗失（销毁），由此引起的一切经 济纠纷及责任由我公司承担。&nbsp;
                            </div>
                            <div>
                                （<span>{{importType4}}</span>）有，但实物凭证已遗失（销毁），且无法提供相关凭证号码，由此引起的一切经济 纠纷及责任由我公司承担。
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="center" colspan="1" rowspan="2">
                            ★财务核对
                        </td>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            ★账户余额
                        </td>
                        <td valign="top" colspan="2" rowspan="1"></td>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            ★利息
                        </td>
                        <td valign="top" colspan="1" rowspan="1"></td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="5" rowspan="1">
                            <div>
                                ★账已对清，不存在未达账项。是（&nbsp; ）否（&nbsp; ）&nbsp;
                            </div>
                            <div>
                                单位经办人 :
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top"  colspan="1" rowspan="1">
                            本息汇入行
                        </td>
                        <td rowspan="1" valign="top" colspan="2"></td>
                        <td align="center" rowspan="1" valign="top">
                            汇入账号
                        </td>
                        <td valign="top" colspan="2" rowspan="1"></td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="3" rowspan="1">
                            <p style="width:500px">
                                &nbsp; &nbsp; 兹授权本单位&nbsp;<span class="bottomLine">{{cusName}}</span>&nbsp;前往银行办理撤销上述 银行账户销户手续，其个人身份证件种类为&nbsp;<span class="bottomLine">{{authPersonIdcardType1}}</span>&nbsp;证件号码为&nbsp;<span class="bottomLine">{{cusId}}</span>&nbsp;证件到期日为&nbsp;<span class="bottomLine">{{cusIdDate}}</span>&nbsp;联系电话&nbsp;<span class="bottomLine">{{telNo}}</span>。
                            </p>
                            <p>
                                法定代表人/单位负责人（签章）:&nbsp;
                            </p>
                            <p  style="width:500px;font-size:15px;">
                                <em>(如法定代表人/单位负责人亲往银行办理销户手续，则无需填写此栏)</em>
                            </p>
                        </td>
                        <td valign="top" colspan="3" rowspan="1">
                            <p>
                                &nbsp; &nbsp; 本存款人申请撤销上述银行账户，承诺所提供的证 明文件真实、有效。&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </p>
                            <p>
                                <br/>
                            </p>
                            <p>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;存款人（公章） :&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </p>
                            <p>
                                &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span>{{year}}</span> 年<span>{{month}}</span> 月<span>{{today}}</span> 日
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="3" rowspan="1">
                            <div>
                                开户银行审核意见 :
                            </div>
                            <div>
                                负责人（签章） :
                            </div>
                            <div>
                                复核人（签章） :
                            </div>
                            <div>
                                经办人（签章） :&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </div>
                            <p></p>
                            <div>
                                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;开户银行（签章） :
                            </div>
                            <div>
                                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;<span>{{year}}</span> 年<span>{{month}}</span> 月<span>{{today}}</span> 日
                            </div>
                        </td>
                        <td valign="top" colspan="3" rowspan="1">
                            <p>
                                人民银行审核意见 :
                            </p>
                            <p>
                                经办（签章） :
                            </p>
                            <p>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 人民银行（公章） :&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </p>
                            <p>
                                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; <span>{{year}}</span> 年<span>{{month}}</span> 月<span>{{today}}</span> 日
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p>填表说明：</p>
                <ol>
                    <li>带括号的选项请填“ √ ”。</li>
                    <li>带“ ★ ”号的可在与开户银行核对账务后填写,并由存款人签字确认</li>
                    <li>本申请书一式三联，第一联开户银行留存，第二联开户单位留存，第三联中国人民银行当地分支行留存。</li>
                </ol>
            </div>
        </div>

        <div class="hidden t">
            <div data-label="销户申请书" class="a4-page">
                <div class="header">
                    <div class="header-left"> <img :src="logo" alt="logo"></div><div class="header-center">撤销单位银行结算账户申请书</div><div class="header-right">编号：</div>
                </div>
                <table align="center">
                    <tbody>
                    <tr>
                        <td align="center" valign="top" rowspan="1" colspan="1">
                            账户名称
                        </td>
                        <td valign="top" rowspan="1" colspan="5"><input type="text" class="input" v-model="accountName"/></td>

                        <td valign="middle" class="td2" rowspan="12" colspan="5">
                          <div class="two">第 二 联&nbsp;&nbsp;开 户 单 位 留 存</div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" rowspan="1" colspan="1">
                            开户银行名称
                        </td>
                        <td valign="top" rowspan="1" colspan="5"><input type="text" class="input" v-model="bankName"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" rowspan="1" colspan="1">
                            开户银行代码
                        </td>
                        <td valign="top" rowspan="1" colspan="2"><input type="text" class="input" v-model="bankCode"/></td>
                        <td align="center" rowspan="1" valign="top">
                            账号
                        </td>
                        <td valign="top" colspan="2" rowspan="1"><input type="text" class="input" v-model="accountNumber"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            账户性质
                        </td>
                        <td valign="top" colspan="5" rowspan="1">
                            &nbsp; &nbsp; &nbsp;基本（<span>{{custActType1}}</span>）&nbsp; &nbsp; &nbsp; 一般（<span>{{custActType2}}</span>）&nbsp; &nbsp; &nbsp;专用（<span>{{custActType3}}</span>）&nbsp; &nbsp; 临时（<span>{{custActType4}}</span>）&nbsp; &nbsp; 个人（<span>{{custActType5}}</span>）
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            开户许可证核准号
                        </td>
                        <td valign="top" colspan="5" rowspan="1"><input type="text" class="input" v-model="licenseNumber"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            销户原因
                        </td>
                        <td valign="top" colspan="5" rowspan="1"><input type="text" class="input" v-model="cancelType1"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="center" colspan="1" rowspan="1">
                            <p>
                                有(否)未用重要空白凭证
                            </p>
                        </td>
                        <td valign="top" colspan="5" rowspan="1">
                            <div>
                                （<span>{{importType1}}</span>）无&nbsp;
                            </div>
                            <div>
                                （<span>{{importType2}}</span>）有，相关凭证号码详见另附清单。&nbsp;
                            </div>
                            <div>
                                （<span>{{importType3}}</span>）有，相关凭证号码详见另附清单，但凭证实物已遗失（销毁），由此引起的一切经 济纠纷及责任由我公司承担。&nbsp;
                            </div>
                            <div>
                                （<span>{{importType4}}</span>）有，但实物凭证已遗失（销毁），且无法提供相关凭证号码，由此引起的一切经济 纠纷及责任由我公司承担。
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="center" colspan="1" rowspan="2">
                            ★财务核对
                        </td>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            ★账户余额
                        </td>
                        <td valign="top" colspan="2" rowspan="1"></td>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            ★利息
                        </td>
                        <td valign="top" colspan="1" rowspan="1"></td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="5" rowspan="1">
                            <div>
                                ★账已对清，不存在未达账项。是（&nbsp; ）否（&nbsp; ）&nbsp;
                            </div>
                            <div>
                                单位经办人 :
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top"  colspan="1" rowspan="1">
                            本息汇入行
                        </td>
                        <td rowspan="1" valign="top" colspan="2"></td>
                        <td align="center" rowspan="1" valign="top">
                            汇入账号
                        </td>
                        <td valign="top" colspan="2" rowspan="1"></td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="3" rowspan="1">
                            <p style="width:500px">
                                &nbsp; &nbsp; 兹授权本单位&nbsp;<span class="bottomLine">{{cusName}}</span>&nbsp;前往银行办理撤销上述 银行账户销户手续，其个人身份证件种类为&nbsp;<span class="bottomLine">{{authPersonIdcardType1}}</span>&nbsp;证件号码为&nbsp;<span class="bottomLine">{{cusId}}</span>&nbsp;证件到期日为&nbsp;<span class="bottomLine">{{cusIdDate}}</span>&nbsp;联系电话&nbsp;<span class="bottomLine">{{telNo}}</span>。
                            </p>
                            <p>
                                法定代表人/单位负责人（签章）:&nbsp;
                            </p>
                            <p  style="width:500px;font-size:15px;">
                                <em>(如法定代表人/单位负责人亲往银行办理销户手续，则无需填写此栏)</em>
                            </p>
                        </td>
                        <td valign="top" colspan="3" rowspan="1">
                            <p>
                                &nbsp; &nbsp; 本存款人申请撤销上述银行账户，承诺所提供的证 明文件真实、有效。&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </p>
                            <p>
                                <br/>
                            </p>
                            <p>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;存款人（公章） :&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </p>
                            <p>
                                &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span>{{year}}</span> 年<span>{{month}}</span> 月<span>{{today}}</span> 日
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="3" rowspan="1">
                            <div>
                                开户银行审核意见 :
                            </div>
                            <div>
                                负责人（签章） :
                            </div>
                            <div>
                                复核人（签章） :
                            </div>
                            <div>
                                经办人（签章） :&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </div>
                            <p></p>
                            <div>
                                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;开户银行（签章） :
                            </div>
                            <div>
                                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;<span>{{year}}</span> 年<span>{{month}}</span> 月<span>{{today}}</span> 日
                            </div>
                        </td>
                        <td valign="top" colspan="3" rowspan="1">
                            <p>
                                人民银行审核意见 :
                            </p>
                            <p>
                                经办（签章） :
                            </p>
                            <p>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 人民银行（公章） :&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </p>
                            <p>
                                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; <span>{{year}}</span> 年<span>{{month}}</span> 月<span>{{today}}</span> 日
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p>填表说明：</p>
                <ol>
                    <li>带括号的选项请填“ √ ”。</li>
                    <li>带“ ★ ”号的可在与开户银行核对账务后填写,并由存款人签字确认</li>
                    <li>本申请书一式三联，第一联开户银行留存，第二联开户单位留存，第三联中国人民银行当地分支行留存。</li>
                </ol>
            </div>
        </div>

        <div class="hidden t">
            <div data-label="销户申请书" class="a4-page">
                <div class="header">
                    <div class="header-left"> <img :src="logo" alt="logo"></div><div class="header-center">撤销单位银行结算账户申请书3</div><div class="header-right">编号：</div>
                </div>
                <table align="center">
                    <tbody>
                    <tr>
                        <td align="center" valign="top" rowspan="1" colspan="1">
                            账户名称
                        </td>
                        <td valign="top" rowspan="1" colspan="5"><input type="text" class="input" v-model="accountName"/></td>
                        
                        <td valign="middle" class="td2" rowspan="12" colspan="5">
                          <div class="two">第 三 联&nbsp;&nbsp;中 国 人 民 银 行 当 地 分 支 行 留 存</div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" rowspan="1" colspan="1">
                            开户银行名称
                        </td>
                        <td valign="top" rowspan="1" colspan="5"><input type="text" class="input" v-model="bankName"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" rowspan="1" colspan="1">
                            开户银行代码
                        </td>
                        <td valign="top" rowspan="1" colspan="2"><input type="text" class="input" v-model="bankCode"/></td>
                        <td align="center" rowspan="1" valign="top">
                            账号
                        </td>
                        <td valign="top" colspan="2" rowspan="1"><input type="text" class="input" v-model="accountNumber"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            账户性质
                        </td>
                        <td valign="top" colspan="5" rowspan="1">
                            &nbsp; &nbsp; &nbsp;基本（<span>{{custActType1}}</span>）&nbsp; &nbsp; &nbsp; 一般（<span>{{custActType2}}</span>）&nbsp; &nbsp; &nbsp;专用（<span>{{custActType3}}</span>）&nbsp; &nbsp; 临时（<span>{{custActType4}}</span>）&nbsp; &nbsp; 个人（<span>{{custActType5}}</span>）
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            开户许可证核准号
                        </td>
                        <td valign="top" colspan="5" rowspan="1"><input type="text" class="input" v-model="licenseNumber"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            销户原因
                        </td>
                        <td valign="top" colspan="5" rowspan="1"><input type="text" class="input" v-model="cancelType1"/></td>
                    </tr>
                    <tr>
                        <td align="center" valign="center" colspan="1" rowspan="1">
                            <p>
                                有(否)未用重要空白凭证
                            </p>
                        </td>
                        <td valign="top" colspan="5" rowspan="1">
                            <div>
                                （<span>{{importType1}}</span>）无&nbsp;
                            </div>
                            <div>
                                （<span>{{importType2}}</span>）有，相关凭证号码详见另附清单。&nbsp;
                            </div>
                            <div>
                                （<span>{{importType3}}</span>）有，相关凭证号码详见另附清单，但凭证实物已遗失（销毁），由此引起的一切经 济纠纷及责任由我公司承担。&nbsp;
                            </div>
                            <div>
                                （<span>{{importType4}}</span>）有，但实物凭证已遗失（销毁），且无法提供相关凭证号码，由此引起的一切经济 纠纷及责任由我公司承担。
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="center" colspan="1" rowspan="2">
                            ★财务核对
                        </td>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            ★账户余额
                        </td>
                        <td valign="top" colspan="2" rowspan="1"></td>
                        <td align="center" valign="top" colspan="1" rowspan="1">
                            ★利息
                        </td>
                        <td valign="top" colspan="1" rowspan="1"></td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="5" rowspan="1">
                            <div>
                                ★账已对清，不存在未达账项。是（&nbsp; ）否（&nbsp; ）&nbsp;
                            </div>
                            <div>
                                单位经办人 :
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top"  colspan="1" rowspan="1">
                            本息汇入行
                        </td>
                        <td rowspan="1" valign="top" colspan="2"></td>
                        <td align="center" rowspan="1" valign="top">
                            汇入账号
                        </td>
                        <td valign="top" colspan="2" rowspan="1"></td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="3" rowspan="1">
                            <p style="width:500px">
                                &nbsp; &nbsp; 兹授权本单位&nbsp;<span class="bottomLine">{{cusName}}</span>&nbsp;前往银行办理撤销上述 银行账户销户手续，其个人身份证件种类为&nbsp;<span class="bottomLine">{{authPersonIdcardType1}}</span>&nbsp;证件号码为&nbsp;<span class="bottomLine">{{cusId}}</span>&nbsp;证件到期日为&nbsp;<span class="bottomLine">{{cusIdDate}}</span>&nbsp;联系电话&nbsp;<span class="bottomLine">{{telNo}}</span>。
                            </p>
                            <p>
                                法定代表人/单位负责人（签章）:&nbsp;
                            </p>
                            <p  style="width:500px;font-size:15px;">
                                <em>(如法定代表人/单位负责人亲往银行办理销户手续，则无需填写此栏)</em>
                            </p>
                        </td>
                        <td valign="top" colspan="3" rowspan="1">
                            <p>
                                &nbsp; &nbsp; 本存款人申请撤销上述银行账户，承诺所提供的证 明文件真实、有效。&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </p>
                            <p>
                                <br/>
                            </p>
                            <p>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;存款人（公章） :&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </p>
                            <p>
                                &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span>{{year}}</span> 年<span>{{month}}</span> 月<span>{{today}}</span> 日
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="3" rowspan="1">
                            <div>
                                开户银行审核意见 :
                            </div>
                            <div>
                                负责人（签章） :
                            </div>
                            <div>
                                复核人（签章） :
                            </div>
                            <div>
                                经办人（签章） :&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </div>
                            <p></p>
                            <div>
                                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;开户银行（签章） :
                            </div>
                            <div>
                                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;<span>{{year}}</span> 年<span>{{month}}</span> 月<span>{{today}}</span> 日
                            </div>
                        </td>
                        <td valign="top" colspan="3" rowspan="1">
                            <p>
                                人民银行审核意见 :
                            </p>
                            <p>
                                经办（签章） :
                            </p>
                            <p>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 人民银行（公章） :&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                            </p>
                            <p>
                                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; <span>{{year}}</span> 年<span>{{month}}</span> 月<span>{{today}}</span> 日
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p>填表说明：</p>
                <ol>
                    <li>带括号的选项请填“ √ ”。</li>
                    <li>带“ ★ ”号的可在与开户银行核对账务后填写,并由存款人签字确认</li>
                    <li>本申请书一式三联，第一联开户银行留存，第二联开户单位留存，第三联中国人民银行当地分支行留存。</li>
                </ol>
            </div>
            <div data-label="法人身份证" class="a4-page">
                <h1>法人身份证</h1>
                <img :src="authImg">
            </div>
            <div data-label="经办人身份证" class="a4-page">
                <h1>经办人身份证</h1>
                <img :src="cusImg">
            </div>
        </div>

    </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import logo from '@/assets/img/logo/boc.png'
import { getPrinitResult } from '@/api/destory'
export default {
  data() {
    return {
      logo: logo,
      busApplyNum: '',
      accountName: '',
      bankName: '',
      bankCode: '',
      accountNumber: '',
      custActType1: '',
      custActType2: '',
      custActType3: '',
      custActType4: '',
      custActType5: '',
      licenseNumber: '',
      importType1: '√',
      importType2: '',
      importType3: '',
      importType4: '',
      cusName: '',
      authPersonIdcardType1: '',
      cusId: '',
      cusIdDate: '',
      telNo: '',
      cancelType1: '',
      seperator1: '',
      year: '',
      month: '',
      today: '',
      authImg: '',
      cusImg: ''
    }
  },
  created() {
    // 接收路由参数
    this.busApplyNum = this.$route.params.id
    console.log(this.$route.params)
    // console.log(this.busApplyNum)
    this.date()
    this.result(this.busApplyNum)
  },
  mounted() {
    setTimeout(() => {
      ipcRenderer.send('destoryPrint')
    }, 500)

    const els = document.querySelectorAll('.hidden .a4-page')
    const destoryList = localStorage.getItem('destoryList')
    if (destoryList) {
      const destoryListArr = JSON.parse(destoryList)
      for (var item of destoryListArr) {
        for (var el of els) {
          if (el.getAttribute('data-label') === item.name) {
            this.$refs.print.appendChild(el)
            break
          }
        }
      }
    }
  },
  methods: {
    date: function() {
      const date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.today = date.getDate()
    },
    result: function(busApplyNum) {
      getPrinitResult(busApplyNum).then((r) => {
        if (r.code === 0) {
          this.accountName = r.destroyAccount.accountName
          this.bankName = r.destroyAccount.bankName
          this.bankCode = r.destroyAccount.bankCode
          this.accountNumber = r.destroyAccount.accountNumber
          this.licenseNumber = r.destroyAccount.licenseNumber
          this.cusName = r.destroyAccount.cusName
          this.cusId = r.destroyAccount.cusId
          this.cusIdDate = r.destroyAccount.cusIdDate
          this.telNo = r.destroyAccount.telNo
          this.custActType(r.destroyAccount.custActType1)
          this.cancelType1 = this.cancelType(r.destroyAccount.cancelType)
          this.authPersonIdcardType1 = this.idcard(r.destroyAccount.authPersonIdcardType1)
        } else {
        //   alert(1)
        }
      })
    },
    custActType: function(value) {
      if (value === '1') {
        this.custActType1 = '√'
      }
      if (value === '2') {
        this.custActType2 = '√'
      }
      if (value === '3') {
        this.custActType3 = '√'
      }
      if (value === '4') {
        this.custActType4 = '√'
      }
      if (value === '5') {
        this.custActType5 = '√'
      }
    },
    cancelType: function(value) {
      switch (value) {
        case '1' :
          return '转户'
        case '2' :
          return '撤并'
        case '3' :
          return '解散'
        case '4' :
          return '宣告破产'
        case '5' :
          return '关闭'
        case '6' :
          return '被吊销营业执照或执业许可证'
        case '7' :
          return '其他'
        default:
          return '转户'
      }
    },
    idcard: function(value) {
      switch (value) {
        case '01' :
          return '居民身份证'
        case '02' :
          return '临时身份证'
        case '03' :
          return '护照'
        case '04' :
          return '户口簿'
        case '05' :
          return '军人身份证'
        case '06' :
          return '武装警察身份证'
        case '07' :
          return '外交人员身份证'
        case '09' :
          return '外国人居留许可证'
        case '10' :
          return '边民出入境通行证'
        case '11' :
          return '其它'
        case '47' :
          return '港澳居民来往内地通行证（香港）'
        case '48' :
          return '港澳居民来往内地通行证（澳门）'
        case '49' :
          return '台湾居民来往大陆通行证'
        default:
          return '居民身份证'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .bottomLine{
        text-decoration:underline
    }
    .t{
      margin-left: 500px
    }
    .td2 {
        width: 40px;
        border-right-style: hidden;
        border-top-style: hidden;
        border-bottom-style: hidden;
    }
    .two {  
        width: 15px;  
        margin: 0 auto;  
        line-height: 24px;  
        font-size: 20px;  
        word-wrap: break-word;
        margin-top: 250px;
        margin-left: 7px;
    } 
    .a4-page {
        width: 1000px;
        height: 1450px;
    }
    table,table tr th, table tr td {
        border:1px solid #000000; 
    }
    table tr td {
        padding-left: 15px;
        min-width: 165px;
        font-size: 22px;
    }
    table { 
        width: 1000px; 
        min-height: 30px; 
        line-height: 35px; 
        text-align: left; 
        border-collapse: collapse;
    }
    .header {
        margin: 15px 0;
        .header-left {
            display: inline-block;
            width: 200px;
            img{
                width: 230px;
            }
        }
        .header-center {
            display: inline-block;
            text-align: center;
            width: 600px;
            font-size: 28px;
        }
        .header-right {
            display: inline-block;
            width: 200px;
        }
        .input, .input:focus {
            outline: none;
            padding-left: 5px;
            width: 100%;
            border: 0px;
            font-size: 18px;
            color: #000000;
            font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
        }
    }
</style>