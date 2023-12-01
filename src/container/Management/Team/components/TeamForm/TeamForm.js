import React, { useState } from 'react';
import { updateObject, findOne } from 'shared/utility';
import { TextField, Card, CardHeader, CardContent, CardActions, Grid } from '@material-ui/core';
import { FormFooter } from 'components';
import TeamMember from '../TeamMember';
import { useSelector, useDispatch } from 'react-redux';
import * as service from 'store/events/management/team/index';


const TeamForm = props => {
  const { team, onCancel } = props;
  const managers = useSelector(state => state.app.managers);
  const players = useSelector(state => state.app.players);

  const [name, setName] = useState(team.name || '');
  const [manager, setManager] = useState(team.manager ? team.manager.id : '');
  const [techLead, setTechLead] = useState(team.techLead ? team.techLead.id : '');
  const [members, setMembers] = useState(team.members || []);

  const dispatcher = useDispatch();
  const submit = e => {
    e.preventDefault();
    const newTeam = updateObject(team, {
      name: name,
      manager: findOne(managers, manager),
      techLead: findOne(players, techLead),
      members: members
    })
    dispatcher(service.save(newTeam));
  };

  return (
    <form autoComplete="off" noValidate onSubmit={e => submit(e)}>
      <Card>
        <CardHeader title="Team" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12}><TextField
              fullWidth
              label="Name"
              margin="dense"
              name="name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              variant="outlined"
            /></Grid>
            <Grid item md={12}> <TextField
              fullWidth
              label="Team manager"
              margin="dense"
              name="manager"
              required
              value={manager}
              onChange={e => setManager(e.target.value)}
              select
              // eslint-disable-next-line react/jsx-sort-props
              SelectProps={{ native: true }}
              variant="outlined">
              <option key="Empty" value="Empty">
                Select the Team manager
          </option>
              {managers.map(manager => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </TextField></Grid>
            <Grid item md={12}><TextField
              fullWidth
              label="Tech Lead"
              margin="dense"
              name="manager"
              required
              value={techLead}
              onChange={e => setTechLead(e.target.value)}
              select
              // eslint-disable-next-line react/jsx-sort-props
              SelectProps={{ native: true }}
              variant="outlined">
              <option key="Empty" value="Empty">
                Select the Team Tech Lead
          </option>
              {players.map(player => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </TextField></Grid>
            <Grid item md={12}><TeamMember players={players} members={members} setMembers={setMembers} /></Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <FormFooter onCancel={onCancel} />
        </CardActions>
      </Card>
    </form>
  );
};

export default TeamForm;
