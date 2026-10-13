var It=Object.defineProperty;var Ht=(r,t,e)=>t in r?It(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var m=(r,t,e)=>Ht(r,typeof t!="symbol"?t+"":t,e);var V=globalThis,W=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),ut=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(W&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ut.set(e,t))}return t}toString(){return this.cssText}},mt=r=>new P(typeof r=="string"?r:r+"",void 0,Q),_=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new P(e,r,Q)},gt=(r,t)=>{if(W)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=V.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},tt=W?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return mt(e)})(r):r;var{is:Dt,defineProperty:Mt,getOwnPropertyDescriptor:zt,getOwnPropertyNames:Bt,getOwnPropertySymbols:jt,getPrototypeOf:Kt}=Object,q=globalThis,_t=q.trustedTypes,Vt=_t?_t.emptyScript:"",Wt=q.reactiveElementPolyfillSupport,O=(r,t)=>r,et={toAttribute(r,t){switch(t){case Boolean:r=r?Vt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},$t=(r,t)=>!Dt(r,t),ft={attribute:!0,type:String,converter:et,reflect:!1,useDefault:!1,hasChanged:$t};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ft){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Mt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=zt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let l=i?.call(this);o?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ft}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let t=Kt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let e=this.properties,s=[...Bt(e),...jt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(tt(i))}else t!==void 0&&e.push(tt(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:et).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:et;this._$Em=i;let l=n.fromAttribute(e,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let n=this.constructor;if(i===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??$t)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[O("elementProperties")]=new Map,x[O("finalized")]=new Map,Wt?.({ReactiveElement:x}),(q.reactiveElementVersions??=[]).push("2.1.2");var ct=globalThis,bt=r=>r,F=ct.trustedTypes,yt=F?F.createPolicy("lit-html",{createHTML:r=>r}):void 0,St="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,kt="?"+w,qt=`<${kt}>`,S=document,U=()=>S.createComment(""),L=r=>r===null||typeof r!="object"&&typeof r!="function",lt=Array.isArray,Ft=r=>lt(r)||typeof r?.[Symbol.iterator]=="function",st=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xt=/-->/g,vt=/>/g,A=RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wt=/'/g,At=/"/g,Ct=/^(?:script|style|textarea|title)$/i,ht=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),a=ht(1),re=ht(2),oe=ht(3),k=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Et=new WeakMap,E=S.createTreeWalker(S,129);function Tt(r,t){if(!lt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return yt!==void 0?yt.createHTML(t):t}var Yt=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=R;for(let l=0;l<e;l++){let c=r[l],d,u,h=-1,y=0;for(;y<c.length&&(n.lastIndex=y,u=n.exec(c),u!==null);)y=n.lastIndex,n===R?u[1]==="!--"?n=xt:u[1]!==void 0?n=vt:u[2]!==void 0?(Ct.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=A):u[3]!==void 0&&(n=A):n===A?u[0]===">"?(n=i??R,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?A:u[3]==='"'?At:wt):n===At||n===wt?n=A:n===xt||n===vt?n=R:(n=A,i=void 0);let v=n===A&&r[l+1].startsWith("/>")?" ":"";o+=n===R?c+qt:h>=0?(s.push(d),c.slice(0,h)+St+c.slice(h)+w+v):c+w+(h===-2?l:v)}return[Tt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},N=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,l=t.length-1,c=this.parts,[d,u]=Yt(t,e);if(this.el=r.createElement(d,s),E.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=E.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(St)){let y=u[n++],v=i.getAttribute(h).split(w),K=/([.?@])?(.*)/.exec(y);c.push({type:1,index:o,name:K[2],strings:v,ctor:K[1]==="."?rt:K[1]==="?"?ot:K[1]==="@"?nt:T}),i.removeAttribute(h)}else h.startsWith(w)&&(c.push({type:6,index:o}),i.removeAttribute(h));if(Ct.test(i.tagName)){let h=i.textContent.split(w),y=h.length-1;if(y>0){i.textContent=F?F.emptyScript:"";for(let v=0;v<y;v++)i.append(h[v],U()),E.nextNode(),c.push({type:2,index:++o});i.append(h[y],U())}}}else if(i.nodeType===8)if(i.data===kt)c.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(w,h+1))!==-1;)c.push({type:7,index:o}),h+=w.length-1}o++}}static createElement(t,e){let s=S.createElement("template");return s.innerHTML=t,s}};function C(r,t,e=r,s){if(t===k)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=L(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=C(r,i._$AS(r,t.values),i,s)),t}var it=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??S).importNode(e,!0);E.currentNode=i;let o=E.nextNode(),n=0,l=0,c=s[0];for(;c!==void 0;){if(n===c.index){let d;c.type===2?d=new I(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new at(o,this,t)),this._$AV.push(d),c=s[++l]}n!==c?.index&&(o=E.nextNode(),n++)}return E.currentNode=S,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},I=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),L(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ft(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(Tt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new it(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=Et.get(t.strings);return e===void 0&&Et.set(t.strings,e=new N(t)),e}k(t){lt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=bt(t).nextSibling;bt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=C(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==k,n&&(this._$AH=t);else{let l=t,c,d;for(t=o[0],c=0;c<o.length-1;c++)d=C(this,l[s+c],e,c),d===k&&(d=this._$AH[c]),n||=!L(d)||d!==this._$AH[c],d===p?t=p:t!==p&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}n&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},rt=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},ot=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},nt=class extends T{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??p)===k)return;let s=this._$AH,i=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==p&&(s===p||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},at=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}};var Jt=ct.litHtmlPolyfillSupport;Jt?.(N,I),(ct.litHtmlVersions??=[]).push("3.3.3");var Pt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new I(t.insertBefore(U(),o),o,void 0,e??{})}return i._$AI(r),i};var dt=globalThis,g=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};g._$litElement$=!0,g.finalized=!0,dt.litElementHydrateSupport?.({LitElement:g});var Zt=dt.litElementPolyfillSupport;Zt?.({LitElement:g});(dt.litElementVersions??=[]).push("4.2.2");var Ot="message_board",Y=class{constructor(t){this._connection=t}subscribe(t){return this._connection.subscribeMessage(t,{type:`${Ot}/subscribe`})}create(t,{text:e,tags:s,priority:i}){return this._send("create",{recipient:t,text:e,tags:s,priority:i})}update(t,e){return this._send("update",{thread_id:t,...e})}delete(t){return this._send("delete",{thread_id:t})}reply(t,e){return this._send("reply",{thread_id:t,text:e})}edit(t,e,s){return this._send("edit",{thread_id:t,message_id:e,text:s})}react(t,e,s){return this._send("react",{thread_id:t,message_id:e,emoji:s})}setArchived(t,e){return this._send("archive",{thread_id:t,archived:e})}markRead(t){return this._send("mark_read",{thread_id:t})}_send(t,e){return this._connection.sendMessagePromise({type:`${Ot}/${t}`,...e})}};var f=_`
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
`;function $(r,t){customElements.get(r)||customElements.define(r,t)}var Xt=[["year",31536e3],["month",2592e3],["week",604800],["day",86400],["hour",3600],["minute",60]];function H(r,t){let e=new Intl.RelativeTimeFormat(t,{numeric:"auto"}),s=r-Date.now()/1e3;for(let[i,o]of Xt)if(Math.abs(s)>=o)return e.format(Math.round(s/o),i);return e.format(0,"second")}var J={low:"Niedrig",normal:"Normal",high:"Hoch"},Rt=(r,t)=>[...r].sort((e,s)=>t.indexOf(s.priority)-t.indexOf(e.priority));function Ut(r){let t=new Map;for(let e of r.flatMap(s=>s.tags))t.set(e.toLowerCase(),e);return[...t.values()].sort((e,s)=>e.localeCompare(s))}var Lt=()=>window.confirm("Post mit allen Kommentaren l\xF6schen?"),pt=r=>r.messages[r.messages.length-1],Gt=(r,t)=>r.sender===t?r.recipient:r.sender;function Nt(r,t){let e=pt(r);return e.author!==t?!1:(r.last_read[Gt(r,t)]??0)>=e.created}function b(r,t){r.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:t?.message??String(t)},bubbles:!0,composed:!0}))}var D=class extends g{constructor(){super(),this.items=[],this._onOutsideClick=t=>{t.composedPath().includes(this)||(this._open=!1)}}show(){this._open=!0}updated(t){if(!t.has("_open"))return;let e=this._open?"addEventListener":"removeEventListener";document[e]("click",this._onOutsideClick,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onOutsideClick,!0)}render(){return a`
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
    `}_select(t){this._open=!1,t.action()}};m(D,"properties",{items:{attribute:!1},_open:{state:!0}}),m(D,"styles",[f,_`
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
    `]);$("mb-menu",D);var Z=r=>a`
  ${r.priority==="normal"?"":a`<span class="prio-badge prio-${r.priority}"
          >${J[r.priority]}</span
        >`}
  ${r.tags.map(t=>a`<span class="tag">${t}</span>`)}
`;function X(r,t,e,{edit:s,leave:i}={}){let o=l=>l.catch(c=>b(r,c)),n=!e.archived;return[...s?[{label:"Bearbeiten",action:s}]:[],{label:n?"Archivieren":"Wiederherstellen",action:()=>{o(t.api.setArchived(e.id,n)),n&&i?.()}},{label:"L\xF6schen",danger:!0,action:()=>{Lt()&&(o(t.api.delete(e.id)),i?.())}}]}function G(r){r.preventDefault(),r.currentTarget.querySelector("mb-menu")?.show()}var M=class extends g{constructor(){super(),this.text="",this.tags=[],this.priority="normal",this.suggestions=[],this.label="Senden",this._tagDraft=""}render(){let t=this.suggestions.filter(e=>!this._hasTag(e));return a`
      ${this.withText?a`<textarea
              rows="3"
              .value=${this.text}
              placeholder=${this.placeholder??""}
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
                ${J[e]}
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
          ?disabled=${this._busy||this.withText&&!this.text.trim()}
          @click=${this._submit}
        >
          ${this.label}
        </button>
      </div>
    `}_hasTag(t){return this.tags.some(e=>e.toLowerCase()===t.toLowerCase())}_onTagInput(t){this._tagDraft=t.target.value,(t.inputType==="insertReplacementText"||t.inputType===void 0)&&this._commitTag()}_onTagKeyDown(t){t.key==="Enter"||t.key===","?(t.preventDefault(),this._commitTag()):t.key==="Backspace"&&!this._tagDraft&&this.tags.length&&(this.tags=this.tags.slice(0,-1))}_commitTag(){let t=this._tagDraft.trim();t&&!this._hasTag(t)&&(this.tags=[...this.tags,t]),this._tagDraft=""}_removeTag(t){this.tags=this.tags.filter(e=>e!==t)}async _submit(){if(!this._busy){this._commitTag(),this._busy=!0;try{await this.send({text:this.text,tags:this.tags,priority:this.priority}),this.text="",this.tags=[],this.priority="normal"}catch(t){b(this,t)}finally{this._busy=!1}}}};m(M,"properties",{send:{attribute:!1},priorities:{attribute:!1},suggestions:{attribute:!1},text:{type:String},tags:{attribute:!1},priority:{type:String},withText:{type:Boolean},cancelable:{type:Boolean},placeholder:{type:String},label:{type:String},_tagDraft:{state:!0},_busy:{state:!0}}),m(M,"styles",[f,_`
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
      input {
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
    `]);$("mb-post-form",M);var z=class extends g{constructor(){super(),this.value="",this.label="Senden"}render(){return a`
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
    `}_onKeyDown(t){t.key==="Enter"&&(t.ctrlKey||t.metaKey)&&this._submit()}async _submit(){if(!(!this.value.trim()||this._busy)){this._busy=!0;try{await this.send(this.value),this.value=""}catch(t){b(this,t)}finally{this._busy=!1}}}};m(z,"properties",{send:{attribute:!1},value:{type:String},placeholder:{type:String},label:{type:String},cancelable:{type:Boolean},_busy:{state:!0}}),m(z,"styles",[f,_`
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
    `]);$("mb-composer",z);var B=class extends g{constructor(){super(...arguments);m(this,"_back",()=>this.dispatchEvent(new Event("back")))}get _post(){return this.thread.messages[0]}get _comments(){return this.thread.messages.slice(1)}render(){let e=this._comments;return a`
      <button class="plain back" @click=${this._back}>← Zurück</button>
      ${this._editingPost?this._renderPostForm():this._renderPost()}
      <h4>Kommentare${e.length?` (${e.length})`:""}</h4>
      <div class="comments">${e.map(s=>this._renderComment(s))}</div>
      <mb-composer
        placeholder="Kommentieren…"
        .send=${s=>this.ctx.api.reply(this.thread.id,s)}
      ></mb-composer>
    `}_renderPost(){let{thread:e,ctx:s}=this,i=this._post;return a`
      <article class="post prio-${e.priority}" @contextmenu=${G}>
        <header>
          <span class="meta">
            ${s.names[e.sender]} → ${s.names[e.recipient]} ·
            ${H(i.created,s.language)}${i.edited?" \xB7 bearbeitet":""}
          </span>
          <mb-menu
            .items=${X(this,s,e,{edit:()=>this._editingPost=!0,leave:this._back})}
          ></mb-menu>
        </header>
        <div class="properties">${Z(e)}</div>
        <div class="text">${i.text}</div>
        ${this._renderReactions(i)}
      </article>
    `}_renderPostForm(){let{thread:e,ctx:s}=this;return a`
      <mb-post-form
        class="post prio-${e.priority}"
        cancelable
        label="Speichern"
        ?withText=${this._post.author===s.me}
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
              title=${n.map(l=>i.names[l]).join(", ")}
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
    `}_togglePicker(e){this._picker=this._picker===e?null:e}async _savePost({text:e,tags:s,priority:i}){let{api:o,me:n}=this.ctx,l=this._post,c=[o.update(this.thread.id,{tags:s,priority:i})];l.author===n&&e.trim()!==l.text&&c.push(o.edit(this.thread.id,l.id,e)),await Promise.all(c),this._editingPost=!1}async _saveComment(e,s){await this.ctx.api.edit(this.thread.id,e,s),this._editingComment=null}_react(e,s){this._picker=null,this.ctx.api.react(this.thread.id,e,s).catch(i=>b(this,i))}};m(B,"properties",{thread:{attribute:!1},ctx:{attribute:!1},_editingPost:{state:!0},_editingComment:{state:!0},_picker:{state:!0}}),m(B,"styles",[f,_`
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
      .post .text {
        font-size: 1.15em;
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
    `]);$("mb-thread",B);var j=class extends g{setConfig(t){this._config=t}set hass(t){this._hass=t,this._subscribe()}getCardSize(){return 6}static getStubConfig(){return{}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._subscription?.then(t=>t()).catch(()=>{}),this._subscription=null}_subscribe(){this._subscription||!this._hass||!this.isConnected||(this._api=new Y(this._hass.connection),this._subscription=this._api.subscribe(t=>{this._data={...this._data,...t}}),this._subscription.catch(t=>{this._error=t.message,this._subscription=null}))}updated(){this._markOpenThreadRead()}_markOpenThreadRead(){let t=this._openThread;!t?.unread||this._markingRead===t.id||(this._markingRead=t.id,this._api.markRead(t.id).catch(e=>b(this,e)).finally(()=>this._markingRead=null))}get _openThread(){return this._data?.threads.find(t=>t.id===this._openThreadId)}get _ctx(){let{me:t,users:e,reactions:s,priorities:i,threads:o}=this._data;return{api:this._api,me:t,reactions:s,priorities:i,knownTags:Ut(o),names:Object.fromEntries(e.map(n=>[n.id,n.name])),language:this._hass.locale?.language??this._hass.language}}_inboxes(){let{me:t,users:e,threads:s}=this._data,i=e.filter(o=>o.id!==t);return[{id:t,title:"Meine Inbox",threads:s.filter(o=>o.recipient===t)},...i.map(o=>({id:o.id,title:`Inbox ${o.name}`,composeTo:o,threads:s.filter(n=>n.recipient===o.id&&n.sender===t)}))]}render(){if(this._error)return a`<ha-card><div class="empty">${this._error}</div></ha-card>`;if(!this._data)return a`<ha-card><div class="empty">Lädt…</div></ha-card>`;let t=this._ctx,e=this._openThread;return a`
      <ha-card>
        ${e?a`<mb-thread
                .thread=${e}
                .ctx=${t}
                @back=${()=>this._openThreadId=null}
              ></mb-thread>`:this._renderInboxes(t)}
      </ha-card>
    `}_renderInboxes(t){let e=this._inboxes(),s=this._activeInbox??t.me;return a`
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
      <div class="inboxes">
        ${e.map(i=>a`
            <section class=${i.id===s?"active":""}>
              <h3>${i.title} ${this._renderBadge(i)}</h3>
              ${i.composeTo?a`<mb-post-form
                      withText
                      placeholder="Neue Nachricht an ${i.composeTo.name}…"
                      .priorities=${t.priorities}
                      .suggestions=${t.knownTags}
                      .send=${o=>t.api.create(i.composeTo.id,o)}
                    ></mb-post-form>`:""}
              ${this._renderThreadList(Rt(i.threads.filter(o=>!o.archived),t.priorities),t)}
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
      <li class="post prio-${t.priority}" @contextmenu=${G}>
        <button
          class="open ${t.unread?"unread":""}"
          @click=${()=>this._openThreadId=t.id}
        >
          <span class="headline">
            ${t.unread?a`<span class="dot"></span>`:""}
            <span class="preview">${t.messages[0].text}</span>
          </span>
          <span class="properties">${Z(t)}</span>
          <span class="meta">
            ${H(pt(t).created,e.language)}
            ${s?` \xB7 ${s} ${s===1?"Kommentar":"Kommentare"}`:""}
            ${Nt(t,e.me)?" \xB7 gelesen \u2713":""}
          </span>
        </button>
        <mb-menu .items=${X(this,e,t)}></mb-menu>
      </li>
    `}};m(j,"properties",{_data:{state:!0},_error:{state:!0},_openThreadId:{state:!0},_activeInbox:{state:!0}}),m(j,"styles",[f,_`
      ha-card {
        container-type: inline-size;
        padding: 16px;
      }
      .tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
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
      button.open.unread .preview {
        font-weight: 600;
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
        display: -webkit-box;
        -webkit-line-clamp: 2;
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
    `]);$("message-board-card",j);window.customCards=window.customCards||[];window.customCards.some(r=>r.type==="message-board-card")||window.customCards.push({type:"message-board-card",name:"Message Board",description:"Inboxen mit Posts, Tags, Priorit\xE4t und Kommentaren."});
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
