import React, { Component } from 'react';
import Variable from './Variable';

class BlockVariable extends Component {

    state = {
        type: '',
        order: ['order.amount', 'order.startAt', 'order.endAt', 'order.tax'],
        text: ''
    };

    componentDidMount() {
        this.setState({ type: this.props.type, text: this.props.value });
    }

    render() {
        let orderVariables;
        if( this.state.type === 'order' ) {
           orderVariables = this.state.order.map( (val) => {
                return <Variable value={ val }  editorState={ this.props.editorState } onChange={ this.props.onChange } />
            });
        }

        return (
          <span>
              <Variable editorState={ this.props.editorState } onChange={ this.props.onChange } value={ this.props.value } block={ orderVariables }/>
          </span>
        );
    }
}

export default BlockVariable;