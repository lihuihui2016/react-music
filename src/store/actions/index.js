
import * as actionsTypes from '../actionTypes/index';
import axios from 'axios';
//用户信息
export const updateUserInfo = (data) => {
    return {
        type : actionsTypes.USERINFO_UPDATE,
        data
    }
}
//获取精品歌单
// export const updateAlbumList = (data) => {
//     return {
//         type : actionsTypes.ALBUMLIST_UPDATE,
//         data
//     }
// }
export const banner=({url,params,cb})=>(
    axios.get(url,params).then(res=>{
        cb(res);
        return{
            type:actionsTypes.SONG_BANNER,
            data:res.data.banners
        }
    })
)
export const updateAlbumList=({url,params,cb})=>(
    axios.get(url,params).then(res=>{
        cb(res);
        return{
            type:actionsTypes.ALBUMLIST_UPDATE,
            data:res.data.playlists
        }
    })

)

export const  getOneList=({url,params,cb})=>{
        return axios.get(url,params).then(res=>{
            cb(res);
            return{
                type:actionsTypes.SONGS_LIST,
                data:res.data.playlist
            }
        })
   
}

//添加播放列表歌曲
export const addSongList = (ele) => {
       var arr=[];
    if(!localStorage.songLists){
        arr.push(ele.id)
        localStorage.songLists=arr;
        
    }else{
        arr.push(localStorage.songLists);
        arr.push(ele.id);
        
        localStorage.songLists=arr;
    }
   
    return {
        type : actionsTypes.SONGLIST_ADD,
       // data:[ele]
        data: [{
            // type : 'netease',
            // singer : ele.ar[0].name,
            // name: ele.name,
            id: ele.id,
            // time: parseInt(ele.dt/1000),
            // pic: ele.al.blurPicUrl,
            // lrc: axios.path+`/lrc?id=${ele.id}`,
            // url: axios.path+`/url?id=${ele.id}`
        }]
    }
}

export const addSongAllList = (arr) => {
//     console.log(arr)
//    for(var i=0;i<arr.length;i++){
//        for(var ele in arr[i]){

//        }
//    }
    //  var list=[];
    //  arr.map((item)=>{
    //      for(var ele in item){
    //         console.log(ele)
    //         item.type= 'netease',
    //         item.singer= ele.ar[0].name,
    //         item.name=ele.name,
    //         item.id= ele.id,
    //         item.time= parseInt(ele.dt/1000),
    //         item.pic=ele.al.blurPicUrl,
    //         item.lrc=axios.path+`/lrc?id=${ele.id}`,
    //         item.url=axios.path+`/url?id=${ele.id}`

    //      }
      
         
    //      return item
    //  })

    //  console.log(arr)
    return {
        type : actionsTypes.SONGLIST_ADD,
        data: arr
    }
}
// export const addSongList=({url,params,cb})=>(
//     axios.get(url,params).then(res=>{
//         console.log(res)
//         cb(res);
//         return{
//             type : actionsTypes.SONGLIST_ADD,
//             data:res.data
//         }
//     })

// )
//删除某项播放列表中的歌曲
export const deleteSongList = (data) => {
    return {
        type : actionsTypes.SONGLIST_DELETE,
        data
    }
}
//删除全部播放列表的歌曲
export const deleteAllSongList = (data) => {
    return {
        type : actionsTypes.SONGLIST_DELETEALL,
        data
    }
}
//更新当前播放歌曲
// export const updateSongPlayCur = (data) => {
//     return {
//         type : actionsTypes.SONGPLAYCUR_UPDATE,
//         data
//     }
// }
export const updateSongPlayCur=({url,params,cb})=>(
    axios.get(url,params).then(res=>{
        cb(res);
        return{
            type : actionsTypes.SONGPLAYCUR_UPDATE,
            data:res.data.data
        }
    })

)
//更新播放状态
export const updateSongPlayStatus = (data) => {
    return {
        type : actionsTypes.SONGPLAYSTATUS_UPDATE,
        data
    }
}
//更新播放时间
export const updateSongPlayTime = (data) => {
    return {
        type : actionsTypes.SONGPLAYTIME_UPDATE,
        data
    }
}
//更新播放音量
export const updateSongPlayVolume = (data) => {
    return {
        type : actionsTypes.SONGPLAYVOLUME_UPDATE,
        data
    }
}

//更新播放模式
export const updateSongPlayMode = (data) => {
    return {
        type : actionsTypes.SONGPLAYMODE_UPDATE,
        data
    }
}