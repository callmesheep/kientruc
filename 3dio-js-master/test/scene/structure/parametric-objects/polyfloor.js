import applyDefaults from '../../../../src/scene/structure/apply-defaults.js'
import polyfloor from '../../../../src/scene/structure/parametric-objects/polyfloor'
import { isNaN } from 'lodash'

// mock runtime module to prevent from tests blowing up
jest.mock('../../../../src/core/runtime.js', () => ({isBrowser: false, isNode: true}))

test('get polyfloor data3d', async function() {
  const attributes = applyDefaults({type: 'polyfloor'})
  const data3d = await polyfloor(attributes)

  // mesh names
  expect(Object.keys(data3d.meshes)).toEqual([ 'top', 'sides', 'ceiling' ])
  expect(data3d.meshes.top.positions).toBeDefined()
  expect(data3d.meshes.top.uvs).toBeDefined()
  expect(data3d.meshes.top.normals).toBeDefined()
  // check for valid vertices
  expect(data3d.meshes.top.positions.every(a => !isNaN(a))).toBeTruthy()
  expect(data3d.meshes.sides.positions.every(a => !isNaN(a))).toBeTruthy()
  expect(data3d.meshes.ceiling.positions.every(a => !isNaN(a))).toBeTruthy()
});
