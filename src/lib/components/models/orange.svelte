<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 D:\projects\portfolio\static\models\orange.glb --root /models/ --types --printwidth 120 --precision 2
-->

<script lang="ts">
  import type * as THREE from 'three'
  import { Group } from 'three'
  import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  type $$Props = Props<THREE.Group>
  type $$Events = Events<THREE.Group>
  type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } }

  export const ref = new Group()

  type GLTFResult = {
    nodes: {
      Arrow_Material001_0: THREE.Mesh
    }
    materials: {
      ['Material.001']: THREE.MeshStandardMaterial
    }
  }

  const gltf = useGltf<GLTFResult>('/models/orange.glb')

  const component = forwardEventHandlers()
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Group rotation={[-Math.PI / 2, 0, -0.02]}>
      <T.Group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <T.Mesh
          geometry={gltf.nodes.Arrow_Material001_0.geometry}
          material={gltf.materials['Material.001']}
          position={[11.48, 8.66, 11.4]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </T.Group>
    </T.Group>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
