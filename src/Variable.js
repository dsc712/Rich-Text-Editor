import React, { Component } from 'react';
import { EditorState, AtomicBlockUtils, Modifier, convertToRaw } from 'draft-js';
import { OrderedSet } from 'immutable'
import './Variable.css';

class Variable extends Component {

    state = {
        text: '',
    };

    componentDidMount() {
        this.setState({ text: this.props.value })
    }

    handleVariable = () => {
        const editorState = this.props.editorState;
        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();

        let withAtomic, entity, entityKey;

        // For handling block variable
        if( this.props.block ) {
            entity = contentState.createEntity('variable', 'IMMUTABLE', { Amount: 1000, Tax: 15.00, StartAt: '13/10/2019', EndAt: '20/10/18' });
            entityKey = entity.getLastCreatedEntityKey();

            let character = '';
            for( let i = 0; i < this.props.block.length; i++ ) {
                character += ' \n     {{ ' + this.props.block[i].props.value + ' }}';
            }
            // character += ' \n}}';

            withAtomic = AtomicBlockUtils.insertAtomicBlock(
                editorState,
                entityKey,
                character
            );

            const nextContentState = withAtomic.getCurrentContent();
            const blockMap = nextContentState.getBlockMap();
            const newContentState = contentState.set('blockMap', blockMap);
            const newEditorState = EditorState.createWithContent(newContentState);

            const rawJson = convertToRaw(newContentState);
            const jsonStr = JSON.stringify(rawJson, null, 1);

            console.log(jsonStr);

            this.props.onChange(EditorState.moveFocusToEnd(
                newEditorState
            ));

        } else {

            // for handling inline variable
            entity = contentState.createEntity('variable', 'IMMUTABLE', { name: 'MyDesk Spaces', email: 'abc@g.com', phone: '9210284xxx' });
            entityKey = entity.getLastCreatedEntityKey();
            const textWithEntity = Modifier.insertText( contentState, selection, "{{ " + this.state.text + " }}", null, entityKey);

            this.props.onChange( EditorState.push(editorState, textWithEntity, 'insert-characters'));
            const rawJson = convertToRaw(textWithEntity);
            const jsonStr = JSON.stringify(rawJson, null, 1);

            console.log(jsonStr);
        }
    };

    render() {
        return ( <code onClick={ this.handleVariable } className={"var"}>
            { this.state.text }
        </code>);
    }
}

export default Variable;