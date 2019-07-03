
import React from "react";
import { Head } from "../../components/head";
import {Button} from 'antd-mobile';
import PropTypes from 'prop-types';

export class Mine extends React.Component {
    state={
        isLogin:false,
       
        img:require("../../assets/images/photo.png"),
    }
    toLogin=()=>{
        const{history}=this.props;
        history.push('/login')

    }

    // authsOutLogin(){
    //     for(var s in auths) {
    //         auths[s].logout(function(e) {
    //             plus.nativeUI.alert("注销登录认证成功!");
    //         }, function(e) {
    //             plus.nativeUI.alert("注销登录认证失败: " + JSON.stringify(e));
    //         });
    //     }
    // }
    
    // authLogin(id) {
    //     console.log(auths)
    //     for(var s in auths) {
    //         if(auths[s].id == id) {
    //             var obj = auths[s];
    //             obj.login(function(e) {
    //                 plus.nativeUI.alert("登录认证成功!");
    //                 obj.getUserInfo(function(e) {
    //                     plus.nativeUI.alert("获取用户信息成功：" + JSON.stringify(aweixin.userInfo));
    //                 }, function(e) {
    //                     plus.nativeUI.alert("获取用户信息失败： " + JSON.stringify(e));
    //                 });
    //             }, function(e) {
    //                 plus.nativeUI.alert("登录认证失败: " + JSON.stringify(e));
    //             });
    //         }
    
    //     }
    // }
    
    render() {
        const{
            isLogin,img
        }=this.state;
    
        return (
            <div>
             
                <div style={{display:isLogin?'block':'none'}}>
                  <h2>哈哈哈哈哈</h2>
                    <img src={img}   alt=""/>

                </div>
                <div style={{display:isLogin?'none':'block'}}>
                <Button onClick={this.toLogin}>登录</Button>
                

                </div>
              
                {/* <h3>hahahah</h3><div><button type="button" className="mui-btn mui-btn-primary mui-icon mui-icon-qq" onClick={this.authsOutLogin()}>注销</button>
						<button type="button" className="mui-btn mui-btn-primary mui-icon mui-icon-qq" onClick={this.authLogin('qq')}>qq</button>
						<button type="button" className="mui-btn mui-btn-primary mui-icon mui-icon-weixin" onClick={()=>this.authLogin('weixin')}>微信</button>
						<button type="button" className="mui-btn mui-btn-primary mui-icon mui-icon-weibo" onClick={()=>this.authLogin('sinaweibo')}>微博</button>

					</div> */}


              

            </div>

        )
    }


}
Mine.contextTypes = {
    msg: PropTypes.string
}