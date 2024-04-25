import callService  from '../../utils/services/call.js'
import uuid from '../../utils/uuid.js'

export default function getSceneStructure (id) {
  if (!uuid.validate(id)) return Promise.reject('id not valid')
  return callService('Model.read', { arguments: {resourceId:id}})
    .then(function(result) {
      var sceneStructure = result.modelStructure
      sceneStructure.id = result.modelResourceId
      sceneStructure.v = 1
      sceneStructure.modelDisplayName = result.modelDisplayName
      sceneStructure.modelResourceName = result.modelResourceName
      return sceneStructure
    })
}