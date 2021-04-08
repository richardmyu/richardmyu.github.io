"use strict";require("lazyloadjs");var dataJSON,photoswipe=require("./handler_photoswipe.js"),view=_interopRequireDefault(photoswipe.viewer),galleryPath=window.location.pathname,galleryName=galleryPath.split("/")[2],dataUrl="/album/"+galleryName+"/data.json";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var render=function(e){var a,t=e.image_bed,i=e.description,r="";for(a of e.items){var s,o="",l=a.date,n=l.split("-")[0],l=l.split("-")[1];for(s of a.images){var p=t+"/"+galleryName+"/thumbnail/"+s.name,c=t+"/"+galleryName+"/artwork/"+s.name,d=s.caption,u=s.address;o+=`
      <figure class="thumb" itemprop="associatedMedia" itemscope="" itemtype="http://schema.org/ImageObject">
        <a href="${c}" itemprop="contentUrl" data-size="${s.width}x${s.height}">
            <img class="reward-img" data-src="${p}" src="/lib/album/assets/empty.png" itemprop="thumbnail" onload="lzld(this)">
        </a>
        <figcaption style="display:none;" itemprop="caption description">${u||d}</figcaption>
      </figure>`}r+=`
    <section class="archives album">
      <h3 class="timeline">${n} 年 ${l} 月</h3>
      <ul class="img-box">${o}</ul>
    </section>`}document.querySelector(".instagram").innerHTML=`<div class=${photoswipe.galleryClass} itemscope="" itemtype="http://schema.org/ImageGallery">${r}</div>`,document.querySelector("#gallery-description").innerHTML=i,view.default.init()};function loadData(e){var a;dataJSON?e(dataJSON):((a=new XMLHttpRequest).open("GET",dataUrl,!0),a.onload=function(){200<=this.status&&this.status<300?(dataJSON=JSON.parse(this.response),e(dataJSON)):console.error(this.statusText)},a.onerror=function(){console.error(this.statusText)},a.send())}var Gallery={init:function(){loadData(function(e){render(e)})}};Gallery.init();