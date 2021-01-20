import request from '@/utils/request'

//登录接口
export function login(token) {
    return request({
        url: `/auth/${token}`,
        method: 'get'
    })
}
//获取cxxx列表
export function getCxxxData() {
    return request({
        url: '/common/cxxx',
        method: 'get',
    })
}
//保存车型信息
export function saveCxxxData(data) {
    return request({
        url: '/common/cxxx/save',
        method: 'post',
        data
    })
}
//导入车型信息
export function importCxxx(id,year) {
    return request({
        url: `/common/cxxx/excel/import/${id}/${year}`,
        method: 'get',
    })
}
//获取ztgh列表
export function getZtghData() {
    return request({
        url: '/common/ztgh',
        method: 'get',
    })
}
//导入车型信息
export function importZtgh(id) {
    return request({
        url: `/common/ztgh/excel/import/${id}`,
        method: 'get',
    })
}
//保存ztgh数据
export function saveZtghData(data) {
    return request({
        url: '/common/ztgh/save',
        method: 'post',
        data
    })
}
//提升方案名称查询
export function getMxysName() {
    return request({
        url: '/common/mxys',
        method: 'get',
    })
}
//根据年份带出规划信息
export function getYearCxxx(year) {
    return request({
        url: `/common/cxxx/cxlist/${year}`,
        method: 'get'
    })
}
//根据方案名查询详情
export function getMxysDetail(name) {
    return request({
        url: `/common/mxys/find/${name}`,
        method: 'get',
    })
}
//油耗结果计算
export function getYHCalculate(name){
    return request({
        url: `/common/mxys/calculateYH/${name}`,
        method: 'get',
    })
}
//根据提升方案名称结算
export function calculate(name) {
    return request({
        url: `/common/mxys/calculate/${name}`,
        method: 'get',
    })
}
//查询所有车型编号 车型名称和总成
export function getCxlist() {
    return request({
        url: `/common/cxxx/cxlist`,
        method: 'get'
    })
}
//删除方案
export function deleteMxys(name) {
    return request({
        url: `/common/mxys/delete/${name}`,
        method: 'delete',
    })
}
//保存方案
export function saveMxysData(data) {
    return request({
        url: '/common/mxys/save',
        method: 'post',
        data
    })
}
//查询结果列表
export function getResultList() {
    return request({
        url: 'common/result',
        method: 'get'
    })
}

//根据方案名，查询结果
export function getResult(name) {
    return request({
        url: `/common/result/${name}`,
        method: 'get'
    })
}
// 政策风险最小方案选择
export function getCafcMin() {
    return request({
        url: `/common/result/cafcMin`,
        method: 'get'
    })
}
//合规成本最低方案选择
export function getCostMin() {
    return request({
        url: `/common/result/costMin`,
        method: 'get'
    })
}
//自定义方案选择
export function getSelect(data){
    return request({
        url: `/common/result/select`,
        method: 'post',
        data
    })
}
//删除历史记录
export function deleteResult(data){
    return request({
        url:`/common/result/delete`,
        method: 'delete',
        data
    })
}