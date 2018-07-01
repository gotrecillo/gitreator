import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  language: {
    marginRight: '1em'
  },
  bullet: {
    position: 'relative',
    top: '1px',
    display: 'inline-block',
    width: '12px',
    height: '12px',
    marginRight: '2px',
    borderRadius: '50%'
  }
});

class RepositoryLanguage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    language: PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string
    })
  };

  render() {
    const { language, classes } = this.props;

    if (!language) {
      return null;
    }

    return (
      <span className={classNames(classes.language)}>
        <span
          className={classNames(classes.bullet)}
          style={{ backgroundColor: language.color }}
        />
        {language.name}
      </span>
    );
  }
}

export default withStyles(styles)(RepositoryLanguage);
