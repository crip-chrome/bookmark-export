export function getTree () {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getSubTree('1', results => {
      if (chrome.runtime.error) {
        reject(chrome.runtime.error)
        return
      }

      resolve(results[0])
    })
  })
}
