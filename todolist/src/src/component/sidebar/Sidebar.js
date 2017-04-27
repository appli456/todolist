/**
 * Created by li-rz on 17-4-27.
 * Sidebar: Sidebar component
 */
import React from 'react';
import './Sidebar.scss'
class Sidebar extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    render(){
        return React.createElement('section', {
            className: 'col-md-3 work-sidebar'
        }, this.props.children);
    }
}

export default Sidebar;