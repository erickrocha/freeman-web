import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TeamMember from 'container/Management/Team/components/TeamMember';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const Playground = props => {
  const { players } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TeamMember players={players} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    players: state.app.players
  };
};

export default connect(mapStateToProps, null)(Playground);
