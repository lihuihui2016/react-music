import React from 'react';
import {
    Row, Col, Icon
} from 'antd';
import { Link } from 'react-router-dom';
import {
    updateAlbumList,
    addSongList as songListAddAction,
    addSongAllList ,
    getOneList
} from '../../store/actions/index.js';
import Loading from '../../components/loading';
import QueueAnim from 'rc-queue-anim';
import Texty from 'rc-texty';
import './index.scss';
import axios from './../../utils'
import { connect } from 'react-redux';
import store from './../../store'

@connect(
    (state) => ({
        ...state
        // songList: state.songList, 
        // getOneList:state.getOneList                  //播放歌曲列表({id,type})
        // songPlayCur: state.songPlayCur,            //当前播放
        // songPlayStatus: state.songPlayStatus,       //播放状态
        // songPlayTime: state.songPlayTime,          //播放时间
        // songPlayVolume: state.songPlayVolume,       //播放音量

    })
)


class AlbumDetail extends React.Component {
    state={
        getOneList:''
    }
    componentWillMount() {
        const albumId = this.props.match.params.id?this.props.match.params.id:''
        this.props.dispatch(getOneList({
            url: axios.path + `/playlist/detail?id=${albumId}`,
            cb: (res) => {
                console.log(res)
                this.setState({
                    getOneList:res.data.playlist
                })
            }
        }))

    }
    getMeg=(ele)=>{  
        var songLists=[];
        if(localStorage.songLists){
            var flag=true
            songLists=localStorage.songLists.split(',');
            for (var i=0;i<songLists.length;i++){
                if(songLists[i]==ele.id){
                   flag=false
                }
            }
            if(flag){
                this.props.dispatch(songListAddAction(ele))
            }

        }else{
            this.props.dispatch(songListAddAction(ele))
        }
    }
    toPlay=(ele)=>{
        this.props.dispatch(songListAddAction(ele));
        this.props.history.push(`/songdetail/${ele.id}`)
    }

    render() {
        console.log(this.state.getOneList)
        var getOneList=this.state.getOneList?this.state.getOneList:'';
        console.log(getOneList)

      console.log(this.props)
        return (
            <section className="album-detail">
                <Row className="head" style={{ padding: '30px 10px 10px 15px' }}>
                    <div className="mask" style={{ backgroundImage: `url(${getOneList.coverImgUrl})` }}></div>
                    <Col xs={{ span: 10 }} sm={{ span: 6 }} style={{ postion: 'relative', zIndex: 2, }}>
                        <img src={getOneList.coverImgUrl} alt="" style={{ width: '126px', height: '126px' }} />
                        <span className="listen">{getOneList.playCount}</span>
                    </Col>
                    <Col span={14} style={{ postion: 'relative', zIndex: 2 }}>
                        <Texty style={{ color: '#fefefe', fontSize: '17px', lineHeight: '20px' }}>{getOneList.name}</Texty>
                        <Texty style={{ color: '#ccc', fontSize: '14px' }}>{getOneList.userId ? `ID:${getOneList.userId}` : ''}</Texty>
                    </Col>
                </Row>
                <Row style={{ padding: '20px 10px 10px 15px', color: '#666', fontSize: '14px' }}>
                    <Texty>{getOneList.description ? `简介：${getOneList.description.length > 200 ? getOneList.description.slice(0, 200) + '...' : getOneList.description}` : ''}</Texty>
                </Row>
                <Row type={'flex'} justify={'space-between'} style={{ padding: '0px 10px 0px 10px', color: '#666', fontSize: '18px', lineHeight: '40px', background: '#eeeff0' }}>
                    <Col>歌单列表：</Col>
                    <Icon type="menu-unfold"  onClick={()=>this.props.dispatch(addSongAllList(getOneList.tracks))} style={{ fontSize: '20px', padding: '10px', color: '#8a8a8a', cursor: 'pointer' }} />
                </Row>
                <Row style={{ zIndex: 10, position: 'relative' }}>
                    <QueueAnim type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
                        {
                            !getOneList.tracks ? <Loading /> : getOneList.tracks.map((ele, index) => {
                               
                                    return (
                                        <Row key={index} type={'flex'} align={'middle'} style={{ padding: '5px 0 5px 10px' }}>
                                            <Col xs={{ span: 2 }} sm={{ span: 1 }} style={{ fontSize: '18px', color: '#999' }}>{index + 1}</Col>
                                            <Col xs={{ span: 22 }} sm={{ span: 23 }} style={{ borderBottom: '1px solid rgba(170, 170, 170, 0.3)', paddingRight: '10px' }}>
                                                <Row type={'flex'} justify={'space-between'} align={'middle'}>
                                                    <Row style={{ width: '80%' }} onClick={()=>{this.toPlay(ele)}}>
                                                    {/* <Link to={ `/songdetail/${ele.id}`} key={index} > */}
                                                            <Col style={{ fontSize: '16px', color: '#333' }}>{ele.name}</Col>
                                                            <Col style={{ fontSize: '12px', color: '#888' }}>{ele.ar[0].name}</Col>
                                                        {/* </Link> */}
                                                    </Row>
                                                    <Icon type="plus" onClick={() => {this.getMeg(ele)}   } style={{ fontSize: '22px', padding: '10px', color: '#8a8a8a', cursor: 'pointer' }} />
                                                    {/* <Icon type="plus" onClick={this.addToSongList.bind(this,ele)} style={{ fontSize: '22px',padding: '10px', color: '#8a8a8a',cursor: 'pointer'}}/> */}
                                                </Row>
                                            </Col>
                                        </Row>
                                    )
                                
                            })
                        }
                    </QueueAnim>
                </Row>
            </section>

    
         
        )
    }
}
export default AlbumDetail





