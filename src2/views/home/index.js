




import React from "react";
import axios from '../../utils'
import { Button } from 'antd-mobile'
import './index.scss'

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    render() {
        console.log(this.state.userImg)
        return (
            <div className='upload-container'>
                <img src={this.state.userImg} alt="" id='userHeader' style={{ width: '100%', height: '200px' }} />
                <input type="file" name="image" className='upload-input' onChange={this.onChange} />
                <Button type="primary" className='upload-button'>上传图片</Button>
            </div>
        )

    }
}

