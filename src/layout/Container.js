import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    padding: '1em',
    maxWidth: '1000px',
    margin: '0 auto'
  }
});

const Container = ({ classes, children }) => (
  <div className={classNames(classes.container)}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Container);
