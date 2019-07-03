// import React from 'react';
// import './index.scss';
// import { Link } from 'react-router-dom'

import React from 'react';
import {
    Row , Col , Icon
} from 'antd';
import { Link } from 'react-router-dom';
import { 
    addSongList as songListAddAction,
} from '../../store/actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { getSongList } from '../../api/getData.js';
import Loading from '../../components/loading';
import QueueAnim from 'rc-queue-anim';
import './index.scss';


class GridExample extends React.Component {
  render() {
    let {
      songs
    } = this.props;

      return(
          <section className="recommend">
              <Row style={{paddingLeft:'10px' , margin: '20px 0 10px 0', fontSize:'17px',borderLeft:'4px solid #1890ff'}}>推荐歌单</Row>
              <Row gutter={10} type={'flex'} justify={'space-between'} style={{width:'100%'}}>
                  <QueueAnim interval='150' type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']} style={{width:'100%'}}>
                  {
                      songs == '' ? <Loading /> : songs.map((ele , index) => {
                          return (
                              <Col span={8} style={{paddingBottom: '10px'}} key={index}>
                                  <div className="music-list">
                                      <Link to={{pathname : '/albumdetail' , search : `?id=${ele.id}` , query : {id : ele.id }}}>
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
  

    // return(
    //     <section className="hot-list">
    //         <Row>
    //             <Col span={24} className="banner">
    //                 <div className="title-bg"></div>
    //             </Col>
    //         </Row>
    //         <QueueAnim type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
    //         {
    //             songs&&songs.map((ele , index ) => {
    //                 if(index < 50) {
    //                     return (                         
    //                         <Row  key={index} type={'flex'}  align={'middle'} style={{padding:'5px 0 5px 10px'}}>
    //                             <Col xs={{span: 2 }} sm={{span: 1}} style={{fontSize:'18px',color:'#999'}}>{index+1}</Col>
    //                             <Col xs={{span: 22 }} sm={{span: 23}} style={{borderBottom:'1px solid rgba(170, 170, 170, 0.3)', paddingRight:'10px'}}>                                        
    //                                 <Row type={'flex'} justify={'space-between'} align={'middle'}>
    //                                     <Row style={{width:'80%'}}>
    //                                         <Link to={{pathname : '/albumDetail' , query : {id : ele.id ,from : 'netease' } , search : `?id=${ele.id}&from=netease`}} key={index}>
    //                                             <Col style={{fontSize:'16px',color:'#333'}}>{ele.name}</Col>
    //                                             <Col style={{fontSize:'12px',color:'#888'}}>{ele.singer}</Col>
    //                                         </Link>
    //                                     </Row>
    //                                     {/* <Icon type="plus" onClick={this.addToSongList.bind(this,ele)} style={{ fontSize: '22px',padding: '10px', color: '#8a8a8a',cursor: 'pointer'}}/> */}
    //                                 </Row>
    //                             </Col>
    //                         </Row>                          
    //                     )
    //                 }
    //             })
    //         }
    //         </QueueAnim>
    //     </section>
    // )

    // return (
    //   < div >
    //     <ul className='asd'>
    //       {
    //         songs && songs.map((item, index) => {
    //           return (
    //             <li key={index}>
    //               <Link to={{pathname:'/albumDetail', query: { id: item.id, from: 'netease' }, search: `?id=${item.id}&from=netease` }}>
    //                 <img src={item.coverImgUrl} style={{ width: '100px', height: '100px', display: 'block', margin: '0 auto' }} alt="" />
    //                 <p>{item.name}</p>
    //               </Link>

    //             </li>
    //           )

    //         })

    //       }



    //     </ul>

    //   </div >
    // )

  }

}


export default GridExample;



