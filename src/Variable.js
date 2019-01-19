import React, { Component } from 'react';
import { EditorState, AtomicBlockUtils, Modifier } from 'draft-js';
import './Variable.css';

class Variable extends Component {
    constructor( props ) {
        super( props );
    }

    state = {
        text: '',
    };

    componentDidMount() {
        this.setState({ text: this.props.value })
    }

    handleVariable = () => {
        const editorState = this.props.editorState;
        console.log( editorState );
        const contentState = editorState.getCurrentContent();
        const entity = contentState.createEntity('variable', 'IMMUTABLE', {data : 1000 });
        const entityKey = entity.getLastCreatedEntityKey();

        let withAtomic;
        if( this.props.block ) {
            let character = '{{';
            for( let i = 0; i < this.props.block.length; i++ ) {
                character += ' \n     {{ ' + this.props.block[i].props.value + ' }}';
            }
            character += ' \n}}';
            withAtomic = AtomicBlockUtils.insertAtomicBlock(
                editorState,
                entityKey,
                character
            );

        }else {
            withAtomic = AtomicBlockUtils.insertAtomicBlock(
                editorState,
                entityKey,
                '{{ ' + this.state.text + ' }}'
            );
        }

        const nextContentState = withAtomic.getCurrentContent();
        const blockMap = nextContentState.getBlockMap();
        console.log(blockMap);
        const newContentState = contentState.set('blockMap', blockMap);
        const newEditorState = EditorState.createWithContent(newContentState);
        this.props.onChange(EditorState.moveFocusToEnd(
            newEditorState
        ));
    };

    render() {
        return ( <code onClick={ this.handleVariable } className={"var"}>
            { this.state.text }
        </code>);
    }
}

export default Variable;