/* eslint no-nested-ternary:0 */
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';
import React from "react";
import './index.scss'
import {Foot} from "../foot";
import {Button} from 'antd-mobile' ;
import axios from '../../utils'

const data = [
  {
    value: '1',
    label: 'Food',
  }, {
    value: '2',
    label: 'Supermarket',
   
  },
  {
    value: '3',
    label: 'Extra',
    isLeaf: true,
   
  },
];

export class Head extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initData:data,
      show: false,
      userImg: axios.url+'/avatar/1561427432702p00176588.jpeg',
    };
  }

componentWillMount = () => {
    console.log(localStorage.userInfo);
    if (localStorage.userInfo) {
        this.setState({
            userImg:JSON.parse(localStorage.userInfo).avatar.replace(/public/, axios.url)
        })
    }
};
onChange = (e) => {
    let $target = e.target || e.srcElement
    let file = $target.files[0];
    let data = new FormData();    // 构建表单数据对象  
    data.append('avatar', file);  // 需要上传到 服务器 的数据
    data.append("username", 'huihui');
    const instance = axios.create({
        withCredentials: true
    })
    instance.post(axios.url+'/react/upload-avatar', data).then(res => {
        this.setState({
            userImg:res.data.imgUrl.replace(/public/, axios.url)
        })
        localStorage.userInfo = JSON.stringify({ avatar: res.data.imgUrl });
        console.log( localStorage.userInfo)
    })
};

  handleClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    this.setState({
      show: !this.state.show,
    });
  }
  handHide=()=>{
    this.setState({
      show: false,
    });
  }

  

  render() {
    
    const { initData, show } = this.state;
    const menuEl = (
     <div className='outer-box'>
  
        <div className='left-box'>
        <div className='upload-container'>
                <img src={this.state.userImg} alt="" id='userHeader' className='headerImg' />
                <input type="file" name="image" className='upload-input' onChange={this.onChange} /> 
            </div>
             <p>木心慧慧</p>
             

        </div>
        <div className='right-box' onClick={this.handHide}>

       </div>

     </div>
    );
   
    return (
      <div className={show ? 'menu-active' : ''}>
        <div>
          <NavBar
          //  leftContent="Menu"
            className="iconfont icon-fa-headphones"
            mode="light"
            icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
            onLeftClick={this.handleClick}       
          >
           <Foot></Foot>
          </NavBar>
        </div>
        {show ? menuEl:''}
       
      </div>
    );
  }
}













// import React from "react";



// class Home extends React.Component {
//      render(){
//          return(
//              <div>
//                  <h4>哈哈哈哈哈哈 </h4>
//              </div>
//          )
//      }
// }
// export default Home