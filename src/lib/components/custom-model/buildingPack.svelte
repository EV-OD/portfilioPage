<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import Building1 from '../models/building1.svelte';
	import Building2 from '../models/building2.svelte';
	import { layers } from '@threlte/extras';
	import {
		Object3D,
		DirectionalLight,
		DirectionalLightHelper,
		PointLight,
		PointLightHelper,
		AxesHelper,
		BoxHelper
	} from 'three';
	import B1 from './pack/b1.svelte';
	import B2 from './pack/b2.svelte';

	const targetObject = new Object3D();
	targetObject.position.set(50, 1, 0);
	const { scene } = useThrelte();
	scene.add(targetObject);
	layers();
	targetObject.layers.enable(2);

	// Create the point light
	const pointLight = new PointLight(0xffffff, 10, 100);
	pointLight.position.set(1, 1, 0);
	pointLight.layers.enableAll();

	// Add point light and helper to the scene
	scene.add(pointLight);
    let b1TotalWidth:number;
    let b2TotalWidth:number;

</script>

<!-- <T.DirectionalLight 
    position={[0.1, 1, 0]} 
    intensity={10} 
    target={targetObject}
    layers={["all"]}
    
/> -->
<T.Group scale={0.1} layers={[2]}>
	<!-- {#each Array(10).fill(0) as _, i} -->
     <!-- <T.Group position.z={b1TotalWidth / 2}>
         <B1 bind:totalWidth={b1TotalWidth}/>
     </T.Group>
     <T.Group position.z={b2TotalWidth}>
        <B2 bind:totalWidth={b2TotalWidth} />
        </T.Group> -->
        <Building2/>
	<!-- {/each} -->
</T.Group>
