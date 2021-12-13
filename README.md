# Nhật ký phát triển

1. Tạo Backend folder có express

```
npm i -g npm yarn express-generator
express --view=pug backend
cd backend
yarn install
yarn add apollo-server graphql sequelize sequelize-cli mysql2
```

2. Tạo folder src và models

```
mkdir src
mkdir src/models
```

3. Đi theo hướng dẫn này để tạo app.js
https://www.apollographql.com/docs/apollo-server/getting-started/

4. Thêm dòng sql vào scrip

```
"sql": "./node_modules/.bin/sequelize --migrations-path=src/database/migrations --seeders-path=src/database/seeders --models-path=src/database/models ----config=src/database/config/config.json"
```

5. Init Sequelize
```
yarn sql init
```
6. Init model mới

```
yarn sql model:generate --name=etEducationProvider --attributes=name:String
yarn sql migration:generate --name=AddImageToQuestion
```

7. Update UUID

File migration
```
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
```

File Model
```
const uuid = require('uuid');

    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    

  etEducationProvider.beforeCreate(o => o.id = uuid.v4());
```
