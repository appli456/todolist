import React, { Component } from 'react';
import './common/normalize.scss';
import './App.scss';
import Root from './page/root/root';
import {connect} from 'react-redux';
import {getList} from './action/todolist-action';
import NetworkStore from './util/network-util';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {data: []};
  }

  componentDidMount() {
    this.props.getData().then((data)=>{
      this.setState({data: data});
    });

  }

  render() {
    return (
        <Root data={this.state.data}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: async () => {
      dispatch(getList(1));
      return await NetworkStore.getData()
    }
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
