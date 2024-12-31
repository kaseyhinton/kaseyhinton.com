#!/bin/bash

# Set debugging

set -x

PUBLISHER="No Starch Press"

set +x

echo "${PUBLISHER}"

unset PUBLISHER

echo "${PUBLISHER}"

# Local variable set to output of a command

print_home_directory_contents() {
    echo "HOME DIRECTORY CONTENTS"
    echo -e "_______________________ \n"
    local home_dir=$(ls ~)
    echo "${home_dir}"
    echo -e "_______________________ \n"
}

print_home_directory_contents

# Math

let result="4 * 5"
echo "${result}"

result2=$((5 * 5))
echo "${result2}"

# Arrays

IPADDRESSES=(192.168.0.1, 192.168.0.2, 192.168.0.3)

# remove last
unset IPADDRESSES[2]

# modify first
IPADDRESSES[0]="192.168.0.0"

echo "FIRST: ${IPADDRESSES[0]}"
echo "ALL: ${IPADDRESSES[*]}"

# Control operators

# & Sends command to background
# && logical AND. Only executes if the first command eval true
# ( ) used for grouping
# ; List terminator - will continue once previous command finishes whether prev was true or not
# ;; ends a case statement
# | Redirects the ouput of a command as input to another command
# || Logical OR. Second command will run if first evaluates to false

# Sleep 2 seconds
sleep 2 &

echo "Creating test file"
touch test123.txt && touch test1234.txt

echo "$(
    pwd
    ls
)"

sleep 1

echo "Deleting test file"
rm test123.txt
rm test1234.txt

echo -e "_______________________ \n"

echo "$(
    pwd
    ls
)"

#lzl || echo "lzl command has failed"

# output stdout
ls -l / 1>output.txt

# output stderr
lzl 2>stderr.txt

# cat <output.txt

cat <<EOF
Hey Hey
Boo Boo
EOF

ls -l / | grep "bin"
