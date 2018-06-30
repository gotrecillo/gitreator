import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobxPropTypes } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { observer, inject } from 'mobx-react';

@inject('usersStore')
@observer
class UserList extends Component {
  static propTypes = {
    usersStore: PropTypes.shape({
      users: MobxPropTypes.observableArrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          login: PropTypes.string.isRequired,
          avatarUrl: PropTypes.string.isRequired
        })
      )
    })
  };

  render() {
    const { usersStore } = this.props;

    const { users, selectUser } = usersStore;

    return (
      <List>
        {users.map(user => (
          <ListItem key={user.id} dense button onClick={() => selectUser(user)}>
            <Avatar alt={user.login} src={user.avatarUrl} />
            <ListItemText secondary={user.name} primary={user.login} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default UserList;
