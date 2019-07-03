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

// 解析歌词
const parseLyric = (lyricsStr) => {
    // 将歌词切割成单行
    let lines = lyricsStr.split('\n');
    // 匹配歌词中的时间，匹配类型[xx:xx.xx]
    const pattern = /\[\d{2}:\d{2}.\d{1,3}\]/g;
    // 保存最终结果的数组
    const result = [];
    // 去掉不含时间的行
    while (!pattern.test(lines[0])) {
        lines = lines.splice(1);
    }
    // 上面用'\n'生成数组时，结果中最后一个元素为空，这里去掉
    if (!lines[lines.length - 1].length) { lines.pop() }
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // 提取歌词，将时间清空，赶回一个新的字符串
        const value = line.replace(pattern, '');
        // 返回数组[时间]，对该数组做处理，将时间转为秒数，同时注意此类情况：多个时间点共享一句歌词，[时间1，时间2...]
        const times = line.match(pattern) || [];
        times.forEach((time) => {
            // 去掉时间内的中括号得到xx:xx.xx 并用：分隔得到[xx,xx.xx]的数组
            const t = time.slice(1, -1).split(':');
            // 将结果压入最终的数组
            // 组合成 [时间,歌词]
            result.push([(parseInt(t[0], 10) * 60) + parseFloat(t[1]), value]);
            // 此处可能多个时间对应同一句歌词，而result.push显然会打乱顺序的，例如第一个时间点和最后一个时间点共享同一句歌词，而此时Push进去他们是相邻的，应按照时间顺序进行排序
        })
    }
    // 加上下标 是为了取出时间 result[0][0]与result[1][0]做比较而不是result[0]与result[1]做比较
    result.sort((a, b) => a[0] - b[0])
    // console.log(result)
    return result
}

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
            mp3Url:''

        }

    }

    componentWillMount() {
        let {
            search
        } = this.props.location
        let paramsString = search.substring(1)
        let searchParams = new URLSearchParams(paramsString)
        let songId = searchParams.get('id')
        //ci
        axios.get(axios.path + `/lyric/?id=${songId}`).then(res => {
            var  lrc=res.data.lrc;
            if(lrc){
                this.setState({
                    lrc:lrc.lyric
                })
            }
          //  this.getSongMsg(songId);
           
            // console.log(this.state.lrc)
        })     
        axios.get(axios.path + `/song/url?id=${songId}`).then(res => {
            // console.log(res.data)
            if (res.data.code == 200) {
                this.setState({
                    mp3Url:res.data.data[0].url
                })
                // console.log(this.state.mp3Url)
                // this.props.songPlayCurUpdateDispatch(res.data[0]);
                // this.props.songListAddDispatch([Object.assign(res.data[0], { type: type })]);
            }
        })     
    }


    // //获取歌曲详情  mp3
    // getSongMsg(songId, type) {
    //     store.dispatch(songPlayCurUpdateAction({
    //         url: axios.path + `/song/url?id=${songId}`,
    //         cb: (res) => {
    //             console.log(res)
    //             if (res.code == 200) {
    //                 this.setState({
    //                     mp3Url:res.data.data[0].url
    //                 })
    //                 // this.props.songPlayCurUpdateDispatch(res.data[0]);
    //                 // this.props.songListAddDispatch([Object.assign(res.data[0], { type: type })]);
    //             }
    //         }
    //     }))

    // }

    play = () => {
     
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
    lineHigh = () => {
        let ul = document.getElementById('lyric');
        var lis = ul.getElementsByTagName("li");//歌词数组
        if (this.state.lineNo > 0) {
            lis[this.state.lineNo - 1].removeAttribute("class");//去掉上一行的高亮样式
        }
        lis[this.state.lineNo].className = "lineHigh";//高亮显示当前行
        // console.log(this.state.lineNo)
        //文字滚动
        if (this.state.lineNo > this.state.C_pos) {
            ul.style.transform = "translateY(" + (this.state.lineNo - this.state.C_pos) * this.state.offset + "px)"; //整体向上滚动一行高度
        }
    }

    controlAudio = () =>  {
        // var self=this;
        let audio = document.getElementById('audio');
        this.formatLyrics = parseLyric(this.state.lrc);
        if (this.state.lineNo == this.formatLyrics.length)
            return;
        var curTime = audio.currentTime; //播放器时间
        // console.log(this.state.lrc[this.state.lineNo])
        for (let i = 0; i < this.formatLyrics.length; i++) {
            // const element = array[i];
            if (this.state.lineNo==i){
                console.log(this.formatLyrics)
                if (parseFloat(this.formatLyrics[i][0]) <= curTime) {
                    this.lineHigh();//高亮当前行
                   
                    this.state.lineNo++;
                }
            }
        }
        // console.log(curTime)
        

        
    }
    renderLyrics = (lyric) => {
        // if (!lyric) return null;
        if (!lyric) {
            return <p className="lyric-info">该歌曲暂无歌词o(╯□╰)o</p>
        }
        const lyricStr = lyric;
        this.formatLyrics = parseLyric(lyricStr);
        const { activeLines, top } = this.state;
        return (
            <ul id="lyric"
                // style={{ top: `${top}px` }}
                className="move-animate lyrics"
            >
                {this.formatLyrics.map((line, index) => (
                    <li key={line[0]}>
                        {line[1]}
                    </li>
                ))}
            </ul>
        )
    }
    render() {
        let url=this.state.mp3Url;
        console.log(url)
       // let url = this.props.songPlayCur ? this.props.songPlayCur[0]["url"] : ''
        return (
            <div className='SoogsDetail'>
                <div className="stars">
                </div>
                <div style={{ overflow: 'hidden', width: '100%' }}>
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
                            </div>

                            {/* <!--音乐信息，歌名、歌手--> */}
                            {/* <div className="trackInfo">
                                <div className="name"><p>哈哈哈</p ></div>
                                <div className="artist">呵呵呵</div>
                                <div className="album">个结合</div>
                            </div> */}
                            {/* <!--歌词--> */}
                            {/* <div className="lyric">
                                <p id="lyric">{this.state.lrc}</p >
                            </div> */}
                            <div className="lyric-block">
                                {this.state.lrc ? (
                                    this.renderLyrics(this.state.lrc)
                                ) : (
                                        <p className="lyric-info">获取歌词中...</p>
                                    )}
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

                            <audio controls id="audio" preload="auto" autoPlay="autoplay" controlsList="nodownload" src={url} style={{display:'none'}} onTimeUpdate={(e) => this.controlAudio()}> </audio>


                        </div>

                    </div>
                </div>

            </div>

        )
    }
}
export default SongDetail