import{w as o,E as v}from"./index-BLTSkyD3.js";import{g as S}from"./OutlinedInput-BdnXUG3S.js";function H(n,s,e){return n===void 0||S(n)?s:o({},s,{ownerState:o({},s.ownerState,e)})}function p(n,s=[]){if(n===void 0)return{};const e={};return Object.keys(n).filter(t=>t.match(/^on[A-Z]/)&&typeof n[t]=="function"&&!s.includes(t)).forEach(t=>{e[t]=n[t]}),e}function w(n,s,e){return typeof n=="function"?n(s,e):n}function y(n){if(n===void 0)return{};const s={};return Object.keys(n).filter(e=>!(e.match(/^on[A-Z]/)&&typeof n[e]=="function")).forEach(e=>{s[e]=n[e]}),s}function O(n){const{getSlotProps:s,additionalProps:e,externalSlotProps:t,externalForwardedProps:l,className:u}=n;if(!s){const f=v(e==null?void 0:e.className,u,l==null?void 0:l.className,t==null?void 0:t.className),m=o({},e==null?void 0:e.style,l==null?void 0:l.style,t==null?void 0:t.style),i=o({},e,l,t);return f.length>0&&(i.className=f),Object.keys(m).length>0&&(i.style=m),{props:i,internalRef:void 0}}const N=p(o({},l,t)),g=y(t),h=y(l),r=s(N),d=v(r==null?void 0:r.className,e==null?void 0:e.className,u,l==null?void 0:l.className,t==null?void 0:t.className),c=o({},r==null?void 0:r.style,e==null?void 0:e.style,l==null?void 0:l.style,t==null?void 0:t.style),a=o({},r,e,h,g);return d.length>0&&(a.className=d),Object.keys(c).length>0&&(a.style=c),{props:a,internalRef:r.ref}}export{H as a,p as e,O as m,w as r};