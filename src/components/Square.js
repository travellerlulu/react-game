import React from 'react';

class Square extends React.Component {
    render() {
        return (<span className="square-item" onClick={() => {this.props.onClick()}}>{this.props.value}&nbsp;</span>)
    }
}
export default Square;