"use strict";const e=require("../../../common/vendor.js");require("../../../mqtt/mqtt.js");const m=require("../../../api/index.js"),p={data(){return{showPassword:!0,passwordIcon:"lock",form:{userInfo:{id:"",username:"",password:""}},rules:{"userInfo.username":{type:"string",required:!0,message:"请填写用户名",trigger:["blur","change"]},"userInfo.password":{type:"string",required:!0,message:"请填写密码",trigger:["blur","change"]}}}},onShow(){let u=this;e.index.getStorage({key:"username",success:function(s){u.form.userInfo.username=s.data},fail:function(){e.index.showToast({icon:"error",title:"未登录，请先登录"}),setTimeout(function(){e.index.reLaunch({url:"/pages/user/login/login"})},1e3)}}),e.index.getStorage({key:"userid",success:function(s){u.form.userInfo.id=s.data.toString()},fail:function(){e.index.showToast({icon:"error",title:"未登录，请先登录"}),setTimeout(function(){e.index.reLaunch({url:"/pages/user/login/login"})},1e3)}})},methods:{lonoff:function(){e.index.showToast({icon:"success",title:"注销成功"}),setTimeout(function(){e.index.reLaunch({url:"/pages/user/login/login"})},1e3),e.index.clearStorage()},submit(){const u=this;e.index.getStorage({key:"userid",success:function(s){u.form.userInfo.id=s.data}}),this.$refs.uvFormRef.validate().then(s=>{e.index.request({header:{"Content-Type":"application/json"},url:m.apiUrl+"/user/update",method:"POST",data:{id:this.form.userInfo.id,username:this.form.userInfo.username,password:this.form.userInfo.password},dataType:"json",success:function(t){t.data.code=="2000"?(e.index.showToast({icon:"success",title:"修改成功"}),setTimeout(function(){u.lonoff()},1e3)):e.index.showToast({icon:"success",title:t.data.message})}})})},reset(){this.$refs.uvFormRef.resetFields(),this.$refs.uvFormRef.clearValidate()},open(){this.$refs.popup.open()},hideKeyboard(){e.index.hideKeyboard()},showPasswordMethod(){this.showPassword==!1?(this.passwordIcon="lock",this.showPassword=!0):(this.passwordIcon="lock-open",this.showPassword=!1)}}};if(!Array){const u=e.resolveComponent("uv-input"),s=e.resolveComponent("uv-form-item"),t=e.resolveComponent("uv-icon"),i=e.resolveComponent("uv-button"),o=e.resolveComponent("uv-form"),n=e.resolveComponent("uv-popup"),r=e.resolveComponent("uv-image"),c=e.resolveComponent("uv-col"),a=e.resolveComponent("uv-row");(u+s+t+i+o+n+r+c+a)()}const d=()=>"../../../uni_modules/uv-input/components/uv-input/uv-input.js",l=()=>"../../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js",f=()=>"../../../uni_modules/uv-icon/components/uv-icon/uv-icon.js",_=()=>"../../../uni_modules/uv-button/components/uv-button/uv-button.js",v=()=>"../../../uni_modules/uv-form/components/uv-form/uv-form.js",h=()=>"../../../uni_modules/uv-popup/components/uv-popup/uv-popup.js",w=()=>"../../../uni_modules/uv-image/components/uv-image/uv-image.js",g=()=>"../../../uni_modules/uv-row/components/uv-col/uv-col.js",y=()=>"../../../uni_modules/uv-row/components/uv-row/uv-row.js";Math||(d+l+f+_+v+h+w+g+y)();function x(u,s,t,i,o,n){return{a:e.o(r=>o.form.userInfo.username=r),b:e.p({placeholder:"请输入用户名",modelValue:o.form.userInfo.username}),c:e.sr("item1","dd991dc9-2,dd991dc9-1"),d:e.p({label:"用户名",prop:"userInfo.usernmae",borderBottom:!0}),e:e.o(n.showPasswordMethod),f:e.p({name:o.passwordIcon,color:"#black",size:"20"}),g:e.o(r=>o.form.userInfo.password=r),h:e.p({password:o.showPassword,placeholder:"请输入密码",suffixIconStyle:"color: #909399",modelValue:o.form.userInfo.password}),i:e.sr("item1","dd991dc9-4,dd991dc9-1"),j:e.p({label:"密码",prop:"userInfo.password",borderBottom:!0}),k:e.o(r=>n.submit()),l:e.p({type:"primary",text:"提交",customStyle:"margin-top: 10px"}),m:e.o(r=>n.reset()),n:e.p({type:"error",text:"重置",customStyle:"margin-top: 10px"}),o:e.sr("uvFormRef","dd991dc9-1,dd991dc9-0"),p:e.p({labelPosition:"left",labelWidth:"50px",model:o.form,rules:o.rules}),q:e.sr("popup","dd991dc9-0"),r:e.p({mode:"center"}),s:e.p({src:"https://cdn.uviewui.com/uview/album/1.jpg",shape:"circle",width:"100px",height:"100px"}),t:e.t(o.form.userInfo.username),v:e.p({span:"4"}),w:e.o(n.open),x:e.p({type:"primary",text:"修改信息"}),y:e.p({span:"4"}),z:e.p({span:"4"}),A:e.p({span:"4"}),B:e.o(n.lonoff),C:e.p({type:"error",text:"注销"}),D:e.p({span:"4"}),E:e.p({span:"4"})}}const b=e._export_sfc(p,[["render",x],["__scopeId","data-v-dd991dc9"],["__file","D:/imformation/uni-app/stm32/pages/tabbar/user/user.vue"]]);wx.createPage(b);