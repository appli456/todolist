/**
 * Created by li-rz on 17-4-27.
 * Sidebar: Sidebar component
 */
import React from 'react';
import './Sidebar.scss'
class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    /**
     * click item
     */
    onClickItem(event) {
        let id = event.target.getAttribute('data-id');
        this.props.callback(parseInt(id));
    }

    generateListItem(value, key) {
        // let r = Math.floor(Math.random() * 3);

        return (<li className={"todolist-item " +
        (value.finish === 2 ? 'success' : (value.finish === 1 ? 'expire' : '')) // test data
        }
                    onClick={this.onClickItem.bind(this)}
                    key={key} data-id={key}>
            {value.name}
            </li>)
    }

    render(){

        return (<section className="work-sidebar">
            <ul>
                {this.props.data.map(this.generateListItem.bind(this))}
            </ul>
        </section>)
    }
}

Sidebar.PropTypes = {
    data: React.PropTypes.object.isRequired,
    callback: React.PropTypes.func.isRequired
};
Sidebar.displayName = 'todo list sidebar';


export default Sidebar;