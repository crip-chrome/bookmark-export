import storage from './../chrome-storage.es6';
import {AuditType, AuditEntry, InteractionType} from './../audit.es6';
import settings from './../../settings.es6';

export default class Api {
    /**
     * React on chrome bookmark created event
     *
     * @param {string}  id
     * @param {BookmarkTreeNode} bookmark
     */
    static onCreated(id, bookmark) {
        Api._sendDataToApi(InteractionType.created, bookmark);
    }

    /**
     *
     * React on chrome bookmark removed event
     *
     * @param {string}           id
     * @param {object}           removeInfo
     * @param {string}           removeInfo.parentId
     * @param {int}              removeInfo.index
     * @param {BookmarkTreeNode} removeInfo.node
     */
    static onRemoved(id, removeInfo) {
        Api._sendDataToApi(InteractionType.removed, removeInfo.node);
    }

    /**
     * React on chrome bookmark changed event
     *
     * @param {string}  id
     * @param {object}  changeInfo
     * @param {string}  changeInfo.title
     * @param {string?} changeInfo.url   Available only for page
     */
    static onChanged(id, changeInfo) {
        changeInfo.id = id;
        Api._sendDataToApi(InteractionType.changed, changeInfo);
    }

    /**
     * React on chrome bookmark moved event
     *
     * @param {string} id
     * @param {object} moveInfo
     * @param {string} moveInfo.parentId
     * @param {int}    moveInfo.index
     * @param {string} moveInfo.oldParentId
     * @param {int}    moveInfo.oldIndex
     */
    static onMoved(id, moveInfo) {
        moveInfo.id = id;
        Api._sendDataToApi(InteractionType.moved, moveInfo);
    }

    /**
     * @param {AuditEntry} auditEntry
     */
    static redo(auditEntry) {
        auditEntry.repeated = true;
        storage.update(settings.audit_table, auditEntry)
            .then(x => {
                Api._sendDataToApi(auditEntry.interaction, auditEntry);
            });
    }

    /**
     * @param {string} interactionName
     * @param {*} data
     * @private
     */
    static _sendDataToApi(interactionName, data) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            let entry = new AuditEntry(interactionName, data.title, data.id);
            if (xhr.readyState === 4 && xhr.status === 200) {
                storage.add(settings.audit_table, entry);
            }

            if (xhr.readyState === 4 && xhr.status !== 200) {
                entry.type = AuditType.error;
                storage.add(settings.audit_table, entry);
            }
        };

        storage.get([settings.url, settings.key])
            .then(obj => {
                xhr.open('POST', `${obj[settings.url]}/${interactionName}`, true);
                xhr.setRequestHeader('Authorization', `Bearer ${obj[settings.key]}`);
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

                xhr.send(JSON.stringify(data));
            })
            .catch((ex) => {
                var entry = new AuditEntry(InteractionType.read_configurations, ex, data.id, AuditType.error);
                storage.add(settings.audit_table, entry);
            });
    }
}