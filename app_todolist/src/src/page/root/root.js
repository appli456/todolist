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
import {addItem, editItem, } from './../../action/todolist-action';
import NetworkStore from './../../util/network-util';

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

    modalConfirm() {
        let obj = {};
        let form = this.refs.form;
        let input = form.querySelectorAll('input');
        let textarea = form.querySelectorAll('textarea');
        input.forEach(function (ele) {
            let id = ele.id;
            if(id === 'expire-date') {
                obj['expire_date'] = new Date(ele.value);
            } else if(id === 'priority') {
                obj[id] = parseInt(ele.value);
            } else {
                obj[id] = ele.value;
            }
        });
        textarea.forEach(function (ele) {
            obj[ele.id] = ele.value;
        });
        obj['finish'] = false;
        this.props.onAdd(obj).then((data) => {
            this.setState({
                data: this.state.data.concat([data])
            });
        });
        return true;
    }
    clearModal() {
        let form = this.refs.form;
        let input = form.querySelectorAll('input');
        let textarea = form.querySelectorAll('textarea');
        input.forEach((ele) => {ele.value=''});
        textarea.forEach((ele) => {ele.value=''});
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
            <ListModal title={"Add Item"} show={this.state.modalOpen}
                       onConfirm={this.modalConfirm.bind(this)} onCancel={this.clearModal.bind(this)}>
                <form className="add-form" ref='form'>
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
            <div>
                <button onClick={()=>{console.log(this.state.data)}}>???</button>
            </div>
        </Container>)
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: async (data) => {
            dispatch(addItem(data));
            return NetworkStore.addItem(data);
        },
        onEdit: async (data) => {
            dispatch()
        }
    }
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);

export default RootContainer;
