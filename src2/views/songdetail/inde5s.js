import React,{Audio} from 'react';



import './css/index.css';
export default class SongDetail extends React.Component {
    render() {
        return (
            <div>
                <div style={{ margin: "0 auto", overflow: 'hidden' }}>
                   
                    <div className="canvaszz"> </div>
                    {/* <div>	<canvas id="canvas" className="canvas"></canvas> 

                    </div> */}
                 
                    <div className="player">
                        <div>
                           
                        <div class="albumPic" style={{background: "url('&quot';'https://p2.music.126.net/EkOoxkjOA1ap86amWLsgMA==/3409585558713990.jpg?param=270y270&quot')"}}></div>
                            {/* <!--本地文件夹音乐列表--> */}
                            {/* <div id="localMusicList" className="musicList">
                                <iframe style={{ width: '100%' }} src="localMusicList.html"></iframe>
                            </div> */}
                            {/* <!--歌词背景--> */}
                            <div id="lyricDiv" className="musicList"
                                style={{
                                    width: '320px',
                                    background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2) ),url(img/clouds.jpeg)`,
                                    backgroundRepeat: 'no-repeat; border: none;padding: 0px',
                                    textAlign: 'center',
                                    fontSize: '20px',
                                    color: '#cbc7c7',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}>
                                <ul>
                                    <li>歌词</li>
                                </ul>
                            </div>
                        </div>
                        {/* <!--音乐信息，歌名、歌手--> */}
                        <div className="trackInfo">
                            <div className="name"><p>哈哈哈</p></div>
                            <div className="artist">呵呵呵</div>
                            <div className="album">个结合</div>
                        </div>
                        {/* <!--歌词--> */}
                        <div className="lyric">
                            <p id="lyric" onClick="showFullLyric()"
                                onmouseover="lyricTip(this,event)"
                                onmouseout="tipOut()">
                                歌词
			               </p>
                        </div>
                        {/* <!--播放控制按钮，上一首下一首--> */}
                        <div className="controls">
                            <div className="play">
                                <i className="icon-play"></i>
                            </div>
                            <div className="previous">
                                <i className="icon-previous"></i>
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
                        {/* <Audio src='' id='audio'/> */}
                      
                    </div>

                </div>

            </div>

        )
    }
}
