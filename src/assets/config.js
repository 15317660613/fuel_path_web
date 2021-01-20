const URL = "/auto-appstore/fuel-path/api/"; //基本请求配置
export default {
  /** 路由转发 **/
  API_CONFIG:process.env.NODE_ENV==='development' ? '/auto-appstore/fuel-path/api' : URL,
  /** webSocket配置 **/
}