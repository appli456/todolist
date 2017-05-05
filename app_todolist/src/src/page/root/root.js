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
import ListModal from './../../component/modal/Modal';
import {connect} from 'react-redux';

class Root extends React.Component {
    constructor(props, context) {
        super(props, context);
        let arr = [];
        // for(let i = 0; i < 63; i++) {
        //     arr.push({name: 'aaaa', finish: Math.floor(Math.random() * 3)});
        // }
        this.state = {
            data: props.data,
            modalOpen: false,
            contentData: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    };

    showDetail(index){
        this.setState({contentData: this.state.data[index]});
    };

    openModal() {
        this.setState({modalOpen: true});
    }

    render(){
        return (<Container fluid={true}>
            <Header onAdd={this.openModal.bind(this)}/>
            <div className="root-container">
                <div className="col-md-5">
                    <Sidebar data={this.state.data.map((obj) => {
                        let finish = 0;
                        if (obj.finish) {
                            finish = 2;
                        } else if ((new Date(obj.expire_date) - new Date()) < 0) {
                            finish = 1;
                        }

                        return {finish: finish, name: obj.name}
                    })} callback={this.showDetail.bind(this)}/>
                </div>

                <div className="col-md-7">
                    <Content data={this.state.contentData}/>
                </div>
            </div>
            <ListModal title={"Add Item"} show={this.state.modalOpen}>
                <form className="add-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Transaction Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="detail">Detail</label>
                        <textarea className="form-control" name="detail" id="detail" rows="5" placeholder="detail"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="expire-date">Expire Date</label>
                        <input className="form-control" type="text" id="expire-date"/>
                        <label htmlFor="priority">Priority</label>
                        <input className="form-control" type="text" id="priority"/>
                    </div>
                </form>
            </ListModal>
        </Container>)
    }
}

export default Root;
