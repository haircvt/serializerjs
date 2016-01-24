# Contributing

First of all, thank you for contributing, you are awesome! To have your code integrated in the project, there is some
(easy) rules to follow.


## Reporting bugs

If you happen to find a bug, we kindly request you to report it. However, before submitting it, please:

  * Check [the documentation](README.md)

Then, if it appears that it's a real bug, you may report it using GitHub by following these 3 points:

  * Check if the bug is not already reported! (See [the issues list][1]
  * Give a clear title to resume the issue
  * Give a description of the usage (environment, version) and the steps needed to reproduce the bug


## Pull requests (PR)

### Matching coding standards

Do not forget to run `npm run lint` before pushing to check any style code issues! An additional check is done on a PR
basis too, so the PR will not pass unless the code comply to those rules.

Also all files have the following copyright:

```
/*
 * This file is part of the serializerjs package.
 *
 * (c) HAIRCVT <tfidry@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
```

### Sending a Pull Request

When you send a PR, just make sure that:

* The code comply to the project coding standards
* You add valid test cases ([Mocha][2] and [Chai][3] with [assert][4])
* Tests are green
* The documentation is updated
* Squash your commits into one commit. (see the next chapter)


## Squash your commits

If you have 3 commits. So start with:

```bash
git rebase -i HEAD~3
```

An editor will be opened with your 3 commits, all prefixed by `pick`.

Replace all `pick` prefixes by `fixup` (or `f`) **except the first commit** of the list.

Save and quit the editor.

After that, all your commits where squashed into the first one and the commit message of the first commit.

If you would like to rename your commit message type:

```bash
git commit --amend
```

Now force push to update your PR:

```bash
git push --force
```

## License and copyright attribution

When you open a Pull Request to the project, you agree to license your code under the [MIT license](LICENSE)
and to transfer the copyright on the submitted code to HAIRCVT (pronounced "haircut").

Be sure to you have the right to do that (if you are a professional, ask your company)!

If you include code from another project, please mention it in the Pull Request description and credit the original author.

[Back to Overview](http://haircvt.github.io/serializerjs/manual/overview.html)

[1]: https://github.com/haircvt/serializerjs/issues
[2]: https://mochajs.org/
[3]: http://chaijs.com/
[4]: http://chaijs.com/api/assert/
