/**
 * Content: To show the detail of the events
 */

import React from 'react';
import './content.scss';

class Content extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            /**
             * data:
             *  t_id: transaction id
             *  name: transaction name
             *  detail: transaction detail
             *  finish: transaction if finish
             *  expire_date: transaction expire date
             *  priority: transaction priority
             */
            t_id: props.data ? props.data.t_id : null,
            name: props.data ? props.data.name : '',
            detail: props.data ? props.data.detail : '',
            finish: props.data ? props.data.finish : false,
            expire_date: props.data ? props.data.expire_date : '',
            priority: props.data ? props.data.priority : 1,
            onEdit: false
        };
        this.TYPE = {
            EDIT: 0,
            DELETE: 1,
            FINISH: 2
        };

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data) {
            this.setState({
                t_id: nextProps.data ? nextProps.data.t_id : null,
                name: nextProps.data ? nextProps.data.name : '',
                detail: nextProps.data ? nextProps.data.detail : '',
                finish: nextProps.data ? nextProps.data.finish : false,
                expire_date: nextProps.data ? nextProps.data.expire_date : '',
                priority: nextProps.data ? nextProps.data.priority : 1,
            });
        }
    }

    cancelChange() {
        this.setState({
                onEdit: !this.state.onEdit,
                t_id: this.props.data ? this.props.data.t_id : null,
                name: this.props.data ? this.props.data.name : '',
                detail: this.props.data ? this.props.data.detail : '',
                finish: this.props.data ? this.props.data.finish : false,
                expire_date: this.props.data ? this.props.data.expire_date : '',
                priority: this.props.data ? this.props.data.priority : 1,
            });
    };

    executeEdit(type) {
        this.setState({
            onEdit: !this.state.onEdit
        });
        let obj = {};
        let key = ['t_id', 'name', 'detail', 'finish', 'expire_date', 'priority'];
        key.forEach((value) => {
            obj[value] = this.state[value]
        });
        this.props.callback(type, obj);
    }

    executeDelete(type) {
        this.props.callback(type, this.state.t_id);
    }

    onInputChange(name){
        return function(event) {
            this.setState({name: event.target.value});
        }
    }


    /**
     *
     * @param type
     * @returns {Function}
     */
    onClickButton(type) {
        return function () {
            switch(type){
                case this.TYPE.EDIT:
                    this.executeEdit(type);
                    break;
                case this.TYPE.DELETE:
                    if(this.state.onEdit) {
                        this.cancelChange();
                        return;
                    }
                    this.executeDelete(type);
                    break;
                case this.TYPE.FINISH:
                    break;
                default:
                    break;

            }
        }
    }


    render() {
        let data = this.props.data;
        return data ? (<section className="list-content">
            <div className="transaction-container">
                <div className="title form-group">
                    <h1>{data ? (this.state.onEdit ?
                        (<label style={{width: "100%"}}>Name:<input type="text" value={this.state.name}
                            onChange={this.onInputChange('name').bind(this)}
                                            className="form-control"/></label>) :
                        data.name) :
                        null}</h1>
                    <span>expire date: {data ? ( this.state.onEdit ?
                            (<input type="text" value={this.state.expire_date}
                                onChange={this.onInputChange('expire_date').bind(this)}
                                className="form-control"/>) :
                            data.expire_date
                        ) : null}
                    </span>
                </div>
                <div className="form-group">
                    {data ? ( this.state.onEdit ?
                         (<label style={{width: '100%'}}>Detail:<textarea
                            onChange={this.onInputChange('detail').bind(this)}
                            value={this.state.detail}
                            className="form-control" rows={5}/></label>) :
                        data.detail.split('\n').map(function (value, key){
                            return (<p key={key}>{value}</p>)
                        })): null}
                </div>
                <div className="form-group">Priority: {data ? (this.state.onEdit ?
                    (<input type="text" value={this.state.priority}
                            onChange={this.onInputChange('priority').bind(this)}
                            className="form-control"/>) :
                    data.priority) : null}</div>
            </div>
            <div className="button-container">
                {this.state.onEdit ? null : (
                    <button className={!data.finish ? "btn btn-success" : "btn btn-info"}
                        onClick={this.onClickButton(this.TYPE.FINISH).bind(this)}>
                    <i className={!data.finish ? 'fa check fa-check' : 'fa check fa-remove'}/>
                    {!data.finish ? "Set Finish" : "Set Unfinished"}
                    </button>
                )}

                <button className={this.state.onEdit ? "btn btn-success" : "btn btn-primary"}
                        onClick={this.onClickButton(this.TYPE.EDIT).bind(this)}>
                    <i className={this.state.onEdit ? "fa fa-check edit" : "fa fa-edit edit"}/>
                    {this.state.onEdit ? 'OK' : 'Edit'}
                </button>

                <button className="btn btn-danger"
                        onClick={this.onClickButton(this.TYPE.DELETE).bind(this)}>
                    <i className={this.state.onEdit ? "fa fa-remove delete" : "fa fa-trash delete"}/>
                    {this.state.onEdit ? 'Cancel' : 'Delete'}
                </button>
            </div>
        </section>) : null
    }
}

Content.PropTypes = {
    data: React.PropTypes.object,
    callback: React.PropTypes.func
};

Content.displayName = 'todo list content';

export default Content;