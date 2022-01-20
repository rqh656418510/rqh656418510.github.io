<div id="vip-container">// 初始化NProgress进度条

"use strict";
const page_progress = true;

$(function() {
  if (page_progress) {
    NProgress.start();
    $(window).on('load', function() {
      NProgress.done();
    });
  }
});</div>

			<script src="https://qiniu.techgrow.cn/js/readmore.js" type="text/javascript"></script>
			<script>
			var isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
			if (!isMobile) {
				try {
					var btw = new BTWPlugin();
					btw.init({
						"id": "vip-container",
						"blogId": "16903-1366036532869-542",
						"name": "全栈技术驿站",
						"qrcode": "https://www.techgrow.cn/img/wx_mp_qr.png",
						"keyword": "vip",
						"visualHeight": "1317.5px"
					});
				} catch(e) {
					console.warn(e.name + " : " + e.message);
				}
			}
			</script>
		