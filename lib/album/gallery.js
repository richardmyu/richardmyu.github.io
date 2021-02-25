"use strict";

require('lazyloadjs');
var photoswipe = require("./handler_photoswipe.js");

var view = _interopRequireDefault(photoswipe.viewer);
var galleryPath = window.location.pathname;
var galleryName = galleryPath.split("/")[2];
var dataUrl = '/album/' + galleryName + '/data.json';
var dataJSON;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var render = function render(response) {
  var imageBed = response["image_bed"];
  var description = response["description"];
  var items = response["items"];
  var ulTmpl = "";
  for (var item of items) {
    var liTmpl = "";
    var year = item["year"];
    var month = item["month"];
    // img
    for (var img of item["images"]) {
      // 缩略图
      var thumbnail = imageBed + '/' + galleryName + "/" + img.name;
      // 原图
      var artwork = imageBed + '/' + galleryName + "/" + img.name;
      var name = img.name ? img.name.split(".")[0] : '';
      var caption = img.caption || name;
      // TODO: 参数后续调整
      var width = img.width || 6400;
      var height = img.height || 4000;

      liTmpl += `
      <li><figure class="thumb" itemprop="associatedMedia" itemscope="" itemtype="http://schema.org/ImageObject">
        <a href="${artwork}" itemprop="contentUrl" data-size="${width}x${height}">
            <img class="reward-img" data-src="${thumbnail}" src="/lib/album/assets/empty.png" itemprop="thumbnail" onload="lzld(this)">
        </a>
        <figcaption itemprop="caption description">${caption}</figcaption>
      </figure></li>`;
    }

    ulTmpl += `
    <section class="archives album">
      <h3 class="timeline">${year} 年 ${month} 月</h3>
      <ul class="img-box-ul">${liTmpl}</ul>
    </section>`;
  }

  // 注入相册内容
  document.querySelector('.instagram').innerHTML = `<div class=${photoswipe.galleryClass} itemscope="" itemtype="http://schema.org/ImageGallery">${ulTmpl}</div>`;
  // 注入相册描述
  document.querySelector('#gallery-description').innerHTML = description;

  view.default.init();
};

function loadData(render) {
  if (!dataJSON) {
    var xhr = new XMLHttpRequest();
    // xhr.open('GET', dataUrl + '?t=' + new Date(), true);
    xhr.open('GET', dataUrl, true);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        dataJSON = JSON.parse(this.response);
        render(dataJSON);
      } else {
        console.error(this.statusText);
      }
    };
    xhr.onerror = function () {
      console.error(this.statusText);
    };
    xhr.send();
  } else {
    render(dataJSON);
  }
}

var Gallery = {
  init: function init() {
    loadData(function (data) {
      render(data);
    });
  }
};

Gallery.init();
