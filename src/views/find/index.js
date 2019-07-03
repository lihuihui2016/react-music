import React from 'react';
import axios from '../../utils';
import Recommend from '../../components/hotList';
import { updateAlbumList } from '../../store/actions';
import store from '../../store'
import Swipe from '../../components/swipe';
import { connect } from 'react-redux';
@connect(
    state => {
        return {
            albumList: state.albumList
            //...state
        }
    }
)
class Find extends React.Component {

    componentWillMount() {
        const path = axios.path;
        this.props.dispatch(updateAlbumList({
            url: path + '/top/playlist',
            params: { id: 1 },
            cb: (res) => {
            }
        }))

    }
    render() {
        let {
            albumList
        } = this.props;
        return (
            <div>
                {/* <Swipe/> */}
                <Recommend albumList={albumList} />

            </div>
        )
    }
}
export default Find
