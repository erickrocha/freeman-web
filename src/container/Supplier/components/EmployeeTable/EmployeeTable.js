import { makeStyles } from '@material-ui/styles';
import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Avatar,
  Typography,
  ExpansionPanelDetails,
  Grid
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import EmployeeForm from '../EmployeeForm';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.103)',
    borderRadius: '5px'
  },
  title: {
    backgroundColor: 'rgba(0, 0, 0, 0.103)'
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const EmployeeTable = props => {
  const { supplier } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const employees = supplier.employees;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {employees
        ? employees.map(emp => (
            <ExpansionPanel key={emp.id} expanded={expanded === emp.id} onChange={handleChange(emp.id)}>
              <ExpansionPanelSummary
                className={classes.title}
                expandIcon={<ExpandMore />}
                aria-controls={`employee-${emp.id}-summary`}
                id={`employee-${emp.id}-summary`}>
                <Grid container spacing={0} alignItems="center">
                  <Grid item md={1}>
                    <Avatar className={classes.orange}>{emp.name.substring(0, 1)}</Avatar>
                  </Grid>
                  <Grid item md={3}>
                    <Typography>{emp.name}</Typography>
                  </Grid>
                  <Grid item md={1}>
                    <Typography>{emp.socialSecurity}</Typography>
                  </Grid>
                  <Grid item md={1}>
                    <Typography>{emp.registerDate}</Typography>
                  </Grid>
                  <Grid item md={2}>
                    <Typography>{emp.phone}</Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>{emp.email}</Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <EmployeeForm supplier={supplier} employee={emp} onCancel={handleChange(emp.id)}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        : null}
    </div>
  );
};

export default EmployeeTable;
