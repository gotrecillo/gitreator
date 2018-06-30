import { GraphQLClient } from 'graphql-request';
import { of, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Documentation is at https://developer.github.com/v3/
const BASE_URL = 'https://api.github.com/graphql';

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_TOKEN}`
};

const client = new GraphQLClient(BASE_URL, {
  headers
});

const getUsersQuery = `
  query($query: String!) {
    search(type: USER, query: $query, first: 10) {
      nodes {
        ... on User {
          id
          login
          avatarUrl
          bio
          name
          starredRepositories {
            totalCount
          }
        }
      }
    }
  }
`;

const request = (query, variables = {}) =>
  from(client.request(query, variables)).pipe(
    catchError(() => of({ error: true }))
  );

export const getUsers$ = query => request(getUsersQuery, { query });
