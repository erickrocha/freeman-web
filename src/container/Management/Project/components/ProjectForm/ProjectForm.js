import React, { useState } from 'react';
import { Add } from '@material-ui/icons';
import { TextField, IconButton, Chip, Card, CardHeader, CardContent, CardActions, Grid } from '@material-ui/core';
import { FormFooter } from 'components';
import { updateObject, findOne } from 'shared/utility';
import { makeStyles } from '@material-ui/styles';
import { defaultStyle } from 'common/form.style';
import { useSelector, useDispatch } from 'react-redux';
import * as service from 'store/events/project/index';

const useStyle = makeStyles(theme => {
  const base = defaultStyle(theme);
  return updateObject(base, {
    inputPhaseBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& input': {
        minWidth: '80%',
        marginRight: 35
      }
    },
    phases: {
      minHeight: 200,
      border: '1px solid rgba(0, 0, 0, 0.103)',
      padding: theme.spacing(1),
      lineHeight: 2
    },
    chip: {
      marginLeft: 3
    }
  });
});

const ProjectForm = props => {
  const { project, onCancel } = props;
  const owners = useSelector(state => state.app.owners);
  const managers = useSelector(state => state.app.managers);

  const [name, setName] = useState(project.name || '');
  const [code, setCode] = useState(project.code || '');
  const [manager, setManager] = useState(project.manager ? project.manager.id : '');
  const [owner, setOwner] = useState(project.owner ? project.owner.id : '');
  const [phase, setPhase] = useState('');
  const [phases, setPhases] = useState(project.phases || []);

  const classes = useStyle();

  const addPhase = () => {
    if (phase !== '') {
      setPhases([...phases, phase]);
      setPhase('');
    }
  };

  const deletePhase = index => {
    setPhases([...phases.filter(value => phases.indexOf(value) !== index)]);
  };

  const dispatcher = useDispatch();
  const submit = e => {
    e.preventDefault();
    const newProject = updateObject(project, {
      name: name,
      code: code,
      manager: findOne(managers, manager),
      owner: findOne(owners, owner),
      phases: phases
    })
    dispatcher(service.save(newProject));
  };

  return (
    <form autoComplete="off" noValidate onSubmit={e => submit(e)}>
      <Card>
        <CardHeader title="Project" />
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
            <Grid item md={12}><TextField
              fullWidth
              label="code"
              margin="dense"
              name="code"
              required
              value={code}
              onChange={e => setCode(e.target.value)}
              variant="outlined"
            /></Grid>
            <Grid item md={12}><TextField
              fullWidth
              label="Project manager"
              margin="dense"
              name="manager"
              required
              value={manager}
              onChange={e => setManager(e.target.value)}
              select
              // eslint-disable-next-line react/jsx-sort-props
              SelectProps={{ native: true }}
              variant="outlined">
              <option key="Empty" value="Empty">Select the project manager</option>
              {managers.map(manager => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </TextField></Grid>
            <Grid item md={12}><TextField
              fullWidth
              label="Owner"
              margin="dense"
              name="owner"
              required
              value={owner}
              onChange={e => setOwner(e.target.value)}
              select
              // eslint-disable-next-line react/jsx-sort-props
              SelectProps={{ native: true }}
              variant="outlined">
              <option key="Empty" value="Empty">Select the Project Owner</option>
              {owners.map(owner => (
                <option key={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </TextField></Grid>
            <Grid item md={12}>
              <div className={classes.inputPhaseBox}>
                <TextField
                  fullWidth
                  label="Phase"
                  margin="dense"
                  name="phase"
                  required
                  value={phase}
                  onChange={e => setPhase(e.target.value)}
                  variant="outlined"
                />
                <IconButton color="primary" size="small" variant="contained" onClick={() => addPhase()}>
                  <Add fontSize="inherit" />
                </IconButton>
              </div>
            </Grid>
            <Grid item md={12}><div className={classes.phases}>
              {phases
                ? phases.map((phase, index) => (
                  <Chip
                    className={classes.chip}
                    key={index}
                    size="small"
                    onDelete={() => deletePhase(index)}
                    label={phase}
                    color="primary"
                  />
                ))
                : null}
            </div></Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <FormFooter onCancel={onCancel} />
        </CardActions>
      </Card>
    </form>
  );
};

export default ProjectForm;
