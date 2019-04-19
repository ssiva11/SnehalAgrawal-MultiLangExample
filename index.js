import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import {LocalizedStrings  } from 'react-native-localization';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some mhjh agic happen :)
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
