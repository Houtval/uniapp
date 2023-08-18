"use strict";const l=require("../../../uv-ui-tools/libs/mixin/mpMixin.js"),a=require("../../../uv-ui-tools/libs/mixin/mixin.js"),u=require("./props.js"),o=require("../../../../common/vendor.js");require("../../../uv-ui-tools/libs/function/index.js");require("../../../uv-ui-tools/libs/function/test.js");require("../../../uv-ui-tools/libs/function/digit.js");const m={name:"uv-form-item",emits:["click"],mixins:[l.mpMixin,a.mixin,u.props],data(){return{message:"",parentData:{labelPosition:"left",labelAlign:"left",labelStyle:{},labelWidth:45,errorType:"message"}}},mounted(){this.init()},methods:{init(){this.updateParentData(),this.parent||this.$uv.error("uv-form-item需要结合uv-form组件使用")},updateParentData(){this.getParentData("uv-form")},clearValidate(){this.message=null},resetField(){const e=this.$uv.getProperty(this.parent.originalModel,this.prop);this.$uv.setProperty(this.parent.model,this.prop,e),this.message=null},clickHandler(){this.$emit("click")}}};if(!Array){const e=o.resolveComponent("uv-icon"),t=o.resolveComponent("uv-transition"),i=o.resolveComponent("uv-line");(e+t+i)()}const p=()=>"../../../uv-icon/components/uv-icon/uv-icon.js",c=()=>"../../../uv-transition/components/uv-transition/uv-transition.js",v=()=>"../../../uv-line/components/uv-line/uv-line.js";Math||(p+c+v)();function d(e,t,i,b,n,r){return o.e({a:e.required||e.leftIcon||e.label},e.required||e.leftIcon||e.label?o.e({b:e.required},e.required?{}:{},{c:e.leftIcon},e.leftIcon?{d:o.p({name:e.leftIcon,["custom-style"]:e.leftIconStyle})}:{},{e:o.t(e.label),f:o.s(n.parentData.labelStyle),g:o.s({justifyContent:n.parentData.labelAlign==="left"?"flex-start":n.parentData.labelAlign==="center"?"center":"flex-end"}),h:e.$uv.addUnit(e.labelWidth||n.parentData.labelWidth),i:n.parentData.labelPosition==="left"?0:"5px"}):{},{j:o.o((...s)=>r.clickHandler&&r.clickHandler(...s)),k:o.s(e.$uv.addStyle(e.customStyle)),l:o.s({flexDirection:(e.labelPosition||n.parentData.labelPosition)==="left"?"row":"column"}),m:!!n.message&&n.parentData.errorType==="message"},n.message&&n.parentData.errorType==="message"?{n:o.t(n.message),o:e.$uv.addUnit(n.parentData.labelPosition==="top"?0:e.labelWidth||n.parentData.labelWidth),p:o.p({show:!0,duration:100,mode:"slide-top"})}:{},{q:e.borderBottom},e.borderBottom?{r:o.p({color:n.message&&n.parentData.errorType==="border-bottom"?"#f56c6c":"#d6d7d9"})}:{})}const f=o._export_sfc(m,[["render",d],["__scopeId","data-v-d1e73275"],["__file","D:/imformation/uni-app/stm32/uni_modules/uv-form/components/uv-form-item/uv-form-item.vue"]]);wx.createComponent(f);