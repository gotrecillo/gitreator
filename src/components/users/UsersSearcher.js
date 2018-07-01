import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import UserList from './UsersList';

const styles = theme => ({
  card: {
    padding: '0.5em'
  }
});

@inject('usersStore', 'detailsStore')
@observer
class UsersSearcher extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    usersStore: PropTypes.shape({
      search: PropTypes.func.isRequired,
      loading: PropTypes.bool.isRequired,
      filter: PropTypes.string.isRequired
    }),
    detailsStore: PropTypes.shape({
      clear: PropTypes.func.isRequired
    })
  };

  onChange = e => {
    const { usersStore, detailsStore } = this.props;

    const query = e.target.value;

    detailsStore.clear();
    usersStore.search(query);
  };

  render() {
    const { classes, usersStore } = this.props;

    const { loading, filter } = usersStore;

    return (
      <div>
        <Card>
          {loading && <LinearProgress />}
          <div className={classNames(classes.card)}>
            <TextField
              id="query"
              label="User:"
              fullWidth
              onChange={this.onChange}
              value={filter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <UserList />
          </div>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(UsersSearcher);
