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
    var date = item['date']
    var year = date.split('-')[0];
    var month = date.split('-')[1];
    // img
    for (var img of item["images"]) {
      // 缩略图
      var thumbnail = imageBed + '/' + galleryName + "/thumbnail/" + img.name;
      // 原图
      var artwork = imageBed + '/' + galleryName + "/artwork/" + img.name;
      var caption = img.caption;
      var address = img.address
      var width = img.width;
      var height = img.height;

      liTmpl += `
      <figure class="thumb" itemprop="associatedMedia" itemscope="" itemtype="http://schema.org/ImageObject">
        <a href="${artwork}" itemprop="contentUrl" data-size="${width}x${height}">
            <img class="reward-img" data-src="${thumbnail}" src="/lib/album/assets/empty.png" itemprop="thumbnail" onload="lzld(this)">
        </a>
        <figcaption style="display:none;" itemprop="caption description">${address || caption}</figcaption>
      </figure>`;
    }

    /**
     * 原有的 <ul><li></li></ul> 有问题
     * 多一层发嵌套，导致对相册的图片顺序会出现一个 Bug:
     *   1.会将不同月份的图集当成不同的相册，从而无法相互之间跳转（实际上应该是可以相互跳转，因为是同一个相册）；
     *   2.对后面日期的图集编号，因为前面图集有影响：
     *     第二个图集的第一张照片，因为多一层包裹，而被当成新的相册，而重新编号为 1，但实际上又因为上一图集的照片存在（假设前面总有一张照片），照片编号实际为 2，故而在点击查看后，放大的图片是本图集的第 2 张图片，即图片顺错 1 位；（错位规律：前面有 x 张图片，就错 x +1 位；如果图集都是单图片，没有什么影响）
     *     除了上面这种顺序错位，还存在第 3 图集，只有一个放大图（就是第 1 个图片）的现象（这个错位规律，是基于上面的错位，但本图集的图片数量没有错位数大，而导致重复定位到第 1 张）；
     *
     */
    ulTmpl += `
    <section class="archives album">
      <h3 class="timeline">${year} 年 ${month} 月</h3>
      <div class="img-box">${liTmpl}</div>
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
