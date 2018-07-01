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

const repositoryInfoFragment = `
  fragment repositoryInfo on Repository {
    id
    name
    updatedAt
    url
    description
    languages(first: 1) {
      nodes {
        color
        id
        name
      }
    }
    stargazers {
      totalCount
    }
    forkCount
  }
`;

const userInfoFragment = `
  fragment userInfo on User {
    id
    login
    avatarUrl
    bio
    name
  }
`;

const getUsersQuery = `
  query($query: String!) {
    search(type: USER, query: $query, first: 10) {
      nodes {
        ... on User {
          ...userInfo
        }
      }
    }
  }
  ${userInfoFragment}
`;

const getDetailsQuery = `
  query($user: String!) {
    user(login: $user) {
      ...userInfo
      starredRepositories(first: 100) {
        nodes {
          ...repositoryInfo
        }
      }
      organizations(first: 100) {
        nodes {
          id
          avatarUrl
          name
          description
          url
          websiteUrl
          members {
            totalCount
          }
        }
      }
      repositories(first: 100) {
        nodes {
          ...repositoryInfo
        }
      }
    }
  }
  ${userInfoFragment}
  ${repositoryInfoFragment}
`;

const request = (query, variables = {}) =>
  from(client.request(query, variables)).pipe(
    catchError(() => of({ error: true }))
  );

export const getUsers$ = query => request(getUsersQuery, { query });
export const getUserDetails$ = user => request(getDetailsQuery, { user });
