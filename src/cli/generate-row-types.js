const { createConnection } = require("typeorm")
const config = require('../../ormconfig.json')
const fs = require('fs')


const tables = [
  'AdmissionCards',
  'AdmissionCardsView',
  'AdvancementLevels',
  'CourseProgress',
  'CourseProgressView',
  'Courses',
  'Groups',
  'GroupsView',
  'Lessons',
  'Presence',
  'PresenceView',
  'Students',
];

const compareBy = (fn) => {
  return (x, y) => {
    if (fn(x) > fn(y)) return 1;
    if (fn(x) < fn(y)) return -1;
    return 0;
  }
}

const typeTemplate = (tableName, columns) => {
  return `export type ${tableName}Row = {\n` +
    `${mapColumns(columns)}\n` +
    `}\n`
}
const mapColumns = (columns) => columns.sort(compareBy(x => x.name)).map(columnTemplate).join('\n')
const columnTemplate = (column) => `  ${column.name}: ${mapColumnType(column.type)};`
const mapColumnType = (type) => {
  switch (type) {
    case 'TEXT':
      return 'string';
    default:
      throw Error(`Unknown column type ${type}`)
  }
}

(async function () {
  const connection = await createConnection(config)

  const tableMetadata = await Promise.all(
    tables.map(async table => {
      const columns = await connection.query(`PRAGMA table_info(${table});`)
      return { table, columns }
    })
  )

  const typeDefinitions = tableMetadata.map(({ table, columns }) => typeTemplate(table, columns)).join('\n')

  fs.writeFile('./src/generated/row-types.ts', typeDefinitions, err => err && console.error(err))
})();
