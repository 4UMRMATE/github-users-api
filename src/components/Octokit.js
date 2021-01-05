import { Octokit } from "@octokit/core";

// Your auth key here ( REACT_APP_PERSONAL_KEY )
const octokit = new Octokit({
  auth: `${process.env.REACT_APP_PERSONAL_KEY}`,
});

export default octokit;
