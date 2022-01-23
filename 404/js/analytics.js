<div id="readmore-container">// 站点分析脚本（谷歌分析、百度统计）

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
</div>

			<script src="https://qiniu.techgrow.cn/js/readmore.js" type="text/javascript"></script>
			<script>
			var isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
			if (!isMobile) {
				try {
					var btw = new BTWPlugin();
					btw.init({
						"id": "readmore-container",
						"blogId": "16903-1366036532869-542",
						"name": "全栈技术驿站",
						"qrcode": "https://www.techgrow.cn/img/wx_mp_qr.png",
						"keyword": "tech",
						"random": "0.8"
					});
				} catch(e) {
					console.warn(e.name + " : " + e.message);
				}
			}
			</script>
		