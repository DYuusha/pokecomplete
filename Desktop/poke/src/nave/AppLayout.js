import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginL from './LoginL';
import SiteLa from './SiteLa';

class AppLayout extends Component{
  render(){
    console.log(this.props.authorize);
    if (this.props.authorize) { //is logged?
      return(<SiteLa/>);
    }else{
      return(<LoginL/>); //is not logged
    }
  }
}

function mapStateToProps(state){
  return {
    authorize: state.authorize //is authorized?
  }
}

export default connect(mapStateToProps)(AppLayout);