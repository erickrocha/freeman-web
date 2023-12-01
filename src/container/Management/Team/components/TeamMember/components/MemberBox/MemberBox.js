import React from 'react';
import { Chip } from '@material-ui/core';
import clsx from 'clsx';
import { Face } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const useStyle = makeStyles(theme => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.103)',
    padding: theme.spacing(1),
    lineHeight: 2,
    minHeight: 200
  },
  chip: {
    marginLeft: 5
  },
  member: {
    backgroundColor: '#455272',
  },
  techLead: {
    backgroundColor: green[500]
  }
}));

const MemberBox = props => {
  const { members, onDelete } = props;

  const classes = useStyle();

  return (
    <div className={classes.root}>
      {members.map(member => {
        return (
          <Chip
            className={clsx(classes.chip, member.lead ? classes.techLead : classes.member)}
            key={member.id}
            size="medium"
            icon={<Face />}
            onDelete={() => onDelete(member.id)}
            label={member.name}
            color="primary"
          />
        );
      })}
    </div>
  );
};

export default MemberBox;
