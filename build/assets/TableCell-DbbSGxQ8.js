import{r as n,a as H,g as R,s as A,az as l,_ as b,aB as P,aA as T,aC as _,u as j,b as M,j as D,e as N,f as U}from"./index-C_wM5jQm.js";const W=n.createContext(),B=W,E=n.createContext(),L=E;function I(a){return R("MuiTableCell",a)}const J=H("MuiTableCell",["root","head","body","footer","sizeSmall","sizeMedium","paddingCheckbox","paddingNone","alignLeft","alignCenter","alignRight","alignJustify","stickyHeader"]),q=J,F=["align","className","component","padding","scope","size","sortDirection","variant"],G=a=>{const{classes:e,variant:t,align:s,padding:r,size:g,stickyHeader:d}=a,x={root:["root",t,d&&"stickyHeader",s!=="inherit"&&`align${l(s)}`,r!=="normal"&&`padding${l(r)}`,`size${l(g)}`]};return U(x,I,e)},K=A("td",{name:"MuiTableCell",slot:"Root",overridesResolver:(a,e)=>{const{ownerState:t}=a;return[e.root,e[t.variant],e[`size${l(t.size)}`],t.padding!=="normal"&&e[`padding${l(t.padding)}`],t.align!=="inherit"&&e[`align${l(t.align)}`],t.stickyHeader&&e.stickyHeader]}})(({theme:a,ownerState:e})=>b({},a.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:a.vars?`1px solid ${a.vars.palette.TableCell.border}`:`1px solid
    ${a.palette.mode==="light"?P(T(a.palette.divider,1),.88):_(T(a.palette.divider,1),.68)}`,textAlign:"left",padding:16},e.variant==="head"&&{color:(a.vars||a).palette.text.primary,lineHeight:a.typography.pxToRem(24),fontWeight:a.typography.fontWeightMedium},e.variant==="body"&&{color:(a.vars||a).palette.text.primary},e.variant==="footer"&&{color:(a.vars||a).palette.text.secondary,lineHeight:a.typography.pxToRem(21),fontSize:a.typography.pxToRem(12)},e.size==="small"&&{padding:"6px 16px",[`&.${q.paddingCheckbox}`]:{width:24,padding:"0 12px 0 16px","& > *":{padding:0}}},e.padding==="checkbox"&&{width:48,padding:"0 0 0 4px"},e.padding==="none"&&{padding:0},e.align==="left"&&{textAlign:"left"},e.align==="center"&&{textAlign:"center"},e.align==="right"&&{textAlign:"right",flexDirection:"row-reverse"},e.align==="justify"&&{textAlign:"justify"},e.stickyHeader&&{position:"sticky",top:0,zIndex:2,backgroundColor:(a.vars||a).palette.background.default})),O=n.forwardRef(function(e,t){const s=j({props:e,name:"MuiTableCell"}),{align:r="inherit",className:g,component:d,padding:x,scope:z,size:k,sortDirection:C,variant:h}=s,$=M(s,F),i=n.useContext(B),p=n.useContext(L),u=p&&p.variant==="head";let o;d?o=d:o=u?"th":"td";let c=z;o==="td"?c=void 0:!c&&u&&(c="col");const y=h||p&&p.variant,v=b({},s,{align:r,component:o,padding:x||(i&&i.padding?i.padding:"normal"),size:k||(i&&i.size?i.size:"medium"),sortDirection:C,stickyHeader:y==="head"&&i&&i.stickyHeader,variant:y}),m=G(v);let f=null;return C&&(f=C==="asc"?"ascending":"descending"),D.jsx(K,b({as:o,ref:t,className:N(m.root,g),"aria-sort":f,scope:c,ownerState:v},$))}),V=O;export{V as T,L as a,B as b};