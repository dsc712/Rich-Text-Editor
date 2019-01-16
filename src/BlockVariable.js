import React, { Component } from 'react';
import Variable from './Variable';

class BlockVariable extends Component {
    constructor( props ) {
        super( props );
    }

    state = {
        type: '',
        order: ['Amount', 'Start At', 'End At', 'Tax'],
        text: ''
    };

    componentDidMount() {
        console.log(this.props.value);
        this.setState({ type: this.props.type, text: this.props.value });
    }

    render() {
        let orderVariables;
        if( this.state.type === 'order' ) {
           orderVariables = this.state.order.map( (val, index) => {
                return <Variable value={val}  editorState={ this.props.editorState } onChange={ this.props.onChange } />
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