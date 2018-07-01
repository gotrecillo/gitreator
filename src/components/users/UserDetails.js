import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LinearProgress from '@material-ui/core/LinearProgress';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Repositories from '../repositories/Repositories';

const styles = theme => ({
  card: {
    marginTop: '2em'
  }
});

@inject('detailsStore')
@observer
class UserDetails extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    detailsStore: PropTypes.shape({
      tab: PropTypes.number.isRequired,
      changeTab: PropTypes.func.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        login: PropTypes.string,
        avatarUrl: PropTypes.string,
        bio: PropTypes.string,
        isEmpty: PropTypes.bool
      })
    })
  };

  render() {
    const { detailsStore, classes } = this.props;

    const {
      user,
      isEmpty,
      loading,
      tab,
      changeTab,
      repositories,
      starredRepositories
    } = detailsStore;

    if (isEmpty) {
      return null;
    }

    return (
      <Card className={classNames(classes.card)}>
        {loading && <LinearProgress />}
        <CardHeader
          avatar={<Avatar src={user.avatarUrl} />}
          title={user.login}
          subheader={user.name}
        />
        {user.bio && (
          <CardContent>
            <Typography variant="subheading" gutterBottom>
              {user.bio}
            </Typography>
          </CardContent>
        )}
        <AppBar position="static">
          <Tabs value={tab} onChange={(event, value) => changeTab(value)}>
            <Tab label="Repositories" />
            <Tab label="Organizations" />
            <Tab label="Stars" />
          </Tabs>
        </AppBar>
        {!loading && (
          <div>
            {tab === 0 && <Repositories repositories={repositories} />}
            {tab === 2 && <Repositories repositories={starredRepositories} />}
          </div>
        )}
      </Card>
    );
  }
}

export default withStyles(styles)(UserDetails);
