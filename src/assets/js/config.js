/**
 * 配置全局信息或其他
 */

function domain() {
  var domain;
  var profile = process.env.NODE_ENV;

  switch (profile) {
    case 'production': // 生产环境配置
      domain = {
        'mainUrl': 'http://www.product.com',
        'chatUrl': 'http://192.168.0.113:8090'
      }
      break;
    default: // 开发环境配置
      domain = {
        'mainUrl': 'http://192.168.0.113/api',
        'chatUrl': 'http://192.168.0.113:8090'
      }
      break;
  }
  return domain
}

export default {
  domain: domain()
}
