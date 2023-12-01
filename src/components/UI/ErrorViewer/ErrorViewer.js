import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Wrapper from 'hoc/Wrapper/Wrapper';

const ErrorViewer = props => {
  const { error } = props;

  const [open, setOpen] = useState(props.error ? true : false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <Wrapper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={onClose}
        open={open}
        message="Ops! Something wrong">
        {error
          ? error.messages.map(msg => {
              switch (msg.severity) {
                case 'ERROR':
                  return (
                    <Alert variant="filled" severity="error">
                      {msg.message}
                    </Alert>
                  );
                case 'WARN':
                  return (
                    <Alert variant="filled" severity="warning">
                      {msg.message}
                    </Alert>
                  );
                case 'INFO':
                  return (
                    <Alert variant="filled" severity="info">
                      {msg.message}
                    </Alert>
                  );
                default:
                  return (
                    <Alert variant="filled" severity="success">
                      Success
                    </Alert>
                  );
              }
            })
          : null}
      </Snackbar>
    </Wrapper>
  );
};

export default ErrorViewer;
