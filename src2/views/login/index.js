import React from 'react';
import { Head } from "../../components/head"
import { List, Button, InputItem,WhiteSpace ,Toast} from 'antd-mobile'
import './index.scss';
import axios from 'axios';
export const mobileReg=/^1(3|4|5|6|7|8|9)\d{9}$/;



let timer=null;
export class Login extends React.Component {
   
    state={
        flag:true,
        text:'获取验证码',
        count:60,
        msg:'请输入手机号和验证码'
    }
    checkTel=()=>{
        var tel=this.refs.phone.state.value;
        console.log(tel)
        if(mobileReg.test(tel)){
            this.setState({
                flag:false,
                
            })
            return true
        }else{
            return false
        }        
    }
    showToast=()=> {
        Toast.info(this.state.msg);
      }
    startTime=()=>{
        console.log(111)
        timer=setInterval(()=>{
            if(this.state.count>0){
                this.setState({
                    count:--this.state.count,
                    text:this.state.count+'s 后继续'
                })
            }else{
                clearInterval(timer);
                timer=null;
                this.setState({
                    count:60,
                    text:'获取验证码',
                    flag:false,
                })
            }

        },1000)
    }
    sendCode=()=>{
        axios.post("http://localhost:1901/react/sendCode",{
            mobile:this.refs.phone.state.value
        }).then(res=>{
            console.log(res)
        })

        this.setState({
            flag:true
        })
        this.startTime();
    }
    togoLogin=()=>{
        var mobile=this.refs.phone.state.value
        var code=this.refs.code.state.value;
        console.log(code)
        if(this.checkTel()&&code){
            axios.post('http://localhost:1901/react/login',{
                mobile,
                code
            }).then(res=>{
                console.log(res)
                this.setState({
                    msg:res.data.msg
                })
                console.log(!!res.data.type)
                if(!!res.data.type){
                    this.props.history.push('/firstPage/mine');
                    var userInfo={
                        token:res.data.token
                    }
                    sessionStorage.userInfo=JSON.stringify(userInfo)
                }else{
                    delete sessionStorage['userInfo']
                }
                this.showToast();
              
            })
          
        }else{
            this.showToast();
        }
      

    }
   
    render() {
        let{
            flag,
            text
        }=this.state
        return (
            <div>
                <Head title='login' show={true}></Head>
                <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
                    <List.Item>
                        <InputItem
                            ref='phone'
                            // type="phone"
                            placeholder="手机号"
                            onBlur={this.checkTel}
                        ><b>*</b>手机号:</InputItem>
                    </List.Item>
                </List>
                <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
                    <List.Item
                        extra={<Button type="primary" style={{ marginRight: '4px' }} disabled={flag} onClick={this.sendCode}> {text}</Button>}
                        multipleLine >
                        <InputItem
                            type="number"
                            placeholder="验证码"
                            ref='code'

                        ><b>*</b>验证码:</InputItem>
                    </List.Item>
                </List>
                <Button type="primary" onClick={this.togoLogin} >登录</Button><WhiteSpace />
            </div>
        )
    }
}
