import Vue from 'vue'
import App from './App'
import router from './router'

import fastClick from 'fastclick'

import store from './store'

 

Vue.config.productionTip = false

// 引入全局图标库
import './assets/iconFont/iconfont.css'
//全局 图标库2

import './assets/iconfont2.css'

import 'font-awesome/css/font-awesome.min.css'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
import moment from 'moment'
import axios from "axios";

import VueHtml5Editor from 'vue-html5-editor'
const options = {
   visibleModules: [
          "text",
          "color",
          "font",
          // "align",
          // "list",
          // "link",
          // "unlink",
          // "tabulation",
          "image",
          "hr",
          "eraser",
          "undo",
          "full-screen",
  ],
      // config image module
      image: {
          // 文件最大体积，单位字节  max file size
          sizeLimit:1024 * 1024 *10,
          // 上传参数,默认把图片转为base64而不上传
          // upload config,default null and convert image to base64
          // upload: {
          //     url: null,
          //     headers: {},
          //     params: {},
          //     fieldName: {}
          // },
          // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
          // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
          // set null to disable compression
          compress: {
              width: 1000,
              height: 1000,
              quality: 80
          },
          // 响应数据处理,最终返回图片链接
          // handle response data，return image url
          // uploadHandler(responseText){
          //     //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
          //     var json = JSON.parse(responseText)
          //     if (!json.ok) {
          //         alert(json.msg)
          //     } else {
          //         return json.data
          //     }
          // }
      },

  language: "zh-cn",
  i18n: {
    "zh-cn": {
      "align": "对齐方式",
      "image": "图片",
      "list": "列表",
      "link": "链接",
      "unlink": "去除链接",
      "table": "表格",
      "font": "文字",
      "full screen": "全屏",
      "text": "排版",
      "eraser": "格式清除",
      "info": "关于",
      "color": "颜色",
      "please enter a url": "请输入地址",
      "create link": "创建链接",
      "bold": "加粗",
      "italic": "倾斜",
      "underline": "下划线",
      "strike through": "删除线",
      "subscript": "上标",
      "superscript": "下标",
      "heading": "标题",
      "font name": "字体",
      "font size": "文字大小",
      "left justify": "左对齐",
      "center justify": "居中",
      "right justify": "右对齐",
      "ordered list": "有序列表",
      "unordered list": "无序列表",
      "fore color": "前景色",
      "background color": "背景色",
      "row count": "行数",
      "column count": "列数",
      "save": "确定",
      "upload": "上传",
      "progress": "进度",
      "unknown": "未知",
      "please wait": "请稍等",
      "error": "错误",
      "abort": "中断",
      "reset": "重置"
    }
  }
}
// Vue.use(VueHtml5Editor, options);




import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);

//定义一个VUE内全局用到的名称（标题）
Vue.prototype.appName = '语过添晴'
//添加路由钩子修改每个页面标题
router.beforeEach((to, from, next) => {
  
  //如果自定义了标题就取标题，否则拿全局标题
  window.document.title = to.meta.title !== undefined ? (to.meta.title + '-' + Vue.prototype.appName) : Vue.prototype
    .appName;
  const uid = localStorage.getItem('uid')
  if (uid) {
    store.commit('setUserId', uid)
  }
  const uname = localStorage.getItem('username')
  if (uname) {
    store.commit('setUserName', uname)
  }
  next();
})
// 这是外网的域名
Vue.prototype.host = 'http://www.ygtqzhang.cn/'
// 这是外网的ip
//Vue.prototype.host = 'http://106.52.78.128:80/'
// 这是内网的IP
//Vue.prototype.host = 'http://172.16.0.14:80/'
// 这是内网
//Vue.prototype.host = 'http://127.0.0.1:80/'
//Vue.prototype.host = 'http://ygtqzh.natapp1.cc:8852/'
Vue.prototype.dateFormat = function(fmt,y) {
  const d = new Date();
  const year = d.getFullYear();
  const month = change(d.getMonth() + 1);
  const day = change(d.getDate());
  const hour = change(d.getHours());
  const minute = d.getMinutes();
  const second = change(d.getSeconds());

  function change(t) {
    if (t < 10) {
      return "0" + t;
    } else {
      return t;
    }
  }
  if(y === true){
    return year + '-' + month + '-' + day
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}


Vue.prototype.get = function(url, obj, fun) {
  const self = this
  if (typeof obj == 'object') {
    axios.get(this.host + url, {
        params: obj
      })
      .then(function(response) {
        if (response.data && response.data.errCode == 201) {
          localStorage.removeItem('uid')
          self.$router.push("/");
          return
        }
        fun(response.data)
      })
      .catch(function(response) {
        if(response == undefined){
          alert('网络或请求接口错误')
          return
        }
        if (response.data && response.data.errCode == 201) {
          localStorage.removeItem('uid')
          self.$router.push("/");
          return
        }
        fun(response.data)
      })
  } else {
    axios.get(this.host + url + '/' + obj, null)
      .then(function(response) {

        if (response.data && response.data.errCode == 201) {
          localStorage.removeItem('uid')
          self.$router.push("/");
          return
        }
        fun(response.data)
      })
      .catch(function(response) {
        if(response == undefined){
          alert('网络或请求接口错误')
          return
        }
        if (response.data && response.data.errCode == 201) {
          localStorage.removeItem('uid')
          self.$router.push("/");
          return
        }
        fun(response.data)
      })
  }

}
Vue.prototype.post = function(url, obj, fun) {
  const self = this
  axios.post(this.host + url, obj)
    .then(function(response) {
      if (response.status == 400) {
        alert('请求失败')
        return
      }
      if (response.data && response.data.errCode == 201) {
        localStorage.removeItem('uid')
        self.$router.push("/");
        return
      }
      fun(response.data)

    })
    .catch(function(response) {
      if(response == undefined){
        alert('网络或请求接口错误')
        return
      }

      if (response.status == 400) {
        alert('请求失败')
        return
      }
      if (response.data && response.data.errCode == 201) {
        localStorage.removeItem('uid')
        self.$router.push("/");
        return
      }
      fun(response.data)
    })
}

// 注册全局组件
import components from './components/index'
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})
Vue.filter('totime', function (date) {

  if(date){
    const dateTimeStamp = Date.parse(date);
              let minute = 1000 * 60;
              let hour = minute * 60;
              let day = hour * 24;
              let halfamonth = day * 15;
              let month = day * 30;
              let now = new Date().getTime();
              let diffValue = now - dateTimeStamp;
              if (diffValue < 0) {
                  //若日期不符则弹窗口告之,结束日期不能小于开始日期！
              }
              let monthC = diffValue / month;
              let weekC = diffValue / (7 * day);
              let dayC = diffValue / day;
              let hourC = diffValue / hour;
              let minC = diffValue / minute;
              var result = ''
              if (monthC >= 1) {
                  result = parseInt(monthC) + "个月前";
              }
              else if (weekC >= 1) {
                  result = parseInt(weekC) + "周前";
              }
              else if (dayC >= 1) {
                  result = parseInt(dayC) + "天前";
              }
              else if (hourC >= 1) {
                  result = parseInt(hourC) + "个小时前";
              }
              else if (minC >= 1) {
                  result = parseInt(minC) + "分钟前";
              } else{

                  result = "刚刚";
              }
              return result;

  }
});

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})
Vue.filter('datemm', function(dataStr) {
    return moment(dataStr).get('month')+1
})
Vue.filter('datedd', function(dataStr,pattern = 'D') {
    return moment(dataStr).format(pattern)
})

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app');
// fastClick.attach(document.body)
