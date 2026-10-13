var Kt=Object.defineProperty;var jt=(r,t,e)=>t in r?Kt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var h=(r,t,e)=>jt(r,typeof t!="symbol"?t+"":t,e);var W=globalThis,G=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol(),ft=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==st)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(G&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ft.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ft.set(e,t))}return t}toString(){return this.cssText}},$t=r=>new P(typeof r=="string"?r:r+"",void 0,st),_=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new P(e,r,st)},bt=(r,t)=>{if(G)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=W.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},it=G?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return $t(e)})(r):r;var{is:qt,defineProperty:Vt,getOwnPropertyDescriptor:Wt,getOwnPropertyNames:Gt,getOwnPropertySymbols:Ft,getPrototypeOf:Yt}=Object,F=globalThis,yt=F.trustedTypes,Jt=yt?yt.emptyScript:"",Zt=F.reactiveElementPolyfillSupport,O=(r,t)=>r,rt={toAttribute(r,t){switch(t){case Boolean:r=r?Jt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},vt=(r,t)=>!qt(r,t),xt={attribute:!0,type:String,converter:rt,reflect:!1,useDefault:!1,hasChanged:vt};Symbol.metadata??=Symbol("metadata"),F.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=xt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Vt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=Wt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let c=i?.call(this);o?.call(this,n),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xt}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let t=Yt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let e=this.properties,s=[...Gt(e),...Ft(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(it(i))}else t!==void 0&&e.push(it(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return bt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:rt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:rt;this._$Em=i;let c=n.fromAttribute(e,o.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let n=this.constructor;if(i===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??vt)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,c=this[i];n!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,o,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[O("elementProperties")]=new Map,x[O("finalized")]=new Map,Zt?.({ReactiveElement:x}),(F.reactiveElementVersions??=[]).push("2.1.2");var ht=globalThis,wt=r=>r,Y=ht.trustedTypes,At=Y?Y.createPolicy("lit-html",{createHTML:r=>r}):void 0,Pt="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Ot="?"+w,Xt=`<${Ot}>`,E=document,L=()=>E.createComment(""),M=r=>r===null||typeof r!="object"&&typeof r!="function",pt=Array.isArray,Qt=r=>pt(r)||typeof r?.[Symbol.iterator]=="function",ot=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,Et=/>/g,A=RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),kt=/'/g,Ct=/"/g,Rt=/^(?:script|style|textarea|title)$/i,ut=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),a=ut(1),ue=ut(2),me=ut(3),k=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Tt=new WeakMap,S=E.createTreeWalker(E,129);function Lt(r,t){if(!pt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return At!==void 0?At.createHTML(t):t}var te=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=R;for(let c=0;c<e;c++){let l=r[c],p,g,d=-1,y=0;for(;y<l.length&&(n.lastIndex=y,g=n.exec(l),g!==null);)y=n.lastIndex,n===R?g[1]==="!--"?n=St:g[1]!==void 0?n=Et:g[2]!==void 0?(Rt.test(g[2])&&(i=RegExp("</"+g[2],"g")),n=A):g[3]!==void 0&&(n=A):n===A?g[0]===">"?(n=i??R,d=-1):g[1]===void 0?d=-2:(d=n.lastIndex-g[2].length,p=g[1],n=g[3]===void 0?A:g[3]==='"'?Ct:kt):n===Ct||n===kt?n=A:n===St||n===Et?n=R:(n=A,i=void 0);let v=n===A&&r[c+1].startsWith("/>")?" ":"";o+=n===R?l+Xt:d>=0?(s.push(p),l.slice(0,d)+Pt+l.slice(d)+w+v):l+w+(d===-2?c:v)}return[Lt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},U=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,c=t.length-1,l=this.parts,[p,g]=te(t,e);if(this.el=r.createElement(p,s),S.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=S.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(Pt)){let y=g[n++],v=i.getAttribute(d).split(w),V=/([.?@])?(.*)/.exec(y);l.push({type:1,index:o,name:V[2],strings:v,ctor:V[1]==="."?at:V[1]==="?"?lt:V[1]==="@"?ct:T}),i.removeAttribute(d)}else d.startsWith(w)&&(l.push({type:6,index:o}),i.removeAttribute(d));if(Rt.test(i.tagName)){let d=i.textContent.split(w),y=d.length-1;if(y>0){i.textContent=Y?Y.emptyScript:"";for(let v=0;v<y;v++)i.append(d[v],L()),S.nextNode(),l.push({type:2,index:++o});i.append(d[y],L())}}}else if(i.nodeType===8)if(i.data===Ot)l.push({type:2,index:o});else{let d=-1;for(;(d=i.data.indexOf(w,d+1))!==-1;)l.push({type:7,index:o}),d+=w.length-1}o++}}static createElement(t,e){let s=E.createElement("template");return s.innerHTML=t,s}};function C(r,t,e=r,s){if(t===k)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=M(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=C(r,i._$AS(r,t.values),i,s)),t}var nt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??E).importNode(e,!0);S.currentNode=i;let o=S.nextNode(),n=0,c=0,l=s[0];for(;l!==void 0;){if(n===l.index){let p;l.type===2?p=new I(o,o.nextSibling,this,t):l.type===1?p=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(p=new dt(o,this,t)),this._$AV.push(p),l=s[++c]}n!==l?.index&&(o=S.nextNode(),n++)}return S.currentNode=E,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},I=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),M(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Qt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(Lt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new nt(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=Tt.get(t.strings);return e===void 0&&Tt.set(t.strings,e=new U(t)),e}k(t){pt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(L()),this.O(L()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=wt(t).nextSibling;wt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=C(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==k,n&&(this._$AH=t);else{let c=t,l,p;for(t=o[0],l=0;l<o.length-1;l++)p=C(this,c[s+l],e,l),p===k&&(p=this._$AH[l]),n||=!M(p)||p!==this._$AH[l],p===u?t=u:t!==u&&(t+=(p??"")+o[l+1]),this._$AH[l]=p}n&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},at=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},lt=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},ct=class extends T{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??u)===k)return;let s=this._$AH,i=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==u&&(s===u||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},dt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}};var ee=ht.litHtmlPolyfillSupport;ee?.(U,I),(ht.litHtmlVersions??=[]).push("3.3.3");var Mt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new I(t.insertBefore(L(),o),o,void 0,e??{})}return i._$AI(r),i};var mt=globalThis,m=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};m._$litElement$=!0,m.finalized=!0,mt.litElementHydrateSupport?.({LitElement:m});var se=mt.litElementPolyfillSupport;se?.({LitElement:m});(mt.litElementVersions??=[]).push("4.2.2");var Ut="message_board",J=class{constructor(t){this._connection=t}subscribe(t){return this._connection.subscribeMessage(t,{type:`${Ut}/subscribe`})}create(t,{title:e,text:s,tags:i,priority:o}){return this._send("create",{recipient:t,title:e,text:s,tags:i,priority:o})}update(t,e){return this._send("update",{thread_id:t,...e})}delete(t){return this._send("delete",{thread_id:t})}reply(t,e){return this._send("reply",{thread_id:t,text:e})}editComment(t,e,s){return this._send("edit",{thread_id:t,message_id:e,text:s})}memes(){return this._send("memes",{})}react(t,e,s){return this._send("react",{thread_id:t,message_id:e,emoji:s})}setArchived(t,e){return this._send("archive",{thread_id:t,archived:e})}markRead(t){return this._send("mark_read",{thread_id:t})}_send(t,e){return this._connection.sendMessagePromise({type:`${Ut}/${t}`,...e})}};var f=_`
  button {
    font: inherit;
    padding: 4px 12px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    color: var(--text-primary-color);
    background: var(--primary-color);
  }
  button.secondary {
    color: var(--primary-text-color);
    background: var(--secondary-background-color);
  }
  button.plain {
    padding: 2px 6px;
    color: var(--secondary-text-color);
    background: none;
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .meta {
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }
  .dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary-color);
  }

  /* Priority colour, set once per class and reused by borders, badges and buttons. */
  /* Info and Niedrig share the calm grey: both mean "can wait". */
  .prio-info,
  .prio-low {
    --prio-color: var(--disabled-text-color, #9e9e9e);
  }
  .prio-normal {
    --prio-color: var(--primary-color);
  }
  .prio-high {
    --prio-color: var(--error-color, #db4437);
  }
  button[class^="prio-"],
  .prio-badge {
    color: var(--text-primary-color);
    background: var(--prio-color);
  }
  .prio-badge {
    padding: 0 8px;
    border-radius: 10px;
    font-size: 0.8em;
  }
  img.meme {
    display: block;
    max-width: 100%;
    max-height: 160px;
    margin: 4px 0;
    border-radius: 8px;
  }
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    border-radius: 10px;
    font-size: 0.8em;
    color: var(--primary-text-color);
    background: rgba(var(--rgb-primary-color), 0.15);
  }
`;function $(r,t){customElements.get(r)||customElements.define(r,t)}var ie=[["year",31536e3],["month",2592e3],["week",604800],["day",86400],["hour",3600],["minute",60]];function N(r,t){let e=new Intl.RelativeTimeFormat(t,{numeric:"auto"}),s=r-Date.now()/1e3;for(let[i,o]of ie)if(Math.abs(s)>=o)return e.format(Math.round(s/o),i);return e.format(0,"second")}var Z={info:"Info",low:"Niedrig",normal:"Normal",high:"Hoch"},D={time:{label:"Neueste",apply:r=>r},priority:{label:"Priorit\xE4t",apply:(r,t)=>[...r].sort((e,s)=>t.indexOf(s.priority)-t.indexOf(e.priority))}};function It(r){let t=new Map;for(let e of r.flatMap(s=>s.tags))t.set(e.toLowerCase(),e);return[...t.values()].sort((e,s)=>e.localeCompare(s))}var Nt=()=>window.confirm("Post mit allen Kommentaren l\xF6schen?"),Dt=r=>r.messages[r.messages.length-1],re=(r,t)=>r.sender===t?r.recipient:r.sender;function Ht(r,t){let e=r.messages.filter(i=>i.author===t);return e.length?(r.last_read[re(r,t)]??0)>=e[e.length-1].created?"read":"new":null}function zt(r,t){let e=r.selectionStart??r.value.length,s=r.selectionEnd??e;return r.value.slice(0,e)+t+r.value.slice(s)}function b(r,t){r.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:t?.message??String(t)},bubbles:!0,composed:!0}))}var H=class extends m{constructor(){super(),this.items=[],this._onOutsideClick=t=>{t.composedPath().includes(this)||(this._open=!1)}}show(){this._open=!0}updated(t){if(!t.has("_open"))return;let e=this._open?"addEventListener":"removeEventListener";document[e]("click",this._onOutsideClick,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick,!0)}render(){return a`
      <button class="plain" title="Aktionen" @click=${()=>this._open=!this._open}>⋮</button>
      ${this._open?a`<div class="popup" role="menu">
              ${this.items.map(t=>a`
                  <button
                    role="menuitem"
                    class="plain ${t.danger?"danger":""}"
                    @click=${()=>this._select(t)}
                  >
                    ${t.label}
                  </button>
                `)}
            </div>`:""}
    `}_select(t){this._open=!1,t.action()}};h(H,"properties",{items:{attribute:!1},_open:{state:!0}}),h(H,"styles",[f,_`
      :host {
        position: relative;
        display: inline-block;
      }
      :host > button {
        font-size: 1.2em;
        line-height: 1;
      }
      .popup {
        position: absolute;
        right: 0;
        z-index: 10;
        display: flex;
        flex-direction: column;
        min-width: 160px;
        padding: 4px 0;
        border-radius: 8px;
        background: var(--card-background-color);
        box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.25));
      }
      .popup button {
        padding: 8px 16px;
        border-radius: 0;
        text-align: left;
        color: var(--primary-text-color);
      }
      .popup button:hover {
        background: var(--secondary-background-color);
      }
      .popup button.danger {
        color: var(--error-color);
      }
    `]);$("mb-menu",H);var z=class extends m{render(){return a`
      <button class="plain" title="GIF einfügen" @click=${this._toggle}>GIF</button>
      ${this._memes?a`<div class="popup">${this._renderGallery()}</div>`:""}
    `}_renderGallery(){return this._memes.length?this._memes.map(t=>a`
        <button class="meme" title=":${t.name}:" @click=${()=>this._select(t.name)}>
          <img src=${t.url} alt=":${t.name}:" loading="lazy" />
        </button>
      `):a`<div class="empty meta">
        Noch keine GIFs. Lege Dateien in <code>/config/message_board/memes/</code> ab; der Dateiname
        ist das Kürzel.
      </div>`}async _toggle(){if(this._memes){this._memes=null;return}try{this._memes=await this.loadMemes()}catch(t){b(this,t)}}_select(t){this._memes=null,this.dispatchEvent(new CustomEvent("meme-select",{detail:t}))}};h(z,"properties",{loadMemes:{attribute:!1},_memes:{state:!0}}),h(z,"styles",[f,_`
      :host {
        position: relative;
        display: inline-block;
      }
      .popup {
        position: absolute;
        bottom: 100%;
        left: 0;
        z-index: 10;
        display: grid;
        grid-template-columns: repeat(auto-fill, 72px);
        gap: 4px;
        width: min(320px, 80vw);
        max-height: 240px;
        overflow-y: auto;
        padding: 8px;
        border-radius: 8px;
        background: var(--card-background-color);
        box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.25));
      }
      button.meme {
        padding: 0;
        border-radius: 6px;
        background: none;
      }
      button.meme img {
        display: block;
        width: 72px;
        height: 72px;
        object-fit: cover;
        border-radius: 6px;
      }
      .empty {
        grid-column: 1 / -1;
      }
    `]);$("mb-meme-picker",z);var oe=/:([a-z0-9_-]+):/gi;function gt(r,t){let e=[],s=0;for(let i of r.matchAll(oe)){let o=t.get(i[1].toLowerCase());o&&(e.push(r.slice(s,i.index)),e.push(a`<img class="meme" src=${o} alt=${i[0]} title=${i[0]} />`),s=i.index+i[0].length)}return e.push(r.slice(s)),e}function X(r,t,e){return r?a`<mb-meme-picker
    .loadMemes=${r}
    @meme-select=${s=>e(zt(t(),`:${s.detail}: `))}
  ></mb-meme-picker>`:""}var Q=r=>a`
  ${r.priority==="normal"?"":a`<span class="prio-badge prio-${r.priority}"
          >${Z[r.priority]}</span
        >`}
  ${r.tags.map(t=>a`<span class="tag">${t}</span>`)}
`;function tt(r,t,e,{edit:s,leave:i}={}){let o=c=>c.catch(l=>b(r,l)),n=!e.archived;return[...s?[{label:"Bearbeiten",action:s}]:[],{label:n?"Archivieren":"Wiederherstellen",action:()=>{o(t.api.setArchived(e.id,n)),n&&i?.()}},{label:"L\xF6schen",danger:!0,action:()=>{Nt()&&(o(t.api.delete(e.id)),i?.())}}]}function et(r){r.preventDefault(),r.currentTarget.querySelector("mb-menu")?.show()}var B=class extends m{constructor(){super(),this.title="",this.text="",this.tags=[],this.priority="normal",this.suggestions=[],this.label="Senden",this._tagDraft=""}render(){let t=this.suggestions.filter(e=>!this._hasTag(e));return a`
      ${this.withContent?a`<input
                class="title"
                .value=${this.title}
                placeholder=${this.placeholder??"Titel"}
                maxlength="120"
                ?disabled=${this._busy}
                @input=${e=>this.title=e.target.value}
                @keydown=${e=>e.key==="Enter"&&this._submit()}
              />
              <textarea
                rows="2"
                .value=${this.text}
                placeholder="Details (optional)"
                ?disabled=${this._busy}
                @input=${e=>this.text=e.target.value}
                @keydown=${e=>e.key==="Enter"&&(e.ctrlKey||e.metaKey)&&this._submit()}
              ></textarea>`:""}
      <div class="row">
        <div class="tags">
          ${this.tags.map(e=>a`<span class="tag"
                >${e}<button class="plain" title="Entfernen" @click=${()=>this._removeTag(e)}>
                  ×
                </button></span
              >`)}
          <input
            list="known-tags"
            placeholder="+ Tag"
            .value=${this._tagDraft}
            @input=${this._onTagInput}
            @keydown=${this._onTagKeyDown}
            @blur=${this._commitTag}
          />
          <datalist id="known-tags">
            ${t.map(e=>a`<option value=${e}></option>`)}
          </datalist>
        </div>
        <div class="priority" role="radiogroup" aria-label="Priorität">
          ${this.priorities.map(e=>a`<button
                role="radio"
                aria-checked=${e===this.priority}
                class=${e===this.priority?`prio-${e}`:"secondary"}
                @click=${()=>this.priority=e}
              >
                ${Z[e]}
              </button>`)}
        </div>
      </div>
      <div class="actions">
        ${this.withContent?X(this.loadMemes,()=>this.renderRoot.querySelector("textarea"),e=>this.text=e):""}
        <span class="spacer"></span>
        ${this.cancelable?a`<button
                class="secondary"
                @click=${()=>this.dispatchEvent(new Event("cancel"))}
              >
                Abbrechen
              </button>`:""}
        <button
          ?disabled=${this._busy||this.withContent&&!this.title.trim()}
          @click=${this._submit}
        >
          ${this.label}
        </button>
      </div>
    `}_hasTag(t){return this.tags.some(e=>e.toLowerCase()===t.toLowerCase())}_onTagInput(t){this._tagDraft=t.target.value,(t.inputType==="insertReplacementText"||t.inputType===void 0)&&this._commitTag()}_onTagKeyDown(t){t.key==="Enter"||t.key===","?(t.preventDefault(),this._commitTag()):t.key==="Backspace"&&!this._tagDraft&&this.tags.length&&(this.tags=this.tags.slice(0,-1))}_commitTag(){let t=this._tagDraft.trim();t&&!this._hasTag(t)&&(this.tags=[...this.tags,t]),this._tagDraft=""}_removeTag(t){this.tags=this.tags.filter(e=>e!==t)}async _submit(){if(!this._busy){this._commitTag(),this._busy=!0;try{let{title:t,text:e,tags:s,priority:i}=this;await this.send({title:t,text:e,tags:s,priority:i}),this.title="",this.text="",this.tags=[],this.priority="normal"}catch(t){b(this,t)}finally{this._busy=!1}}}};h(B,"properties",{send:{attribute:!1},priorities:{attribute:!1},suggestions:{attribute:!1},title:{type:String},text:{type:String},tags:{attribute:!1},priority:{type:String},withContent:{type:Boolean},cancelable:{type:Boolean},loadMemes:{attribute:!1},placeholder:{type:String},label:{type:String},_tagDraft:{state:!0},_busy:{state:!0}}),h(B,"styles",[f,_`
      :host {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      textarea,
      input {
        box-sizing: border-box;
        font: inherit;
        color: var(--primary-text-color);
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }
      textarea {
        width: 100%;
        padding: 8px;
        resize: vertical;
      }
      input.title {
        width: 100%;
        padding: 8px;
        font-weight: 500;
      }
      .tags input {
        flex: 1;
        min-width: 80px;
        padding: 2px 8px;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .tags {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        min-width: 180px;
      }
      .tag button {
        padding: 0 0 0 4px;
      }
      .priority {
        display: flex;
        gap: 4px;
      }
      .priority button {
        padding: 2px 10px;
        font-size: 0.9em;
      }
      .spacer {
        flex: 1;
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `]);$("mb-post-form",B);var K=class extends m{constructor(){super(),this.value="",this.label="Senden"}render(){return a`
      <textarea
        rows="2"
        .value=${this.value}
        placeholder=${this.placeholder??""}
        ?disabled=${this._busy}
        @input=${t=>this.value=t.target.value}
        @keydown=${this._onKeyDown}
      ></textarea>
      <div class="actions">
        ${X(this.loadMemes,()=>this.renderRoot.querySelector("textarea"),t=>this.value=t)}
        <span class="spacer"></span>
        ${this.cancelable?a`<button
                class="secondary"
                @click=${()=>this.dispatchEvent(new Event("cancel"))}
              >
                Abbrechen
              </button>`:""}
        <button ?disabled=${this._busy||!this.value.trim()} @click=${this._submit}>
          ${this.label}
        </button>
      </div>
    `}_onKeyDown(t){t.key==="Enter"&&(t.ctrlKey||t.metaKey)&&this._submit()}async _submit(){if(!(!this.value.trim()||this._busy)){this._busy=!0;try{await this.send(this.value),this.value=""}catch(t){b(this,t)}finally{this._busy=!1}}}};h(K,"properties",{send:{attribute:!1},value:{type:String},placeholder:{type:String},label:{type:String},cancelable:{type:Boolean},loadMemes:{attribute:!1},_busy:{state:!0}}),h(K,"styles",[f,_`
      :host {
        display: block;
      }
      textarea {
        box-sizing: border-box;
        width: 100%;
        resize: vertical;
        padding: 8px;
        font: inherit;
        color: var(--primary-text-color);
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }
      .spacer {
        flex: 1;
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
      }
    `]);$("mb-composer",K);var j=class extends m{constructor(){super(...arguments);h(this,"_back",()=>this.dispatchEvent(new Event("back")))}connectedCallback(){super.connectedCallback(),this._editingPost=this.startEditing}get _post(){return this.thread.messages[0]}get _comments(){return this.thread.messages.slice(1)}render(){let e=this._comments;return a`
      <button class="plain back" @click=${this._back}>← Zurück</button>
      ${this._editingPost?this._renderPostForm():this._renderPost()}
      <h4>Kommentare${e.length?` (${e.length})`:""}</h4>
      <div class="comments">${e.map(s=>this._renderComment(s))}</div>
      <mb-composer
        placeholder="Kommentieren…"
        .loadMemes=${this.ctx.loadMemes}
        .send=${s=>this.ctx.api.reply(this.thread.id,s)}
      ></mb-composer>
    `}_renderPost(){let{thread:e,ctx:s}=this,i=this._post;return a`
      <article class="post prio-${e.priority}" @contextmenu=${et}>
        <header>
          <span class="meta">
            ${s.names[e.sender]} → ${s.names[e.recipient]} ·
            ${N(i.created,s.language)}${i.edited?" \xB7 bearbeitet":""}
          </span>
          <mb-menu
            .items=${tt(this,s,e,{edit:()=>this._editingPost=!0,leave:this._back})}
          ></mb-menu>
        </header>
        <h2>${e.title}</h2>
        <div class="properties">${Q(e)}</div>
        ${i.text?a`<div class="text">${gt(i.text,s.memes)}</div>`:""}
        ${this._renderReactions(i)}
      </article>
    `}_renderPostForm(){let{thread:e,ctx:s}=this;return a`
      <mb-post-form
        class="post prio-${e.priority}"
        cancelable
        label="Speichern"
        ?withContent=${this._post.author===s.me}
        .title=${e.title}
        .text=${this._post.text}
        .tags=${e.tags}
        .priority=${e.priority}
        .priorities=${s.priorities}
        .suggestions=${s.knownTags}
        .loadMemes=${s.loadMemes}
        .send=${i=>this._savePost(i)}
        @cancel=${()=>this._editingPost=!1}
      ></mb-post-form>
    `}_renderComment(e){let{ctx:s}=this,i=e.author===s.me,o=this._editingComment===e.id;return a`
      <div class="comment ${i?"mine":""}">
        <div class="meta">
          ${s.names[e.author]} · ${N(e.created,s.language)}
          ${e.edited?" \xB7 bearbeitet":""}
        </div>
        ${o?a`<mb-composer
                cancelable
                label="Speichern"
                .value=${e.text}
                .loadMemes=${s.loadMemes}
                .send=${n=>this._saveComment(e.id,n)}
                @cancel=${()=>this._editingComment=null}
              ></mb-composer>`:a`<div class="text">${gt(e.text,s.memes)}</div>`}
        ${this._renderReactions(e,i&&!o?a`<button class="plain" @click=${()=>this._editingComment=e.id}>
                Bearbeiten
              </button>`:"")}
      </div>
    `}_renderReactions(e,s=""){let{ctx:i}=this;return a`
      <div class="reactions">
        ${Object.entries(e.reactions).map(([o,n])=>a`
            <button
              class="chip ${n.includes(i.me)?"own":""}"
              title=${n.map(c=>i.names[c]).join(", ")}
              @click=${()=>this._react(e.id,o)}
            >
              ${o} ${n.length}
            </button>
          `)}
        <button class="plain" title="Reagieren" @click=${()=>this._togglePicker(e.id)}>
          ☺＋
        </button>
        ${s}
      </div>
      ${this._picker===e.id?a`<div class="picker">
              ${i.reactions.map(o=>a`<button class="plain" @click=${()=>this._react(e.id,o)}>
                    ${o}
                  </button>`)}
            </div>`:""}
    `}_togglePicker(e){this._picker=this._picker===e?null:e}async _savePost({title:e,text:s,tags:i,priority:o}){let n={tags:i,priority:o};e.trim()!==this.thread.title&&(n.title=e),s.trim()!==this._post.text&&(n.text=s),await this.ctx.api.update(this.thread.id,n),this._editingPost=!1}async _saveComment(e,s){await this.ctx.api.editComment(this.thread.id,e,s),this._editingComment=null}_react(e,s){this._picker=null,this.ctx.api.react(this.thread.id,e,s).catch(i=>b(this,i))}};h(j,"properties",{thread:{attribute:!1},ctx:{attribute:!1},startEditing:{type:Boolean},_editingPost:{state:!0},_editingComment:{state:!0},_picker:{state:!0}}),h(j,"styles",[f,_`
      :host {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .back {
        align-self: flex-start;
      }
      .post {
        padding: 16px;
        border-radius: 12px;
        border-left: 4px solid var(--prio-color);
        background: var(--secondary-background-color);
      }
      .post header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .post h2 {
        margin: 8px 0 4px;
        font-size: 1.3em;
        font-weight: 500;
        overflow-wrap: anywhere;
      }
      .post .text {
        font-size: 1.05em;
        margin: 8px 0;
      }
      .properties {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 4px;
      }
      h4 {
        margin: 4px 0 0;
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      .comments {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .comment {
        max-width: 85%;
        padding: 8px 12px;
        border-radius: 12px 12px 12px 4px;
        background: var(--secondary-background-color);
      }
      .comment.mine {
        align-self: flex-end;
        border-radius: 12px 12px 4px 12px;
        background: rgba(var(--rgb-primary-color), 0.15);
      }
      .text {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        margin: 2px 0;
      }
      .reactions,
      .picker {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
      }
      .chip {
        padding: 0 8px;
        color: var(--primary-text-color);
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
      }
      .chip.own {
        border-color: var(--primary-color);
      }
      .picker button {
        font-size: 1.3em;
      }
    `]);$("mb-thread",j);var ne={new:"\u25CF Neu",read:"\u2713 Gelesen"},_t="message-board-sort",q=class extends m{constructor(){super();h(this,"_loadMemes",async()=>{let e=await this._api.memes();return this._memes=new Map(e.map(s=>[s.name,s.url])),e});this._sort=Bt(_t)in D?Bt(_t):"time"}setConfig(e){this._config=e}set hass(e){this._hass=e,this._subscribe()}getCardSize(){return 6}static getStubConfig(){return{}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._subscription?.then(e=>e()).catch(()=>{}),this._subscription=null}_subscribe(){this._subscription||!this._hass||!this.isConnected||(this._api=new J(this._hass.connection),this._subscription=this._api.subscribe(e=>{this._data={...this._data,...e}}),this._subscription.then(()=>this._loadMemes()).catch(()=>{}),this._subscription.catch(e=>{this._error=e.message,this._subscription=null}))}updated(){this._markOpenThreadRead()}_markOpenThreadRead(){let e=this._openThread;!e?.unread||this._markingRead===e.id||(this._markingRead=e.id,this._api.markRead(e.id).catch(s=>b(this,s)).finally(()=>this._markingRead=null))}get _openThread(){return this._data?.threads.find(e=>e.id===this._openThreadId)}get _ctx(){let{me:e,users:s,reactions:i,priorities:o,threads:n}=this._data;return{api:this._api,me:e,reactions:i,priorities:o,knownTags:It(n),memes:this._memes??new Map,loadMemes:this._loadMemes,names:Object.fromEntries(s.map(c=>[c.id,c.name])),language:this._hass.locale?.language??this._hass.language}}_inboxes(){let{me:e,users:s,threads:i}=this._data,o=s.filter(n=>n.id!==e);return[{id:e,title:"Meine Inbox",threads:i.filter(n=>n.recipient===e)},...o.map(n=>({id:n.id,title:`Inbox ${n.name}`,composeTo:n,threads:i.filter(c=>c.recipient===n.id&&c.sender===e)}))]}render(){if(this._error)return a`<ha-card><div class="empty">${this._error}</div></ha-card>`;if(!this._data)return a`<ha-card><div class="empty">Lädt…</div></ha-card>`;let e=this._ctx,s=this._openThread;return a`
      <ha-card>
        ${s?a`<mb-thread
                .thread=${s}
                .ctx=${e}
                ?startEditing=${this._editOnOpen}
                @back=${()=>this._openThreadId=null}
              ></mb-thread>`:this._renderInboxes(e)}
      </ha-card>
    `}_renderInboxes(e){let s=this._inboxes(),i=this._activeInbox??e.me;return a`
      <div class="toolbar">
        <nav class="tabs">
          ${s.map(o=>a`
              <button
                class=${o.id===i?"":"secondary"}
                @click=${()=>this._activeInbox=o.id}
              >
                ${o.title} ${this._renderBadge(o)}
              </button>
            `)}
        </nav>
        <button class="plain sort" title="Sortierung wechseln" @click=${this._toggleSort}>
          ⇅ ${D[this._sort].label}
        </button>
      </div>
      <div class="inboxes">
        ${s.map(o=>a`
            <section class=${o.id===i?"active":""}>
              <h3>${o.title} ${this._renderBadge(o)}</h3>
              ${o.composeTo?a`<mb-post-form
                      withContent
                      placeholder="Neuer Post an ${o.composeTo.name}…"
                      .priorities=${e.priorities}
                      .suggestions=${e.knownTags}
                      .loadMemes=${e.loadMemes}
                      .send=${n=>e.api.create(o.composeTo.id,n)}
                    ></mb-post-form>`:""}
              ${this._renderThreadList(D[this._sort].apply(o.threads.filter(n=>!n.archived),e.priorities),e)}
              ${this._renderArchive(o.threads.filter(n=>n.archived),e)}
            </section>
          `)}
      </div>
    `}_renderBadge(e){let s=e.threads.filter(i=>i.unread).length;return s?a`<span class="badge">${s}</span>`:""}_renderArchive(e,s){return e.length?a`
      <details>
        <summary class="meta">Archiv (${e.length})</summary>
        ${this._renderThreadList(e,s)}
      </details>
    `:""}_renderThreadList(e,s){return e.length?a`<ul>
      ${e.map(i=>this._renderThreadItem(i,s))}
    </ul>`:a`<div class="empty meta">Keine Nachrichten</div>`}_renderThreadItem(e,s){let i=e.messages.length-1,o=Ht(e,s.me);return a`
      <li
        class="post prio-${e.priority} ${e.unread?"unread":""}"
        @contextmenu=${et}
      >
        <button class="open" @click=${()=>this._open(e.id)}>
          <span class="headline">
            ${e.unread?a`<span class="dot"></span>`:""}
            <span class="title">${e.title}</span>
          </span>
          ${e.messages[0].text?a`<span class="preview">${e.messages[0].text}</span>`:""}
          <span class="properties">${Q(e)}</span>
          <span class="meta">
            ${N(Dt(e).created,s.language)}
            ${i?` \xB7 ${i} ${i===1?"Kommentar":"Kommentare"}`:""}
          </span>
          ${o?a`<span class="status ${o}" title="Status beim Gegenüber"
                  >${ne[o]}</span
                >`:""}
        </button>
        <mb-menu
          .items=${tt(this,s,e,{edit:()=>this._open(e.id,!0)})}
        ></mb-menu>
      </li>
    `}_open(e,s=!1){this._editOnOpen=s,this._openThreadId=e}_toggleSort(){let e=Object.keys(D);this._sort=e[(e.indexOf(this._sort)+1)%e.length],ae(_t,this._sort)}};h(q,"properties",{_data:{state:!0},_error:{state:!0},_openThreadId:{state:!0},_editOnOpen:{state:!0},_activeInbox:{state:!0},_sort:{state:!0},_memes:{state:!0}}),h(q,"styles",[f,_`
      ha-card {
        container-type: inline-size;
        padding: 16px;
      }
      .toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }
      .tabs {
        display: flex;
        gap: 8px;
      }
      .sort {
        margin-left: auto;
      }
      .inboxes {
        display: grid;
        gap: 16px;
      }
      h3 {
        margin: 0 0 8px;
        font-weight: 500;
      }
      section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0;
      }
      @container (max-width: 599px) {
        h3,
        section:not(.active) {
          display: none;
        }
      }
      @container (min-width: 600px) {
        .tabs {
          display: none;
        }
        .inboxes {
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
      }
      .badge {
        display: inline-block;
        min-width: 1.4em;
        padding: 0 4px;
        border-radius: 0.7em;
        font-size: 0.8em;
        text-align: center;
        color: var(--text-primary-color);
        background: var(--error-color);
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      li.post {
        display: flex;
        align-items: flex-start;
        border-radius: 12px;
        border-left: 4px solid var(--prio-color);
        background: var(--secondary-background-color);
      }
      li.post.unread {
        background: rgba(var(--rgb-primary-color), 0.14);
      }
      button.open {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        padding: 10px 12px;
        border-radius: 12px;
        text-align: left;
        color: var(--primary-text-color);
        background: none;
      }
      .title {
        font-weight: 500;
        overflow-wrap: anywhere;
      }
      li.post.unread .title {
        font-weight: 700;
      }
      .status {
        font-size: 0.8em;
        color: var(--secondary-text-color);
      }
      .status.new {
        color: var(--primary-color);
        font-weight: 500;
      }
      .headline {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .properties {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      li.post mb-menu {
        margin: 6px 4px 0 0;
      }
      .preview {
        color: var(--secondary-text-color);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        overflow-wrap: anywhere;
      }
      .empty {
        padding: 8px 0;
      }
      summary {
        cursor: pointer;
        padding: 4px 0;
      }
    `]);$("message-board-card",q);window.customCards=window.customCards||[];window.customCards.some(r=>r.type==="message-board-card")||window.customCards.push({type:"message-board-card",name:"Message Board",description:"Inboxen mit Posts, Tags, Priorit\xE4t und Kommentaren."});function Bt(r){try{return localStorage.getItem(r)}catch{return null}}function ae(r,t){try{localStorage.setItem(r,t)}catch{}}
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
