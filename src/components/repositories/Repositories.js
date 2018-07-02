import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobxPropTypes } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Repository from './Repository';
import EmptyList from '../EmptyList';

const styles = theme => ({
  repositories: {
    padding: '1.5em'
  }
});

class Repositories extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    repositories: PropTypes.oneOfType([
      PropTypes.array,
      MobxPropTypes.observableArray
    ])
  };

  render() {
    const { title, repositories, classes } = this.props;

    if (!repositories.length) {
      return <EmptyList objects={title} />;
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
