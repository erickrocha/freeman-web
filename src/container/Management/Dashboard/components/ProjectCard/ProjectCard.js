import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, Avatar, CardContent, CardActions, Button, colors } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import PhaseCard from './PhaseCard';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  avatar: {
    backgroundColor: red[500]
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing(1)
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const ProjectCard = props => {
  const { project, startDate, endDate } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {project.name.substring(0, 1)}
          </Avatar>
        }
        title={project.name}
        subheader={project.owner}
      />
      <CardContent>
        <div className={classes.body}>
          {project.phases.map(phase => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" href="/management/entries" color="primary">
          Entries
        </Button>
        <Button
          size="small"
          href={`/reports/projects?projectId=${project.id}&startDate=${startDate}&endDate=${endDate}`}
          color="primary">
          Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
