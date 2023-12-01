import React from 'react';
import { Grid, TextField, Fab } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const TeamSearch = props => {
  const {managers, techLeads, params, setParams, onQuery } = props;

  return (
    <Grid container spacing={2}>
      <Grid item md={3} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Name"
          value={params.name}
          onChange={e => setParams(state => ({ ...state, name: e.target.value }))}
          margin="dense"
          name="name"
          variant="outlined"
        />
      </Grid>
      <Grid item md={3} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Team Manager"
          margin="dense"
          name="manager"
          value={params.manager}
          select
          // eslint-disable-next-line react/jsx-sort-props
          SelectProps={{ native: true }}
          variant="outlined"
          onChange={e => setParams(state => ({ ...state, manager: e.target.value }))}>
          <option key="empty" value=""></option>
          {managers.map(manager => (
            <option key={manager.id} value={manager.id}>
              {manager.name}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item md={3} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Tech Lead"
          margin="dense"
          name="techLead"
          value={params.techLead}
          select
          // eslint-disable-next-line react/jsx-sort-props
          SelectProps={{ native: true }}
          variant="outlined"
          onChange={e => setParams(state => ({ ...state, techLead: e.target.value }))}>
          <option key="empty" value=""></option>
          {techLeads.map(techLead => (
            <option key={techLead.id} value={techLead.id}>
              {techLead.name}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item md={2} sm={12} xs={12}>
        <TextField
          fullWidth
          label="Member"
          value={params.member}
          onChange={e => setParams(state => ({ ...state, member: e.target.value }))}
          margin="dense"
          name="phase"
          variant="outlined"
        />
      </Grid>
      <Grid item md={1} xs={12} container direction="row" justify="flex-end" alignItems="center">
        <Fab color="primary" aria-label="add" onClick={() => onQuery()} size="medium">
          <Search />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default TeamSearch;
