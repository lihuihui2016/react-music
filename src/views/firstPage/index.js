
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { Home } from '../home';
import  Find   from '../find';
import { Mine } from '../mine';
import { Head } from '../../components/head';
import "../../styles/index.scss";
import './index.scss'

export class FirstPage extends React.Component {

    render() {
        return (
            <div>
                <Head></Head>
                <div className='content'>xw
                    <Switch>
                        <Route path='/firstPage/' component={Find} exact />
                        <Route path='/firstPage/find' component={Find} />
                        <Route path='/firstPage/home' component={Home} />            
                        <Route path='/firstPage/mine' component={Mine} />
                        <Route render={() => (<Redirect to="/firstPage/find" />)} />

                    </Switch>

                </div>

            </div>
        )
    }
}

