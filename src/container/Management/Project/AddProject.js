import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { findOne } from 'shared/utility';
import { BreadCrumb } from 'components';
import { Redirect } from 'react-router';
import { ProjectForm } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    }
}))

const AddProject = props => {
    const { history, match } = props;

    const classes = useStyles();
    const projectId = match.params.id;

    const data = useSelector(state => state.project.data);

    const project = findOne(data, projectId) || {};

    const cancel = () => {
        history.goBack();
    };

    const saved = useSelector(state => state.project.saved);
    if (!saved) {
        return (
            <div className={classes.root}>
                <BreadCrumb
                    label="Add"
                    tree={[
                        { href: '/', label: 'Home' },
                        { href: '/management/project', label: 'Projects' }
                    ]}
                />
                <ProjectForm project={project} onCancel={cancel} />
            </div>
        );
    } else {
        return <Redirect to="/management/project" />;
    }
}

export default AddProject;