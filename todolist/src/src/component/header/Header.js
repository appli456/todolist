/**
 * Created by li-rz on 17-5-2.
 */
import React from 'react';
import './Header.scss'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    addItem() {

    };

    render() {
        return (<header className="list-header">
            <div className="inner">
                <div className="section left">

                </div>
                <div className="section center">
                    <i className="fa fa-search search-icon"/>
                    <input className="text-input"
                        type="text" placeholder="search"/>
                </div>
                <div className="section right" onClick={this.addItem.bind(this)}>
                    <i className="fa fa-sort sort"/>
                    <i className="fa fa-plus plus"/>
                </div>
            </div>
        </header>)
    }
}

export default Header;