# !/bin/bash
# run this script for simple integration test

[ -d test_proj ] && rm -rf test_proj

mkdir -p test_proj/
cd test_proj

yo deepexi-spring-cloud -c --db=mongo

npm i
npm test
# npm run dev
cd ..
rm -rf test_proj
