(function(){"use strict";var t={2765:function(t,e,i){var s=i(9242),a=i(1020),r=i(3396),n=i(7139);const c=(0,r._)("h1",{class:"drac-heading-2xl"},"PERT Activity Calculator",-1),l={class:"drac-tabs drac-tabs-white"},o=["onClick","onKeydown"],d={class:"drac-py-sm"};function u(t,e,i,s,a,u){return(0,r.wg)(),(0,r.iD)(r.HY,null,[c,(0,r._)("ul",l,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.tabs,((e,i)=>((0,r.wg)(),(0,r.iD)("li",{key:i,class:(0,n.C_)(["drac-tab",[{"drac-tab-active":t.currentTab===e}]])},[(0,r._)("a",{onClick:i=>t.currentTab=e,onKeydown:i=>t.currentTab=e,class:"drac-tab-link drac-text"},(0,n.zw)(e),41,o)],2)))),128))]),(0,r._)("main",d,[((0,r.wg)(),(0,r.j4)((0,r.LL)(t.currentTab)))])],64)}var p=i(2482),m=i(6520);const v={key:0},g={key:1};function h(t,e,i,s,a,n){return t.canShow?((0,r.wg)(),(0,r.iD)("div",v,[((0,r.wg)(),(0,r.j4)((0,r.LL)(t.settings.resultType),{template:t.settings.template,"list-type":t.settings.listType,activities:t.activities,total:t.total},null,8,["template","list-type","activities","total"]))])):((0,r.wg)(),(0,r.iD)("p",g,"Please add an activity first."))}function f(t){return Math.round(100*t)/100}function y(t){return Number(t.replace(",","."))}var T,w,b=(0,a.Q_)("activities",{state:()=>({activityId:1,activities:[{id:1,title:"",optimistic:0,mostLikely:0,pessimistic:0,expectedTime:0,standardDeviationOfTime:0}]}),getters:{canDelete(){return this.activities.length>1},total(){let t=0,e=0,i=0,s=0;return this.activities.forEach((a=>{t+=a.optimistic,e+=a.mostLikely,i+=a.pessimistic,s+=a.expectedTime})),{optimistic:f(t),mostLikely:f(e),pessimistic:f(i),expectedTime:f(s)}}},actions:{add(){this.activityId+=1,this.activities.push({id:this.activityId,title:"",optimistic:0,mostLikely:0,pessimistic:0,expectedTime:0,standardDeviationOfTime:0})},remove(t){if(this.activities.length<=1)return;const e=this.activities.findIndex((e=>e.id===t));this.activities.splice(e,1)}}});(function(t){t["List"]="List",t["Table"]="Table"})(T||(T={})),function(t){t["Unordered"]="Unordered",t["Ordered"]="Ordered"}(w||(w={}));var x=(0,a.Q_)("settings",{state:()=>({settings:{resultType:T.List,listType:w.Unordered,template:"#title#: #optimistic# - #mostLikely# - #pessimistic# -> #expectedTime#",markHighStandardDeviationOfTime:!1,standardDeviationOfTimeThreshold:1,storeSettings:!1}})});const D={key:0,class:"drac-list drac-list-unordered drac-my-sm"},O=["innerHTML"],S={key:1,class:"drac-list drac-list-ordered drac-my-sm"},k=["innerHTML"];function _(t,e,i,s,a,c){return(0,r.wg)(),(0,r.iD)(r.HY,null,[t.showUnorderedList?((0,r.wg)(),(0,r.iD)("ul",D,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.activities,(e=>((0,r.wg)(),(0,r.iD)("li",{key:e.id,innerHTML:t.activityString(e)},null,8,O)))),128)),(0,r._)("li",null,(0,n.zw)(t.totalString),1)])):(0,r.kq)("",!0),t.showOrderedList?((0,r.wg)(),(0,r.iD)("ol",S,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.activities,(e=>((0,r.wg)(),(0,r.iD)("li",{key:e.id,innerHTML:t.activityString(e)},null,8,k)))),128)),(0,r._)("li",null,(0,n.zw)(t.totalString),1)])):(0,r.kq)("",!0)],64)}var H=function(t,e,i,s){var a,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let L=class extends m.w3{constructor(...t){super(...t),(0,p.Z)(this,"listType",void 0),(0,p.Z)(this,"template",void 0),(0,p.Z)(this,"total",void 0),(0,p.Z)(this,"useSettingsStore",x())}get settings(){return this.useSettingsStore.settings}get showUnorderedList(){return this.listType===w.Unordered}get showOrderedList(){return this.listType===w.Ordered}activityString(t){let e=this.template;return Object.getOwnPropertyNames(t).forEach((i=>{"standardDeviationOfTime"===i&&this.settings.markHighStandardDeviationOfTime&&t[i]>this.settings.standardDeviationOfTimeThreshold&&(e=e.replaceAll(`#${i}#`,`<span class="drac-text-red">#${i}#</span>`)),e=e.replaceAll(`#${i}#`,t[i].toString())})),e}get totalString(){let t=this.template;return t=t.replaceAll("#title#","Total"),Object.getOwnPropertyNames(this.total).forEach((e=>{t=t.replaceAll(`#${e}#`,this.total[e].toString())})),t=t.replaceAll(/#\w*#/g,""),t}};L=H([(0,m.Ei)({props:{activities:{type:Array,required:!0},listType:{type:String,required:!0},template:{type:String,required:!0},total:{type:Object,required:!0}}})],L);var j=L,A=i(89);const R=(0,A.Z)(j,[["render",_]]);var C=R;const Z={class:"drac-table"},P=(0,r._)("thead",null,[(0,r._)("tr",null,[(0,r._)("th",null,"Activity Title"),(0,r._)("th",null,"Optimistic Time"),(0,r._)("th",null,"Most Likely Time"),(0,r._)("th",null,"Pessimistic Time"),(0,r._)("th",null,"Expected Time"),(0,r._)("th",null,"Standard Deviation of Time")])],-1),z=(0,r._)("th",null,"Total",-1),U={class:"drac-px-xs"},$={class:"drac-px-xs"},I={class:"drac-px-xs"},E={class:"drac-px-xs"};function N(t,e,i,s,a,c){return(0,r.wg)(),(0,r.iD)("table",Z,[P,(0,r._)("tbody",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.activities,(e=>((0,r.wg)(),(0,r.iD)("tr",{key:e.id},[(0,r._)("td",{class:(0,n.C_)([{"drac-text-white":!t.markHighStandardDeviationOfTime(e.standardDeviationOfTime),"drac-text-red":t.markHighStandardDeviationOfTime(e.standardDeviationOfTime)}])},(0,n.zw)(e.title),3),(0,r._)("td",{class:(0,n.C_)([{"drac-text-white":!t.markHighStandardDeviationOfTime(e.standardDeviationOfTime),"drac-text-red":t.markHighStandardDeviationOfTime(e.standardDeviationOfTime)}])},(0,n.zw)(e.optimistic),3),(0,r._)("td",null,(0,n.zw)(e.mostLikely),1),(0,r._)("td",{class:(0,n.C_)([{"drac-text-white":!t.markHighStandardDeviationOfTime(e.standardDeviationOfTime),"drac-text-red":t.markHighStandardDeviationOfTime(e.standardDeviationOfTime)}])},(0,n.zw)(e.pessimistic),3),(0,r._)("td",null,(0,n.zw)(e.expectedTime),1),(0,r._)("td",{class:(0,n.C_)([{"drac-text-white":!t.markHighStandardDeviationOfTime(e.standardDeviationOfTime),"drac-text-red":t.markHighStandardDeviationOfTime(e.standardDeviationOfTime)}])},(0,n.zw)(e.standardDeviationOfTime),3)])))),128))]),(0,r._)("tfoot",null,[(0,r._)("tr",null,[z,(0,r._)("th",U,(0,n.zw)(t.total.optimistic),1),(0,r._)("th",$,(0,n.zw)(t.total.mostLikely),1),(0,r._)("th",I,(0,n.zw)(t.total.pessimistic),1),(0,r._)("th",E,(0,n.zw)(t.total.expectedTime),1)])])])}var M=function(t,e,i,s){var a,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let q=class extends m.w3{constructor(...t){super(...t),(0,p.Z)(this,"useSettingsStore",x())}get settings(){return this.useSettingsStore.settings}markHighStandardDeviationOfTime(t){return!!this.settings.markHighStandardDeviationOfTime&&t>this.settings.standardDeviationOfTimeThreshold}};q=M([(0,m.Ei)({props:{activities:{type:Array,required:!0},total:{type:Array,required:!0}}})],q);var K=q;const V=(0,A.Z)(K,[["render",N]]);var Y=V,F=function(t,e,i,s){var a,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let B=class extends m.w3{constructor(...t){super(...t),(0,p.Z)(this,"useActivitiesStore",b()),(0,p.Z)(this,"useSettingsStore",x())}get activities(){return this.useActivitiesStore.activities}get settings(){return this.useSettingsStore.settings}get total(){return this.useActivitiesStore.total}get canShow(){return this.total.expectedTime>0}};B=F([(0,m.Ei)({components:{List:C,Table:Y}})],B);var J=B;const Q=(0,A.Z)(J,[["render",h]]);var W=Q;const G={class:"drac-box drac-d-flex flex-col gap-sm drac-my-sm"},X={for:"resultType",class:"drac-d-flex items-center gap-sm"},tt=(0,r._)("span",null,"Result Type",-1),et={style:{position:"relative"}},it=(0,r._)("div",{class:"drac-select-arrow drac-text-white"},[(0,r._)("svg",{viewBox:"0 0 24 24",focusable:"false",role:"presentation","aria-hidden":"true"},[(0,r._)("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})])],-1),st={key:0,for:"listType",class:"drac-d-flex items-center gap-sm"},at=(0,r._)("span",null,"List Type",-1),rt={style:{position:"relative"}},nt=(0,r._)("div",{class:"drac-select-arrow drac-text-white"},[(0,r._)("svg",{viewBox:"0 0 24 24",focusable:"false",role:"presentation","aria-hidden":"true"},[(0,r._)("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})])],-1),ct={key:1},lt={for:"template",class:"drac-d-flex items-center gap-sm"},ot=(0,r._)("span",null,"Template",-1),dt={class:"drac-text drac-text-grey drac-my-xxs"},ut={for:"markHighStandardDeviationOfTime",class:"drac-d-flex items-center gap-sm"},pt=(0,r._)("span",null,"Mark Hight Standard Deviation of Time",-1),mt={key:2,for:"standardDeviationOfTimeThreshold",class:"drac-d-flex items-center gap-sm"},vt=(0,r._)("span",null,"Standard Deviation of Time Threshold",-1),gt={class:"drac-w-xxs"},ht=["value"],ft={for:"storeSettings",class:"drac-d-flex items-center gap-sm"},yt=(0,r._)("span",null,"Store Settings",-1),Tt=(0,r._)("div",{class:"drac-text drac-text-grey drac-my-xxs"}," Settings are stored in local storage and removed if you disable the feature again. ",-1);function wt(t,e,i,a,c,l){return(0,r.wg)(),(0,r.iD)("div",G,[(0,r._)("label",X,[tt,(0,r._)("div",et,[(0,r.wy)((0,r._)("select",{id:"resultType",class:"drac-select drac-select-white","onUpdate:modelValue":e[0]||(e[0]=e=>t.settings.resultType=e)},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.resultTypeOptions,(t=>((0,r.wg)(),(0,r.iD)("option",{key:t},(0,n.zw)(t),1)))),128))],512),[[s.bM,t.settings.resultType]]),it])]),t.resultTypeIsList?((0,r.wg)(),(0,r.iD)("label",st,[at,(0,r._)("div",rt,[(0,r.wy)((0,r._)("select",{id:"listType",class:"drac-select drac-select-white","onUpdate:modelValue":e[1]||(e[1]=e=>t.settings.listType=e)},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.listTypeOptions,(t=>((0,r.wg)(),(0,r.iD)("option",{key:t},(0,n.zw)(t),1)))),128))],512),[[s.bM,t.settings.listType]]),nt])])):(0,r.kq)("",!0),t.resultTypeIsList?((0,r.wg)(),(0,r.iD)("div",ct,[(0,r._)("label",lt,[ot,(0,r.wy)((0,r._)("input",{id:"template","onUpdate:modelValue":e[2]||(e[2]=e=>t.settings.template=e),class:"drac-input drac-input-white drac-text-white"},null,512),[[s.nr,t.settings.template]])]),(0,r._)("div",dt," Available template variable: "+(0,n.zw)(t.availableTemplateVariables),1)])):(0,r.kq)("",!0),(0,r._)("label",ut,[pt,(0,r.wy)((0,r._)("input",{id:"markHighStandardDeviationOfTime",type:"checkbox","onUpdate:modelValue":e[3]||(e[3]=e=>t.settings.markHighStandardDeviationOfTime=e),class:(0,n.C_)(["drac-switch drac-checkbox",[{"drac-switch-green":t.settings.markHighStandardDeviationOfTime,"drac-switch-red":!t.settings.markHighStandardDeviationOfTime}]])},null,2),[[s.e8,t.settings.markHighStandardDeviationOfTime]])]),t.settings.markHighStandardDeviationOfTime?((0,r.wg)(),(0,r.iD)("label",mt,[vt,(0,r._)("div",gt,[(0,r._)("input",{id:"standardDeviationOfTimeThreshold",value:t.settings.standardDeviationOfTimeThreshold,onInput:e[4]||(e[4]=e=>t.settings.standardDeviationOfTimeThreshold=t.toNumber(e.target.value)),onFocus:e[5]||(e[5]=t=>t.target.select()),class:"drac-input drac-input-white drac-text-white"},null,40,ht)])])):(0,r.kq)("",!0),(0,r._)("div",null,[(0,r._)("label",ft,[yt,(0,r.wy)((0,r._)("input",{id:"storeSettings",type:"checkbox","onUpdate:modelValue":e[6]||(e[6]=e=>t.settings.storeSettings=e),class:(0,n.C_)(["drac-switch drac-checkbox",[{"drac-switch-green":t.settings.storeSettings,"drac-switch-red":!t.settings.storeSettings}]])},null,2),[[s.e8,t.settings.storeSettings]])]),Tt])])}var bt=function(t,e,i,s){var a,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let xt=class extends m.w3{constructor(...t){super(...t),(0,p.Z)(this,"useSettingsStore",x())}get settings(){return this.useSettingsStore.settings}get resultTypeOptions(){return Object.values(T)}get listTypeOptions(){return Object.values(w)}get resultTypeIsList(){return this.settings.resultType===T.List}get availableTemplateVariables(){const t=["#title#","#optimistic#","#mostLikely#","#pessimistic#","#expectedTime#","#standardDeviationOfTime#"];return t.join(", ")}mounted(){this.useSettingsStore.$subscribe(((t,e)=>{e.settings.storeSettings?localStorage.setItem("settings",JSON.stringify(e)):localStorage.removeItem("settings")}))}};xt=bt([(0,m.Ei)({methods:{toNumber:y},emits:["set:standardDeviationOfTimeThreshold"]})],xt);var Dt=xt;const Ot=(0,A.Z)(Dt,[["render",wt]]);var St=Ot;const kt=(0,r._)("div",{class:"drac-d-grid drac-my-sm"},[(0,r._)("div",{class:"col-span-5"},"Activity Title"),(0,r._)("div",null,"Optimistic Time"),(0,r._)("div",null,"Most Likely Time"),(0,r._)("div",null,"Pessimistic Time"),(0,r._)("div",{class:"drac-text-right"},"Expected Time"),(0,r._)("div",{class:"col-span-2 drac-text-right"},"Standard Deviation of Time")],-1),_t={class:"drac-d-grid"},Ht={class:"col-start-6 drac-px-sm border-l-4-invisible"},Lt={class:"drac-px-sm border-l-4-invisible"},jt={class:"drac-px-sm border-l-4-invisible"},At={class:"drac-text-right drac-text-semibold"},Rt={class:"col-start-11 col-span-2 drac-text-right"};function Ct(t,e,i,s,a,c){const l=(0,r.up)("activity");return(0,r.wg)(),(0,r.iD)(r.HY,null,[kt,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.activities,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e.id,class:"drac-d-grid drac-mb-sm"},[(0,r.Wm)(l,{"activity-id":e.id,title:e.title,"onUpdate:title":t=>e.title=t,optimistic:e.optimistic,"onUpdate:optimistic":t=>e.optimistic=t,"most-likely":e.mostLikely,"onUpdate:most-likely":t=>e.mostLikely=t,pessimistic:e.pessimistic,"onUpdate:pessimistic":t=>e.pessimistic=t,"expected-time":e.expectedTime,"onUpdate:expected-time":t=>e.expectedTime=t,"standard-deviation-of-time":e.standardDeviationOfTime,"onUpdate:standard-deviation-of-time":t=>e.standardDeviationOfTime=t,canDelete:t.canDelete,onRemoveActivity:t.removeActivity},null,8,["activity-id","title","onUpdate:title","optimistic","onUpdate:optimistic","most-likely","onUpdate:most-likely","pessimistic","onUpdate:pessimistic","expected-time","onUpdate:expected-time","standard-deviation-of-time","onUpdate:standard-deviation-of-time","canDelete","onRemoveActivity"])])))),128)),(0,r._)("div",_t,[(0,r._)("div",Ht,(0,n.zw)(t.total.optimistic),1),(0,r._)("div",Lt,(0,n.zw)(t.total.mostLikely),1),(0,r._)("div",jt,(0,n.zw)(t.total.pessimistic),1),(0,r._)("div",At,(0,n.zw)(t.total.expectedTime),1),(0,r._)("div",Rt,[(0,r._)("button",{type:"button",onClick:e[0]||(e[0]=e=>t.add()),class:"drac-btn drac-bg-green"}," Add Activity ")])])],64)}const Zt=["value","placeholder"],Pt=["value"],zt=["value"],Ut=["value"],$t={class:"drac-py-xs drac-text-white drac-text-semibold drac-text-right"};function It(t,e,i,a,c,l){return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("input",{type:"text",value:t.title,placeholder:t.titlePlaceholder,onInput:e[0]||(e[0]=e=>{t.$emit("update:title",e.target.value)}),onFocus:e[1]||(e[1]=t=>t.target.select()),"aria-label":"Activity Title",class:(0,n.C_)(["col-span-5 drac-input drac-input-white",[{"drac-text-white":!t.markHighStandardDeviationOfTime,"drac-text-red":t.markHighStandardDeviationOfTime}]])},null,42,Zt),(0,r._)("input",{value:t.optimistic,onInput:e[2]||(e[2]=e=>{t.$emit("update:optimistic",t.toNumber(e.target.value)),t.$nextTick((()=>t.updateCalculatedValues()))}),onFocus:e[3]||(e[3]=t=>t.target.select()),onKeydown:[e[4]||(e[4]=(0,s.D2)((e=>t.increment(e,"update:optimistic")),["up"])),e[5]||(e[5]=(0,s.D2)((e=>t.decrement(e,"update:optimistic")),["down"]))],"aria-label":"Optimistic time",class:(0,n.C_)(["drac-input drac-input-white",[{"drac-text-white":!t.markHighStandardDeviationOfTime,"drac-text-red":t.markHighStandardDeviationOfTime}]])},null,42,Pt),(0,r._)("input",{value:t.mostLikely,onInput:e[6]||(e[6]=e=>{t.$emit("update:mostLikely",t.toNumber(e.target.value)),t.$nextTick((()=>t.updateCalculatedValues()))}),onFocus:e[7]||(e[7]=t=>t.target.select()),onKeydown:[e[8]||(e[8]=(0,s.D2)((e=>t.increment(e,"update:mostLikely")),["up"])),e[9]||(e[9]=(0,s.D2)((e=>t.decrement(e,"update:mostLikely")),["down"]))],"aria-label":"Most likely time",class:"drac-input drac-input-white drac-text-white"},null,40,zt),(0,r._)("input",{value:t.pessimistic,onInput:e[10]||(e[10]=e=>{t.$emit("update:pessimistic",t.toNumber(e.target.value)),t.$nextTick((()=>t.updateCalculatedValues()))}),onFocus:e[11]||(e[11]=t=>t.target.select()),onKeydown:[e[12]||(e[12]=(0,s.D2)((e=>t.increment(e,"update:pessimistic")),["up"])),e[13]||(e[13]=(0,s.D2)((e=>t.decrement(e,"update:pessimistic")),["down"]))],"aria-label":"Pessimistic time",class:(0,n.C_)(["drac-input drac-input-white",[{"drac-text-white":!t.markHighStandardDeviationOfTime,"drac-text-red":t.markHighStandardDeviationOfTime}]])},null,42,Ut),(0,r._)("div",$t,(0,n.zw)(t.expectedTime),1),(0,r._)("div",{class:(0,n.C_)(["col-span-2 drac-py-xs drac-text-right",[{"drac-text-white":!t.markHighStandardDeviationOfTime,"drac-text-red":t.markHighStandardDeviationOfTime}]])},(0,n.zw)(t.standardDeviationOfTime),3),t.canDelete?((0,r.wg)(),(0,r.iD)("button",{key:0,type:"button",onClick:e[14]||(e[14]=e=>t.$emit("removeActivity",t.activityId)),class:"col-start-12 drac-btn drac-bg-red"}," Remove ")):(0,r.kq)("",!0)],64)}var Et=function(t,e,i,s){var a,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let Nt=class extends m.w3{constructor(...t){super(...t),(0,p.Z)(this,"step",.5),(0,p.Z)(this,"canDelete",void 0),(0,p.Z)(this,"activityId",void 0),(0,p.Z)(this,"optimistic",void 0),(0,p.Z)(this,"mostLikely",void 0),(0,p.Z)(this,"pessimistic",void 0),(0,p.Z)(this,"standardDeviationOfTime",void 0),(0,p.Z)(this,"useSettingsStore",x())}get settings(){return this.useSettingsStore.settings}calcExpectedTime(){if(0===this.mostLikely&&0===this.pessimistic)return;const t=(this.optimistic+4*this.mostLikely+this.pessimistic)/6;this.$emit("update:expectedTime",f(t))}updateCalculatedValues(){this.calcExpectedTime(),this.calcStandardDeviationOfTime()}calcStandardDeviationOfTime(){if(0===this.pessimistic)return;const t=(this.pessimistic-this.optimistic)/6;this.$emit("update:standardDeviationOfTime",f(t))}get titlePlaceholder(){return`Activity ${this.activityId}`}increment(t,e){const i=t.target;this.$emit(e,y(i.value)+this.step),this.$nextTick((()=>this.calcExpectedTime()))}decrement(t,e){const i=t.target;this.$emit(e,y(i.value)-this.step),this.$nextTick((()=>this.calcExpectedTime()))}get markHighStandardDeviationOfTime(){return!!this.settings.markHighStandardDeviationOfTime&&this.standardDeviationOfTime>this.settings.standardDeviationOfTimeThreshold}};Nt=Et([(0,m.Ei)({methods:{toNumber:y},emits:["removeActivity","update:title","update:optimistic","update:mostLikely","update:pessimistic","update:expectedTime","update:standardDeviationOfTime"],props:{activityId:Number,title:String,optimistic:Number,mostLikely:Number,pessimistic:Number,expectedTime:Number,standardDeviationOfTime:Number,canDelete:Boolean},computed:{titlePlaceholder:String}})],Nt);var Mt=Nt;const qt=(0,A.Z)(Mt,[["render",It]]);var Kt=qt,Vt=function(t,e,i,s){var a,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let Yt=class extends m.w3{constructor(...t){super(...t),(0,p.Z)(this,"useActivitiesStore",b())}get activities(){return this.useActivitiesStore.activities}add(){this.useActivitiesStore.add()}removeActivity(t){this.useActivitiesStore.remove(t)}get canDelete(){return this.useActivitiesStore.canDelete}get total(){return this.useActivitiesStore.total}};Yt=Vt([(0,m.Ei)({components:{Activity:Kt}})],Yt);var Ft=Yt;const Bt=(0,A.Z)(Ft,[["render",Ct]]);var Jt=Bt,Qt=function(t,e,i,s){var a,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(n=(r<3?a(n):r>3?a(e,i,n):a(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};let Wt=class extends m.w3{constructor(...t){super(...t),(0,p.Z)(this,"tabs",["Calculator","Result","Settings"]),(0,p.Z)(this,"currentTab","Calculator"),(0,p.Z)(this,"settingsStore",x())}created(){const t=localStorage.getItem("settings");null!==t&&this.settingsStore.$patch(JSON.parse(t))}};Wt=Qt([(0,m.Ei)({components:{Calculator:Jt,Result:W,Settings:St}})],Wt);var Gt=Wt;const Xt=(0,A.Z)(Gt,[["render",u]]);var te=Xt;const ee=(0,a.WB)(),ie=(0,s.ri)(te);ie.use(ee),ie.mount("#app")}},e={};function i(s){var a=e[s];if(void 0!==a)return a.exports;var r=e[s]={exports:{}};return t[s](r,r.exports,i),r.exports}i.m=t,function(){var t=[];i.O=function(e,s,a,r){if(!s){var n=1/0;for(d=0;d<t.length;d++){s=t[d][0],a=t[d][1],r=t[d][2];for(var c=!0,l=0;l<s.length;l++)(!1&r||n>=r)&&Object.keys(i.O).every((function(t){return i.O[t](s[l])}))?s.splice(l--,1):(c=!1,r<n&&(n=r));if(c){t.splice(d--,1);var o=a();void 0!==o&&(e=o)}}return e}r=r||0;for(var d=t.length;d>0&&t[d-1][2]>r;d--)t[d]=t[d-1];t[d]=[s,a,r]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var a,r,n=s[0],c=s[1],l=s[2],o=0;if(n.some((function(e){return 0!==t[e]}))){for(a in c)i.o(c,a)&&(i.m[a]=c[a]);if(l)var d=l(i)}for(e&&e(s);o<n.length;o++)r=n[o],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(d)},s=self["webpackChunkpert_calculator"]=self["webpackChunkpert_calculator"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(2765)}));s=i.O(s)})();
//# sourceMappingURL=app.1526b3e5.js.map