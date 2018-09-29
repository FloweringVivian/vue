import axios from 'axios'
//import qs from 'qs'
import { Message } from 'element-ui'
import { router } from '../main.js'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = '/api';  //开发环境
//axios.defaults.baseURL = '/';  //线上环境

export function ajax(url, params, method) {
    return new Promise((resolve, reject) => {
    	if (method && method == 'get') {
    		axios.get(url, params).then(response => {  
                if (response.data.code == 10) {  //session失效
                    Message({
                        message: '会话已过期，请重新登录'，
                        type: 'warning'
                    });
                    sessionStorage.removeItem('userObj');
                    router.push('/login');
                } else {
                    resolve(response.data); 
                };      	          	                
	        }).catch((error) => {
	            reject(error);
	        })
    	} else {
    		axios.post(url, params).then(response => {        	
            	if (response.data.code == 10) {  //session失效
                    Message({
                        message: '会话已过期，请重新登录'，
                        type: 'warning'
                    });
                    sessionStorage.removeItem('userObj');
                    router.push('/login');
                } else {
                    resolve(response.data); 
                };                
	        }).catch((error) => {
	            reject(error);
	        })
    	};
    })
};