import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Documentation is at https://developer.github.com/v3/
const BASE_URL = 'https://api.github.com';

export const getUsers$ = query =>
  ajax(`${BASE_URL}/search/users?q=${query}&per_page=10`).pipe(catchError(of));

// `${BASE_URL}/users/${username}/repos?per_page=250`;

// export const getUserData = username => {
//   return axios
//     .all([
//       axios.get(`${BASE_URL}/users/${username}`),
//       axios.get(`${BASE_URL}/users/${username}/orgs`),
//     ])
//     .then(([user, orgs]) => ({
//       user: user.data,
//       orgs: orgs.data,
//     }));
// };
