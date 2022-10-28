rm -rf backend/public/admin
rm -rf backend/public/app

yarn --cwd=frontend css
yarn --cwd=frontend build
mv frontend/build backend/public/admin

yarn --cwd=member_page css
yarn --cwd=member_page build
mv member_page/build backend/public/app

cd backend
eb deploy
