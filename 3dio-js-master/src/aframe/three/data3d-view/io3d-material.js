import checkDependencies from '../../check-dependencies.js'
import fragmentShader from './io3d-material/fragment.glsl'
import vertexShader from './io3d-material/vertex.glsl'

export default checkDependencies ({
  three: true,
  aframe: false
}, function makeIo3dMaterial () {

  // CONFIGS

  var DEFAULT_LIGHT_MAP_INTENSITY = 1.2
  var DEFAULT_LIGHT_MAP_EXPOSURE = 0.6
  var DEFAULT_LIGHT_MAP_FALLOFF = 0
  var DEFAULT_NORMAL_MAP_FACTOR = new THREE.Vector2(0.8, 0.8)

  // main

  function Io3dMaterial( params ) {
    THREE.ShaderMaterial.call( this, params )

    var params = params || {}
    this.lightMapExposure = params.lightMapExposure || DEFAULT_LIGHT_MAP_EXPOSURE
    this.lightMapFalloff = params.lightMapFalloff || DEFAULT_LIGHT_MAP_FALLOFF

    this.uniforms = THREE.UniformsUtils.merge( [
      THREE.UniformsLib.common,
      THREE.UniformsLib.lights,
      THREE.UniformsLib.shadowmap,
      { color: { value: params.color || new THREE.Color(1.0, 1.0, 1.0) },
        map: { value: params.map || null },
        specularMap: { value: params.specularMap || null },
        alphaMap: { value: params.alphaMap || null },
        lightMap: { value: params.lightMap || null },
        lightMapIntensity: { value: params.lightMapIntensity || DEFAULT_LIGHT_MAP_INTENSITY },
        lightMapFalloff: { value: params.lightMapFalloff || DEFAULT_LIGHT_MAP_FALLOFF },
        lightMapExposure: { value: params.lightMapExposure || DEFAULT_LIGHT_MAP_EXPOSURE },
        normalMap: { value: params.normalMap || null },
        normalScale: { value: params.normalScale || DEFAULT_NORMAL_MAP_FACTOR },
        shininess: { value: params.shininess || 1.0 },
        specular: { value: params.specular || new THREE.Color(0.25, 0.25, 0.25) },
        emissive: { value: params.emissive || new THREE.Color(0.0, 0.0, 0.0) },
        opacity: { value: params.opacity || 1 },
        offsetRepeat: { value: params.offsetRepeat || new THREE.Vector4( 0, 0, 1, 1) }
      }
    ])

    this.vertexShader = vertexShader.text
    this.fragmentShader = fragmentShader.text
    this.lights = true
  }

  Io3dMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype)
  Io3dMaterial.prototype.constructor = Io3dMaterial

  // FIXME: This is a workaround for missing shadows with Radeon cards, consult #38 for details
  Io3dMaterial.prototype.isShaderMaterial = false

  return Io3dMaterial

})