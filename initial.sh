rm -rf backend
rm -rf frontend

npm i -g npm yarn express-generator
express --view=pug backend
cd backend
yarn install
