/**
 * Root Page: include all component and page
 * Created by li-rz on 17-4-27.
 */
import React from 'react';
import Container from './../../component/container/Container';
import Sidebar from './../../component/sidebar/Sidebar';
import Content from './../content/content';


class Root extends React.Component {
    render(){
        return (<Container fluid={true}>
            <Sidebar>
                <ul>
                    <li><p>111</p></li>
                    <li>
                        <p>222</p>
                        <ul>
                            <li><p>333</p></li>
                        </ul>
                    </li>
                </ul>
            </Sidebar>
            <Content/>
        </Container>)
    }
}


export default Root;
