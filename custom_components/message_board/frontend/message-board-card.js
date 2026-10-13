var St=Object.defineProperty;var kt=(r,t,e)=>t in r?St(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var $=(r,t,e)=>kt(r,typeof t!="symbol"?t+"":t,e);var z=globalThis,B=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),ot=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(B&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ot.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ot.set(e,t))}return t}toString(){return this.cssText}},at=r=>new P(typeof r=="string"?r:r+"",void 0,q),f=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new P(e,r,q)},ht=(r,t)=>{if(B)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=z.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},F=B?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return at(e)})(r):r;var{is:Ct,defineProperty:Pt,getOwnPropertyDescriptor:Tt,getOwnPropertyNames:Rt,getOwnPropertySymbols:Ut,getPrototypeOf:Ot}=Object,j=globalThis,ct=j.trustedTypes,Nt=ct?ct.emptyScript:"",Mt=j.reactiveElementPolyfillSupport,T=(r,t)=>r,J={toAttribute(r,t){switch(t){case Boolean:r=r?Nt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},dt=(r,t)=>!Ct(r,t),lt={attribute:!0,type:String,converter:J,reflect:!1,useDefault:!1,hasChanged:dt};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=lt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Pt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Tt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);n?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??lt}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Ot(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,s=[...Rt(e),...Ut(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(F(i))}else t!==void 0&&e.push(F(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ht(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:J).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:J;this._$Em=i;let l=o.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??dt)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[T("elementProperties")]=new Map,g[T("finalized")]=new Map,Mt?.({ReactiveElement:g}),(j.reactiveElementVersions??=[]).push("2.1.2");var et=globalThis,pt=r=>r,K=et.trustedTypes,ut=K?K.createPolicy("lit-html",{createHTML:r=>r}):void 0,bt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,yt="?"+y,Ht=`<${yt}>`,x=document,U=()=>x.createComment(""),O=r=>r===null||typeof r!="object"&&typeof r!="function",st=Array.isArray,It=r=>st(r)||typeof r?.[Symbol.iterator]=="function",Z=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mt=/-->/g,_t=/>/g,v=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$t=/'/g,ft=/"/g,vt=/^(?:script|style|textarea|title)$/i,it=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),h=it(1),Jt=it(2),Zt=it(3),E=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),gt=new WeakMap,A=x.createTreeWalker(x,129);function At(r,t){if(!st(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ut!==void 0?ut.createHTML(t):t}var Lt=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=R;for(let l=0;l<e;l++){let a=r[l],d,u,c=-1,_=0;for(;_<a.length&&(o.lastIndex=_,u=o.exec(a),u!==null);)_=o.lastIndex,o===R?u[1]==="!--"?o=mt:u[1]!==void 0?o=_t:u[2]!==void 0?(vt.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=v):u[3]!==void 0&&(o=v):o===v?u[0]===">"?(o=i??R,c=-1):u[1]===void 0?c=-2:(c=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?v:u[3]==='"'?ft:$t):o===ft||o===$t?o=v:o===mt||o===_t?o=R:(o=v,i=void 0);let b=o===v&&r[l+1].startsWith("/>")?" ":"";n+=o===R?a+Ht:c>=0?(s.push(d),a.slice(0,c)+bt+a.slice(c)+y+b):a+y+(c===-2?l:b)}return[At(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},N=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,l=t.length-1,a=this.parts,[d,u]=Lt(t,e);if(this.el=r.createElement(d,s),A.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=A.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(bt)){let _=u[o++],b=i.getAttribute(c).split(y),D=/([.?@])?(.*)/.exec(_);a.push({type:1,index:n,name:D[2],strings:b,ctor:D[1]==="."?G:D[1]==="?"?Q:D[1]==="@"?Y:S}),i.removeAttribute(c)}else c.startsWith(y)&&(a.push({type:6,index:n}),i.removeAttribute(c));if(vt.test(i.tagName)){let c=i.textContent.split(y),_=c.length-1;if(_>0){i.textContent=K?K.emptyScript:"";for(let b=0;b<_;b++)i.append(c[b],U()),A.nextNode(),a.push({type:2,index:++n});i.append(c[_],U())}}}else if(i.nodeType===8)if(i.data===yt)a.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(y,c+1))!==-1;)a.push({type:7,index:n}),c+=y.length-1}n++}}static createElement(t,e){let s=x.createElement("template");return s.innerHTML=t,s}};function w(r,t,e=r,s){if(t===E)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=O(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=w(r,i._$AS(r,t.values),i,s)),t}var X=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??x).importNode(e,!0);A.currentNode=i;let n=A.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new M(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new tt(n,this,t)),this._$AV.push(d),a=s[++l]}o!==a?.index&&(n=A.nextNode(),o++)}return A.currentNode=x,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},M=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),O(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):It(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(At(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new X(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=gt.get(t.strings);return e===void 0&&gt.set(t.strings,e=new N(t)),e}k(t){st(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=pt(t).nextSibling;pt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=w(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{let l=t,a,d;for(t=n[0],a=0;a<n.length-1;a++)d=w(this,l[s+a],e,a),d===E&&(d=this._$AH[a]),o||=!O(d)||d!==this._$AH[a],d===p?t=p:t!==p&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},G=class extends S{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},Q=class extends S{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},Y=class extends S{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??p)===E)return;let s=this._$AH,i=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==p&&(s===p||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},tt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}};var Dt=et.litHtmlPolyfillSupport;Dt?.(N,M),(et.litHtmlVersions??=[]).push("3.3.3");var xt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new M(t.insertBefore(U(),n),n,void 0,e??{})}return i._$AI(r),i};var rt=globalThis,m=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=xt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};m._$litElement$=!0,m.finalized=!0,rt.litElementHydrateSupport?.({LitElement:m});var zt=rt.litElementPolyfillSupport;zt?.({LitElement:m});(rt.litElementVersions??=[]).push("4.2.2");var Et="message_board",V=class{constructor(t){this._connection=t}subscribe(t){return this._connection.subscribeMessage(t,{type:`${Et}/subscribe`})}create(t,e){return this._send("create",{recipient:t,text:e})}reply(t,e){return this._send("reply",{thread_id:t,text:e})}edit(t,e,s){return this._send("edit",{thread_id:t,message_id:e,text:s})}react(t,e,s){return this._send("react",{thread_id:t,message_id:e,emoji:s})}setArchived(t,e){return this._send("archive",{thread_id:t,archived:e})}markRead(t){return this._send("mark_read",{thread_id:t})}_send(t,e){return this._connection.sendMessagePromise({type:`${Et}/${t}`,...e})}};var k=f`
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
`;var Bt=[["year",31536e3],["month",2592e3],["week",604800],["day",86400],["hour",3600],["minute",60]];function W(r,t){let e=new Intl.RelativeTimeFormat(t,{numeric:"auto"}),s=r-Date.now()/1e3;for(let[i,n]of Bt)if(Math.abs(s)>=n)return e.format(Math.round(s/n),i);return e.format(0,"second")}var nt=r=>r.messages[r.messages.length-1],jt=(r,t)=>r.sender===t?r.recipient:r.sender;function wt(r,t){let e=nt(r);return e.author!==t?!1:(r.last_read[jt(r,t)]??0)>=e.created}function C(r,t){r.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:t?.message??String(t)},bubbles:!0,composed:!0}))}var H=class extends m{constructor(){super(),this.value="",this.label="Senden"}render(){return h`
      <textarea
        rows="2"
        .value=${this.value}
        placeholder=${this.placeholder??""}
        ?disabled=${this._busy}
        @input=${t=>this.value=t.target.value}
        @keydown=${this._onKeyDown}
      ></textarea>
      <div class="actions">
        ${this.cancelable?h`<button
                class="secondary"
                @click=${()=>this.dispatchEvent(new Event("cancel"))}
              >
                Abbrechen
              </button>`:""}
        <button ?disabled=${this._busy||!this.value.trim()} @click=${this._submit}>
          ${this.label}
        </button>
      </div>
    `}_onKeyDown(t){t.key==="Enter"&&(t.ctrlKey||t.metaKey)&&this._submit()}async _submit(){if(!(!this.value.trim()||this._busy)){this._busy=!0;try{await this.send(this.value),this.value=""}catch(t){C(this,t)}finally{this._busy=!1}}}};$(H,"properties",{send:{attribute:!1},value:{type:String},placeholder:{type:String},label:{type:String},cancelable:{type:Boolean},_busy:{state:!0}}),$(H,"styles",[k,f`
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
    `]);customElements.define("mb-composer",H);var I=class extends m{render(){let{thread:t,ctx:e}=this;return h`
      <header>
        <button class="plain" @click=${()=>this.dispatchEvent(new Event("back"))}>
          ← Zurück
        </button>
        <span class="title">${e.names[t.sender]} → ${e.names[t.recipient]}</span>
        <button class="secondary" @click=${this._toggleArchived}>
          ${t.archived?"Wiederherstellen":"Archivieren"}
        </button>
      </header>
      <div class="messages">${t.messages.map(s=>this._renderMessage(s))}</div>
      <mb-composer
        placeholder="Antworten…"
        .send=${s=>e.api.reply(t.id,s)}
      ></mb-composer>
    `}_renderMessage(t){let{ctx:e}=this,s=t.author===e.me;return h`
      <div class="message ${s?"mine":""}">
        <div class="meta">
          ${e.names[t.author]} · ${W(t.created,e.language)}
          ${t.edited?h` · bearbeitet`:""}
        </div>
        ${this._editing===t.id?h`<mb-composer
                cancelable
                label="Speichern"
                .value=${t.text}
                .send=${i=>this._saveEdit(t.id,i)}
                @cancel=${()=>this._editing=null}
              ></mb-composer>`:h`<div class="text">${t.text}</div>`}
        <div class="reactions">
          ${Object.entries(t.reactions).map(([i,n])=>h`
              <button
                class="chip ${n.includes(e.me)?"own":""}"
                title=${n.map(o=>e.names[o]).join(", ")}
                @click=${()=>this._react(t.id,i)}
              >
                ${i} ${n.length}
              </button>
            `)}
          <button class="plain" title="Reagieren" @click=${()=>this._togglePicker(t.id)}>
            ☺＋
          </button>
          ${s&&this._editing!==t.id?h`<button class="plain" @click=${()=>this._editing=t.id}>
                  Bearbeiten
                </button>`:""}
        </div>
        ${this._picker===t.id?h`<div class="picker">
                ${e.reactions.map(i=>h`<button class="plain" @click=${()=>this._react(t.id,i)}>
                      ${i}
                    </button>`)}
              </div>`:""}
      </div>
    `}_togglePicker(t){this._picker=this._picker===t?null:t}async _saveEdit(t,e){await this.ctx.api.edit(this.thread.id,t,e),this._editing=null}_react(t,e){this._picker=null,this._run(this.ctx.api.react(this.thread.id,t,e))}_toggleArchived(){let t=!this.thread.archived;this._run(this.ctx.api.setArchived(this.thread.id,t)),t&&this.dispatchEvent(new Event("back"))}_run(t){t.catch(e=>C(this,e))}};$(I,"properties",{thread:{attribute:!1},ctx:{attribute:!1},_editing:{state:!0},_picker:{state:!0}}),$(I,"styles",[k,f`
      :host {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .title {
        flex: 1;
        font-weight: 500;
      }
      .messages {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .message {
        max-width: 85%;
        padding: 8px 12px;
        border-radius: 12px;
        background: var(--secondary-background-color);
      }
      .message.mine {
        align-self: flex-end;
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
    `]);customElements.define("mb-thread",I);var L=class extends m{setConfig(t){this._config=t}set hass(t){this._hass=t,this._subscribe()}getCardSize(){return 6}static getStubConfig(){return{}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._subscription?.then(t=>t()).catch(()=>{}),this._subscription=null}_subscribe(){this._subscription||!this._hass||!this.isConnected||(this._api=new V(this._hass.connection),this._subscription=this._api.subscribe(t=>{this._data={...this._data,...t}}),this._subscription.catch(t=>{this._error=t.message,this._subscription=null}))}updated(){this._markOpenThreadRead()}_markOpenThreadRead(){let t=this._openThread;!t?.unread||this._markingRead===t.id||(this._markingRead=t.id,this._api.markRead(t.id).catch(e=>C(this,e)).finally(()=>this._markingRead=null))}get _openThread(){return this._data?.threads.find(t=>t.id===this._openThreadId)}get _ctx(){let{me:t,users:e,reactions:s}=this._data;return{api:this._api,me:t,reactions:s,names:Object.fromEntries(e.map(i=>[i.id,i.name])),language:this._hass.locale?.language??this._hass.language}}_inboxes(){let{me:t,users:e,threads:s}=this._data,i=e.filter(n=>n.id!==t);return[{id:t,title:"Meine Inbox",threads:s.filter(n=>n.recipient===t)},...i.map(n=>({id:n.id,title:`Inbox ${n.name}`,composeTo:n,threads:s.filter(o=>o.recipient===n.id&&o.sender===t)}))]}render(){if(this._error)return h`<ha-card><div class="empty">${this._error}</div></ha-card>`;if(!this._data)return h`<ha-card><div class="empty">Lädt…</div></ha-card>`;let t=this._ctx,e=this._openThread;return h`
      <ha-card>
        ${e?h`<mb-thread
                .thread=${e}
                .ctx=${t}
                @back=${()=>this._openThreadId=null}
              ></mb-thread>`:this._renderInboxes(t)}
      </ha-card>
    `}_renderInboxes(t){let e=this._inboxes(),s=this._activeInbox??t.me;return h`
      <nav class="tabs">
        ${e.map(i=>h`
            <button
              class=${i.id===s?"":"secondary"}
              @click=${()=>this._activeInbox=i.id}
            >
              ${i.title} ${this._renderBadge(i)}
            </button>
          `)}
      </nav>
      <div class="inboxes">
        ${e.map(i=>h`
            <section class=${i.id===s?"active":""}>
              <h3>${i.title} ${this._renderBadge(i)}</h3>
              ${i.composeTo?h`<mb-composer
                      placeholder="Neue Nachricht an ${i.composeTo.name}…"
                      .send=${n=>t.api.create(i.composeTo.id,n)}
                    ></mb-composer>`:""}
              ${this._renderThreadList(i.threads.filter(n=>!n.archived),t)}
              ${this._renderArchive(i.threads.filter(n=>n.archived),t)}
            </section>
          `)}
      </div>
    `}_renderBadge(t){let e=t.threads.filter(s=>s.unread).length;return e?h`<span class="badge">${e}</span>`:""}_renderArchive(t,e){return t.length?h`
      <details>
        <summary class="meta">Archiv (${t.length})</summary>
        ${this._renderThreadList(t,e)}
      </details>
    `:""}_renderThreadList(t,e){return t.length?h`<ul>
      ${t.map(s=>this._renderThreadItem(s,e))}
    </ul>`:h`<div class="empty meta">Keine Nachrichten</div>`}_renderThreadItem(t,e){let s=t.messages.length-1;return h`
      <li>
        <button
          class="thread ${t.unread?"unread":""}"
          @click=${()=>this._openThreadId=t.id}
        >
          ${t.unread?h`<span class="dot"></span>`:""}
          <span class="body">
            <span class="preview">${t.messages[0].text}</span>
            <span class="meta">
              ${W(nt(t).created,e.language)}
              ${s?h` · ${s} ${s===1?"Antwort":"Antworten"}`:""}
              ${wt(t,e.me)?h` · gelesen ✓`:""}
            </span>
          </span>
        </button>
      </li>
    `}};$(L,"properties",{_data:{state:!0},_error:{state:!0},_openThreadId:{state:!0},_activeInbox:{state:!0}}),$(L,"styles",[k,f`
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
      }
      button.thread {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 8px 4px;
        border-radius: 0;
        border-bottom: 1px solid var(--divider-color);
        text-align: left;
        color: var(--primary-text-color);
        background: none;
      }
      button.thread.unread .preview {
        font-weight: 600;
      }
      .body {
        display: flex;
        flex-direction: column;
        min-width: 0;
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
    `]);customElements.define("message-board-card",L);window.customCards=window.customCards||[];window.customCards.push({type:"message-board-card",name:"Message Board",description:"Inboxen mit Threads, Antworten und Reaktionen."});
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
