import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import Variable from './Variable';
import BlockVariable from './BlockVariable';
import './Editor.css'

class MyEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
    }


    handleKeyCommand = ( command, editorState ) => {
        let newState;
        newState = RichUtils.handleKeyCommand( editorState, command );
        if( newState ) {
            this.onChange(newState);
            return "handled"
        }
        return 'non-handled'
    };

    handleAction = (e) => {
        const command = e.target.getAttribute('data-command');
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, command));
    };

    handleClick = () => {
        alert("wow")
    };

    render() {
        return (
            <div>
                <div className={"controls"} >
                    <button className={"btn"} onClick={this.handleAction} data-command="BOLD" >B</button>
                    <button className={"btn"} onClick={this.handleAction} data-command="ITALIC" >I</button>
                    <button className={"btn"} onClick={this.handleAction} data-command="UNDERLINE" >U</button>
                </div>
                <Editor
                    className="editor"
                    editorState={ this.state.editorState }
                    onChange={ this.onChange }
                    handleKeyCommand={ this.handleKeyCommand }
                />
                <hr/>
                <Variable onChange={ this.onChange } editorState={ this.state.editorState } value={"organization.name"}/>
                <Variable  onChange={ this.onChange }  editorState={ this.state.editorState } value={"organization.phone"}/>
                <Variable  onChange={ this.onChange }  editorState={ this.state.editorState } value={"organization.email"}/>

                <BlockVariable onChange={ this.onChange } editorState={ this.state.editorState } value={"order"} type={"order"}/>
            </div>

        );
    }
}

export default MyEditor;