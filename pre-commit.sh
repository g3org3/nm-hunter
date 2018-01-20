#!/bin/sh
if [[ `node_modules/.bin/prettier-eslint --list-different "src/**/*.js"` ]]; then
  echo
  echo "⚠️ Code should be fomatted with prettier ⚠️"
  echo "Please run: npm run format"
  echo "         or yarn format"
  echo
  echo "to format your code, thanks"
  echo
  exit 1
else
  echo "> prettier: ✅"
  npm t
fi