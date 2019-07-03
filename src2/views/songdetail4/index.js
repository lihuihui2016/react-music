import React from 'react';
import {
    Row, Col, Icon, Slider, Avatar
} from 'antd';

import {
    addSongList as songListAddAction,
    deleteSongList as songListDeleteAction,
    deleteAllSongList as songListDeleteAllAction,
    updateSongPlayCur as songPlayCurUpdateAction,
    updateSongPlayStatus as songPlayStatusUpdateAction,
    updateSongPlayTime as songPlayTimeUpdateAction,
    updateSongPlayVolume as songPlayVolumeUpdateAction,
    updateSongPlayMode as songPlayModeUpdateAction,
} from '../../store/actions/index.js';


import axios from './../../utils'

import { connect } from 'react-redux'




@connect(
    state => {
        return {
            ...state
        }

    }
)

class SongDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTrackLen: 0,
            currentTrackIndex: 0,
            currentTime: 0,
            currentTotalTime: 0,
            playTimes: 0, //点击上一首下一首的次数
            //使用下划线前缀表示这是受保护的对象，即protected
            _playStatus: true,
            lrc: '',
            activeLines: [],
            top: 0,
            lineNo: 0, //当前行
            C_pos: 6, //C位
            offset: - 20, //滚动距离（应等于行高）
            mp3Url:'',
            currSongIndex:''

        }

    }

    componentDidMount() {
        //初始化请求，放在这里面
        const songId = this.props.match.params.id?this.props.match.params.id:''
        this.getSongMsg(songId);
        this.getLyric(songId);

    }

    //获取歌曲详情  mp3
    getSongMsg(songId, type) {
        axios.get(axios.path + `/song/url?id=${songId}`).then(res => {
            if(res.data.code == 200){
                this.setState({
                    mp3Url: res.data.data[0].url||''
                })
            }
        })
    }
    getLyric(songId){
        axios.get(axios.path + `/lyric?id=${songId}`).then(res => {
            if(res.data.code == 200){
                this.setState({
                    lrc: res.data.lrc.lyric||''
                })
            }
        })
    }

    //获取歌词的时间
    getLrcTime(loveStory, i) {
        // 获取歌词里的每句的时间
        var lrcTime = loveStory[i].substr(1, 8);//"01:15.80"
        // 分钟转数字可以去掉前面的0
        var lrcTimeMin = parseInt(lrcTime.split(":")[0]);//1
        // 虽然末尾有0，不过要转成数字比大小
        var lrcTimeSec = parseFloat(lrcTime.split(":")[1]);//15.8
        lrcTime = lrcTimeMin * 60 + lrcTimeSec;
        // console.log(lrcTimeMin);
        // console.log(lrcTimeSec);
        // console.log(lrcTime);
        return lrcTime;
    };



    play = () => {
        // this.getTime();
        let audio = document.getElementById('audio');
        if (this.state._playStatus) {
            audio.pause();
            this.setState({
                _playStatus: !this.state._playStatus,
            })
        } else {
            audio.play();
            this.setState({
                _playStatus: !this.state._playStatus,
            })
        }
    }




    render() {
        // console.log(this.props)

        // let url = this.props.songPlayCur ? this.props.songPlayCur[0]["url"] : ''
        let url=this.state.mp3Url;

        // console.log(url)
        return (
          
                            <audio controls id="audio" preload="auto" autoPlay="autoplay" controlsList="nodownload" src={url} style={{display:'none'}} > </audio>



        )
    }
}
export default SongDetail