import React from 'react';
import {
    Row , Col ,
} from 'antd';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading';
import QueueAnim from 'rc-queue-anim';
import './index.scss';
import {connect}  from 'react-redux'

@connect(
    state => {
        return {
            albumList: state.albumList
            
        }
    }
)
 class Recommend extends React.Component{
    render(){
        return(
            <section className="recommend">
                <Row style={{paddingLeft:'10px' , margin: '20px 0 10px 0', fontSize:'17px',borderLeft:'4px solid #1890ff'}}>推荐歌单</Row>
                <Row gutter={10} type={'flex'} justify={'space-between'} style={{width:'100%'}}>
                    <QueueAnim interval='150' type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']} style={{width:'100%',boxSizing:'border-box'}}>
                    {
                        this.props.albumList == '' ? <Loading /> : this.props.albumList.map((ele , index) => {
                            return (
                                <Col span={8} style={{paddingBottom: '10px',overflow:'hidden',height:'161px',paddingLeft:'5px',paddingRight:'5px'}} key={index}>
                                    <div className="music-list">
                                        {/* <Link to={{pathname : '/albumdetail?id' , search : `?id=${ele.id}` , query : {id : ele.id }}}> */}
                                        <Link to={ `/albumdetail/${ele.id}`} >
                                            <span className="listen">{ele.playCount}</span>
                                            <img alt="" src={ele.coverImgUrl} />
                                            <div className="music-text">{ele.name}</div>
                                        </Link>
                                    </div>
                                </Col>
                            )
                        })
                    }
                    </QueueAnim>
                </Row> 
            </section>
        )
    }
}
export default Recommend