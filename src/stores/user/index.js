
import axios from 'axios'

const DIALOG_SHOW = 'DIALOG_SHOW'//显示模态框
const DIALOG_HIDE = 'DIALOG_HIDE'//隐藏模态框
const GET_USER_LIST = 'GET_USER_LIST'//获取用户数据
const SET_USER_DATA = 'SET_USER_DATA' // 设置用户数据到store
const ADD_USER = 'ADD_USER' //新增用户
const DELETE_USER = "DELETE_USER" //删除用户
const UPDATE_USER_DATA = 'UPDATE_USER_DATA' //得到被修改用户的数据
const ADD_USER_STATUS = 'ADD_USER_STATUS' //判断是新增还是修改
const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS'

export default {
    state:{
        dialogVisible:false,    //模态框显示隐藏
        userList:[],            //用户数据
        total:'',                //总条数
        updateUserData:{},
        addOrUpdateStatus:0,
    },
    actions:{
        [GET_USER_LIST]({commit},{pageConfig}){
            return new Promise((resolve,reject) => {
                
                let url = 'http://localhost/wbc-nc/api/api.php/common?transform=1&order=id&page='+pageConfig.currentPage + ',' + pageConfig.pageSize;
                if(pageConfig.query){  //如果是搜索
                    url = url +'&filter=name,cs,'+pageConfig.query;
                }else{
                    url = url;
                }
                axios.get(url).then(response => {      
                    let res = response.data.common;
                    let total = response.data._results;
                    commit('SET_USER_DATA', { list: res,total: total})// 任何由 "SET_USER_DATA" 导致的状态变更都应该在此刻完成。
                    resolve();
                }, response => {
                    openFalse();    //出错提示
                });
            })
        },
        [ADD_USER]({dispatch,commit},{param,pageConfig,status}){
            let url
            if(status == 1 && param.id){
                url = 'http://localhost/wbc-nc/api/api.php/common/'+param.id
                return new Promise((resolve,reject) => {
                axios.put(url,param).then(response => {      
                    var res = response;
                    dispatch('GET_USER_LIST',{pageConfig}).then(() => { 
                        commit('DIALOG_HIDE')// 任何由 "ADD_USER" 导致的状态变更都应该在此刻完成。 
                    });
                    resolve({code:0});
                }, response => {
                    //openFalse();
                });
            })
            }else{
                url = 'http://localhost/wbc-nc/api/api.php/common'
                return new Promise((resolve,reject) => {
                axios.post(url,param).then(response => {      
                    var res = response;
                    dispatch('GET_USER_LIST',{pageConfig}).then(() => {
                        commit('DIALOG_HIDE')// 任何由 "ADD_USER" 导致的状态变更都应该在此刻完成。 
                    });
                    resolve({code:0});
                }, response => {
                    //openFalse();
                });
            })
            }
            
        },
        [DELETE_USER]({dispatch,commit},deleteId){
            return new Promise((resolve,reject) =>{
                let url = 'http://localhost/wbc-nc/api/api.php/common/'+deleteId;
                axios.delete(url).then(response => {      
                    var res = response;
                    resolve({code:0});
                }, response => {
                    //openFalse();
                });
            })
        }
    },
    mutations:{
        [DIALOG_SHOW](state){
            state.dialogVisible = true
        },
        [DIALOG_HIDE](state){
            state.dialogVisible = false
        },
        [SET_USER_DATA](state,{list,total}){
            state.userList = list
            state.total = total
        },
        [UPDATE_USER_DATA](state,data){
            state.updateUserData = data
        },
        [ADD_USER_STATUS](state){
            state.addOrUpdateStatus = 0
        },
        [UPDATE_USER_STATUS](state){
             state.addOrUpdateStatus = 1
        }
    }
}