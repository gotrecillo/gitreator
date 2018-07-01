import { observable, action, computed } from 'mobx';
import { Subject } from 'rxjs';
import { switchMap, filter, tap, map } from 'rxjs/operators';
import { getUserDetails$ } from '../api';

class DetailsStore {
  constructor() {
    this.search$ = new Subject();

    this.search$
      .pipe(
        filter(xs => xs.length),
        tap(this.startSearching),
        switchMap(getUserDetails$),
        tap(this.stopSearching),
        filter(x => !x.error),
        map(this.extractUserFromResponse)
      )
      .subscribe(this.setUser);
  }

  @observable user = {};
  @observable loading = false;
  @observable error = false;
  @observable tab = 0;

  @action
  startSearching = () => {
    this.loading = true;
    this.error = false;
  };

  @action stopSearching = () => (this.loading = false);

  @action
  setUser = user => {
    this.user = user;
    this.loading = false;
  };

  @action
  fetchDetails = login => {
    this.loading = true;
    this.search$.next(login);
  };

  @action
  clear = () => {
    this.user = {};
    this.loading = false;
    this.error = false;
    this.tab = 0;
  };

  @action changeTab = tab => (this.tab = tab);

  @computed
  get isEmpty() {
    return !this.user.id;
  }

  @computed
  get repositories() {
    return this.user.repositories ? this.user.repositories.nodes : [];
  }

  @computed
  get starredRepositories() {
    return this.user.starredRepositories
      ? this.user.starredRepositories.nodes
      : [];
  }

  extractUserFromResponse = x => x.user;
}

export default DetailsStore;
