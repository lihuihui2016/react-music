import React from 'react';
import axios from './../../utils'
import './css/index.css'
// import { connect } from 'react-redux'
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

// @connect(
//     state => {
//         return {
//             ...state
//         }

//     }
// )

class SongDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //使用下划线前缀表示这是受保护的对象，即protected
            _playStatus: true,
            lrc: '',
            activeLines: [],
            top: 0,
            lineNo: 0, //当前行
            C_pos: 6, //C位
            offset: - 20, //滚动距离（应等于行高）
            mp3Url:'',
            currSongIndex:'',
            currentTime: '00.00',
            totalTime:'',
            progress:'',
            formatLyrics:''
        }
    }

    componentDidMount() {
        var that=this;
        //初始化请求，放在这里面
        const songId = this.props.match.params.id?this.props.match.params.id:'';
        //当前需要播放的歌曲id;
        this.setState({
            currSongIndex:songId
        })
         this.getSongMsg(songId);
         this.getLyric(songId);
         let audio = document.getElementById('audio');
         //歌曲可以播放的监听事件
         audio.oncanplay = function() {
             //获取当前播放歌曲的总时长
            that.setState({
                totalTime:that.timeToStr(audio.duration)
            })
        }
         //进度事件监听（audio自带的事件）
         audio.addEventListener("timeupdate", function() {
            var baifenbi = (this.currentTime / this.duration) * 100;
            // console.log(this.currentTime)
            // console.log(this.duration)
            var percent = baifenbi.toFixed(2) + "%";
            // console.log(str)
            that.setState({
                currentTime:that.timeToStr(this.currentTime),
                progress:percent
            })
        });
         //歌曲播放完的事件监听
         audio.onended = function() {
           // audio.pause();
           
            // that.setState({
            //     _playStatus: !that.state._playStatus,
            // })
            that.next()
        }

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
    //获取歌词
    getLyric(songId){
        axios.get(axios.path + `/lyric?id=${songId}`).then(res => {
            if(res.data.code == 200){
                var formatLyrics = parseLyric(res.data.lrc.lyric);
        // console.log(formatLyrics)
                this.setState({
                    lrc: res.data.lrc.lyric||'',
                    formatLyrics:formatLyrics
                })
            }
        })
    }
      //歌曲时长格式转化
    timeToStr(time) {
        var m = 0,
            s = 0,
            _m = '00',
            _s = '00';
        time = Math.floor(time % 3600);
        m = Math.floor(time / 60);
        s = Math.floor(time % 60);
        _s = s < 10 ? '0' + s : s + '';
        _m = m < 10 ? '0' + m : m + '';
        return _m + ":" + _s;
    }
   

    handleTouchStart = (e) => {
        this.startX = e.touches[0].clientX;
    }
    handleTouchMove = (e) => {
        this.endX = e.touches[0].clientX;
    }
    handleTouchEnd = (e) => {
        let audio = document.getElementById('audio');
        let jindutiao = document.getElementById('jindutiao');
        let progressWidth=jindutiao.offsetWidth
        let distance =this.endX- this.startX;
        let widthPercent=Math.abs(distance)/progressWidth
        let addTitme=widthPercent*audio.duration;
        if(distance<0){  //往回拖的处理
            var audioCurTime=audio.currentTime-addTitme;
            var curTime=this.timeToStr(audioCurTime);
            var progress=this.state.progress-addTitme.toFixed(2)*100+"%";
        }else{
            var audioCurTime=audio.currentTime+addTitme;
            var curTime=this.timeToStr(audioCurTime);
            var progress=this.state.progress+addTitme.toFixed(2)*100+"%";
        }

        audio.currentTime = audioCurTime;
        this.setState({
            currentTime:curTime,
            progress:progress
        })
        
    }
   

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
    prev = () => {
        var songLists=localStorage.songLists.split(',');
        var index=songLists.indexOf(this.state.currSongIndex)
        var preIndex=index==0?songLists.length-1:index-1;
        console.log(preIndex)
        this.setState({
            currSongIndex:songLists[preIndex]
        })
        this.getSongMsg(songLists[preIndex]);
        this.getLyric(songLists[preIndex]);
    }
    next = () => {
        var songLists=localStorage.songLists.split(',');
        var index=songLists.indexOf(this.state.currSongIndex)
        var nextIndex=index==songLists.length-1?0:index+1;
        console.log(nextIndex)
        this.setState({
            currSongIndex:songLists[nextIndex]
        })
        this.getSongMsg(songLists[nextIndex]);
        this.getLyric(songLists[nextIndex]);
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
        // this.state.formatLyrics = parseLyric(this.state.lrc);
        if (this.state.lineNo == this.state.formatLyrics.length)
            return;
        var curTime = audio.currentTime; //播放器时间
        // console.log(this.state.lrc[this.state.lineNo])
        var len=this.state.formatLyrics.length;
        for (let i = 0; i < len ;i++) {
            // const element = array[i];
            if (this.state.lineNo==i){
                // console.log(this.formatLyrics)
                if (parseFloat(this.state.formatLyrics[i][0]) <= curTime) {
                    this.lineHigh();//高亮当前行
                   
                    this.state.lineNo++;
                }
            }
        }
    }
    renderLyrics = () => {
        // if (!lyric) return null;÷
        if (!this.state.formatLyrics) {
            return <p className="lyric-info">该歌曲暂无歌词o(╯□╰)o</p>
        }
        // const lyricStr = lyric;
        // this.formatLyrics = parseLyric(lyricStr);
        // console.log(this.formatLyrics)
        // // this.setState({
        // //     formatLyrics:this.formatLyrics
        // // })
        const { activeLines, top } = this.state;
        return (
            <ul id="lyric"
                // style={{ top: `${top}px` }}
                className="move-animate lyrics"
            >
                {this.state.formatLyrics.map((line, index) => (
                    <li key={line[0]}>
                        {line[1]}
                    </li>
                ))}
            </ul>
        )
    }
    render() {
        // console.log(this.props)

        // let url = this.props.songPlayCur ? this.props.songPlayCur[0]["url"] : ''
        let url=this.state.mp3Url;

        // console.log(url)
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

                        
                            <div className="lyric-block">
                            {this.state.lrc ? (
                                    this.renderLyrics()
                                ) : (
                                        <p className="lyric-info">获取歌词中...</p>
                                    )}
                            </div>
                         
                            {/* <!--使用渐变颜色显示歌曲时间进度条--> */}
                            <div className="jindu">
                                <div className="qstime">
                                {this.state.currentTime}
                                </div>
                                <div className="endtime">
                                    {this.state.totalTime}
                                </div>
                                <div id='jindutiao' className="jindutiao"                   
                                >
                                        <div className="ssjd" style={{width:this.state.progress}}>
                                            <div className="yuan" 
                                             onTouchStart={this.handleTouchStart}
                                             onTouchMove={this.handleTouchMove}
                                             onTouchEnd={this.handleTouchEnd}
                                            ></div>
                                    </div>
                                </div>
                            </div>
                            {/* <!--播放控制按钮，上一首下一首--> */}
                            <div className="controls">
                                <div className="play" onClick={this.play}>
                                    <i className="icon-play" style={{ display: this.state._playStatus ? 'none' : 'block' }}></i>
                                    <i className="icon-pause" style={{ display: !this.state._playStatus ? 'none' : 'block' }}></i>
                                </div>
                                <div className="previous" onClick={this.prev}>
                                    <i className="icon-previous" ></i>
                                </div>
                                <div className="next" onClick={this.next}>
                                    <i className="icon-next"></i>
                                </div>
                            </div>
                            <audio controls id="audio" preload="auto" autoPlay="autoplay" controlsList="nodownload"  onTimeUpdate={(e) => this.controlAudio()}  src={url} style={{display:'none'}}> </audio>


                        </div>

                    </div>
                </div>

            </div>

        )
    }
}
export default SongDetail