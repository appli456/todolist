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
        console.log(event.target)
        // todo: send click item index to the root - index in the attribute named data-id
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
    data: React.PropTypes.object
};
Sidebar.displayName = 'todo list sidebar';

export default Sidebar;