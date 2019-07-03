import React from 'react';
import "./index.scss"
import { SearchBar} from 'antd-mobile';
import {Head} from '../../components/head'
export class Search extends React.Component {
    render() {
        return (
            <div>
                 <Head title='搜索' show={true}></Head>
                <SearchBar placeholder="自动获取光标" ref={ref => this.autoFocusInst = ref} />
              
              

            </div>
        )
    }
}