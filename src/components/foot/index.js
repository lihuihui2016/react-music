import React from 'react';
import "./index.scss";
import { NavLink } from 'react-router-dom';
import { Badge } from 'antd-mobile'
const foots = [

	// {
	// 	txt: '我的',
	// 	path: '/firstPage/mine'
	// },
	{
		txt: '发现',
		path: '/firstPage/find'
	},
	// {
	// 	txt: '视频',
	// 	path: '/firstPage/home'
	// },

]

export const Foot = () => {
	return(
		<div>
				<footer>
            {
                foots.map((item, i) => {
                    return (
                        <div key={i}>
                            <NavLink to={item.path} activeClassName="nav-active">                         
                                <span>{item.txt}</span>
                            </NavLink>

                        </div>
                    )
                })
            }
        </footer>
		

		</div>
	
	)
}