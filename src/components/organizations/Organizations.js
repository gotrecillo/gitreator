import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobxPropTypes } from 'mobx-react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Organization from './Organization';
import EmptyList from '../EmptyList';

const styles = theme => ({
  organizations: {
    padding: '1.5em'
  }
});

@inject('detailsStore')
@observer
class Organizations extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    detailsStore: PropTypes.shape({
      organizations: PropTypes.oneOfType([
        PropTypes.array,
        MobxPropTypes.observableArray
      ])
    })
  };

  render() {
    const { detailsStore, classes } = this.props;

    const { organizations } = detailsStore;

    if (!organizations.length) {
      return <EmptyList objects="organizations" />;
    }

    return (
      <div className={classNames(classes.organizations)}>
        {organizations.map(organization => (
          <Organization key={organization.id} organization={organization} />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Organizations);
