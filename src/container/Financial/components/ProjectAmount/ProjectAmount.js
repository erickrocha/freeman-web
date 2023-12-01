import React from 'react';
import { useTheme, makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { buildChart } from 'shared/utility';
import { Doughnut } from 'react-chartjs-2';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    padding: '1%'
  },
  values: {
    display: 'flex',
    flexDirection: 'row'
  },
  chartContainer: {
    position: 'relative'
  }
}));

const ProjectAmount = props => {
  const { projectAmount } = props;

  const theme = useTheme();
  const classes = useStyles();
  const data = {
    datasets: [
      {
        data: [projectAmount.pendingPercentage, projectAmount.approvedPercentage],
        backgroundColor: [theme.palette.warning.main, theme.palette.success.main],
        borderWidth: 1,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Pending', 'Approved']
  };

  const options = buildChart(theme);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">{projectAmount.projectName}</Typography>
      </div>
      <div className={classes.values}>
        <Typography variant="body1">Pending:</Typography>&nbsp;&nbsp;
        <Typography variant="body1">{`${projectAmount.amountPendingInHour}h ${projectAmount.amountPendingInMinutes}`}</Typography>
        &nbsp;&nbsp;
        <Typography variant="body1">Approved:</Typography>&nbsp;&nbsp;
        <Typography variant="body1">{`${projectAmount.amountApprovedInHour}h ${projectAmount.amountApprovedInMinutes}`}</Typography>
      </div>
      <div>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ProjectAmount;
