#!/usr/bin/env bash
#
# This file is part of the serializerjs package.
#
# (c) HAIRCVT <tfidry@haircvt.com>
#
# For the full copyright and license information, please view the LICENSE
# file that was distributed with this source code.
#

#
# Functions for publishing docs to GitHub Pages
#

publishToGithubPages() {
  isDeployBuild
  if [[ 0 = "$?" ]]; then
    log "Skipped"

    return 0
  fi

  log "Retrieving GitHub Pages website"
  if [[ -z "$GITHUB_PAGES_REMOTE" ]]; then
    log "Could not retrieve GitHub Pages website. Abort GitHub Pages deployment" --error

    return 1;
  fi
  git clone "$GITHUB_PAGES_REMOTE" gh-pages --branch=gh-pages --single-branch

  log "Generating the ESDoc"
  echo "npm run doc"
  npm run doc

  log "Publishing artefacts to GitHub Pages"
  echo "rm -rf gh-pages/*"
  rm -rf gh-pages/*
  echo "mv -f dist/doc gh-pages"
  mv -f dist/doc/* gh-pages

  cd gh-pages
  git add --all
  git commit --quiet --message "$GITHUB_PAGES_COMMIT_MESSAGE"
  git push --force --quiet origin gh-pages
  cd ..

  log "Done" --success
}

export -f publishToGithubPages
