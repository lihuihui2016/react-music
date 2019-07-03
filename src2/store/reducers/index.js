
import { combineReducers } from 'redux';
// import states from './state';
import * as actionsTypes from '../actionTypes';
const states = {

    userInfo: '', //用户信息
    albumList: [], //首页播放歌单
    getOneList:{},
    songList: [], //播放歌曲列表({id,type,name,songer,lrc,pic,time,url})
    songPlayCur: '', //当前播放歌曲信息
    songPlayStatus: false, //播放状态
    songPlayTime: 0, //播放时间
    songPlayVolume: 0.5, //播放音量
    songPlayMode: 0, //播放模式(0.顺序播放，1.随机播放，其他在这后面加)
    banner:[]  // banner数据
}


// const userInfo = (state = states.userInfo, action) => {
//     switch (action.type) {
//         case actionsTypes.USERINFO_UPDATE : 
//             return action.data;
//         default:
//             return state;
//     }
// }

//精品歌单


const getOneList = (state = states.getOneList , action) =>{
    switch (action.type) {
        case actionsTypes.SONGS_LIST :
            return action.data;
            break;
        default:
            return state;
            break;
    }
}
const albumList = (state = states.albumList , action) =>{
    switch (action.type) {
        case actionsTypes.ALBUMLIST_UPDATE :
            return action.data;
            break;
        default:
            return state;
            break;
    }
}
const banner=(state=states.banner,action)=>{
    console.log(action)
    switch(action.type){
        case actionsTypes.SONG_BANNER:
            return action.data;
            break;
        default:
            return state;
            break;
    }
}

//播放歌单

const songList = (state = states.songList , action) => {
    switch (action.type) {
        case actionsTypes.SONGLIST_ADD :
            let arr = [...state , ...action.data];
            let obj = {};
            return arr.reduce((cur , next) => {
                obj[next.id] =obj[next.id] ? '' : true && cur.push(next);
                return cur;
            },[]);
        // case actionsTypes.SONGLIST_DELETE :
        //     return state.filter(ele => {
        //         if(ele.id != action.data.id) return ele;
        //     });
        // case actionsTypes.SONGLIST_DELETEALL :
        //     return state = [];
        default:
            return state; 
    }
}


//当前播放歌曲
const songPlayCur = (state = states.songPlayCur , action) => {
    switch (action.type) {
        case actionsTypes.SONGPLAYCUR_UPDATE : 
            return action.data;
        default :
            return state;
    }
}

//播放状态
const songPlayStatus = (state = states.songPlayStatus , action) => {
    switch (action.type) {
        case actionsTypes.SONGPLAYSTATUS_UPDATE : 
            return action.data;
        default :
            return state;
    }
}

//播放时间
const songPlayTime = (state = states.songPlayTime , action) => {
    switch (action.type) {
        case actionsTypes.SONGPLAYTIME_UPDATE : 
            return action.data;
        default :
            return state;
    }
}

//播放音量
const songPlayVolume = (state = states.songPlayVolume , action) => {
    switch (action.type) {
        case actionsTypes.SONGPLAYVOLUME_UPDATE : 
            return action.data;
        default :
            return state;
    }
}

//播放模式
const songPlayMode = (state = states.songPlayMode , action) => {
    switch (action.type) {
        case actionsTypes.SONGPLAYMODE_UPDATE : 
            return action.data;
        default :
            return state;
    }
}
export  const reducers=combineReducers({
    albumList,
    getOneList,
    songList,
    songPlayCur,
    songPlayStatus,
    songPlayTime,
    songPlayVolume,
    songPlayMode,
    banner
})
// export default combineReducers({
//  //  userInfo,
  
// })