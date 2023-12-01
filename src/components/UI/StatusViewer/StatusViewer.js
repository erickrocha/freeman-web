import React from 'react';
import './StatusViewer.scss';

const StatusViewer = props => {
  let styles = '';
  if (props.status instanceof String) {
    styles = props.status === 'ACTIVE' ? 'StatusViewer OK' : 'StatusViewer Disabled';
  }
  if (props.status instanceof Boolean) {
    styles = props.status ? 'StatusViewer OK' : 'StatusViewer Disabled';
  }
  return <div className={styles}></div>;
};

export default StatusViewer;
