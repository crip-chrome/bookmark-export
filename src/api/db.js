import AuditEntry from './../models/AuditEntry'

let db = openDatabase('crip-bookmark-export', '1.0', 'Bookmark DB', 2 * 1024 * 1024)

db.transaction((tx) => {
  tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id INTEGER PRIMARY KEY AUTOINCREMENT, type, interaction, title)')
  tx.executeSql('CREATE TABLE IF NOT EXISTS SETTINGS (key UNIQUE, val)')
})

/**
 * Insert audit record to database.
 * @param {AuditEntry} log
 * @return {Promise.<string>}
 */
export function insertLog (log) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const query = 'INSERT INTO LOGS (type, interaction, title) VALUES (?, ?, ?)'
      doQuery(tx, query, [log.type, log.interaction, log.title], () => {
        resolve('Log inserted')
      })
    })
  })
}

/**
 * Get audit records from database.
 * @param {number} count
 * @return {Promise.<Array.<AuditEntry>>}
 */
export function getLogs (count = 50) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      doQuery(tx, 'SELECT id, type, interaction, title FROM LOGS ORDER BY id DESC LIMIT 0,?', [count], (tx, results) => {
        let ret = []
        for (let i = 0; i < results.rows.length; i++) {
          ret.push(new AuditEntry(results.rows.item(i)))
        }
        resolve(ret)
      }, null)
    })
  })
}

/**
 * Save settings value into database.
 * @param {string} key
 * @param {string} value
 * @return {Promise.<string>}
 */
export function saveSettings (key, value) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      doQuery(tx, 'SELECT count(*) totalCount FROM SETTINGS WHERE key = ?', [key], (tx, results) => {
        const exists = results.rows.item(0).totalCount
        if (exists) {
          doQuery(tx, 'UPDATE SETTINGS SET val = ? WHERE key = ?', [value, key], () => {
            resolve('Record updated')
          })
        } else {
          doQuery(tx, 'INSERT INTO SETTINGS (key, val) VALUES (?, ?)', [key, value], () => {
            resolve('Record created')
          })
        }
      })
    })
  })
}

/**
 * Get settings from database.
 * @param {object} defaultValue
 * @return {Promise}
 */
export function getSettings (defaultValue = {}) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      doQuery(tx, 'SELECT key, val FROM SETTINGS', [], (tx, results) => {
        if (results.rows.length > 0) {
          let ret = {}
          for (let i = 0; i < results.rows.length; i++) {
            ret[results.rows.item(i).key] = results.rows.item(i).val
          }
          resolve(ret)
        } else {
          resolve(defaultValue)
        }
      })
    })
  })
}

/**
 * Execute and log query if error occurred.
 * @param tx
 * @param {string} sqlStatement
 * @param values
 * @param successHandler
 */
function doQuery (tx, sqlStatement, values, successHandler) {
  tx.executeSql(sqlStatement, values, successHandler, errorHandler)
  function errorHandler (transaction, error) {
    console.error(`Error : ${error.message} in ${sqlStatement}`)
  }
}
