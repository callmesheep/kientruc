import runtime from '../core/runtime.js'
import callServices from '../utils/services/call.js'
import whenDone from '../utils/processing/when-done.js'

// main
function bakeStage(stage) {
  return function bake(storageId, options) {
    // API
    options = options || {}

    // Optional bake parameters for API call
    var bakeSettings = { sunDirection: options.sunDirection || [ 0.75, -0.48, -0.46 ] }
    if (options.lightMapCount) bakeSettings.lightMapCount = options.lightMapCount
    if (options.samples) bakeSettings.samples = options.samples

    // internals
    // TODO: reimplement send "exportable" textures to bake
    var assetStorageIds = []
    // TODO: reimplement caching mechanism on server side
    var cacheKey = null

    var bakeParams = {
      method: 'bake'.concat('.', stage),
      params: {
        inputFileKey: storageId,
        inputAssetKeys: assetStorageIds,
        settings: JSON.stringify(bakeSettings)
      }
    }

    if (cacheKey) bakeParams.params.cacheKey = cacheKey
    if (assetStorageIds.length > 0) bakeParams.params.inputAssetKeys = assetStorageIds

    return callServices('Processing.task.enqueue', bakeParams)
  }
}

// expose API

export default {
  bakePreview: bakeStage('preview'),
  bakeRegular: bakeStage('regular')
}
