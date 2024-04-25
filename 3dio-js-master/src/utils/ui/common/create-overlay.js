import runtime from '../../../core/runtime.js'
import el from './dom-el.js'

// main

export default function createOverlay () {
  runtime.assertBrowser()

  // DOM
  var mainEl = el('<div>', { class: 'io3d-overlay' }).appendTo(document.body)
  var centerEl = el('<div>', { class: 'centered-content' }).appendTo(mainEl)
  var bottomContainerEl = el('<div>', { class: 'bottom-container' }).appendTo(mainEl)
  var bottomEl = el('<div>', { class: 'bottom-content' }).appendTo(bottomContainerEl)

  // overlay object
  var result = {
    isDestroyed: false,
    isVisible: false,
    mainEl: mainEl,
    centerEl: centerEl,
    bottomEl: bottomEl,
    show: show,
    hide: hide,
    destroy: destroy
  }

  // methods

  function show (callback) {
    if (result.isVisible) return
    result.isVisible = true

    mainEl.style.opacity = 0
    mainEl.style.display = 'block'
    
    mainEl.style['-webkit-animation'] = '600ms overlay-fade-in ease-out'
    mainEl.style['animation'] = '600ms overlay-fade-in ease-out'
    mainEl.style['-webkit-animation-fill-mode'] = 'forwards'
    mainEl.style['animation-fill-mode'] = 'forwards'
    
    centerEl.style['-webkit-animation'] = '600ms content-slide-in cubic-bezier(0.2, 0.80, 0.5, 1)'
    centerEl.style['animation'] = '600ms content-slide-in cubic-bezier(0.2, 0.80, 0.5, 1)'
    centerEl.style['-webkit-animation-fill-mode'] = 'forwards'
    centerEl.style['animation-fill-mode'] = 'forwards'

    // trigger callback function
    if (callback && typeof callback === 'function') setTimeout(function(){ callback();}, 500)

    return result
  }

  function hide (callback) {
    if (!result.isVisible) return
    result.isVisible = false

    mainEl.style['-webkit-animation'] = '600ms overlay-fade-out ease-out'
    mainEl.style['animation'] = '600ms overlay-fade-out ease-out'
    mainEl.style['-webkit-animation-fill-mode'] = 'forwards'
    mainEl.style['animation-fill-mode'] = 'forwards'
    
    centerEl.style['-webkit-animation'] = '600ms content-slide-out ease-in'
    centerEl.style['animation'] = '600ms content-slide-out ease-in'
    centerEl.style['-webkit-animation-fill-mode'] = 'forwards'
    centerEl.style['animation-fill-mode'] = 'forwards'
    
    // remove element
    setTimeout(function(){
      mainEl.remove()
    }, 600)

    // trigger callback function
    if (callback && typeof callback === 'function') setTimeout(function(){ callback(); }, 300)

    return result
  }

  function destroy (callback) {
    if (result.isDestroyed) return
    hide(function () {
      result.isDestroyed = true
      if (callback && typeof callback === 'function') callback()
    })
    return result
  }

  // expose overlay object

  return result

}

