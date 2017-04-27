/**
 * Created by li-rz on 17-4-27.
 * Container: container component
 */
import React ,{ PropTypes }from 'react';
import './Container.scss';
class Container extends React.Component {

    // constructor(props){
    //     super(props);
    // }
    generateClass() {
        let str = '';
        str += (this.props.fluid ? 'container-fluid':'container');
        return str;
    }

    render() {
        return React.createElement('div',
            {className: this.generateClass()},
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