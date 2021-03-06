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
        'chatUrl': 'http://chat.product.com'
      }
      break;
    default: // 开发环境配置
      domain = {
        'mainUrl': 'http://localhost/api',
        'chatUrl': 'http://localhost:3000'
      }
      break;
  }
  return domain
}

export default {
  domain: domain()
}
