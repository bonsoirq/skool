const electron = require('electron')
const typeorm = require('typeorm')
const path = require('path')
const migrationsPath = path.join(__dirname, '../src/generated/migration/**/*.js')
window.electron = electron
window.typeorm = typeorm
window.migrationsPath = migrationsPath
