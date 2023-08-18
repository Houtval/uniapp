var e,t;import{$ as s,y as o,f as r,o as a,g as i,w as n,d as l,l as d,j as u,k as h,z as m,v as c,i as p,u as f,s as g,b as v,A as y,r as b,c as w,F as _,e as x,t as S,p as $}from"./index-07de3841.js";import{a as I,_ as k,b as L,c as C}from"./index.1a429877.js";import{m as B,b as E,a as j}from"./mqtt.806dc7db.js";import{_ as U,b as F,a as z}from"./uv-button.241ff25f.js";import{_ as R}from"./uv-popup.8273fe42.js";import{_ as V}from"./_plugin-vue_export-helper.1b428a4d.js";import{_ as N,a as T}from"./uv-row.2798b1fe.js";const H=V({name:"uv-image",emits:["click","load","error"],mixins:[B,E,{props:{src:{type:String,default:""},mode:{type:String,default:"aspectFill"},width:{type:[String,Number],default:"300"},height:{type:[String,Number],default:"225"},shape:{type:String,default:"square"},radius:{type:[String,Number],default:0},lazyLoad:{type:Boolean,default:!0},observeLazyLoad:{type:Boolean,default:!1},showMenuByLongpress:{type:Boolean,default:!0},loadingIcon:{type:String,default:"photo"},errorIcon:{type:String,default:"error-circle"},showLoading:{type:Boolean,default:!0},showError:{type:Boolean,default:!0},fade:{type:Boolean,default:!0},webp:{type:Boolean,default:!1},duration:{type:[String,Number],default:500},bgColor:{type:String,default:"#f3f4f6"},...null==(t=null==(e=uni.$uv)?void 0:e.props)?void 0:t.image}}],data(){return{isError:!1,loading:!0,backgroundStyle:{},show:!1,observeShow:!this.observeLazyLoad,elIndex:"",imgWidth:this.width,imgHeight:this.height,thresholdValue:50}},watch:{src:{immediate:!0,handler(e){e?(this.isError=!1,this.loading=!0):this.isError=!0}}},computed:{wrapStyle(){let e={};return e.width=this.$uv.addUnit(this.imgWidth),e.height=this.$uv.addUnit(this.imgHeight),e.borderRadius="circle"==this.shape?"10000px":this.$uv.addUnit(this.radius),e.overflow=this.radius>0?"hidden":"visible",this.$uv.deepMerge(e,this.$uv.addStyle(this.customStyle))},imageStyle(){let e={};return e.borderRadius="circle"==this.shape?"10000px":this.$uv.addUnit(this.radius),e}},created(){this.elIndex=this.$uv.guid(),this.observer={},this.observerName="lazyLoadContentObserver"},mounted(){this.show=!0,this.observeLazyLoad&&this.observerFn()},methods:{onClick(){this.$emit("click")},onErrorHandler(e){this.loading=!1,this.isError=!0,this.$emit("error",e)},onLoadHandler(e){"widthFix"==this.mode&&(this.imgHeight="auto"),"heightFix"==this.mode&&(this.imgWidth="auto"),this.loading=!1,this.isError=!1,this.$emit("load",e),this.removeBgColor()},removeBgColor(){this.backgroundStyle={backgroundColor:"transparent"}},observerFn(){this.$nextTick((()=>{s("onLazyLoadReachBottom",(()=>{this.observeShow||(this.observeShow=!0)}))})),setTimeout((()=>{this.disconnectObserver(this.observerName);const e=o(this);e.relativeToViewport({bottom:this.thresholdValue}).observe(`.uv-image--${this.elIndex}`,(e=>{e.intersectionRatio>0&&(this.observeShow=!0,this.disconnectObserver(this.observerName))})),this[this.observerName]=e}),50)},disconnectObserver(e){const t=this[e];t&&t.disconnect()}}},[["render",function(e,t,s,o,f,g){const v=c,y=j(r("uv-icon"),U),b=p,w=j(r("uv-transition"),F);return a(),i(w,{show:f.show,mode:"fade",duration:e.fade?e.duration:0},{default:n((()=>[l(b,{class:d(["uv-image",[`uv-image--${f.elIndex}`]]),onClick:g.onClick,style:u([g.wrapStyle,f.backgroundStyle])},{default:n((()=>[!f.isError&&f.observeShow?(a(),i(v,{key:0,src:e.src,mode:e.mode,onError:g.onErrorHandler,onLoad:g.onLoadHandler,"show-menuv-by-longpress":e.showMenuByLongpress,"lazy-load":e.lazyLoad,class:"uv-image__image",style:u([g.imageStyle])},null,8,["src","mode","onError","onLoad","show-menuv-by-longpress","lazy-load","style"])):h("",!0),e.showLoading&&f.loading?(a(),i(b,{key:1,class:"uv-image__loading",style:u({borderRadius:"circle"==e.shape?"50%":e.$uv.addUnit(e.radius),backgroundColor:e.bgColor,width:e.$uv.addUnit(e.width),height:e.$uv.addUnit(e.height)})},{default:n((()=>[m(e.$slots,"loading",{},(()=>[l(y,{name:e.loadingIcon,width:e.width,height:e.height},null,8,["name","width","height"])]),!0)])),_:3},8,["style"])):h("",!0),e.showError&&f.isError&&!f.loading?(a(),i(b,{key:2,class:"uv-image__error",style:u({borderRadius:"circle"==e.shape?"50%":e.$uv.addUnit(e.radius),width:e.$uv.addUnit(e.width),height:e.$uv.addUnit(e.height)})},{default:n((()=>[m(e.$slots,"error",{},(()=>[l(y,{name:e.errorIcon,width:e.width,height:e.height},null,8,["name","width","height"])]),!0)])),_:3},8,["style"])):h("",!0)])),_:3},8,["class","onClick","style"])])),_:3},8,["show","duration"])}],["__scopeId","data-v-314ef5a3"]]);const O=V({data:()=>({username:"",form:{userInfo:{id:"",username:"",password:""}},rules:{"userInfo.username":{type:"string",required:!0,message:"请填写用户名",trigger:["blur","change"]},"userInfo.password":{type:"string",required:!0,message:"请填写密码",trigger:["blur","change"]}}}),onLoad(){let e=this;f({key:"username",success:function(t){e.username=t.data,e.form.userInfo.username=t.data}}),f({key:"userid",success:function(t){e.form.userInfo.id=t.data.toString()}})},methods:{lonoff:function(){g({icon:"success",title:"注销成功"}),setTimeout((function(){v({url:"/pages/user/login/login"})}),1e3),y()},submit(){const e=this;f({key:"userid",success:function(t){e.form.userInfo.id=t.data}}),this.$refs.uvFormRef.validate().then((t=>{b({header:{"Content-Type":"application/json"},url:I+"/user/update",method:"POST",data:{id:this.form.userInfo.id,username:this.form.userInfo.username,password:this.form.userInfo.password},dataType:"json",success:function(t){"2000"==t.data.code?(g({icon:"success",title:"修改成功"}),setTimeout((function(){e.lonoff()}),1e3)):g({icon:"success",title:t.data.message})}})}))},reset(){this.$refs.uvFormRef.resetFields(),this.$refs.uvFormRef.clearValidate()},open(){this.$refs.popup.open()}}},[["render",function(e,t,s,o,i,d){const u=p,h=j(r("uv-input"),k),m=j(r("uv-form-item"),L),c=j(r("uv-button"),z),f=j(r("uv-form"),C),g=j(r("uv-popup"),R),v=j(r("uv-image"),H),y=$,b=j(r("uv-col"),N),I=j(r("uv-row"),T);return a(),w(_,null,[l(g,{ref:"popup",mode:"center"},{default:n((()=>[l(u,{style:{width:"700rpx",height:"700rpx",display:"flex","justify-content":"space-evenly","align-items":"center","flex-direction":"column"}},{default:n((()=>[l(u,{class:"h1"},{default:n((()=>[x("修改密码")])),_:1}),l(u,{style:{width:"500rpx"}},{default:n((()=>[l(f,{labelPosition:"left",labelWidth:"50px",model:i.form,rules:i.rules,ref:"uvFormRef",class:"form"},{default:n((()=>[l(m,{label:"用户名",prop:"userInfo.usernmae",borderBottom:"",ref:"item1"},{default:n((()=>[l(h,{modelValue:i.form.userInfo.username,"onUpdate:modelValue":t[0]||(t[0]=e=>i.form.userInfo.username=e),placeholder:"请输入用户名"},null,8,["modelValue"])])),_:1},512),l(m,{label:"密码",prop:"userInfo.password",borderBottom:"",ref:"item1"},{default:n((()=>[l(h,{modelValue:i.form.userInfo.password,"onUpdate:modelValue":t[1]||(t[1]=e=>i.form.userInfo.password=e),placeholder:"请输入密码"},null,8,["modelValue"])])),_:1},512),l(m,null,{default:n((()=>[l(c,{type:"primary",text:"提交",customStyle:"margin-top: 10px",onClick:t[2]||(t[2]=e=>d.submit())}),l(c,{type:"error",text:"重置",customStyle:"margin-top: 10px",onClick:t[3]||(t[3]=e=>d.reset())})])),_:1})])),_:1},8,["model","rules"])])),_:1})])),_:1})])),_:1},512),l(u,{class:"content"}),l(u,{class:"userIcon"},{default:n((()=>[l(v,{src:"https://cdn.uviewui.com/uview/album/1.jpg",shape:"circle",width:"100px",height:"100px"}),l(y,null,{default:n((()=>[x("用户名:"+S(i.username),1)])),_:1})])),_:1}),l(u,{class:"button"},{default:n((()=>[l(I,null,{default:n((()=>[l(b,{span:"4"}),l(b,{span:"4"},{default:n((()=>[l(c,{type:"primary",text:"修改信息",onClick:d.open},null,8,["onClick"])])),_:1}),l(b,{span:"4"})])),_:1}),l(I,null,{default:n((()=>[l(b,{span:"4"}),l(b,{span:"4"},{default:n((()=>[l(c,{type:"error",text:"注销",onClick:d.lonoff},null,8,["onClick"])])),_:1}),l(b,{span:"4"})])),_:1})])),_:1})],64)}],["__scopeId","data-v-f018e1ca"]]);export{O as default};