import React from 'react';
import ReactDOM from 'react-dom';

export default class View extends React.Component {
    constructor(props) {
        super(props);
        
        this.renderer = props.renderer;
    }

    componentDidMount() {
        this.renderer.setParent(ReactDOM.findDOMNode(this));
    }

    render() {
        return <div />;
    }
}
