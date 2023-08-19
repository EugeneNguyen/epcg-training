export NODE_OPTIONS=--openssl-legacy-provider

#rm -rf backend/node_modules backend/package-lock.json
#rm -rf frontend/node_modules frontend/package-lock.json
#rm -rf member_page/node_modules member_page/package-lock.json

rm -rf backend/public/admin
rm -rf backend/public/app

cd frontend
npm install
npm run css
npm run build
cd ..

cd member_page
npm install
npm run css
npm run build
cd ..

mv frontend/build backend/public/admin
mv member_page/build backend/public/app

cd backend
npm install
eb deploy
cd ..