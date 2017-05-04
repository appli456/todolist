/**
 * Created by li-rz on 17-4-27.
 * Container: container component
 */
import React ,{ PropTypes }from 'react';
import './Container.scss';
class Container extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return React.createElement('div',
            {className: null},
            this.props.children)
    }
}

Container.PropTypes = {
    fluid: PropTypes.bool,
    children: PropTypes.object
};

Container.defaultProps = {
    fluid: false
};

Container.displayName = 'To do List Container';

export default Container;