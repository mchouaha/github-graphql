
export const REPOSITORIES = `
query {
    user(login: "mchouaha") {
     avatarUrl
      repositories (first: 15){
        nodes {
          id
          name
          description
          url
          stargazers {
           totalCount
          }
          forks {
            totalCount
          }
        }
      }
    }
  }
` 