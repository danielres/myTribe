#!/bin/bash

#
# Author:       SuperPaintman <SuperPaintmanDeveloper@gmail.com>
#

###
# Constants
###
RETVAL=0

CCYAN=$(printf '\033[0;36m')
CGREEN=$(printf '\033[0;32m')
CBLUE=$(printf '\033[0;34m')
CGRAY=$(printf '\033[1;30m')
CRED=$(printf '\033[0;31m')
CNC=$(printf '\033[0m')

###
# Packages
###
node_script_dependencies=$(cat <<EOF
'use strict';
var p = require('./package.json');

var deps = [];
for (var packageName in p.dependencies) {
    var packageV = p.dependencies[packageName];
    deps.push(packageName + '@' + packageV);
}

console.log(deps.join(';'));
EOF
)

node_script_devDependencies=$(cat <<EOF
'use strict';
var p = require('./package.json');

var deps = [];
for (var packageName in p.devDependencies) {
    var packageV = p.devDependencies[packageName];
    deps.push(packageName + '@' + packageV);
}

console.log(deps.join(';'));
EOF
)

# Help
show_help () {
    echo -e "${CCYAN}Usage${CNC}: $0 {development|production|all} (or null)"
    echo -e "${CCYAN}Example${CNC}:"
    echo -e "  ${CGREEN}$0${CNC} production     ${CGRAY}# install npm production dependencies${CNC}"
    echo -e "  ${CGREEN}$0${CNC} development    ${CGRAY}# install npm development dependencies${CNC}"
    echo -e "  ${CGREEN}$0${CNC} all            ${CGRAY}# install npm all dependencies${CNC}"
    echo -e "  ${CGREEN}$0${CNC}                ${CGRAY}# install npm all dependencies${CNC}"
    echo -e ""
    echo -e "${CCYAN}Options${CNC}:"
    echo -e "  ${CGREEN}-s${CNC}, ${CGREEN}--silent${CNC} ${CGRAY}            # silent mode (don't output NPM log)${CNC}"
    echo -e "  ${CGREEN}-h${CNC}, ${CGREEN}--help${CNC}   ${CGRAY}            # print help${CNC}"
}

# Flags
flag_silent=false
args=()
for arg in "$@"; do
    case $arg in
        -s|--silent)
            flag_silent=true
            ;;
        -h|--help)
            show_help
            exit $RETVAL
            ;;
        -*|--*)
            echo -e "${CRED}Unrecognized argument:${CNC} $arg"
            exit 1
            ;;
        *)
            args+=("$arg")
            ;;
    esac
done

# npm install --only=production
node_dependencies_str=$(node -e "$node_script_dependencies")
# npm install --only=dev
node_devDependencies_str=$(node -e "$node_script_devDependencies")


###
# LazyInstall
#
# params:
#   $1 {String} - array of packages joined with ";"
###
npm_f3_install () {
    local dependencies=$1

    local array=(${dependencies//;/ })
    for element in "${array[@]}"; do
        local color_element=$(echo "$element" | sed "s/^\(.\+\)@\(.\+\)\$/${CGREEN}\1${CNC}@${CCYAN}\2${CNC}/g")
        echo -e "  ${CBLUE}Package${CNC}: $color_element"

        if [ "$flag_silent" = true ]; then
            npm install --verbose "$element" > /dev/null 2>&1
        else
            npm install --verbose "$element"
        fi
    done
}

npm_install () {
    local only=$1
    local dependencies=$2

    if [ ! -z "${dependencies+1}" ]; then
        local array=(${dependencies//;/ })

        echo -e "  ${CBLUE}Try installing $only packages${CNC}:"
        for element in "${array[@]}"; do
            local color_element=$(echo "$element" | sed "s/^\(.\+\)@\(.\+\)\$/${CGREEN}\1${CNC}@${CCYAN}\2${CNC}/g")
            echo -e "    * $color_element"
        done
    fi

    if [ ! -z "${only+1}" ]; then
        if [ "$flag_silent" = true ]; then
            npm install --verbose --only="$only" > /dev/null 2>&1
        else
            npm install --verbose --only="$only"
        fi
    else
        if [ "$flag_silent" = true ]; then
            npm install --verbose > /dev/null 2>&1
        else
            npm install --verbose
        fi
    fi
}

case "${args[0]}" in
    production)
        echo -e "${CCYAN}Start installing production dependencie${CNC}"
        npm_install production ${node_dependencies_str} || npm_f3_install ${node_dependencies_str}
        ;;
    development)
        echo -e "${CCYAN}Start installing development dependencie${CNC}"
        npm_install dev ${node_devDependencies_str} || npm_f3_install ${node_devDependencies_str}
        ;;
    all|"")
        echo -e "${CCYAN}Start installing all dependencie${CNC}"
        # production
        npm_install production ${node_dependencies_str} || npm_f3_install ${node_dependencies_str}

        # development
        npm_install dev ${node_devDependencies_str} || npm_f3_install ${node_devDependencies_str}
        ;;
    *)
        show_help
        exit 1
        ;;
esac

exit $RETVAL
