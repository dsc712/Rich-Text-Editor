import React, { Component } from 'react';
import MyEditor from './Editor'

class App extends Component {
  render() {
    return (
        <div className="outer">
          <MyEditor className={"editor"} />
        </div>
    );
  }
}

export default App;
