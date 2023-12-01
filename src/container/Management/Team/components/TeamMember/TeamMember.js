import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { MemberBox, MemberDropDown } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100%',
    border: '1px solid rgba(0, 0, 0, 0.103)',
    borderRadius: 5
  }
}));

const TeamMember = props => {
  const { players, members, setMembers } = props;
  const classes = useStyles();

  const [available, setAvailable] = useState(players);

  const add = member => {
    setMembers(members.concat([member]));
    setAvailable(available.filter(item => item.id !== member.id));
  };

  const remove = id => {
    const newMembers = members.filter(current => current.id !== id);
    setMembers([...newMembers]);
  };

  return (
    <div className={classes.root}>
      <MemberDropDown
        players={players}
        available={available}
        setAvailable={setAvailable}
        members={members}
        onAdd={add}
      />
      <MemberBox members={members} onDelete={remove} />
    </div>
  );
};

export default TeamMember;
