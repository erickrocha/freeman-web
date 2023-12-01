import React, { forwardRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Menu,
  Dashboard,
  ReportOutlined,
  MonetizationOn,
  Accessibility,
  SecurityOutlined,
  Business,
  ExpandLess,
  ExpandMore,
  AssignmentInd
} from '@material-ui/icons';
import clsx from 'clsx';
import { List, colors, ListItem, Button, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import Wrapper from 'hoc/Wrapper/Wrapper';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const icons = {
  DASHBOARD: <Dashboard />,
  REPORTS: <ReportOutlined />,
  MANAGEMENT: <AssignmentInd />,
  FINANCIAL: <MonetizationOn />,
  HR: <Accessibility />,
  SECURITY: <SecurityOutlined />,
  REGISTER: <Business />
};

const SidebarNav = props => {
  const { menus, className, ...rest } = props;

  const classes = useStyles();
  const [menu, setMenu] = useState(menus);

  const collapse = id => {
    menus.forEach(element => {
      if (element.id === id) {
        element.collapse = !element.collapse;
      }
    });
    setMenu([...menus]);
  };

  const isCollapsed = id => {
    return menu.find(item => item.id === id).collapse;
  };

  let rootMenu = menu.map(menuItem => {
    if (menuItem.link) {
      return (
        <ListItem className={classes.item} disableGutters key={menuItem.label}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={menuItem.route}>
            <div className={classes.icon}>{icons[menuItem.name] || <Menu />}</div>
            {menuItem.label}
          </Button>
        </ListItem>
      );
    } else if (menuItem.groupMenu) {
      return (
        <Wrapper key={`${menuItem.id}-wrapper`}>
          <ListItem button key={`${menuItem.id}-group-menu`} onClick={() => collapse(menuItem.id)}>
            <ListItemIcon>{icons[menuItem.name]}</ListItemIcon>
            <ListItemText primary={menuItem.label} />
            {isCollapsed(menuItem.id) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse key={`${menuItem.id}-collapse`} in={isCollapsed(menuItem.id)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding key={`${menuItem.id}-list`}>
              {menuItem.children.map(child => (
                <ListItem button className={classes.nested} key={`${child.id}-list-item`}>
                  <Button
                    key={`${child.id}-button`}
                    activeClassName={classes.active}
                    className={classes.button}
                    component={CustomRouterLink}
                    to={child.route}>
                    {child.label}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Wrapper>
      );
    }
    return null;
  });

  return (
    <List component="nav" aria-labelledby="nested-list-subheader" {...rest} className={clsx(classes.root, className)}>
      {rootMenu}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  menus: PropTypes.array.isRequired
};

export default SidebarNav;
