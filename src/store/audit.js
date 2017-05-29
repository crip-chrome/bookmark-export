export const AuditType = {
  success: 'success',
  error: 'error'
}

export const InteractionType = {
  created: 'created',
  removed: 'moved-away',
  changed: 'edited',
  moved: 'changed-position',
  sync: 'sync',
  read_configurations: 'read-configurations'
}

export class AuditEntry {
    /**
     * @param {string}  interaction
     * @param {string}  title
     * @param {string}  id
     * @param {string?} auditType
     */
  constructor (interaction, title, id, auditType) {
    this.type = auditType || AuditType.success
    this.id = id
    this.interaction = interaction
    this.title = title

    for (let prop in InteractionType) {
      if (InteractionType.hasOwnProperty(prop) && InteractionType[prop] === interaction) { this.interaction = prop }
    }
  }
}
