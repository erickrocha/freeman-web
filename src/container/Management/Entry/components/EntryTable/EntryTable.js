import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import EntryBody from './EntryBody';

const useStyle = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  username: {
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'flex-start'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginLeft: 10
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textTransform: 'capitalize'
  },
  card: {
    minWidth: 225
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

const EntryTable = props => {
  const { entries, startDate, endDate } = props;
  const classes = useStyle();
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      {entries.map(userEntry => {
        return (
          <Accordion
            key={userEntry.userId}
            expanded={expanded === userEntry.userId}
            onChange={handleChange(userEntry.userId)}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel-${userEntry.id}-content`}
              id={`panel-${userEntry.id}-header`}
              className={classes.row}>
              <div className={classes.username}>
                <Avatar alt="Person" className={classes.avatar} src={userEntry.avatar} />
                <Typography className={classes.heading}>{userEntry.name}</Typography>
              </div>
              <Typography className={classes.secondaryHeading}>{`From: ${startDate} until: ${endDate}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <EntryBody userEntry={userEntry} startDate={startDate} endDate={endDate} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default EntryTable;
