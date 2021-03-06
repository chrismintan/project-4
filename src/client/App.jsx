import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700]
    }
  },
  typography: {
    useNextVariants: true
  }
});

//console.log(theme);
//console.log(blue)

class App extends Component {
  constructor(props) {
    super(props);
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.state = {
      Loggedin: false,
      user: ''
    };
  }

  setLoggedIn(loggedin, user) {
    this.setState({loggedin, user});
  }

  render() {
    const {loggedin, user} = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div>HELLO</div>
        <div>Add shit here</div>
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(App);
