import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import {Guide} from './views/guide'
import {FirstPage} from './views/firstPage'
import AlbumDetail from './views/albumDetail'
import SongDetail from './views/songdetail'

function App() {
  return (
    <div className="App">
     <Router>
       <div>
         <Route path='' component={Layout}></Route>
       </div>

    </Router>
      
    </div>
  );
}
class Layout extends React.Component{
  render(){
    return(
      <Switch>
      <Route path='/' component={Guide} exact />
      <Route path='/guide' component={Guide} />
      <Route path='/firstPage/' component={FirstPage} />
      <Route path='/albumDetail/:id?' component={AlbumDetail} />
      <Route path='/songdetail/:id?' component={SongDetail} /> 
      <Route render={() => (<Redirect to="/firstPage/" />)} />
    </Switch>
    )
  }
}

export default App;
