<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 D:\projects\portfolio\static\models\scene.glb --root /models/ --types --printwidth 120 --precision 2
-->
<script context="module" lang="ts">
  export type ActionName = '1st' | '2nd' | '3rd'
</script>

<script lang="ts">
  import type * as THREE from 'three'
  import { Group } from 'three'
  import { T, type Props, type Events, type Slots, forwardEventHandlers, useTask } from '@threlte/core'
  import { useGltf, useGltfAnimations } from '@threlte/extras'
  import { mapValue } from '../../../utils';

  type $$Props = Props<THREE.Group>
  type $$Events = Events<THREE.Group>
  type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } }

  export let playAnimation: (animationName: ActionName) => void;
  export let stopAnimation: (animationName: ActionName) => void;

  export let playForwardMovingAnimation: (increaseRate:number) => void;
  export let playBackwardMovingAnimation: (increaseRate:number) => void;
  export let stopMovingAnimation: () => void;

  export const ref = new Group()

  type GLTFResult = {
    nodes: {
      Body_1: THREE.Mesh
      Body_2: THREE.Mesh
      Body_3: THREE.Mesh
      Body_4: THREE.Mesh
      Body_5: THREE.Mesh
      Body_6: THREE.Mesh
      Body_7: THREE.Mesh
      Body_8: THREE.Mesh
      pCylinder9_lambert5_0002: THREE.Mesh
      pCylinder9_lambert5_0002_1: THREE.Mesh
      pCylinder9_lambert5_0002_2: THREE.Mesh
      pCylinder9_lambert5_0001: THREE.Mesh
      pCylinder9_lambert5_0001_1: THREE.Mesh
      pCylinder9_lambert5_0001_2: THREE.Mesh
    }
    materials: {
      Black: THREE.MeshStandardMaterial
      ['Plaque Front']: THREE.MeshStandardMaterial
      Metal: THREE.MeshStandardMaterial
      ['Plaque Back']: THREE.MeshStandardMaterial
      Light: THREE.MeshStandardMaterial
      Rubber: THREE.MeshStandardMaterial
      blinn2: THREE.MeshPhysicalMaterial
      Window: THREE.MeshStandardMaterial
      ['Rubber.001']: THREE.MeshStandardMaterial
      ['Black.001']: THREE.MeshStandardMaterial
      ['Metal.001']: THREE.MeshStandardMaterial
    }
  }

  const gltf = useGltf<GLTFResult>('/models/scene.glb')
  export const { actions, mixer } = useGltfAnimations<ActionName>(gltf, ref)

  playAnimation = (name: ActionName) => {
    if ($actions[name]) {
      $actions[name].play();
    }
  }

  let forwardWheelBoneRef: THREE.Group
  let backwardWheelBoneRef: THREE.Group

  export let forwardWheelRotation = 0;
  export let backwardWheelRotation = 0;

  let increaseRate:number|null = null;

  let isMoving:0 | 1 | -1 = 0;
  

  playForwardMovingAnimation = (increaseRateArg:number) => {
      increaseRate = increaseRateArg
      isMoving = 1
  }
  playBackwardMovingAnimation = (increaseRateArg:number) => {
    increaseRate = increaseRateArg
      isMoving = -1
  }
  stopMovingAnimation = () => {
    isMoving = 0
  }

  stopAnimation = (name: ActionName)=> {
    if ($actions[name]) {
      $actions[name].stop();
    }
  }

  const component = forwardEventHandlers()
  $:{
    if($actions['1st'] && $actions['2nd'] && $actions['3rd']){
      // $actions['1st']?.play()
    }
  }
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Group name="Scene">
      <T.Group name="Jeep">
        <T.Group name="Body" position={[-0.01, 2.9, -0.05]}>
          <T.Mesh name="Body_1" geometry={gltf.nodes.Body_1.geometry} material={gltf.materials.Black} />
          <T.Mesh name="Body_2" geometry={gltf.nodes.Body_2.geometry} material={gltf.materials['Plaque Front']} />
          <T.Mesh name="Body_3" geometry={gltf.nodes.Body_3.geometry} material={gltf.materials.Metal} />
          <T.Mesh name="Body_4" geometry={gltf.nodes.Body_4.geometry} material={gltf.materials['Plaque Back']} />
          <T.Mesh name="Body_5" geometry={gltf.nodes.Body_5.geometry} material={gltf.materials.Light} />
          <T.Mesh name="Body_6" geometry={gltf.nodes.Body_6.geometry} material={gltf.materials.Rubber} />
          <T.Mesh name="Body_7" geometry={gltf.nodes.Body_7.geometry} material={gltf.materials.blinn2} />
          <T.Mesh name="Body_8" geometry={gltf.nodes.Body_8.geometry} material={gltf.materials.Window} />
        </T.Group>
      </T.Group>
      <T.Group name="Armature" position={[3, 0, 0]}>
        <T.Group  name="Bone" position={[2, 1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <T.Group name="Bone001" position={[-4.14, 1, 0.15]} rotation={[0, 0.08, 0]}>
            <T.Group name="Wheels_Back_001" position={[-0.01, 3.97, 0.01]} rotation={[-Math.PI, 1.38, Math.PI / 2]}>
              <T.Group rotation.x={forwardWheelRotation}>
                <T.Mesh
                name="pCylinder9_lambert5_0002"
                geometry={gltf.nodes.pCylinder9_lambert5_0002.geometry}
                material={gltf.materials['Rubber.001']}
              />
              <T.Mesh
                name="pCylinder9_lambert5_0002_1"
                geometry={gltf.nodes.pCylinder9_lambert5_0002_1.geometry}
                material={gltf.materials['Black.001']}
              />
              <T.Mesh
                name="pCylinder9_lambert5_0002_2"
                geometry={gltf.nodes.pCylinder9_lambert5_0002_2.geometry}
                material={gltf.materials['Metal.001']}
              />
              </T.Group>
            </T.Group>
          </T.Group>
          <T.Group ref={backwardWheelBoneRef} name="Bone002" position={[2.63, 1, 0.15]} rotation={[0, 0.03, 0]}>
            <T.Group name="Wheels_Back_" position={[0, 3.97, -0.01]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
              <T.Group rotation.x={backwardWheelRotation} >
              <T.Mesh
                name="pCylinder9_lambert5_0001"
                geometry={gltf.nodes.pCylinder9_lambert5_0001.geometry}
                material={gltf.materials.Rubber}
              />
              <T.Mesh
                name="pCylinder9_lambert5_0001_1"
                geometry={gltf.nodes.pCylinder9_lambert5_0001_1.geometry}
                material={gltf.materials.Black}
              />
              <T.Mesh
                name="pCylinder9_lambert5_0001_2"
                geometry={gltf.nodes.pCylinder9_lambert5_0001_2.geometry}
                material={gltf.materials.Metal}
              />
            </T.Group>
            </T.Group>
          </T.Group>
        </T.Group>
      </T.Group>
    </T.Group>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
