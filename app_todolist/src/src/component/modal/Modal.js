/**
 * Created by li-rz on 17-4-27.
 */
import React, {PropTypes} from 'react'
import './Modal.scss';

class ListModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: props.show,
            timing: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        // open
        if (nextProps.show === true && this.state.show === false) {
            this.setState({show: nextProps.show, timing: 0});
        }
    }

    closeModal() {

        // closing
        if(this.state.timing) {
            clearTimeout(this.modalCloseCallback);
        } else {
            this.setState({
                timing: 1 // leave
            });
        }

        this.modalCloseCallback = setTimeout( () => {
            let show = this.state.show;
            this.setState({
                show: !show,
                timing: 0
            });
        }, 300);

        // onCancel
    }

    clickModal(event) {
        event.stopPropagation();
    }

    onClick() {
        // onConfirm

        // todo: check full of that
            // todo: close modal

        this.clickModal();
    }


    render() {
        return(<div
            className={this.state.show ? 'todo-modal modal-dim active' : 'todo-modal modal-dim'}
            onClick={this.closeModal.bind(this)} style={this.state.timing ?
            (this.state.timing === 1 ? {opacity: 0} : {opacity: 1}) : null}>
            <div className="modal-container" onClick={this.clickModal.bind(this)}>
                <div className="title">
                    <span className="text">{this.props.title}</span>
                    <i className="fa fa-remove icon-remove" onClick={this.closeModal.bind(this)}/>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="footer">
                    <div className="button-container">
                        <button className="btn btn-success" onClick={this.onClick.bind(this)}>
                            <i className="fa fa-check icon"/>
                            OK
                        </button>

                        <button className="btn btn-danger" onClick={this.closeModal.bind(this)}>
                            <i className="fa fa-remove icon"/>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>)
    }
}

ListModal.PropTypes = {
    show: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
};

ListModal.defaultProps = {
    show: false
};

export default ListModal