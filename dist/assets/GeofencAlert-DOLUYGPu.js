import{$ as L,j as o,k as p,r as a,i as $,ai as w,w as u,t as d,T as g,B as E}from"./index-K7fz_th8.js";import{r as G}from"./createSvgIcon-DYbO2OaU.js";import{B as r,C as T,m as V}from"./menu2-Dr5aqS6N.js";import{t as B}from"./LeftSideBar2-4LMTBXzt.js";var y={},H=L;Object.defineProperty(y,"__esModule",{value:!0});var m=y.default=void 0,O=H(G()),N=o;m=y.default=(0,O.default)((0,N.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z"}),"VisibilityOff");const S="http://139.59.37.47:3031",Y=()=>{const{selectedVehicle:l}=p(e=>e.liveMap);p(e=>e.geofence);const{mode:C}=p(e=>e.dashboard),n=B(C),[i,k]=a.useState([]),[A,j]=a.useState(null),[x,f]=a.useState(!1),[b,_]=a.useState(10),h=a.useRef(null);let I=$();a.useEffect(()=>{v()},[I,l]),a.useEffect(()=>{h.current&&(h.current.scrollTop=0)},[i]);const v=async()=>{var e,t,c;if(Object.keys(l).length>0){let D={imei:l==null?void 0:l.imei};try{f(!0);const s=await w.post(`${S}/ccServer/location/getNotifications`,D);((t=(e=s==null?void 0:s.data)==null?void 0:e.notifications)==null?void 0:t.length)>0?k((c=s==null?void 0:s.data)==null?void 0:c.notifications):u.error("No Geofence Alert For Selected Vehicle."),f(!1)}catch(s){console.log("error while getting gfAlertHistory",s),u.error(`Geofence ${s==null?void 0:s.message}`),f(!1)}}},M=async e=>{try{const t=await w.post(`${S}/ccServer/location/updateNotifications`,{_id:e==null?void 0:e._id});v()}catch(t){console.log("error while getting gfAlertHistory",t),u.error(`Geofence ${t==null?void 0:t.message}`),f(!1)}},R=()=>{_(e=>e+10)};return o.jsxs(r,{sx:{padding:"15px",display:"flex",flexDirection:"column",gap:"15px",color:n.grey[400],backgroundColor:n.grey[100],height:"86vh",overflowY:"auto",scrollBehavior:"smooth"},ref:h,children:[x&&o.jsx(r,{style:{width:"100%",margin:"auto",display:"flex",justifyContent:"center"},children:o.jsx(T,{style:{color:d.bgColor}})}),!x&&i.length===0&&o.jsx(g,{style:{width:"100%",margin:"auto",color:n.grey[400],textAlign:"center"},children:"Please Select A Vehicle."}),!x&&i.length>0&&i.slice(0,b).map((e,t)=>{var c;return o.jsxs(r,{sx:{position:"relative"},onMouseEnter:()=>j(t),onMouseLeave:()=>j(null),children:[o.jsxs(r,{sx:{display:"flex",justifyContent:"space-between",color:n.grey[400]},children:[o.jsx(g,{children:o.jsx("b",{children:e==null?void 0:e.type})}),o.jsxs(r,{sx:{display:"flex",flexDirection:"column"},children:[o.jsx("span",{children:(c=e==null?void 0:e.createdAt)==null?void 0:c.slice(0,10)}),o.jsx("span",{style:{paddingLeft:"15px"},children:new Date(e==null?void 0:e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})})]})]}),o.jsxs(r,{sx:{display:"flex",border:"1px solid #686868",padding:"5px",borderRadius:"5px",color:"#686868","&:hover":{background:d.bgShadow,color:"black"}},children:[o.jsx("img",{style:{width:"30px",height:"30px",borderRadius:"5px",marginRight:"15px",alignItems:"center",marginTop:"15px"},src:V,alt:"logo"}),o.jsxs(r,{sx:{display:"flex",flexDirection:"column"},children:[o.jsxs(g,{sx:{fontSize:"15px",width:"100%"},children:["Your Vehicle No."," ",Object.keys(l).length>0?l.reg_id:"XXX"]}),o.jsx(g,{children:e==null?void 0:e.msg})]})]}),A===t&&o.jsx(m,{onClick:()=>{M(e)},sx:{position:"absolute",top:"35%",left:"84.4%",transform:"translate(-50%, -50%)",fontWeight:"600",color:"black",cursor:"pointer"}})]},t)}),!x&&b<i.length&&o.jsx(r,{sx:{display:"flex",justifyContent:"center",marginTop:"15px"},children:o.jsx(E,{variant:"outlined",onClick:R,sx:{border:`1px solid ${d.bgShadow}`,color:n.grey[400],"&:hover":{background:d.bgColor,color:"white",border:`1px solid ${d.bgShadow}`}},children:"Load More"})})]})};export{Y as G};