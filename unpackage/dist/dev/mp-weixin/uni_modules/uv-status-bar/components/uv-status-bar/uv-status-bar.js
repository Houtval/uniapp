"use strict";const i=require("../../../uv-ui-tools/libs/mixin/mpMixin.js"),r=require("../../../uv-ui-tools/libs/mixin/mixin.js"),o=require("./props.js"),s=require("../../../../common/vendor.js");require("../../../uv-ui-tools/libs/function/index.js");require("../../../uv-ui-tools/libs/function/test.js");require("../../../uv-ui-tools/libs/function/digit.js");const u={name:"uv-status-bar",mixins:[i.mpMixin,r.mixin,o.props],data(){return{}},computed:{style(){const t={};return t.height=this.$uv.addUnit(this.$uv.sys().statusBarHeight,"px"),this.bgColor&&(this.bgColor.indexOf("gradient")>-1?t.backgroundImage=this.bgColor:t.background=this.bgColor),this.$uv.deepMerge(t,this.$uv.addStyle(this.customStyle))}}};function n(t,_,m,c,d,e){return{a:s.s(e.style)}}const a=s._export_sfc(u,[["render",n],["__scopeId","data-v-f5bd6f5a"],["__file","D:/imformation/uni-app/stm32/uni_modules/uv-status-bar/components/uv-status-bar/uv-status-bar.vue"]]);wx.createComponent(a);