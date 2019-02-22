import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const qs = require('qs');
Vue.use(VueAxios, axios);

// 跨域请求携带cookie
Vue.axios.defaults.withCredentials = true;

// 请求拦截
Vue.axios.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

// 请求返回值拦截
Vue.axios.interceptors.response.use(
  response => {
    var result = response.data;
    return response;
  },
  error => Promise.reject(error),
);

export default {
  get(url) {
    let promise = new Promise((resolve, reject) => {
      Vue.axios(url).then(response => {
        resolve(response.data);
      }).catch(error => {
        Vue.$vux.toast.text('网络异常，请检查您的网络');
        reject(error);
      });
    });
    return promise;
  },
  post(url, data) {
    let promise = new Promise((resolve, reject) => {
      Vue.axios.post(url, qs.stringify(data), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        Vue.$vux.toast.text('网络异常，请检查您的网络');
        reject(error);
      });
    });
    return promise;
  },
  download(url, data) {
    let promise = new Promise((resolve, reject) => {
      Vue.axios.post(url, qs.stringify(data), {
        responseType: 'blob',
      }).then(response => {
        if (!response || !response.data) return;
        var responseFilename = null;
        try {
          responseFilename = response.headers['content-disposition'].split(
            '=')[1];
        } catch (e) {
        }
        var fileName = responseFilename || data.downloadName || 'download-' +
          new Date().getTime();
        let blob = new Blob([response.data]);
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
        resolve(response.data);
      }).catch(error => {
        Vue.$vux.toast.text('网络异常，请检查您的网络');
        reject(error);
      });
    });
    return promise;
  },
  postMutil(url, data) {
    let promise = new Promise((resolve, reject) => {
      Vue.axios.post(url, data, {
        headers: {'Content-Type': 'multipart/form-data'},
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        this.$vux.confirm.show({
          content: error,
        })
        reject(error);
      });
    });
    return promise;
  },
};
