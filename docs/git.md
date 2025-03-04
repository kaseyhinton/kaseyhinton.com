### Fetch

git fetch origin <branch>

### status

git status

### Switch

git switch -c <branch> (Create new branch and switch to it)

git switch <branch> (Switch to a new branch)

### Push

git push -u origin <branch>

### Branch

##### Searching by pattern

git branch --list <pattern> (List branches matching a pattern)
git branch --list "feature/\*"

##### Browsing local and remote branches

git branch (List all local)

git branch -r (List all remotes)

git branch -a (List all local and remotes)

### Remove origin

git remote remove dokku
