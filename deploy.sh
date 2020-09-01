set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:LouisH98/loveprint-web-client.git master:gh-pages

cd -