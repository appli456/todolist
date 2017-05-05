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
             *  id: transaction id
             *  name: transaction name
             *  detail: transaction detail
             *  expire_date: transaction expire date
             *  priority: transaction priority
             */
            data: props.data
        };
        this.TYPE = {
            EDIT: 0,
            DELETE: 1,
            FINISH: 2
        };
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
                    break;
                case this.TYPE.DELETE:
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
                <div className="title">
                    <h1>{data ? data.name : null}</h1>
                    <span>expire date: {data ? data.expire_date : null}</span>
                </div>
                <div>
                    {data ? data.detail.split('\n').map(function (value, key) {
                        return (<p key={key}>{value}</p>)
                    }): null}
                </div>
                <div>{data ? data.priority : null}</div>
            </div>
            <div className="button-container">
                <button className={data.finish ? "btn btn-success" : "btn btn-info"}
                        onClick={this.onClickButton(this.TYPE.FINISH).bind(this)}>
                    <i className={data.finish ? 'fa check fa-check' : 'fa check fa-remove'}/>
                    {data.finish ? "Finish" : "Unfinished"}
                </button>

                <button className="btn btn-primary"
                        onClick={this.onClickButton(this.TYPE.EDIT).bind(this)}>
                    <i className="fa fa-edit edit"/>
                    Edit
                </button>

                <button className="btn btn-danger"
                        onClick={this.onClickButton(this.TYPE.DELETE).bind(this)}>
                    <i className="fa fa-trash delete"/>
                    Delete
                </button>
            </div>
        </section>) : null
    }
}

Content.PropTypes = {
    data: React.PropTypes.object
};

Content.displayName = 'todo list content';

export default Content;