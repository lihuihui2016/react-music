import { Carousel, WingBlank } from 'antd-mobile';
import React from 'react';
import axios from './../../utils'
import {banner} from './../../store/actions'
import {connect} from 'react-redux';
import './index.scss';
import {Link} from 'react-router-dom'
@connect(
  (state)=>{
    return{
      ...state
    }
  }
)

class Swipe extends React.Component {
  state = {
    imgHeight: 176,
  }
  componentWillMount(){ 
    console.log(this.props);
    console.log(axios.path)
    this.props.dispatch(banner({
      url:axios.path+`/banner?type=2`,
      cb:(res)=>{
        console.log(res)
        }
     }  
    ))
  }

  render() {
    let{
      banner
    }=this.props
    return (
      <WingBlank>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {banner&&banner.map(val => (
            
            <a
              key={val}
              src={`http://localhost:3000/albumdetail/?id=2602222983`}
              // src={`http://localhost:3000/#/albumdetail/2602222983`}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val.pic}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}
export default Swipe