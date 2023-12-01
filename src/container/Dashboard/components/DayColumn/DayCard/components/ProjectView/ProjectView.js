import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    fontSize: '0.8em',
    '& span': {
      color: 'gray',
      fontWeight: 700
    }
  }
}));

const ProjectView = props => {
  const { appointment } = props;

  const classes = useStyles();

  if (appointment.project) {
    return (
      <div className={classes.root}>
        on <span>{appointment.project.name}</span>
        <br /> <span>{appointment.project.phases[0]}</span>
      </div>
    );
  }
  return;
};

export default ProjectView;
