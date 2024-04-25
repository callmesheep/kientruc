import bluebird                     from 'bluebird'
import decodeBinary                 from './utils/data3d/decode-binary.js'
import encodeBinary                 from './utils/data3d/encode-binary.js'
import loadData3d                   from './utils/data3d/load.js'
import traverseData3d               from './utils/data3d/traverse.js'
import cloneData3d                  from './utils/data3d/clone.js'
import getData3dFromThreeJs         from './utils/data3d/from-three.js'
import getData3dInspectorUrl        from './utils/data3d/get-inspector-url.js'
import storeInCache                 from './utils/data3d/store-in-cache.js'
import removeFromCache              from './utils/data3d/remove-from-cache.js'
import textureAttributes            from './utils/data3d/texture-attributes.js'
import normalizeData3d              from './utils/data3d/normalize.js'
import ui                           from './utils/ui.js'
import auth                         from './utils/auth.js'
import fetch                        from './utils/io/fetch.js'
import fetchScript                  from './utils/io/fetch-script.js'
import checkIfFileExists            from './utils/io/check-if-file-exists.js'
import getBlobFromCanvas            from './utils/image/get-blob-from-canvas.js'
import getImageFromFile             from './utils/image/get-image-from-file.js'
import scaleDownImage               from './utils/image/scale-down-image.js'
import md5                          from './utils/math/md5.js'
import sha1                         from './utils/math/sha1.js'
import getMimeTypeFromFilename      from './utils/file/get-mime-type-from-filename.js'
import gzip                         from './utils/file/gzip.js'
import readFile                     from './utils/file/read.js'
import getMd5FileHash               from './utils/file/get-md5-hash.js'
import uuid                         from './utils/uuid.js'
import getShortId                   from './utils/short-id.js'
import url                          from './utils/url.js'
import path                         from './utils/path.js'
import wait                         from './utils/wait.js'
import callService                  from './utils/services/call.js'
import whenDone                     from './utils/processing/when-done.js'
import whenHiResTexturesReady       from './utils/processing/when-hi-res-textures-ready.js'

var utils = {

  data3d: {
    load: loadData3d,
    encodeBinary: encodeBinary,
    decodeBinary: decodeBinary,
    fromThreeJs: getData3dFromThreeJs,
    normalize: normalizeData3d,
    clone: cloneData3d,
    traverse: traverseData3d,
    getInspectorUrl: getData3dInspectorUrl,
    storeInCache: storeInCache,
    removeFromCache: removeFromCache,
    textureAttributes: textureAttributes
  },
  ui: ui,
  auth: auth,
  io: {
    fetch: fetch,
    fetchScript: fetchScript,
    checkIfFileExists: checkIfFileExists
  },
  image: {
    scaleDown: scaleDownImage,
    getFromFile: getImageFromFile,
    getBlobFromCanvas: getBlobFromCanvas
  },
  math: {
    md5: md5,
    sha1: sha1
  },
  services: {
    call: callService
  },
  file: {
    getMimeTypeFromFilename: getMimeTypeFromFilename,
    gzip: gzip,
    read: readFile,
    getMd5Hash: getMd5FileHash
  },
  processing: {
    whenDone: whenDone,
    whenHiResTexturesReady: whenHiResTexturesReady
  },
  url: url,
  uuid: uuid,
  getShortId: getShortId,
  path: path,
  wait: wait,
  bluebird: bluebird

}

export default utils
