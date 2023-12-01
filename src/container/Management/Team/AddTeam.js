import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { findOne } from 'shared/utility';
import { BreadCrumb } from 'components';
import { Redirect } from 'react-router';
import { TeamForm } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    }
}))

const AddTeam = props => {
    const { history, match } = props;

    const classes = useStyles();
    const teamId = match.params.id;

    const data = useSelector(state => state.team.data);

    const team = findOne(data, teamId) || {};

    const cancel = () => {
        history.goBack();
    };

    const saved = useSelector(state => state.team.saved);
    if (!saved) {
        return (
            <div className={classes.root}>
                <BreadCrumb
                    label="Add"
                    tree={[
                        { href: '/', label: 'Home' },
                        { href: '/management/team', label: 'Teams' }
                    ]}
                />
                <TeamForm team={team} onCancel={cancel} />
            </div>
        );
    } else {
        return <Redirect to="/management/team" />;
    }
}

export default AddTeam;