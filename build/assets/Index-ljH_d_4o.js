import{j as i,t as he,P as W,r as o,a as G,u as ne,v as ue,a7 as ee,l as pe,_ as q,m as me}from"./index-iFlNtnfj.js";import{L as fe}from"./LightModeOutlined-BgV07Vcd.js";import{L as ge}from"./LiveMapTopBar-DxOZvzWy.js";import{V as xe}from"./VehicleMenu-vm-G_xU9.js";import{d as Pe,t as ve}from"./Search-CupkSYyv.js";import"./Loader-BYqCZUrw.js";import{s as J}from"./Socket-0N_gnJcr.js";import{P as ye}from"./Parameters-BmwYbd-l.js";/* empty css           */import{B as Ee,C as Se,r as be,c as we,u as Ie,l as Ce,d as Le,o as Oe,e as Me,g as je,M as Ne,T as Ve,O as Te,b as De,f as K,a as te,V as ke,F as Fe,P as _e,S as Ae,I as Re,h as Be}from"./Vector-BEQdHjna.js";import{B as F,C as $e}from"./CircularProgress-oAvwT9cK.js";import{S as se}from"./Select-izrswFFx.js";import{b as ze}from"./OutlinedInput-ChjyX_i1.js";import{I as Ke}from"./IconButton-ZKaR5vEv.js";import"./createSvgIcon-DjwL89ee.js";import"./jcb-aCHXMCXy.js";import"./index-DKHBLAT5.js";import"./roundedArrow-DxClkx41.js";import"./TextArea-Ei9SbLAU.js";import"./index-CDtO1TQf.js";import"./Card-DbxyZedv.js";import"./Paper-Bs3MyZzE.js";import"./CardContent-BF5LKzRs.js";const Ge="/assets/motorbike-Ve1wpD8A.png";function Xe({activeParams:v}){return i.jsx(F,{sx:{bgcolor:he.bgColor,position:"relative",color:"white",display:"flex",alignItems:"center",justifyContent:"space-around",overflowX:"hidden",flexWrap:"wrap",border:"1px solid white"},children:v&&v[0].params.length>0?i.jsxs(i.Fragment,{children:[v[0].params.length>0&&i.jsxs(W,{variant:"outlined",sx:{color:"black",border:"1px solid white",fontSize:"12px",background:"white","&:hover":{border:"1px solid white",background:"transparent",color:"white"}},children:["Registration Id : ",v[0].reg_id]}),v.length>0&&v[0].params.map((e,l)=>i.jsx(W,{variant:"outlined",sx:{color:"black",border:"1px solid white",mx:"5px",my:"15px",fontSize:"12px",background:"white","&:hover":{border:"1px solid white",background:"transparent",color:"white"}},children:e.label==="speed"?`${e.label} : ${e.value} km/h`:e.label==="mainInputVoltage"?`${e.label} : ${e.value} voltage`:e.label==="ignition"?`${e.label} : ${e.value===!0||(e==null?void 0:e.value)===1?"On":"Off"}`:`${e.label} : ${e.value}`},l))]}):i.jsx(i.Fragment,{children:i.jsx(W,{variant:"outlined",sx:{color:"white",border:"1px solid white",mx:"5px",my:"15px"},children:"No Parameters Selected"})})})}const m={ELEMENT:"element",MAP:"map",OFFSET:"offset",POSITION:"position",POSITIONING:"positioning"};class He extends Ee{constructor(e){super(),this.on,this.once,this.un,this.options=e,this.id=e.id,this.insertFirst=e.insertFirst!==void 0?e.insertFirst:!0,this.stopEvent=e.stopEvent!==void 0?e.stopEvent:!0,this.element=document.createElement("div"),this.element.className=e.className!==void 0?e.className:"ol-overlay-container "+Se,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.autoPan=e.autoPan===!0?{}:e.autoPan||void 0,this.rendered={transform_:"",visible:!0},this.mapPostrenderListenerKey=null,this.addChangeListener(m.ELEMENT,this.handleElementChanged),this.addChangeListener(m.MAP,this.handleMapChanged),this.addChangeListener(m.OFFSET,this.handleOffsetChanged),this.addChangeListener(m.POSITION,this.handlePositionChanged),this.addChangeListener(m.POSITIONING,this.handlePositioningChanged),e.element!==void 0&&this.setElement(e.element),this.setOffset(e.offset!==void 0?e.offset:[0,0]),this.setPositioning(e.positioning||"top-left"),e.position!==void 0&&this.setPosition(e.position)}getElement(){return this.get(m.ELEMENT)}getId(){return this.id}getMap(){return this.get(m.MAP)||null}getOffset(){return this.get(m.OFFSET)}getPosition(){return this.get(m.POSITION)}getPositioning(){return this.get(m.POSITIONING)}handleElementChanged(){be(this.element);const e=this.getElement();e&&this.element.appendChild(e)}handleMapChanged(){this.mapPostrenderListenerKey&&(we(this.element),Ie(this.mapPostrenderListenerKey),this.mapPostrenderListenerKey=null);const e=this.getMap();if(e){this.mapPostrenderListenerKey=Ce(e,Le.POSTRENDER,this.render,this),this.updatePixelPosition();const l=this.stopEvent?e.getOverlayContainerStopEvent():e.getOverlayContainer();this.insertFirst?l.insertBefore(this.element,l.childNodes[0]||null):l.appendChild(this.element),this.performAutoPan()}}render(){this.updatePixelPosition()}handleOffsetChanged(){this.updatePixelPosition()}handlePositionChanged(){this.updatePixelPosition(),this.performAutoPan()}handlePositioningChanged(){this.updatePixelPosition()}setElement(e){this.set(m.ELEMENT,e)}setMap(e){this.set(m.MAP,e)}setOffset(e){this.set(m.OFFSET,e)}setPosition(e){this.set(m.POSITION,e)}performAutoPan(){this.autoPan&&this.panIntoView(this.autoPan)}panIntoView(e){const l=this.getMap();if(!l||!l.getTargetElement()||!this.get(m.POSITION))return;const r=this.getRect(l.getTargetElement(),l.getSize()),c=this.getElement(),d=this.getRect(c,[Oe(c),Me(c)]);e=e||{};const y=e.margin===void 0?20:e.margin;if(!je(r,d)){const f=d[0]-r[0],w=r[2]-d[2],E=d[1]-r[1],h=r[3]-d[3],S=[0,0];if(f<0?S[0]=f-y:w<0&&(S[0]=Math.abs(w)+y),E<0?S[1]=E-y:h<0&&(S[1]=Math.abs(h)+y),S[0]!==0||S[1]!==0){const _=l.getView().getCenterInternal(),L=l.getPixelFromCoordinateInternal(_);if(!L)return;const N=[L[0]+S[0],L[1]+S[1]],V=e.animation||{};l.getView().animateInternal({center:l.getCoordinateFromPixelInternal(N),duration:V.duration,easing:V.easing})}}}getRect(e,l){const r=e.getBoundingClientRect(),c=r.left+window.pageXOffset,d=r.top+window.pageYOffset;return[c,d,c+l[0],d+l[1]]}setPositioning(e){this.set(m.POSITIONING,e)}setVisible(e){this.rendered.visible!==e&&(this.element.style.display=e?"":"none",this.rendered.visible=e)}updatePixelPosition(){const e=this.getMap(),l=this.getPosition();if(!e||!e.isRendered()||!l){this.setVisible(!1);return}const r=e.getPixelFromCoordinate(l),c=e.getSize();this.updateRenderedPosition(r,c)}updateRenderedPosition(e,l){const r=this.element.style,c=this.getOffset(),d=this.getPositioning();this.setVisible(!0);const y=Math.round(e[0]+c[0])+"px",f=Math.round(e[1]+c[1])+"px";let w="0%",E="0%";d=="bottom-right"||d=="center-right"||d=="top-right"?w="-100%":(d=="bottom-center"||d=="center-center"||d=="top-center")&&(w="-50%"),d=="bottom-left"||d=="bottom-center"||d=="bottom-right"?E="-100%":(d=="center-left"||d=="center-center"||d=="center-right")&&(E="-50%");const h=`translate(${w}, ${E}) translate(${y}, ${f})`;this.rendered.transform_!=h&&(this.rendered.transform_=h,r.transform=h)}getOptions(){return this.options}}function Ye({showCard:v,loadingVehicle:e}){const l=o.useRef(),r=o.useRef(),[c,d]=o.useState(null),{selectedParameterList:y,selectedVehicle:f,vehicleList:w,icons:E,locationData:h,placesData:S,imeiNumbers:_,onlineVehicle:L,loading:N,services_loading:V}=G(t=>t.liveMap);G(t=>t.dashboard),o.useState("");const[Q,X]=o.useState([]),[U,A]=o.useState([]),[P,$]=o.useState(),[T,p]=o.useState(),[I,C]=o.useState(null),[H,D]=o.useState(""),[a,M]=o.useState({lat:18.516726,lng:73.856255}),[b,z]=o.useState(""),[O,k]=o.useState(null),oe=ne();o.useEffect(()=>{if(c){const t=document.getElementById("popup");t&&(t.style.background="white",t.style.padding="10px",t.style.borderRadius="8px",t.style.cursor="pointer")}},[c]),o.useEffect(()=>{var t,s,u,g;if(console.log("locationData",h),Object.keys(f).length>0){console.log("selectedVehicle",f);const n=h==null?void 0:h.filter(x=>{var j;return((j=x==null?void 0:x.latestDocument)==null?void 0:j.imei)==(f==null?void 0:f.imei)});console.log("filteredVehicle",n),$(n),M({lat:(s=(t=n==null?void 0:n[0])==null?void 0:t.latestDocument)==null?void 0:s.lat,lng:(g=(u=n==null?void 0:n[0])==null?void 0:u.latestDocument)==null?void 0:g.lng})}else $(h)},[h,f]),o.useEffect(()=>{p(y)},[y]),o.useEffect(()=>(J.on("locationinfo",t=>{if(console.log("locationinfo",t),P==null||P.map(s=>{if(s.latestDocument.imei===t.imei){const u={lat:s.latestDocument.lat,lng:s.latestDocument.lng},g=500,n=60,x=g/(1e3/n),j=(t.lat-u.lat)/x,R=(t.lng-u.lng)/x;let B=0;const Y=setInterval(()=>{const ae=u.lat+j*B,le=u.lng+R*B,ce={...s,latestDocument:{...s.latestDocument,lat:ae,lng:le}};B++,B>=x&&clearInterval(Y),$(de=>de.map(Z=>Z.latestDocument.imei===t.imei?ce:Z))},1e3/n)}return s}),String(t==null?void 0:t.imei)===String(T[0].imei)){const s=T[0].params.map(u=>{let g=u.label;return{...u,value:t[g]}});p([{...T[0],params:s}])}}),()=>{J.off("locationinfo")}),[J,P,T]),o.useEffect(()=>{oe(ue({}))},[f]),o.useEffect(()=>{if((h==null?void 0:h.length)>0&&L.length>0){const t=[],s=[];h==null||h.forEach(u=>{L.some(n=>String(n)===String(u._id))?t.push(u):s.push(u)}),X(t),A(s)}else X([]),A([])},[h,L]),o.useEffect(()=>{const t=new Ne({target:l.current,layers:[new Ve({source:new Te})],view:new De({center:K([a==null?void 0:a.lng,a==null?void 0:a.lat]),zoom:Object.keys(f).length>0?15:6})});k(t),r.current=t;const s=document.createElement("div");s.id="popup",s.className="ol-popup",s.innerHTML='<div id="popup-content"></div><a href="#" id="popup-closer" className="ol-popup-closer"></a>',document.body.appendChild(s);const u=new He({element:s,autoPan:!0,autoPanAnimation:{duration:250}});return t.addOverlay(u),d(u),()=>{r.current&&r.current.setTarget(null),s&&s.parentNode&&s.parentNode.removeChild(s)}},[a]),o.useEffect(()=>{a&&r.current&&r.current.getView().setCenter(K([a.lng,a.lat]))},[a]),o.useEffect(()=>{var t;if(r.current){let s=(t=r.current.getLayers().getArray().find(n=>n instanceof te))==null?void 0:t.getSource();if(s)s.clear();else{s=new ke;const n=new te({source:s});r.current.addLayer(n)}P&&P.length>0&&P.forEach(n=>{const x=new Fe({geometry:new _e(K([n.latestDocument.lng,n.latestDocument.lat])),name:n.latestDocument.imei,vehicle:n});if(x.setStyle(new Ae({image:new Re({anchor:[.5,1],src:Ge,scale:.1})})),s.addFeature(x),n.latestDocument.imei===I){const j=K([n.latestDocument.lng,n.latestDocument.lat]);c.setPosition(j)}}),r.current.getInteractions().getArray().forEach(n=>{n instanceof se&&r.current.removeInteraction(n)});const g=new se({condition:Be});r.current.addInteraction(g),g.on("select",function(n){if(n.selected.length>0){const x=n.selected[0],j=x.getGeometry().getCoordinates(),R=x.get("vehicle"),B=ie(R.latestDocument.imei);if(C(R.latestDocument.imei),D(R.latestDocument.imei),c){c.setPosition(j);const Y=document.getElementById("popup-content");Y&&(Y.innerHTML=`
                 <div>Vehicle No: ${B}</div>
                 <div>IMEI No: ${R.latestDocument.imei}</div>
               `)}}else C(null),D(""),c&&c.setPosition(void 0)})}},[P,I]),o.useEffect(()=>{const t=s=>{c&&!document.getElementById("popup").contains(s.target)&&(C(null),D(""),c.setPosition(void 0))};return document.addEventListener("mousedown",t),()=>{document.removeEventListener("mousedown",t)}},[c]);const ie=t=>{const s=w.find(u=>{var g;return u.imei&&((g=u.imei[0])==null?void 0:g.mac_id)===t});return s?s.registration_id:"IMEI doesn't exist."},re=async t=>{if(t.preventDefault(),b.trim()==="")return;const u=await(await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${b}`)).json();if(u.length>0){const{lon:g,lat:n}=u[0],x=K([parseFloat(g),parseFloat(n)]);O.getView().animate({center:x,zoom:15})}};return i.jsxs(i.Fragment,{children:[v&&i.jsx(Xe,{activeParams:T}),(N||e)&&i.jsx(F,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:10},children:i.jsx($e,{})}),i.jsx("div",{ref:l,style:{width:"100%",height:"92vh"}}),i.jsxs(F,{component:"form",onSubmit:re,border:"1px solid white",backgroundColor:"white",borderRadius:"3px",sx:{my:"6px",ml:"90px",position:"absolute",top:132,left:200,zIndex:1},children:[i.jsx(ze,{sx:{my:.5,mx:2},placeholder:"Search Locations",value:b,onChange:t=>z(t.target.value)}),i.jsx(Ke,{type:"submit",sx:{p:1},children:i.jsx(Pe,{})})]}),i.jsxs("div",{id:"popup",className:"ol-popup",style:{background:"white",padding:"10px",borderRadius:"8px"},children:[i.jsx("div",{id:"popup-content"}),i.jsx("a",{href:"#",id:"popup-closer",className:"ol-popup-closer"})]})]})}function xt(){const{locationData:v,selectedVehicle:e,selectedParameterList:l}=G(p=>p.liveMap),{mode:r}=G(p=>p.dashboard),c=ve(r),[d,y]=o.useState([]),{w_customer_id:f}=G(p=>p.auth),[w,E]=o.useState(),[h,S]=o.useState(!1),[_,L]=o.useState(!1),[N,V]=o.useState([]),[Q,X]=o.useState(!0),[U,A]=o.useState(!1);let P=ne();o.useEffect(()=>{$()},[]),o.useEffect(()=>{V([]),P(ee([{reg_id:"",imei:"",params:[]}]))},[e]);const $=async()=>{try{A(!0);let p=[],I=[];const C=await P(pe({w_customer_id:f}));if(Array.isArray(C.payload)){C.payload.forEach(a=>{var M,b,z;Array.isArray(a.imei)&&a.imei.length>0&&((M=a.imei[0])!=null&&M.mac_id)?(p.push({id:a.id,label:a.registration_id,value:(b=a.imei[0])==null?void 0:b.mac_id}),I.push((z=a.imei[0])==null?void 0:z.mac_id)):(console.error("IMEI data not found for item:",a),q.error(`IMEI Number not found for the vehicle: ${a==null?void 0:a.registration_id}`))});const H="one",D=I;I.length>0&&P(me({type:H,imei:D})),y(p),A(!1)}else A(!1),console.error("Unexpected data format:",C),q.error("Unexpected data format:")}catch(p){console.error("Error fetching vehicle data:",p),q.error(`Error fetching vehicle data: ${p}`)}},T=async p=>{const{label:I,imei:C,id:H,reg_id:D,checked:a}=p;E(O=>O.map(k=>k.id===H?{...k,checked:!a}:k));let M=[...N],b=[...N];if(!a)v.forEach(O=>{O.latestDocument.imei===C&&(M.push({label:I,value:O.latestDocument[I]}),b=M,V(M))});else{let O=N.filter(k=>k.label!==I);b=O,V(O)}console.log("tempParamList",b),P(ee([{reg_id:D,imei:C,params:b}]))};return i.jsxs("div",{className:"app",children:[i.jsx(fe,{}),i.jsxs("main",{className:"content",style:{width:"100%",background:"#dad6d626"},children:[i.jsx(ge,{title:"Live Map",setShowVehicles:S,showVehicles:h,showParameters:_,setShowParameters:L,setShowCard:X,showCard:Q}),i.jsxs(F,{style:{display:"flex",width:"100%",height:"95vh"},children:[i.jsx(F,{style:{width:h||_?"80%":"100%"},children:i.jsx(Ye,{showCard:Q,loadingVehicle:U})}),h&&i.jsx(F,{style:{width:"20%",backgroundColor:c.grey[100]},children:i.jsx(xe,{vehicleData:d,title:"Live Map",setParameterData:E,loadingVehicle:U})}),_&&i.jsx(F,{style:{width:"20%",backgroundColor:c.grey[100]},children:i.jsx(ye,{parametersData:w,setParameterData:E,handleParameterChange:T})})]})]})]})}export{xt as default};