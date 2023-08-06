function GithubClient(api: string, client_id: string) {
  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${client_id}`
  );
}

export default GithubClient;
