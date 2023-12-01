import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import * as events from '../../store/events/application/index';
import { connect } from 'react-redux';
import { Sidebar, Topbar } from './components';
import { withRouter } from 'react-router-dom';

const useStyles = theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '90%'
  }
});

class Main extends Component {
  state = {
    openSidebar: false
  };
  componentDidMount() {
    this.props.onLoadConfig();
  }

  handleSidebarOpen = () => {
    this.setState({
      openSidebar: true
    });
  };

  handleSidebarClose = () => {
    this.setState({
      openSidebar: false
    });
  };

  render() {
    const { classes, user, menus, person } = this.props;
    const isDesktop = true;
    const shouldOpenSidebar = isDesktop ? true : this.state.openSidebar;

    return (
      <div
        className={clsx({
          [classes.root]: true,
          [classes.shiftContent]: isDesktop
        })}>
        <Topbar onSidebarOpen={this.handleSidebarOpen} />
        <Sidebar
          onClose={this.handleSidebarClose}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'persistent' : 'temporary'}
          user={user}
          person={person}
          menus={menus}
        />
        <main className={classes.content}>{this.props.children}</main>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    user: state.app.user,
    person: state.app.person,
    menus: state.app.menus,
    loading: state.app.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadConfig: () => dispatch(events.loadConfig()),
    onLoadProjects: () => dispatch()
  };
};

export default withRouter(withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Main)));
