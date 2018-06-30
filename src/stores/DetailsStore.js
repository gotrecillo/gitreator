// import { observable, action } from 'mobx';
// import { Subject } from 'rxjs';
// import {
//   debounceTime,
//   distinctUntilChanged,
//   switchMap,
//   filter,
//   tap,
// } from 'rxjs/operators';
// import { getUserDetails$ } from '../api';
//
// class DetailsStore {
//   constructor() {
//     this.search$ = new Subject();
//
//     this.search$
//       .pipe(
//         debounceTime(300),
//         distinctUntilChanged(),
//         filter(x => x.length > 0),
//         tap(this.startSearching),
//         switchMap(getUserDetails$),
//         tap(this.stopSearching)
//       )
//       .subscribe(this.setUser);
//   }
//
//   @observable user = {};
//   @observable loading = false;
//   @observable error = false;
//
//   @action
//   startSearching = () => {
//     this.loading = true;
//     this.error = false;
//   };
//
//   @action stopSearching = () => (this.loading = false);
//
//   @action
//   setUser = user => {
//     this.user = user;
//     this.loading = false;
//   };
// }
//
// export default DetailsStore;
