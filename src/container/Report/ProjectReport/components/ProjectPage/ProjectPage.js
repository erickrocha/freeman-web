import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import { TimeChip } from 'container/Report/components';
import { useSelector } from 'react-redux';
import Wrapper from 'hoc/Wrapper/Wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.103)',
    color: theme.palette.text.secondary
  },
  separator: {
    marginTop: 5,
    minWidth: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.text.disabled,
    minHeight: 3,
    maxHeight: 3,
    marginBottom: 10
  },
  owner: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& div': {
      display: 'flex',
      alignItems: 'center',
      '& h2': {
        marginLeft: 15
      },
      '& h4': {
        marginLeft: 15
      }
    }
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

const ProjectPage = () => {
  const data = useSelector(state => state.report.data);

  const classes = useStyles();

  return (
    <Wrapper>
      {data.projects.map(project => (
        <div className={classes.root}>
          <div className={classes.owner}>
            <div>
              <Avatar className={classes.avatar}>{project.owner.substring(0, 1)}</Avatar>
              <h2>{project.owner}</h2>
            </div>
            <div>
              <Typography variant="caption">Period:</Typography>
              <h4>{`${data.startDate} - ${data.endDate}`}</h4>
            </div>
          </div>
          <div className={classes.separator}></div>
          <TimeChip
            name={project.name}
            totalPendingInMinutes={project.totalPendingInMinutes}
            totalApprovedInMinutes={project.totalApprovedInMinutes}
          />
          <div className={classes.separator}></div>
          <div>Phases</div>
          {project.phases.map(phase => (
            <TimeChip
              key={phase.id}
              name={phase.name}
              totalPendingInMinutes={phase.totalPendingInMinutes}
              totalApprovedInMinutes={phase.totalApprovedInMinutes}
            />
          ))}
          <div className={classes.separator}></div>
        </div>
      ))}
    </Wrapper>
  );
};

export default ProjectPage;
