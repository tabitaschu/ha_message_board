var Dt=Object.defineProperty;var Mt=(r,t,e)=>t in r?Dt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var m=(r,t,e)=>Mt(r,typeof t!="symbol"?t+"":t,e);var W=globalThis,q=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tt=Symbol(),gt=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==tt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=gt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&gt.set(e,t))}return t}toString(){return this.cssText}},_t=r=>new P(typeof r=="string"?r:r+"",void 0,tt),_=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new P(e,r,tt)},ft=(r,t)=>{if(q)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=W.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},et=q?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return _t(e)})(r):r;var{is:zt,defineProperty:Bt,getOwnPropertyDescriptor:jt,getOwnPropertyNames:Kt,getOwnPropertySymbols:Vt,getPrototypeOf:Wt}=Object,Y=globalThis,$t=Y.trustedTypes,qt=$t?$t.emptyScript:"",Yt=Y.reactiveElementPolyfillSupport,O=(r,t)=>r,st={toAttribute(r,t){switch(t){case Boolean:r=r?qt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},yt=(r,t)=>!zt(r,t),bt={attribute:!0,type:String,converter:st,reflect:!1,useDefault:!1,hasChanged:yt};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=bt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Bt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=jt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let h=i?.call(this);o?.call(this,n),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??bt}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let t=Wt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let e=this.properties,s=[...Kt(e),...Vt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(et(i))}else t!==void 0&&e.push(et(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ft(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:st).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:st;this._$Em=i;let h=n.fromAttribute(e,o.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let n=this.constructor;if(i===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??yt)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,h=this[i];n!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,o,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[O("elementProperties")]=new Map,x[O("finalized")]=new Map,Yt?.({ReactiveElement:x}),(Y.reactiveElementVersions??=[]).push("2.1.2");var ct=globalThis,xt=r=>r,F=ct.trustedTypes,vt=F?F.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ct="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Tt="?"+w,Ft=`<${Tt}>`,E=document,U=()=>E.createComment(""),I=r=>r===null||typeof r!="object"&&typeof r!="function",ht=Array.isArray,Jt=r=>ht(r)||typeof r?.[Symbol.iterator]=="function",it=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wt=/-->/g,At=/>/g,A=RegExp(`>|${it}(?:([^\\s"'>=/]+)(${it}*=${it}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),St=/'/g,Et=/"/g,Pt=/^(?:script|style|textarea|title)$/i,pt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),a=pt(1),ae=pt(2),le=pt(3),k=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),kt=new WeakMap,S=E.createTreeWalker(E,129);function Ot(r,t){if(!ht(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(t):t}var Zt=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=R;for(let h=0;h<e;h++){let l=r[h],p,u,c=-1,y=0;for(;y<l.length&&(n.lastIndex=y,u=n.exec(l),u!==null);)y=n.lastIndex,n===R?u[1]==="!--"?n=wt:u[1]!==void 0?n=At:u[2]!==void 0?(Pt.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=A):u[3]!==void 0&&(n=A):n===A?u[0]===">"?(n=i??R,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?A:u[3]==='"'?Et:St):n===Et||n===St?n=A:n===wt||n===At?n=R:(n=A,i=void 0);let v=n===A&&r[h+1].startsWith("/>")?" ":"";o+=n===R?l+Ft:c>=0?(s.push(p),l.slice(0,c)+Ct+l.slice(c)+w+v):l+w+(c===-2?h:v)}return[Ot(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},L=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,h=t.length-1,l=this.parts,[p,u]=Zt(t,e);if(this.el=r.createElement(p,s),S.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=S.nextNode())!==null&&l.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(Ct)){let y=u[n++],v=i.getAttribute(c).split(w),V=/([.?@])?(.*)/.exec(y);l.push({type:1,index:o,name:V[2],strings:v,ctor:V[1]==="."?ot:V[1]==="?"?nt:V[1]==="@"?at:T}),i.removeAttribute(c)}else c.startsWith(w)&&(l.push({type:6,index:o}),i.removeAttribute(c));if(Pt.test(i.tagName)){let c=i.textContent.split(w),y=c.length-1;if(y>0){i.textContent=F?F.emptyScript:"";for(let v=0;v<y;v++)i.append(c[v],U()),S.nextNode(),l.push({type:2,index:++o});i.append(c[y],U())}}}else if(i.nodeType===8)if(i.data===Tt)l.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf(w,c+1))!==-1;)l.push({type:7,index:o}),c+=w.length-1}o++}}static createElement(t,e){let s=E.createElement("template");return s.innerHTML=t,s}};function C(r,t,e=r,s){if(t===k)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=I(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=C(r,i._$AS(r,t.values),i,s)),t}var rt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??E).importNode(e,!0);S.currentNode=i;let o=S.nextNode(),n=0,h=0,l=s[0];for(;l!==void 0;){if(n===l.index){let p;l.type===2?p=new N(o,o.nextSibling,this,t):l.type===1?p=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(p=new lt(o,this,t)),this._$AV.push(p),l=s[++h]}n!==l?.index&&(o=S.nextNode(),n++)}return S.currentNode=E,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},N=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),I(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Jt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=L.createElement(Ot(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new rt(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=kt.get(t.strings);return e===void 0&&kt.set(t.strings,e=new L(t)),e}k(t){ht(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=xt(t).nextSibling;xt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=C(this,t,e,0),n=!I(t)||t!==this._$AH&&t!==k,n&&(this._$AH=t);else{let h=t,l,p;for(t=o[0],l=0;l<o.length-1;l++)p=C(this,h[s+l],e,l),p===k&&(p=this._$AH[l]),n||=!I(p)||p!==this._$AH[l],p===d?t=d:t!==d&&(t+=(p??"")+o[l+1]),this._$AH[l]=p}n&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ot=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},nt=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},at=class extends T{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??d)===k)return;let s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},lt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}};var Gt=ct.litHtmlPolyfillSupport;Gt?.(L,N),(ct.litHtmlVersions??=[]).push("3.3.3");var Rt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new N(t.insertBefore(U(),o),o,void 0,e??{})}return i._$AI(r),i};var dt=globalThis,g=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};g._$litElement$=!0,g.finalized=!0,dt.litElementHydrateSupport?.({LitElement:g});var Xt=dt.litElementPolyfillSupport;Xt?.({LitElement:g});(dt.litElementVersions??=[]).push("4.2.2");var Ut="message_board",J=class{constructor(t){this._connection=t}subscribe(t){return this._connection.subscribeMessage(t,{type:`${Ut}/subscribe`})}create(t,{title:e,text:s,tags:i,priority:o}){return this._send("create",{recipient:t,title:e,text:s,tags:i,priority:o})}update(t,e){return this._send("update",{thread_id:t,...e})}delete(t){return this._send("delete",{thread_id:t})}reply(t,e){return this._send("reply",{thread_id:t,text:e})}editComment(t,e,s){return this._send("edit",{thread_id:t,message_id:e,text:s})}react(t,e,s){return this._send("react",{thread_id:t,message_id:e,emoji:s})}setArchived(t,e){return this._send("archive",{thread_id:t,archived:e})}markRead(t){return this._send("mark_read",{thread_id:t})}_send(t,e){return this._connection.sendMessagePromise({type:`${Ut}/${t}`,...e})}};var f=_`
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
  .prio-info {
    --prio-color: var(--info-color, #039be5);
  }
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
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    border-radius: 10px;
    font-size: 0.8em;
    color: var(--primary-text-color);
    background: rgba(var(--rgb-primary-color), 0.15);
  }
`;function $(r,t){customElements.get(r)||customElements.define(r,t)}var Qt=[["year",31536e3],["month",2592e3],["week",604800],["day",86400],["hour",3600],["minute",60]];function H(r,t){let e=new Intl.RelativeTimeFormat(t,{numeric:"auto"}),s=r-Date.now()/1e3;for(let[i,o]of Qt)if(Math.abs(s)>=o)return e.format(Math.round(s/o),i);return e.format(0,"second")}var Z={info:"Info",low:"Niedrig",normal:"Normal",high:"Hoch"},D={time:{label:"Neueste",apply:r=>r},priority:{label:"Priorit\xE4t",apply:(r,t)=>[...r].sort((e,s)=>t.indexOf(s.priority)-t.indexOf(e.priority))}};function It(r){let t=new Map;for(let e of r.flatMap(s=>s.tags))t.set(e.toLowerCase(),e);return[...t.values()].sort((e,s)=>e.localeCompare(s))}var Lt=()=>window.confirm("Post mit allen Kommentaren l\xF6schen?"),ut=r=>r.messages[r.messages.length-1],te=(r,t)=>r.sender===t?r.recipient:r.sender;function Nt(r,t){let e=ut(r);return e.author!==t?!1:(r.last_read[te(r,t)]??0)>=e.created}function b(r,t){r.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:t?.message??String(t)},bubbles:!0,composed:!0}))}var M=class extends g{constructor(){super(),this.items=[],this._onOutsideClick=t=>{t.composedPath().includes(this)||(this._open=!1)}}show(){this._open=!0}updated(t){if(!t.has("_open"))return;let e=this._open?"addEventListener":"removeEventListener";document[e]("click",this._onOutsideClick,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick,!0)}render(){return a`
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
    `}_select(t){this._open=!1,t.action()}};m(M,"properties",{items:{attribute:!1},_open:{state:!0}}),m(M,"styles",[f,_`
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
    `]);$("mb-menu",M);var G=r=>a`
  ${r.priority==="normal"?"":a`<span class="prio-badge prio-${r.priority}"
          >${Z[r.priority]}</span
        >`}
  ${r.tags.map(t=>a`<span class="tag">${t}</span>`)}
`;function X(r,t,e,{edit:s,leave:i}={}){let o=h=>h.catch(l=>b(r,l)),n=!e.archived;return[...s?[{label:"Bearbeiten",action:s}]:[],{label:n?"Archivieren":"Wiederherstellen",action:()=>{o(t.api.setArchived(e.id,n)),n&&i?.()}},{label:"L\xF6schen",danger:!0,action:()=>{Lt()&&(o(t.api.delete(e.id)),i?.())}}]}function Q(r){r.preventDefault(),r.currentTarget.querySelector("mb-menu")?.show()}var z=class extends g{constructor(){super(),this.title="",this.text="",this.tags=[],this.priority="normal",this.suggestions=[],this.label="Senden",this._tagDraft=""}render(){let t=this.suggestions.filter(e=>!this._hasTag(e));return a`
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
    `}_hasTag(t){return this.tags.some(e=>e.toLowerCase()===t.toLowerCase())}_onTagInput(t){this._tagDraft=t.target.value,(t.inputType==="insertReplacementText"||t.inputType===void 0)&&this._commitTag()}_onTagKeyDown(t){t.key==="Enter"||t.key===","?(t.preventDefault(),this._commitTag()):t.key==="Backspace"&&!this._tagDraft&&this.tags.length&&(this.tags=this.tags.slice(0,-1))}_commitTag(){let t=this._tagDraft.trim();t&&!this._hasTag(t)&&(this.tags=[...this.tags,t]),this._tagDraft=""}_removeTag(t){this.tags=this.tags.filter(e=>e!==t)}async _submit(){if(!this._busy){this._commitTag(),this._busy=!0;try{let{title:t,text:e,tags:s,priority:i}=this;await this.send({title:t,text:e,tags:s,priority:i}),this.title="",this.text="",this.tags=[],this.priority="normal"}catch(t){b(this,t)}finally{this._busy=!1}}}};m(z,"properties",{send:{attribute:!1},priorities:{attribute:!1},suggestions:{attribute:!1},title:{type:String},text:{type:String},tags:{attribute:!1},priority:{type:String},withContent:{type:Boolean},cancelable:{type:Boolean},placeholder:{type:String},label:{type:String},_tagDraft:{state:!0},_busy:{state:!0}}),m(z,"styles",[f,_`
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
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    `]);$("mb-post-form",z);var B=class extends g{constructor(){super(),this.value="",this.label="Senden"}render(){return a`
      <textarea
        rows="2"
        .value=${this.value}
        placeholder=${this.placeholder??""}
        ?disabled=${this._busy}
        @input=${t=>this.value=t.target.value}
        @keydown=${this._onKeyDown}
      ></textarea>
      <div class="actions">
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
    `}_onKeyDown(t){t.key==="Enter"&&(t.ctrlKey||t.metaKey)&&this._submit()}async _submit(){if(!(!this.value.trim()||this._busy)){this._busy=!0;try{await this.send(this.value),this.value=""}catch(t){b(this,t)}finally{this._busy=!1}}}};m(B,"properties",{send:{attribute:!1},value:{type:String},placeholder:{type:String},label:{type:String},cancelable:{type:Boolean},_busy:{state:!0}}),m(B,"styles",[f,_`
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
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 4px;
      }
    `]);$("mb-composer",B);var j=class extends g{constructor(){super(...arguments);m(this,"_back",()=>this.dispatchEvent(new Event("back")))}connectedCallback(){super.connectedCallback(),this._editingPost=this.startEditing}get _post(){return this.thread.messages[0]}get _comments(){return this.thread.messages.slice(1)}render(){let e=this._comments;return a`
      <button class="plain back" @click=${this._back}>← Zurück</button>
      ${this._editingPost?this._renderPostForm():this._renderPost()}
      <h4>Kommentare${e.length?` (${e.length})`:""}</h4>
      <div class="comments">${e.map(s=>this._renderComment(s))}</div>
      <mb-composer
        placeholder="Kommentieren…"
        .send=${s=>this.ctx.api.reply(this.thread.id,s)}
      ></mb-composer>
    `}_renderPost(){let{thread:e,ctx:s}=this,i=this._post;return a`
      <article class="post prio-${e.priority}" @contextmenu=${Q}>
        <header>
          <span class="meta">
            ${s.names[e.sender]} → ${s.names[e.recipient]} ·
            ${H(i.created,s.language)}${i.edited?" \xB7 bearbeitet":""}
          </span>
          <mb-menu
            .items=${X(this,s,e,{edit:()=>this._editingPost=!0,leave:this._back})}
          ></mb-menu>
        </header>
        <h2>${e.title}</h2>
        <div class="properties">${G(e)}</div>
        ${i.text?a`<div class="text">${i.text}</div>`:""}
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
        .send=${i=>this._savePost(i)}
        @cancel=${()=>this._editingPost=!1}
      ></mb-post-form>
    `}_renderComment(e){let{ctx:s}=this,i=e.author===s.me,o=this._editingComment===e.id;return a`
      <div class="comment ${i?"mine":""}">
        <div class="meta">
          ${s.names[e.author]} · ${H(e.created,s.language)}
          ${e.edited?" \xB7 bearbeitet":""}
        </div>
        ${o?a`<mb-composer
                cancelable
                label="Speichern"
                .value=${e.text}
                .send=${n=>this._saveComment(e.id,n)}
                @cancel=${()=>this._editingComment=null}
              ></mb-composer>`:a`<div class="text">${e.text}</div>`}
        ${this._renderReactions(e,i&&!o?a`<button class="plain" @click=${()=>this._editingComment=e.id}>
                Bearbeiten
              </button>`:"")}
      </div>
    `}_renderReactions(e,s=""){let{ctx:i}=this;return a`
      <div class="reactions">
        ${Object.entries(e.reactions).map(([o,n])=>a`
            <button
              class="chip ${n.includes(i.me)?"own":""}"
              title=${n.map(h=>i.names[h]).join(", ")}
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
    `}_togglePicker(e){this._picker=this._picker===e?null:e}async _savePost({title:e,text:s,tags:i,priority:o}){let n={tags:i,priority:o};e.trim()!==this.thread.title&&(n.title=e),s.trim()!==this._post.text&&(n.text=s),await this.ctx.api.update(this.thread.id,n),this._editingPost=!1}async _saveComment(e,s){await this.ctx.api.editComment(this.thread.id,e,s),this._editingComment=null}_react(e,s){this._picker=null,this.ctx.api.react(this.thread.id,e,s).catch(i=>b(this,i))}};m(j,"properties",{thread:{attribute:!1},ctx:{attribute:!1},startEditing:{type:Boolean},_editingPost:{state:!0},_editingComment:{state:!0},_picker:{state:!0}}),m(j,"styles",[f,_`
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
    `]);$("mb-thread",j);var mt="message-board-sort",K=class extends g{constructor(){super(),this._sort=Ht(mt)in D?Ht(mt):"time"}setConfig(t){this._config=t}set hass(t){this._hass=t,this._subscribe()}getCardSize(){return 6}static getStubConfig(){return{}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._subscription?.then(t=>t()).catch(()=>{}),this._subscription=null}_subscribe(){this._subscription||!this._hass||!this.isConnected||(this._api=new J(this._hass.connection),this._subscription=this._api.subscribe(t=>{this._data={...this._data,...t}}),this._subscription.catch(t=>{this._error=t.message,this._subscription=null}))}updated(){this._markOpenThreadRead()}_markOpenThreadRead(){let t=this._openThread;!t?.unread||this._markingRead===t.id||(this._markingRead=t.id,this._api.markRead(t.id).catch(e=>b(this,e)).finally(()=>this._markingRead=null))}get _openThread(){return this._data?.threads.find(t=>t.id===this._openThreadId)}get _ctx(){let{me:t,users:e,reactions:s,priorities:i,threads:o}=this._data;return{api:this._api,me:t,reactions:s,priorities:i,knownTags:It(o),names:Object.fromEntries(e.map(n=>[n.id,n.name])),language:this._hass.locale?.language??this._hass.language}}_inboxes(){let{me:t,users:e,threads:s}=this._data,i=e.filter(o=>o.id!==t);return[{id:t,title:"Meine Inbox",threads:s.filter(o=>o.recipient===t)},...i.map(o=>({id:o.id,title:`Inbox ${o.name}`,composeTo:o,threads:s.filter(n=>n.recipient===o.id&&n.sender===t)}))]}render(){if(this._error)return a`<ha-card><div class="empty">${this._error}</div></ha-card>`;if(!this._data)return a`<ha-card><div class="empty">Lädt…</div></ha-card>`;let t=this._ctx,e=this._openThread;return a`
      <ha-card>
        ${e?a`<mb-thread
                .thread=${e}
                .ctx=${t}
                ?startEditing=${this._editOnOpen}
                @back=${()=>this._openThreadId=null}
              ></mb-thread>`:this._renderInboxes(t)}
      </ha-card>
    `}_renderInboxes(t){let e=this._inboxes(),s=this._activeInbox??t.me;return a`
      <div class="toolbar">
        <nav class="tabs">
          ${e.map(i=>a`
              <button
                class=${i.id===s?"":"secondary"}
                @click=${()=>this._activeInbox=i.id}
              >
                ${i.title} ${this._renderBadge(i)}
              </button>
            `)}
        </nav>
        <button class="plain sort" title="Sortierung wechseln" @click=${this._toggleSort}>
          ⇅ ${D[this._sort].label}
        </button>
      </div>
      <div class="inboxes">
        ${e.map(i=>a`
            <section class=${i.id===s?"active":""}>
              <h3>${i.title} ${this._renderBadge(i)}</h3>
              ${i.composeTo?a`<mb-post-form
                      withContent
                      placeholder="Neuer Post an ${i.composeTo.name}…"
                      .priorities=${t.priorities}
                      .suggestions=${t.knownTags}
                      .send=${o=>t.api.create(i.composeTo.id,o)}
                    ></mb-post-form>`:""}
              ${this._renderThreadList(D[this._sort].apply(i.threads.filter(o=>!o.archived),t.priorities),t)}
              ${this._renderArchive(i.threads.filter(o=>o.archived),t)}
            </section>
          `)}
      </div>
    `}_renderBadge(t){let e=t.threads.filter(s=>s.unread).length;return e?a`<span class="badge">${e}</span>`:""}_renderArchive(t,e){return t.length?a`
      <details>
        <summary class="meta">Archiv (${t.length})</summary>
        ${this._renderThreadList(t,e)}
      </details>
    `:""}_renderThreadList(t,e){return t.length?a`<ul>
      ${t.map(s=>this._renderThreadItem(s,e))}
    </ul>`:a`<div class="empty meta">Keine Nachrichten</div>`}_renderThreadItem(t,e){let s=t.messages.length-1;return a`
      <li class="post prio-${t.priority}" @contextmenu=${Q}>
        <button class="open ${t.unread?"unread":""}" @click=${()=>this._open(t.id)}>
          <span class="headline">
            ${t.unread?a`<span class="dot"></span>`:""}
            <span class="title">${t.title}</span>
          </span>
          ${t.messages[0].text?a`<span class="preview">${t.messages[0].text}</span>`:""}
          <span class="properties">${G(t)}</span>
          <span class="meta">
            ${H(ut(t).created,e.language)}
            ${s?` \xB7 ${s} ${s===1?"Kommentar":"Kommentare"}`:""}
            ${Nt(t,e.me)?" \xB7 gelesen \u2713":""}
          </span>
        </button>
        <mb-menu
          .items=${X(this,e,t,{edit:()=>this._open(t.id,!0)})}
        ></mb-menu>
      </li>
    `}_open(t,e=!1){this._editOnOpen=e,this._openThreadId=t}_toggleSort(){let t=Object.keys(D);this._sort=t[(t.indexOf(this._sort)+1)%t.length],ee(mt,this._sort)}};m(K,"properties",{_data:{state:!0},_error:{state:!0},_openThreadId:{state:!0},_editOnOpen:{state:!0},_activeInbox:{state:!0},_sort:{state:!0}}),m(K,"styles",[f,_`
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
      button.open.unread .title {
        font-weight: 700;
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
    `]);$("message-board-card",K);window.customCards=window.customCards||[];window.customCards.some(r=>r.type==="message-board-card")||window.customCards.push({type:"message-board-card",name:"Message Board",description:"Inboxen mit Posts, Tags, Priorit\xE4t und Kommentaren."});function Ht(r){try{return localStorage.getItem(r)}catch{return null}}function ee(r,t){try{localStorage.setItem(r,t)}catch{}}
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
