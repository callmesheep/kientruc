import runtime from '../../core/runtime.js'
import PromiseCache from '../promise-cache.js'
import fetch from './fetch.js'

var promiseCache = new PromiseCache()

export default function fetchScript (url) {
  runtime.assertBrowser('Please use "require()" to fetch modules in server environment.')

  // module wrapper
  window.___modules = window.___modules || {}

  // return module if it has been loaded already
  if (window.___modules[url]) {
    return Promise.resolve(window.___modules[url])

  } else {

    // try promise cache (could be in loading state)
    var promiseFromCache = promiseCache.get(url)
    if (promiseFromCache) return promiseFromCache

    // load code and use module wrapper
    var fetchPromise = fetch(url).then(function(response){
      if (!response.ok) throw 'Could not load script from URL: '+url
      return response.text()
    }).then(function(code){

      // check module type
      var moduleWrapper
      if (code.indexOf('define(function()') > -1) {
        // AMD
        moduleWrapper = code+'\nfunction define(cb){ window.___modules["'+url+'"] = cb(); };'
      } else {
        // CommonJS
        moduleWrapper = 'window.___modules["'+url+'"] = (function(){ var exports = {}, module = {exports:exports};'+code+'\nreturn module.exports\n})()'
      }

      var script = document.createElement('script')
      try {
        script.appendChild(document.createTextNode(moduleWrapper))
        document.body.appendChild(script)
      } catch (e) {
        script.text = moduleWrapper
        document.body.appendChild(script)
      }
      return window.___modules[url]
    })

    // add to cache
    promiseCache.add(url, fetchPromise)

    return fetchPromise

  }

}