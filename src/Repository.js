import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobxPropTypes } from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import RepositoryFooter from './RepositoryFooter';

const styles = theme => ({
  card: {
    margin: '1em 0'
  },
  title: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
});

class Repository extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    repository: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
      stargazers: PropTypes.shape({
        totalCount: PropTypes.number.isRequired
      }),
      forkCount: PropTypes.number.isRequired,
      languages: PropTypes.shape({
        nodes: MobxPropTypes.observableArrayOf(
          PropTypes.shape({
            color: PropTypes.string,
            name: PropTypes.string
          })
        )
      })
    })
  };

  render() {
    const { repository, classes } = this.props;

    const {
      name,
      url,
      description,
      stargazers,
      updatedAt,
      forkCount,
      languages
    } = repository;

    const language = languages.length ? languages.nodes[0] : undefined;

    return (
      <Card className={classNames(classes.card)}>
        <CardContent>
          <Typography variant="subheading">
            <a className={classNames(classes.title)} href={url} target="_blank">
              {name}
            </a>
          </Typography>
          <Typography variant="caption">{description}</Typography>
          <RepositoryFooter
            stars={stargazers.totalCount}
            updatedAt={updatedAt}
            forks={forkCount}
            language={language}
          />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Repository);
