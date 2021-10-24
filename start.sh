rm -rf backend/public/admin
yarn --cwd=frontend build
mv frontend/build backend/public/admin
yarn --cwd=backend start
