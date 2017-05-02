/**
 * Created by li-rz on 17-5-2.
 */
import React from 'react';
import './Header.scss'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<header className="list-header">
            <div className="inner">
                <div className="section right">
                    <i className="fa fa-plus"/>
                </div>
            </div>
        </header>)
    }
}

export default Header;