rm -rf backend/public/admin
rm -rf backend/public/app

yarn --cwd=frontend css
yarn --cwd=frontend build
mv frontend/build backend/public/admin

yarn --cwd=member_page css
yarn --cwd=member_page build
mv member_page/build backend/public/app

AWS_ACCESS_KEY_ID=AKIAVYKPC2VKZHW6DQO5 \
AWS_SECRET_ACCESS_KEY=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 \
AWS_S3_BUCKET_NAME=binhnguyenorg \
AWS_S3_PATH=development_upload \
AWS_S3_REGION=ap-southeast-1 \
MASTER_PASSWORD=test \
yarn --cwd=backend start
