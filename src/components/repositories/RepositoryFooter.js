import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import RepositoryLanguage from './RepositoryLanguage';

const styles = theme => ({
  footer: {
    marginTop: '1em'
  },
  stat: {
    float: 'right',
    marginLeft: '2em'
  }
});

class RepositoryFooter extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    stars: PropTypes.number.isRequired,
    forks: PropTypes.number.isRequired,
    updatedAt: PropTypes.any,
    language: PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string
    })
  };

  render() {
    const { stars, forks, updatedAt, classes, language } = this.props;

    const fromNow = moment(updatedAt).fromNow();

    return (
      <Typography variant="caption" className={classNames(classes.footer)}>
        <RepositoryLanguage language={language} />
        Updated: {fromNow}
        <span className={classNames(classes.stat)}>
          {forks} <i className="fa fa-code-branch" />
        </span>
        <span className={classNames(classes.stat)}>
          {stars} <i className="fa fa-star" />
        </span>
      </Typography>
    );
  }
}

export default withStyles(styles)(RepositoryFooter);
