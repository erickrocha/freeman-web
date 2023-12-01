import React from 'react';
import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: blue[500],
    marginRight: 2
  }
}));

const MemberCell = props => {
  const { members } = props;

  const classes = useStyles();

  return (
    <AvatarGroup max={3}>
      {members.map((member, index) => {
        return (
          <Avatar className={classes.avatar} key={`${member.id}-${index}`}>
            {member.name.substring(0, 1)}
          </Avatar>
        );
      })}
    </AvatarGroup>
  );
};

export default MemberCell;
