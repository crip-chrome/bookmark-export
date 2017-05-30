import * as chrome from '../api/chrome'
import * as db from './../api/db'
import AuditType from '../models/AuditType'
import AuditEntry from '../models/AuditEntry'
import InteractionType from '../models/InteractionType'

function sendToBlog (action, data) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      let entry = new AuditEntry({...data, interaction: action})
      if (xhr.readyState === 4 && xhr.status === 200) {
        db.insertLog(entry).then(resolve)
      }

      if (xhr.readyState === 4 && xhr.status !== 200) {
        entry.type = AuditType.error
        db.insertLog(entry).then(reject)
      }
    }

    db.getSettings().then(settings => {
      xhr.open('POST', `${settings.api_url}/${action}`, true)
      xhr.setRequestHeader('Authorization', `Bearer ${settings.api_key}`)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

      xhr.send(JSON.stringify(data))
    }, ex => {
      db.insertLog(new AuditEntry({
        interaction: InteractionType.read_configurations,
        type: AuditType.error,
        title: ex
      })).then(reject)
    })
  })
}

export function create (bookmark) {
  return sendToBlog(InteractionType.created, bookmark)
}

export function remove (bookmark) {
  return sendToBlog(InteractionType.removed, bookmark.node)
}

export function change (bookmark) {
  return sendToBlog(InteractionType.changed, bookmark)
}

export function move (id, bookmark) {
  bookmark.id = id
  return sendToBlog(bookmark)
}

export function sync () {
  chrome.getTree().then(tree => {
    sendToBlog(InteractionType.sync, tree)
  })
}
