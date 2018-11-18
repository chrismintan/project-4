import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//material ui
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    const {classes} = this.props;
    const {isLoggedin} = this.props.loggedin;
    const loginLink = (props) => <Link to="/login" {...props} />;
    const homeLink = (props) => <Link to="/home" {...props} />;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Navbar
            </Typography>
            <Button color="inherit" onClick={this.goTo('home')}>
              Home
            </Button>
            {!isloggedin() && (
              <Button color="inherit" onClick={this.goTo('login')}>
                Login
              </Button>
            )}
            {isloggedin() && <Button color="inherit">Log Out</Button>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
