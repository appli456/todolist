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
        this.props.onAdd();
    };

    sortItem() {

    }

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
                <div className="section right">
                    <i className="fa fa-sort sort" onClick={this.sortItem.bind(this)}/>
                    <i className="fa fa-plus plus" onClick={this.addItem.bind(this)}/>
                </div>
            </div>
        </header>)
    }
}

Header.PropTypes = {
    onAdd: React.PropTypes.func,
    onSort: React.PropTypes.func
};

export default Header;