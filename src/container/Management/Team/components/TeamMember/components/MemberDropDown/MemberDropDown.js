import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Avatar, Typography } from '@material-ui/core';
import { Close, ArrowDropDown, ArrowRight } from '@material-ui/icons';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: '1px solid rgba(0, 0, 0, 0.103)',
    padding: theme.spacing(0.5),
    borderRadius: 5,
    '& input': {
      minWidth: '94%',
      border: 'none',
      '&:focus': {
        outline: 'none'
      }
    },
    '&:focus': {
      outline: '1px solid rgba(0, 0, 0, 0.103)'
    }
  },
  dropdown: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    backgroundColor: '#D3D3D3',
    overflowX: 'auto',
    maxHeight: 200,
    '& div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(1),
      border: '1px solid rgba(0, 0, 0, 0.103)',
      '&:hover': {
        cursor: 'pointer',
        border: '1px solid #455272',
        backgroundColor: '#455272',
        color: 'white'
      }
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(3),
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  }
}));

const MemberDropDown = props => {
  const { players, available, setAvailable, members, onAdd } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const classes = useStyles();

  const add = member => {
    onAdd(member);
    setOpen(false);
  };

  const search = value => {
    setValue(value);
    setAvailable(players.filter(current => current.name.startsWith(value)));
  };

  const clean = () => {
    setValue('');
    setAvailable(players.filter(player => !members.includes(player)));
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <input
          type="text"
          onFocus={() => setOpen(true)}
          value={value}
          placeholder="Type to filter"
          onChange={e => search(e.target.value)}
        />
        <span>
          <IconButton size="small" onClick={() => clean()}>
            <Close size="small" />
          </IconButton>
        </span>
        <span>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <ArrowDropDown size="small" /> : <ArrowRight size="small" />}
          </IconButton>
        </span>
      </div>
      {open ? (
        <div className={classes.dropdown}>
          {available.map(member => {
            return (
              <div key={member.id} onClick={() => add(member)}>
                <Avatar className={classes.small}>{member.name.substring(0, 1)}</Avatar>
                <Typography variant="caption">{member.name}</Typography>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MemberDropDown;
