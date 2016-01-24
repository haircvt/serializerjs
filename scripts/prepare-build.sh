#!/usr/bin/env bash
#
# Functions for publishing and deploying artifacts
#

setupDeployment() {
  isDeployBuild
  if [[ 0 = "$?" ]]; then
    log "No deployment scheduled for this build"

    return 0;
  fi

  log "Setting up deployment configuration";

  log "Setting Git user configuration";
  if [[ -z "$GITHUB_USER_NAME" ]] || [[ -z "$GITHUB_USER_EMAIL" ]]; then
    log "Could not configure Git user" --error
  else
    echo "    user: $GITHUB_USER_NAME"
    echo "    temail: $GITHUB_USER_EMAIL"

    git config --global user.name "$GITHUB_USER_NAME"
    git config --global user.email "$GITHUB_USER_EMAIL"
  fi

  log "Done" --success
}

export -f setupDeployment
