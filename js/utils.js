HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},NexT.utils={wrapImageWithFancyBox:function(){document.querySelectorAll(".post .post-body :not(a) > img, .post .post-body > img").forEach(e=>{var t=$(e),e=t.attr("data-src")||t.attr("src"),e=t.wrap(`<a class="fancybox fancybox.image" href="${e}" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent("a");t.is(".post-gallery img")?e.attr("data-fancybox","gallery").attr("rel","gallery"):t.is(".group-picture img")?e.attr("data-fancybox","group").attr("rel","group"):e.attr("data-fancybox","default").attr("rel","default");t=t.attr("title")||t.attr("alt");t&&(e.append(`<p class="image-caption">${t}</p>`),e.attr("title",t).attr("data-caption",t))}),$.fancybox.defaults.hash=!1,$(".fancybox").fancybox({loop:!0,helpers:{overlay:{locked:!1}}})},registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{let t=document.createElement("a");t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},registerCopyCode:function(){document.querySelectorAll("figure.highlight").forEach(e=>{const t=document.createElement("div");e.wrap(t),t.classList.add("highlight-container"),t.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-clipboard fa-fw"></i></div>');e=e.parentNode.querySelector(".copy-btn");e.addEventListener("click",e=>{var t=e.currentTarget,a=[...t.parentNode.querySelectorAll(".code .line")].map(e=>e.innerText).join("\n"),o=document.createElement("textarea");o.style.top=window.scrollY+"px",o.style.position="absolute",o.style.opacity="0",o.readOnly=!0,o.value=a,document.body.append(o);const n=document.getSelection();e=0<n.rangeCount&&n.getRangeAt(0);o.select(),o.setSelectionRange(0,a.length),o.readOnly=!1;a=document.execCommand("copy");CONFIG.copycode.show_result&&(t.querySelector("i").className=a?"fa fa-check fa-fw":"fa fa-times fa-fw"),o.blur(),t.blur(),e&&(n.removeAllRanges(),n.addRange(e)),document.body.removeChild(o)}),e.addEventListener("mouseleave",e=>{setTimeout(()=>{e.target.querySelector("i").className="fa fa-clipboard fa-fw"},300)})})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(t=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(e=>t.src.includes(e))&&!t.parentNode.matches(".video-container")){const o=document.createElement("div");o.className="video-container",t.wrap(o);var e=Number(t.width),a=Number(t.height);e&&a&&(t.parentNode.style.paddingTop=a/e*100+"%")}})},registerScrollPercent:function(){var a=document.querySelector(".back-to-top"),o=document.querySelector(".reading-progress-bar");window.addEventListener("scroll",()=>{var e,t;(a||o)&&(e=document.querySelector(".container").offsetHeight,t=(t=window.innerHeight)<e?e-t:document.body.scrollHeight-t,t=Math.min(100*window.scrollY/t,100),a&&(a.classList.toggle("back-to-top-on",50<window.scrollY),a.querySelector("span").innerText=Math.round(t)+"%"),o&&(o.style.width=t.toFixed(2)+"%"))}),a&&a.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},registerTabsTag:function(){document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault();e=e.currentTarget;e.classList.contains("active")||([...e.parentNode.children].forEach(e=>{e.classList.remove("active")}),e.classList.add("active"),[...(e=document.getElementById(e.querySelector("a").getAttribute("href").replace("#",""))).parentNode.children].forEach(e=>{e.classList.remove("active")}),e.classList.add("active"),e.dispatchEvent(new Event("tabs:click",{bubbles:!0})))})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){window.addEventListener("message",({data:e})=>{var t;"string"==typeof e&&e.includes("ciu_embed")&&(t=e.split(":")[1],e=e.split(":")[2],document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(e,10)+5+"px")},!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item").forEach(e=>{var t,a,o=e.querySelector("a[href]");o&&(t=o.pathname===location.pathname||o.pathname===location.pathname.replace("index.html",""),a=!CONFIG.root.startsWith(o.pathname)&&location.pathname.startsWith(o.pathname),e.classList.toggle("menu-item-active",o.hostname===location.hostname&&(t||a)))})},registerLangSelect:function(){let e=document.querySelectorAll(".lang-select");e.forEach(a=>{a.value=CONFIG.page.lang,a.addEventListener("change",()=>{var t=a.options[a.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach(e=>e.innerText=t.text);var e=t.dataset.href;window.pjax?window.pjax.loadUrl(e):window.location.href=e})})},registerSidebarTOC:function(){const r=document.querySelectorAll(".post-toc li"),i=[...r].map(e=>{var e=e.querySelector("a.nav-link"),t=document.getElementById(decodeURI(e.getAttribute("href")).replace("#",""));return e.addEventListener("click",e=>{e.preventDefault(),t&&t.getBoundingClientRect&&(e=t.getBoundingClientRect().top+window.scrollY,window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:e+10}))}),t});var c=document.querySelector(".post-toc-wrap");!function o(n){n=Math.floor(n+1e4);let t=new IntersectionObserver((e,t)=>{var a=document.documentElement.scrollHeight+100;if(n<a)return t.disconnect(),void o(a);e=function(e){let t=0,a=e[t];if(0<a.boundingClientRect.top)return t=i.indexOf(a.target),0===t?0:t-1;for(;t<e.length;t++){if(!(e[t].boundingClientRect.top<=0))return i.indexOf(a.target);a=e[t]}return i.indexOf(a.target)}(e),function(e){if(!e.classList.contains("active-current")){document.querySelectorAll(".post-toc .active").forEach(e=>{e.classList.remove("active","active-current")}),e.classList.add("active","active-current");for(var t=e.parentNode;!t.matches(".post-toc");)t.matches("li")&&t.classList.add("active"),t=t.parentNode;window.anime({targets:c,duration:200,easing:"linear",scrollTop:c.scrollTop-c.offsetHeight/2+e.getBoundingClientRect().top-c.getBoundingClientRect().top})}}(r[e])},{rootMargin:n+"px 0px -100% 0px",threshold:0});i.forEach(e=>{e&&t.observe(e)})}(document.documentElement.scrollHeight)},hasMobileUA:function(){var e=navigator.userAgent;return/iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g.test(e)},isTablet:function(){return window.screen.width<992&&767<window.screen.width&&this.hasMobileUA()},isMobile:function(){return window.screen.width<767&&this.hasMobileUA()},isDesktop:function(){return!this.isTablet()&&!this.isMobile()},supportsPDFs:function(){let e=navigator.userAgent;var t=e.includes("irefox")&&18<parseInt(e.split("rv:")[1].split(".")[0],10),a=void 0!==navigator.mimeTypes["application/pdf"],o=/iphone|ipad|ipod/i.test(e.toLowerCase());return t||a&&!o},initSidebarDimension:function(){var e=document.querySelector(".sidebar-nav"),t="none"!==e.style.display?e.offsetHeight:0,a=CONFIG.sidebar.offset||12,e=CONFIG.back2top.enable&&CONFIG.back2top.sidebar?document.querySelector(".back-to-top").offsetHeight:0,e=2*CONFIG.sidebar.padding+t+e;"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme||(e+=2*a-22);e=document.body.offsetHeight-e+"px";document.querySelector(".site-overview-wrap").style.maxHeight=e,document.querySelector(".post-toc-wrap").style.maxHeight=e},updateSidebarPosition:function(){var e=document.querySelector(".sidebar-nav"),t=document.querySelector(".post-toc");t?(e.style.display="",e.classList.add("motion-element"),document.querySelector(".sidebar-nav-toc").click()):(e.style.display="none",e.classList.remove("motion-element"),document.querySelector(".sidebar-nav-overview").click()),NexT.utils.initSidebarDimension(),this.isDesktop()&&"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme&&"boolean"!=typeof CONFIG.page.sidebar&&("always"===CONFIG.sidebar.display||CONFIG.sidebar.display)},getScript:function(e,a,t){var o;t?a():((o=document.createElement("script")).onload=o.onreadystatechange=function(e,t){!t&&o.readyState&&!/loaded|complete/.test(o.readyState)||(o.onload=o.onreadystatechange=null,o=void 0,!t&&a&&setTimeout(a,0))},o.src=e,document.head.appendChild(o))},loadComments:function(t,a){if(CONFIG.comments.lazyload&&t){let e=new IntersectionObserver((e,t)=>{e[0].isIntersecting&&(a(),t.disconnect())});return e.observe(t),e}a()}};