/* crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
/*exported CRC32 */

'use strict';
var CRC32;
(function(factory) {
  /*jshint ignore:start */
  if (typeof DO_NOT_EXPORT_CRC === 'undefined') {
    if ('object' === typeof exports) {
      factory(exports);
    } else if ('function' === typeof define &amp;&amp; define.amd) {
      define(function() {
        var module = {};
        factory(module);
        return module;
      });
    } else {
      factory(CRC32 = {});
    }
  } else {
    factory(CRC32 = {});
  }
  /*jshint ignore:end */
}(function(CRC32) {
  CRC32.version = '0.4.1';
  /* see perf/crc32table.js */
  /*global Int32Array */
  function signed_crc_table() {
    var c = 0,
      table = new Array(256);

    for (var n = 0; n != 256; ++n) {
      c = n;
      c = ((c &amp; 1) ? (-306674912 ^ (c &gt;&gt;&gt; 1)) : (c &gt;&gt;&gt; 1));
      c = ((c &amp; 1) ? (-306674912 ^ (c &gt;&gt;&gt; 1)) : (c &gt;&gt;&gt; 1));
      c = ((c &amp; 1) ? (-306674912 ^ (c &gt;&gt;&gt; 1)) : (c &gt;&gt;&gt; 1));
      c = ((c &amp; 1) ? (-306674912 ^ (c &gt;&gt;&gt; 1)) : (c &gt;&gt;&gt; 1));
      c = ((c &amp; 1) ? (-306674912 ^ (c &gt;&gt;&gt; 1)) : (c &gt;&gt;&gt; 1));
      c = ((c &amp; 1) ? (-306674912 ^ (c &gt;&gt;&gt; 1)) : (c &gt;&gt;&gt; 1));
      c = ((c &amp; 1) ? (-306674912 ^ (c &gt;&gt;&gt; 1)) : (c &gt;&gt;&gt; 1));
      c = ((c &amp; 1) ? (-306674912 ^ (c &gt;&gt;&gt; 1)) : (c &gt;&gt;&gt; 1));
      table[n] = c;
    }

    return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
  }

  var T = signed_crc_table();
  /*global Buffer */
  var use_buffer = typeof Buffer !== 'undefined';

  function crc32_bstr(bstr) {
    if (bstr.length &gt; 32768)
      if (use_buffer) return crc32_buf_8(new Buffer(bstr));
    var C = -1,
      L = bstr.length - 1;
    for (var i = 0; i &lt; L;) {
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ bstr.charCodeAt(i++)) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ bstr.charCodeAt(i++)) &amp; 0xFF];
    }
    if (i === L) C = (C &gt;&gt;&gt; 8) ^ T[(C ^ bstr.charCodeAt(i)) &amp; 0xFF];
    return C ^ -1;
  }

  function crc32_buf(buf) {
    if (buf.length &gt; 10000) return crc32_buf_8(buf);
    var C = -1,
      L = buf.length - 3;
    for (var i = 0; i &lt; L;) {
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
    }
    while (i &lt; L + 3) C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
    return C ^ -1;
  }

  function crc32_buf_8(buf) {
    var C = -1,
      L = buf.length - 7;
    for (var i = 0; i &lt; L;) {
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
      C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
    }
    while (i &lt; L + 7) C = (C &gt;&gt;&gt; 8) ^ T[(C ^ buf[i++]) &amp; 0xFF];
    return C ^ -1;
  }

  function crc32_str(str) {
    var C = -1;
    for (var i = 0, L = str.length, c, d; i &lt; L;) {
      c = str.charCodeAt(i++);
      if (c &lt; 0x80) {
        C = (C &gt;&gt;&gt; 8) ^ T[(C ^ c) &amp; 0xFF];
      } else if (c &lt; 0x800) {
        C = (C &gt;&gt;&gt; 8) ^ T[(C ^ (192 | ((c &gt;&gt; 6) &amp; 31))) &amp; 0xFF];
        C = (C &gt;&gt;&gt; 8) ^ T[(C ^ (128 | (c &amp; 63))) &amp; 0xFF];
      } else if (c &gt;= 0xD800 &amp;&amp; c &lt; 0xE000) {
        c = (c &amp; 1023) + 64;
        d = str.charCodeAt(i++) &amp; 1023;
        C = (C &gt;&gt;&gt; 8) ^ T[(C ^ (240 | ((c &gt;&gt; 8) &amp; 7))) &amp; 0xFF];
        C = (C &gt;&gt;&gt; 8) ^ T[(C ^ (128 | ((c &gt;&gt; 2) &amp; 63))) &amp; 0xFF];
        C = (C &gt;&gt;&gt; 8) ^ T[(C ^ (128 | ((d &gt;&gt; 6) &amp; 15) | ((c &amp; 3) &lt;&lt; 4))) &amp; 0xFF];
        C = (C &gt;&gt;&gt; 8) ^ T[(C ^ (128 | (d &amp; 63))) &amp; 0xFF];
      } else {
        C = (C &gt;&gt;&gt; 8) ^ T[(C ^ (224 | ((c &gt;&gt; 12) &amp; 15))) &amp; 0xFF];
        C = (C &gt;&gt;&gt; 8) ^ T[(C ^ (128 | ((c &gt;&gt; 6) &amp; 63))) &amp; 0xFF];
        C = (C &gt;&gt;&gt; 8) ^ T[(C ^ (128 | (c &amp; 63))) &amp; 0xFF];
      }
    }
    return C ^ -1;
  }
  CRC32.table = T;
  CRC32.bstr = crc32_bstr;
  CRC32.buf = crc32_buf;
  CRC32.str = crc32_str;
}));
