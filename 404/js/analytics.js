// 站点分析脚本（谷歌分析、百度统计）

"use strict";
const host = window.location.host;
const id_google_analytics = "UA-135294383-1";
const id_baidu_tongji = "84c09b30349a65573c5c642ff336969b";

function insertScript(src, async) {
  var hm = document.createElement("script");
  hm.src = src;
  if (!async) {
    hm.async = false;
  } else {
    hm.async = true;
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
}

// Google Analytics
function googleAnalytics() {
  insertScript("https://www.googletagmanager.com/gtag/js?id=" + id_google_analytics, true);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  if (host.indexOf("127.0.0.1") == -1 && host.indexOf("localhost") == -1) {
    gtag('js', new Date());
    gtag('config', id_google_analytics);
  }
}

// BaiDu TongJi
function baiduTongJi() {
  var _hmt = _hmt || [];
  if (host.indexOf("127.0.0.1") == -1 && host.indexOf("localhost") == -1) {
    insertScript("https://hm.baidu.com/hm.js?" + id_baidu_tongji);
  }
}

(function() {
  googleAnalytics();
  baiduTongJi();
})();
