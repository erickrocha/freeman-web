import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { BreadCrumb } from 'components';
import { Redirect, useHistory } from 'react-router';
import { findOne } from 'shared/utility';
import { UserForm } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    }
}))

const AddUser = props => {
    const { match } = props;
    const classes = useStyles();
    const history = useHistory();

    const userId = match.params.id;

    const data = useSelector(state => state.user.data);

    const user = findOne(data, userId) || {};

    const cancel = () => {
        history.goBack();
    };

    const saved = useSelector(state => state.user.saved);
    if (!saved) {
        return (
            <div className={classes.root}>
                <BreadCrumb
                    label="Add"
                    tree={[
                        { href: '/', label: 'Home' },
                        { href: '/security/users', label: 'Users' }
                    ]}
                />
                <UserForm user={user} onCancel={cancel} />
            </div>
        );
    } else {
        return <Redirect to='/security/users' />;
    }
}

export default AddUser;