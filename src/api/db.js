let db = openDatabase('crip-bookmark-export', '1.0', 'Bookmark DB', 2 * 1024 * 1024)

db.transaction((tx) => {
  tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id INTEGER PRIMARY KEY AUTOINCREMENT, log)')
  tx.executeSql('CREATE TABLE IF NOT EXISTS SETTINGS (key UNIQUE, val)')
})

/**
 * Insert log record to database.
 * @param {string} log
 * @return {Promise.<string>}
 */
export function insertLog (log) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      doQuery(tx, 'INSERT INTO LOGS (log) VALUES (?)', [log], () => {
        resolve('Log inserted')
      })
    })
  })
}

/**
 * Get logs records from database.
 * @param {number} count
 * @return {Promise.<{id:string,log:string}>}
 */
export function getLogs (count = 2) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      doQuery(tx, 'SELECT id, log FROM LOGS ORDER BY id DESC LIMIT 0,?', [count], (tx, results) => {
        let ret = []
        for (let i = 0; i < results.rows.length; i++) {
          ret.push(results.rows.item(i))
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
          tx.executeSql('UPDATE SETTINGS SET val = ? WHERE key = ?', [value, key], () => {
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
 * Get settings value from database.
 * @param {string} key
 * @param {string} defaultValue
 * @return {Promise.<string>}
 */
export function getSettings (key, defaultValue = '') {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      doQuery(tx, 'SELECT val FROM SETTINGS WHERE key = ?', [key], (tx, results) => {
        if (results.rows.length > 0) {
          resolve(results.rows.item(0).val)
        } else {
          resolve(defaultValue)
        }
      })
    })
  })
}
/**
 *
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
