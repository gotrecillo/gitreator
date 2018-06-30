import { observable, action } from 'mobx';
import { Subject, of } from 'rxjs';
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
        filter(x => !x.error),
        map(this.extractUsersFromResponse)
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
  handleSearchUserErrors = error => {
    this.error = 'There was a problem in the server, please try again';
    return of({ error: true });
  };

  @action
  selectUser = user => {
    this.filter = user.login;
    this.users = [];
  };

  extractUsersFromResponse = response =>
    response.search.nodes.filter(node => node.id);
}

export default UsersStore;
