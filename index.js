import{a as i,i as l,S as d}from"./assets/vendor-tnUJPedx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();async function u(o){const r="https://pixabay.com/api/",t={key:"48410810-6cc12cd8ef8f80f7e97e53d15",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await i.get(r,{params:t})).data.hits}catch(e){throw console.error("Image search error:",e),e}}let c;function f(){const o=document.querySelector(".gallery");o.innerHTML=""}function p(o){const r=document.querySelector(".gallery");if(o.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const n=o.map(t=>`
    <a href="${t.largeImageURL}" class="gallery-link">
      <div class="gallery-item">
        <img src="${t.webformatURL}" alt="${t.tags}" />
        <div class="image-info">
          <p>Likes: ${t.likes}</p>
          <p>Views: ${t.views}</p>
          <p>Comments: ${t.comments}</p>
          <p>Downloads: ${t.downloads}</p>
        </div>
      </div>
    </a>
  `).join("");r.insertAdjacentHTML("beforeend",n),c&&c.destroy(),c=new d(".gallery a",{captionsData:"alt",captionDelay:250})}function y(){const o=document.querySelector(".loader");o.style.display="block"}function m(){const o=document.querySelector(".loader");o.style.display="none"}document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".search-form"),r=document.querySelector(".search-input");r.addEventListener("focus",()=>{r.classList.add("pressed")}),r.addEventListener("blur",()=>{r.classList.remove("pressed")}),o.addEventListener("submit",async n=>{n.preventDefault();const t=r.value.trim();if(t){f(),y();try{const e=await u(t);p(e)}catch(e){console.error("Search error:",e)}finally{m(),r.value="",r.classList.remove("pressed")}}})});
//# sourceMappingURL=index.js.map
