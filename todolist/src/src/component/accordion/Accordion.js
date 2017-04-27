/**
 * Created by li-rz on 17-4-27.
 * Accordion: Accordion component
 */
import React, {PropTypes} from 'react';
import './Accordion.scss';

/**
 * Accordion Item
 */
class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return (<li></li>)
    }
}

Item.PropTypes = {
    data: PropTypes.object
};

Item.displayName = 'Accordion Item';

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeKey: this.props.activeKey}
    }



    render() {
        return (<ul>
            {this.data.map(function(value, index) {
                return (<Item data={value} key={index}/>)
            })}
        </ul>)
    }
}

Accordion.PropTypes = {
    data: PropTypes.array,
    activeKey: PropTypes.number
};

Accordion.displayName = 'Accordion Component';

export default Accordion;