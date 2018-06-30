import { observable, action } from 'mobx';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter,
  tap,
  map
} from 'rxjs/operators';
import { getUsers$ } from '../api';

class UsersStore {
  constructor() {
    this.search$ = new Subject();

    this.search$
      .pipe(
        tap(this.clearUsers),
        debounceTime(300),
        distinctUntilChanged(),
        filter(x => x.length > 0),
        tap(this.startSearching),
        switchMap(getUsers$),
        tap(this.stopSearching),
        tap(this.handleSearchUserErrors),
        map(response => response.search.nodes.filter(node => node.id))
      )
      .subscribe(this.setUsers);
  }

  @observable users = [];
  @observable loading = false;
  @observable error = false;
  @observable filter = '';

  @action
  startSearching = () => {
    this.loading = true;
    this.error = false;
    this.users = [];
  };

  @action stopSearching = () => (this.loading = false);

  @action
  search = filter => {
    this.filter = filter;
    this.search$.next(filter);
  };

  @action setUsers = users => (this.users = users);

  @action clearUsers = () => (this.users = []);

  @action
  handleSearchUserErrors = response => {
    if (response.status !== 403) {
      this.error = 'API limit reached, try again in one minute';
    }
  };

  @action
  selectUser = user => {
    this.filter = user.login;
    this.users = [];
  };
}

export default UsersStore;
