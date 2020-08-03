require('dotenv/config')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  name: 'default',
  type: 'postgres',
  url: process.env.DB_URL,
  logging: false,
  migrationsRun: true,
  entities: [path.join('src', 'infra', 'db', 'typeorm', 'entities', '*.ts')],
  migrations: [path.join('src', 'infra', 'db', 'typeorm', 'migrations', '*.ts')],
  cli: {
    entitiesDir: path.join('src', 'infra', 'db', 'typeorm', 'entities'),
    migrationsDir: path.join('src', 'infra', 'db', 'typeorm', 'migrations'),
  },
}
