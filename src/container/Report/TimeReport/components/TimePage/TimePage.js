import { makeStyles } from '@material-ui/styles';
import React, { forwardRef } from 'react';
import { Typography, Avatar, Card, CardHeader, CardContent, Button, CardActions } from '@material-ui/core';
import { TimeChip } from 'container/Report/components';
import { NavLink as RouterLink } from 'react-router-dom';
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
  },
  report: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1)
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const TimePage = () => {
  const classes = useStyles();

  const data = useSelector(state => state.report.data);

  return (
    <Card className={classes.root}>
      <CardHeader
        title={data.personName}
        subheader={data.personSocialSecurity}
        action={
          <CardActions>
            <Button size="small" color="primary" component={CustomRouterLink} to={`/print/reports/time/print`}>
              Print
            </Button>
          </CardActions>
        }
      />
      {data.projects.map(project => (
        <Wrapper key={project.id}>
          <CardContent className={classes.owner}>
            <div>
              <Avatar className={classes.avatar}>{project.owner.substring(0, 1)}</Avatar>
              <h2>{project.owner}</h2>
            </div>
            <div>
              <Typography variant="caption">Period:</Typography>
              <h4>{`${data.startDate} - ${data.endDate}`}</h4>
            </div>
          </CardContent>
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
        </Wrapper>
      ))}
    </Card>
  );
};

export default TimePage;
