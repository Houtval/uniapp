import mqtt from "mqtt/dist/mqtt"
// #ifdef H5
const url = 'ws://192.168.10.10:8083/mqtt'
// #endif
// #ifdef MP-WEIXIN
const url = 'wxs://192.168.10.10:8084/mqtt'
// #endif
const username = "admin"
const password = "zhao@1226"
export let client=null
export const options = {
	// Clean session
	clean: false,
	connectTimeout: 4000,
	// 认证信息
	clientId: getUuid(),
	username: username,
	password: password
}

export function init() {
	client = mqtt.connect(url, options)
	client.on('connect', function() {
		console.log('连接成功')
	})
	
}

export function reception(){
	client.on('message',function(topic, message){
		let value=message.toString().split(':')
			if(value[0]=="temperature")
			{
			uni.setStorage({
				key:"temperature",
				data:value[1]
			})
			}
			if(value[0]=="humidity")
			{
			uni.setStorage({
				key:"humidity",
				data:value[1]
			})
			}
			if(value[0]=="lightswitch")
			{
			uni.setStorage({
				key:"lightswitch",
				data:value[1]
			})
			}
			if(value[0]=="lightbrightness")
			{
			uni.setStorage({
				key:"lightbrightness",
				data:value[1]
			})
			}
			if(value[0]=="lightbrightness")
			{
			uni.setStorage({
				key:"lightbrightness",
				data:value[1]
			})
			}
			if(value[0]=="color")
			{
			uni.setStorage({
				key:"color",
				data:value[1]
			})
			}
			if(value[0]=="buzzer")
			{
			uni.setStorage({
				key:"buzzer",
				data:value[1]
			})
			}
			if(value[0]=="maxtemperature")
			{
			uni.setStorage({
				key:"maxtemperature",
				data:value[1]
			})
			}
			if(value[0]=="maxhumidity")
			{
			uni.setStorage({
				key:"maxhumidity",
				data:value[1]
			})
			}
			console.log(message.toString())
	})
}

export function publish(topic,message){
	// 订阅主题
	client.subscribe(topic, function(err) {
		if (!err) {
			// 发布消息
			client.publish(topic, message)
		}
	})
}

function getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}





