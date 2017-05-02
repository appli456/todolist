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
    render(){
        return (<Container fluid={true}>
            <Header/>
            <div className="root-container">
                <div>
                    <Sidebar>
                        <ul>
                            <li><p>111</p></li>
                            <li><p>222</p></li>
                        </ul>
                    </Sidebar>
                </div>
                <Content/>
            </div>
        </Container>)
    }
}


export default Root;
