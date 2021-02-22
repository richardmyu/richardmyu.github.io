"use strict";require("lazyloadjs");var dataJSON,photoswipe=require("./handler_photoswipe.js"),view=_interopRequireDefault(photoswipe.viewer),galleryPath=window.location.pathname,galleryName=galleryPath.split("/")[2],dataUrl="/album/"+galleryName+"/data.json";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var render=function(e){var a,t=e.image_bed,i=e.description,r="";for(a of e.items){var o,s="",l=a.year,n=a.month;for(o of a.images){var c=t+"/"+galleryName+"/"+o.name,p=t+"/"+galleryName+"/"+o.name,d=o.caption||"",u=o.width||6400,m=o.height||4e3;o.date;s+=`
      <figure class="thumb" itemprop="associatedMedia" itemscope="" itemtype="http://schema.org/ImageObject">
        <a href="${p}" itemprop="contentUrl" data-size="${u}x${m}">
            <img class="reward-img" data-src="${c}" src="/lib/album/assets/empty.png" itemprop="thumbnail" onload="lzld(this)">
        </a>
        <figcaption style="display:none" itemprop="caption description">${d}</figcaption>
      </figure>`}r+=`
    <section class="archives album"><h1 class="timeline">${l} 年 ${n} 月</h1>
      <ul class="img-box-ul">${s}</ul>
    </section>`}document.querySelector(".instagram").innerHTML=`<div class=${photoswipe.galleryClass} itemscope="" itemtype="http://schema.org/ImageGallery">${r}</div>`,document.querySelector("#gallery-description").innerHTML=i,view.default.init()};function loadData(e){var a;dataJSON?e(dataJSON):((a=new XMLHttpRequest).open("GET",dataUrl,!0),a.onload=function(){200<=this.status&&this.status<300?(dataJSON=JSON.parse(this.response),e(dataJSON)):console.error(this.statusText)},a.onerror=function(){console.error(this.statusText)},a.send())}var Gallery={init:function(){loadData(function(e){render(e)})}};Gallery.init();