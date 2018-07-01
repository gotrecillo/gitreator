import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobxPropTypes } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Repository from './Repository';

const styles = theme => ({
  repositories: {
    padding: '1.5em'
  }
});

class Repositories extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    repositories: PropTypes.oneOfType([
      PropTypes.array,
      MobxPropTypes.observableArray
    ])
  };

  render() {
    const { repositories, classes } = this.props;

    if (!repositories) {
      return null;
    }

    return (
      <div className={classNames(classes.repositories)}>
        {repositories.map(repository => (
          <Repository key={repository.id} repository={repository} />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Repositories);
