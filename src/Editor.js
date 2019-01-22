import React, { Component } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';

import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';

import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-linkify-plugin/lib/plugin.css';

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';

import mentions from './mentions';


import Variable from './Variable';
import BlockVariable from './BlockVariable';
import './Editor.css'

// emoji plugin
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

// inline toolbar plugin
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

// side toolbar plugin
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

// link plugin
const linkPlugin = createLinkifyPlugin({ target: '_blank' });

// mention plugin
const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;

class MyEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty(), suggestions: mentions};
        this.onChange = (editorState) => this.setState({editorState});
    }

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentions),
        });
    };

    onAddMention = () => {
    };

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

    render() {
        return (
            <div className={"editor"} >
                <Editor
                    editorState={ this.state.editorState }
                    onChange={ this.onChange }
                    plugins={[emojiPlugin,inlineToolbarPlugin, sideToolbarPlugin, linkPlugin, mentionPlugin]}
                    handleKeyCommand={ this.handleKeyCommand }
                />
                <InlineToolbar />
                <SideToolbar />
                <EmojiSuggestions />
                <MentionSuggestions
                    onSearchChange= { this.onSearchChange }
                    suggestions= { this.state.suggestions }
                    onAddMention= { this.onAddMention }
                />
                <EmojiSelect />
                <Variable onChange={ this.onChange } editorState={ this.state.editorState } value={"organization.name"}/>
                <Variable  onChange={ this.onChange }  editorState={ this.state.editorState } value={"organization.phone"}/>
                <Variable  onChange={ this.onChange }  editorState={ this.state.editorState } value={"organization.email"}/>
                <BlockVariable onChange={ this.onChange } editorState={ this.state.editorState } value={"order"} type={"order"}/>
            </div>

        );
    }
}

export default MyEditor;