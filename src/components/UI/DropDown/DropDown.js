import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { MoreVert } from '@material-ui/icons';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  content: {
    position: 'absolute',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    minWidth: 100,
    zIndex: 1,
    '& div': {
      padding: theme.spacing(2),
    }
  }
}));

const DropDown = props => {
  const { routes } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root} onClick={() => setOpen(!open)}>
      <MoreVert />
      {open ? (
        <div className={classes.content}>
          {routes.map(route => (
            <div key={route.label}>
              <RouterLink to={route.path}>{route.label}</RouterLink>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DropDown;
