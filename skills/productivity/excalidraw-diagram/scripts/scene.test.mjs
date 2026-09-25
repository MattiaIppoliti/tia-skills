import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateScene} from './scene.mjs';
const shape=(id,type='rectangle')=>({id,type,x:0,y:0,width:100,height:100,angle:0});
function connected(){return {type:'excalidraw',version:2,elements:[{...shape('node'),boundElements:[{id:'edge',type:'arrow'},{id:'label',type:'text'}]},{...shape('edge','arrow'),points:[[0,0],[100,100]],startBinding:{elementId:'node'}},{...shape('label','text'),text:'Node',fontSize:20,containerId:'node'}],files:{}};}
test('accepts a native scene with reciprocal arrows and text',()=>assert.deepEqual(validateScene(connected()),[]));
test('rejects a dangling endpoint and broken reciprocal reference',()=>{const s=connected();s.elements[1].startBinding.elementId='missing';assert.ok(validateScene(s).some(e=>e.includes('dangling arrow endpoint')));assert.ok(validateScene(s).some(e=>e.includes('inconsistent arrow')));});
test('rejects an orphaned bound label',()=>{const s=connected();s.elements[2].containerId='other';assert.ok(validateScene(s).some(e=>e.includes('missing reciprocal text')));});
test('rejects duplicate ids and nonfinite geometry',()=>{const s=connected();s.elements.push({...shape('node'),x:NaN});const errors=validateScene(s);assert.ok(errors.some(e=>e.includes('duplicate')));assert.ok(errors.some(e=>e.includes('invalid x')));});
test('rejects missing image data and malformed polylines',()=>{const s=connected();s.elements.push({...shape('img','image'),fileId:'absent'});s.elements[1].points=[[0,0],[Infinity,2]];const errors=validateScene(s);assert.ok(errors.some(e=>e.includes('missing embedded image')));assert.ok(errors.some(e=>e.includes('invalid points')));});
