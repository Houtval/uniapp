"use strict";const n=require("../../../uv-ui-tools/libs/mixin/mpMixin.js"),s=require("../../../uv-ui-tools/libs/mixin/mixin.js"),o=require("./props.js"),i=require("../../../../common/vendor.js");require("../../../uv-ui-tools/libs/function/index.js");require("../../../uv-ui-tools/libs/function/test.js");require("../../../uv-ui-tools/libs/function/digit.js");const r={name:"uv-line",mixins:[n.mpMixin,s.mixin,o.props],computed:{lineStyle(){const e={};return e.margin=this.margin,this.direction==="row"?(e.borderBottomWidth="1px",e.borderBottomStyle=this.dashed?"dashed":"solid",e.width=this.$uv.addUnit(this.length),this.hairline&&(e.transform="scaleY(0.5)")):(e.borderLeftWidth="1px",e.borderLeftStyle=this.dashed?"dashed":"solid",e.height=this.$uv.addUnit(this.length),this.hairline&&(e.transform="scaleX(0.5)")),e.borderColor=this.color,this.$uv.deepMerge(e,this.$uv.addStyle(this.customStyle))}}};function d(e,l,m,_,c,t){return{a:i.s(t.lineStyle)}}const u=i._export_sfc(r,[["render",d],["__scopeId","data-v-dcf8cb8f"],["__file","D:/imformation/uni-app/stm32/uni_modules/uv-line/components/uv-line/uv-line.vue"]]);wx.createComponent(u);
