// 初始化NProgress进度条

"use strict";
const page_progress = true;

$(function() {
  if (page_progress) {
    NProgress.start();
    $(window).on('load', function() {
      NProgress.done();
    });
  }
});