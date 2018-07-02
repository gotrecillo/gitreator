import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    margin: '1em 0'
  },
  title: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  },
  stat: {
    marginLeft: '2em'
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5em'
  },
  websiteUrl: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
});

class Organization extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    organization: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string,
      websiteUrl: PropTypes.string,
      members: PropTypes.shape({
        totalCount: PropTypes.number.isRequired
      })
    })
  };

  render() {
    const { organization, classes } = this.props;

    const {
      name,
      description,
      url,
      avatarUrl,
      websiteUrl,
      members
    } = organization;

    return (
      <Card className={classNames(classes.card)}>
        <CardContent>
          <div className={classNames(classes.head)}>
            <Avatar src={avatarUrl} />
            <Typography variant="caption">
              {websiteUrl && (
                <span className={classNames(classes.stat)}>
                  <a
                    className={classNames(classes.websiteUrl)}
                    href={websiteUrl}
                    target="_blank"
                  >
                    {websiteUrl}
                  </a>
                </span>
              )}
              <span className={classNames(classes.stat)}>
                {members.totalCount} <i className="fa fa-users" />
              </span>
            </Typography>
          </div>
          <Typography variant="subheading">
            <a className={classNames(classes.title)} href={url} target="_blank">
              {name}
            </a>
          </Typography>
          <Typography variant="caption">{description}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Organization);
