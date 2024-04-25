import packageJson from '../../package.json'
import domReady from './runtime/dom-ready.js'
import Rx from 'rxjs/BehaviorSubject.js'

// detect environment
var isNode = !!(
  // detect node environment
  typeof module !== 'undefined'
  && module.exports
  && typeof process !== 'undefined'
  && Object.prototype.toString.call(process) === '[object process]'
)
// detect react native environment
var isReactNative = !!(
  typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
)
var isBrowser = !isNode && typeof window !== 'undefined' && Object.prototype.toString.call(window) === '[object Window]'
// detect whether webgl is available
var webGlInfo = getWebGlInfo()
// detect whether aframe or webgl libs are avilable
var aframeReady = !!(isBrowser && window.AFRAME)
var threeReady = !!(isBrowser && window.THREE)

var isVisible$ = new Rx.BehaviorSubject()
var isFocused$ = new Rx.BehaviorSubject()

// create runtime object

var runtime = {

  isDebugMode: false,
  isNode: isNode,
  isReactNative: isReactNative,

  // browser specific

  isBrowser: isBrowser,
  assertBrowser: assertBrowser,
  isMobile: detectMobile(),
  domReady: domReady,
  isVisible$: isVisible$,
  isFocused$: isFocused$,

  has: {
    webGl: !!webGlInfo,
    aframe: aframeReady,
    three: threeReady
  },

  webGl: webGlInfo,

  libInfo: {
    npmName: packageJson.name,
    version: packageJson.version,
    homepage: packageJson.homepage,
    githubRepository: packageJson.repository,
    gitBranchName: GIT_BRANCH,
    gitCommitHash: GIT_COMMIT.substr(0, 7),
    buildDate: BUILD_DATE,
    license: packageJson.license
  },

}

export default runtime

// helpers

function assertBrowser(message) {
  if (!isBrowser) throw (message || 'Sorry this feature requires a browser environment.')
}

function getWebGlInfo () {

  var canvas
  if (typeof document !== 'undefined') try {
    canvas = document.createElement('canvas')
  } catch (e) {
    return null
  }
  if (!canvas) return null

  var gl = canvas.getContext('webgl') ||
    canvas.getContext('experimental-webgl') ||
    canvas.getContext('webgl', {antialias: false}) ||
    canvas.getContext('experimental-webgl', {antialias: false})
  if (!gl) return null

  var debugInfo = gl.getExtension( 'WEBGL_debug_renderer_info' )
  var supportsDds = gl.getExtension('WEBGL_compressed_texture_s3tc')

  return {
    shadingLanguageVersion: gl.getParameter( gl.SHADING_LANGUAGE_VERSION ),
    renderer: gl.getParameter( gl.RENDERER ),
    vendor: gl.getParameter( gl.VENDOR ),
    unmaskedRenderer: debugInfo && gl.getParameter( debugInfo.UNMASKED_RENDERER_WEBGL ),
    unmaskedVendor: debugInfo && gl.getParameter( debugInfo.UNMASKED_VENDOR_WEBGL ),
    maxTextureSize: gl.getParameter( gl.MAX_TEXTURE_SIZE ),
    maxRenderbufferSize: gl.getParameter( gl.MAX_RENDERBUFFER_SIZE ),
    supportsDds: !!supportsDds
  }

}

function detectMobile () {
  var hint
  if (typeof navigator !== 'undefined' && (navigator.userAgent || navigator.vendor)) {
    hint = navigator.userAgent || navigator.vendor
  } else if (typeof window !== 'undefined' && window.opera) {
    hint = window.opera
  } else {
    return false
  }
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(hint)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(hint.substr(0,4))
}

// isVisible

if (isBrowser) {
  domReady(function(doc){
    // get initial tab visible state
    isVisible$.next(getTabVisibleState())
    // bind tab visibility event
    var visibilityEventName
    if (typeof document.hidden !== "undefined") {
      visibilityEventName = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      visibilityEventName = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      visibilityEventName = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      visibilityEventName = "webkitvisibilitychange";
    }
    doc.addEventListener(visibilityEventName, function onTabVisibilityChange () {
      isVisible$.next(getTabVisibleState())
    }, false)
  })
}

function getTabVisibleState () {
  if (document.hidden !== undefined) return !document.hidden
  if (document.webkitHidden !== undefined) return !document.webkitHidden
  if (document.mozHidden !== undefined) return !document.mozHidden
  if (document.msHidden !== undefined) return !document.msHidden
  return undefined
}

// isFocused

if (isBrowser) {
  domReady(function(){
    // get initial state
    isFocused$.next(document.hasFocus())
    // bind events
    window.onfocus = function () {
      isFocused$.next(true)
    }
    window.onblur = function () {
      isFocused$.next(false)
    }
  })

}