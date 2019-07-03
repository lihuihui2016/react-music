import React from 'react';
import {
    Row, Col, Icon, Slider, Avatar
} from 'antd';
import { Link } from 'react-router-dom';
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

import { bindActionCreators } from 'redux';
import store from './../../store';
import axios from './../../utils'
import './css/index.css'

// import { getNetEaseSongMsg , getQqSongMsg ,getKuGouSongMsg , getKuWoSongMsg} from "../../api/getData.js";
// import { formatTime , formatLrc } from '../../utils/tools.js';


import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'
import './index.scss';
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
            lrc: ''

        }

    }

    componentDidUpdate() {
    


    }
    componentWillMount() {
        let {
            search
        } = this.props.location
        let paramsString = search.substring(1)
        let searchParams = new URLSearchParams(paramsString)
        let songId = searchParams.get('id')
        //ci
        axios.get(axios.path + `/lyric/url?id=${songId}`).then(res => {
            this.setState({
                lrc: res.data.lrc.lyric
            })

            console.log(this.state.lrc)
        })
        this.getSongMsg(songId);

    }
    componentDidMount() {
        //初始化请求，放在这里面
    

    }


    //获取歌曲详情  mp3
    getSongMsg(songId, type) {
        store.dispatch(songPlayCurUpdateAction({
            url: axios.path + `/song/url?id=${songId}`,
            cb: (res) => {

                console.log(res)
                if (res.code == 200) {
                    this.props.songPlayCurUpdateDispatch(res.data[0]);
                    this.props.songListAddDispatch([Object.assign(res.data[0], { type: type })]);
                }
            }
        }))

    }
    //获取音频播放的当前时间
    getTime() {
        let audio = document.getElementById('audio');
        // 获取03:14:33这种格式的当前播放时间
        var timeNow = audio.currentTime
        // console.log(timeNow);
        // 获取分钟数
        var timeMin = String(Math.floor(timeNow / 60));
        // 如果分钟数是1位，前面加个0
        timeMin = timeMin.length < 2 ? "0" + timeMin : timeMin;
        // console.log(timeMin);
        var timeSec = String(Math.floor(timeNow % 60));
        timeSec = timeSec.length < 2 ? "0" + timeSec : timeSec;
        // console.log(timeSec);
        var timeMil = String(timeNow);
        timeMil = timeMil.substr(timeMil.indexOf('.') + 1, 2);//取小数点后面的两位
        // console.log(timeMil);
        var timeLrc = timeMin + ":" + timeSec + "." + timeMil;
        console.log(timeLrc)

        return timeLrc;
    };
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
        this.getTime();
        let audio = document.getElementById('audio');
        let textbox = document.getElementById('lyric');
        console.log(textbox)
    

        // console.log(1)
        //let audio = document.getElementById('audio');
        console.log(this.state._playStatus)
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
        console.log(this.props)

        let url = this.props.songPlayCur ? this.props.songPlayCur[0]["url"] : ''

        console.log(url)
        return (
            <div className='SoogsDetail'>
                <div className="stars">

                </div>
                <div style={{ margin: "30px auto", overflow: 'hidden', width: '100%' }}>
                    <div className="player">
                        <div style={{ color: '#fff' }}>

                            <div className="albumPic" style={{ backgroundImage: `url(https://p2.music.126.net/EkOoxkjOA1ap86amWLsgMA==/3409585558713990.jpg?param=270y270&quot)` }} >
                            </div>
                            {/* <!--本地文件夹音乐列表--> */}
                            {/* <div id="localMusicList" className="musicList">
                                <iframe style={{ width: '100%' }} src="localMusicList.html"></iframe>
                            </div> */}
                            {/* <!--歌词背景--> */}
                            <div id="lyricDiv" className="musicList"
                                style={{
                                    width: '100%',
                                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2) ),url(img/clouds.jpeg)`,
                                    backgroundRepeat: 'no-repeat; border: none;padding: 0px',
                                    textAlign: 'center',
                                    fontSize: '20px',
                                    color: '#cbc7c7',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}>
                                <ul>
                                    <li id="lyric">歌词</li>
                                </ul>
                            </div>

                            {/* <!--音乐信息，歌名、歌手--> */}
                            <div className="trackInfo">
                                <div className="name"><p>哈哈哈</p></div>
                                <div className="artist">呵呵呵</div>
                                <div className="album">个结合</div>
                            </div>
                            {/* <!--歌词--> */}
                            <div className="lyric">
                                <p id="lyric"

                                >
                                    歌词
			               </p>
                            </div>
                            <div className='lyrics'>
                                {/* <ul className='lyrics-panels' style={{transform:'translateY(-' + currentId * 30 + 'px)'}}>{lyrics}</ul> */}
                            </div>
                            {/* <!--播放控制按钮，上一首下一首--> */}
                            <div className="controls">
                                <div className="play" onClick={this.play}>
                                    <i className="icon-play" style={{ display: this.state._playStatus ? 'none' : 'block' }}></i>
                                    <i className="icon-pause" style={{ display: !this.state._playStatus ? 'none' : 'block' }}></i>
                                </div>
                                <div className="previous">
                                    <i className="icon-previous" ></i>
                                </div>
                                <div className="next">
                                    <i className="icon-next"></i>
                                </div>
                            </div>
                            {/* <!--显示歌曲时间信息，当前播放时间、歌曲总时长--> */}
                            <div className="time">
                                <div className="current"></div>
                                <div className="total"></div>
                            </div>
                            {/* <!--使用渐变颜色显示歌曲时间进度条--> */}
                            <div className="progress"></div>
                            {/* <!--加载动画，正在使用网络加载音乐文件时则显示出来，完成则隐藏--> */}
                            <div className="loader"></div>
                            <div className="loader2"></div>
                            {/* <!--audio标签装载当前播放的音乐文件--> */}

                            <audio controls id="audio" preload="auto" autoPlay="autoplay" controlsList="nodownload" src={url}> </audio>


                        </div>

                    </div>
                </div>

            </div>

        )
    }
}
export default SongDetail