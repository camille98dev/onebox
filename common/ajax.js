import Vue from 'vue'
import ajax from '@/uni_modules/u-ajax/js_sdk'

// 创建请求实例
const baseUrl = 'https://www.app.yhsj-cn.com';

const instance = ajax.create({
	// 默认配置
	baseURL: baseUrl,
	timeout: 30000
})

// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		if (uni.getStorageSync('api_token')) {
			config.header["Authorization"] = '' + uni.getStorageSync('api_token')
		}
		// 在发送请求前做些什么
		// console.log('发送请求前 config', config)
		// if (uni.getStorageSync('token')) {
			// config.header["token"] = uni.getStorageSync('token')
			// config.header["Authorization"] = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvb25lYm94Lmdyb3dpbmdzYWxlLmNuXC9hcGlcL3dlY2hhdFwvbWluaVwvbG9naW4iLCJpYXQiOjE2NjEyNDg1NzEsIm5iZiI6MTY2MTI0ODU3MSwianRpIjoicWZsWDVmaXRBenh5R0wweiIsInN1YiI6MiwicHJ2IjoiNDI1MTRkODBlZTM4NWRhODRjYTM4YWY0NTgyZThmNTRiYjRjZmIzOSJ9.tRyInbKrNJnGkY1zNEql7jfmACkfvG2MuZFVpk524uM"
		// }

		config.header["Content-Type"] = "application/x-www-form-urlencoded";
		config.header["Accept"] = "application/json";
		return config
	},
	error => {
		// 对请求错误做些什么
		// console.log('发请求错误 err', error)
		return Promise.reject(error)
	}
)

// 添加响应拦截器
instance.interceptors.response.use(
	response => {
		// 对响应数据做些什么
		if (response.data.code && response.data.code === 400) {
			uni.showToast({
				title: response.data.msg,
				icon: "none",
				duration: 2500
			});
		}
		return response
	},
	error => {
		// 对响应错误做些什么
		// console.log('interceptors error', error)
		return Promise.reject(error)
	}
)

export default instance
