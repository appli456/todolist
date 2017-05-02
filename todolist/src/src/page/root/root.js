/**
 * Root Page: include all component and page
 * Created by li-rz on 17-4-27.
 */
import React from 'react';
import Container from './../../component/container/Container';
import Sidebar from './../../component/sidebar/Sidebar';
import Content from './../content/content';
import Header from './../../component/header/Header'
import './root.scss';

class Root extends React.Component {
    constructor(props) {
        super(props);
        let arr = [];
        for(let i = 0; i < 63; i++) {
            arr.push({name: 'aaaa'});
        }
        this.state = {
            data: [{name: '111'}, {name: '222'}, {name: '333'}, {name: '9999999999999999999999999999999999999999999'}].concat(arr)
        }
    }

    render(){
        return (<Container fluid={true}>
            <Header/>
            <div className="root-container">
                <div className="col-md-5">
                    <Sidebar data={this.state.data.map(function(value) {
                        return {name: value.name, id: value.id}
                    })}/>
                </div>
                <div className="col-md-7">
                    <Content/>
                </div>
            </div>
        </Container>)
    }
}


export default Root;
