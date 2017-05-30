import AuditType from './AuditType'
import InteractionType from './InteractionType'

export default class AuditEntry {
  /**
   * @param {string} interaction
   * @param {string} title
   * @param {string} [id]
   * @param {string} [type]
   */
  constructor ({interaction, title, id = '', type = AuditType.success}) {
    this.type = type
    this.id = id
    this.interaction = interaction
    this.title = title

    for (let prop in InteractionType) {
      if (InteractionType.hasOwnProperty(prop) && InteractionType[prop] === interaction) {
        this.interaction = prop
      }
    }
  }
}
