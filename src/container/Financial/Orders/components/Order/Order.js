import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Card, CardHeader, IconButton, CardContent, Button, CardActions } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { MoreVert } from '@material-ui/icons';
import { ProjectAmount } from 'container/Financial/components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    marginTop: 5,
    maxWidth: '25%'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const Order = props => {
  const { order } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {order.customerName.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={order.customerName}
        subheader={order.customerNumber}
      />
      <CardContent>
        {order.projects.map(projectAmount => {
          return <ProjectAmount key={projectAmount.projectId} projectAmount={projectAmount} />;
        })}
      </CardContent>
      <CardActions>
          <Button size="small" color="primary">
            Invoice
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
    </Card>
  );
};

export default Order;
