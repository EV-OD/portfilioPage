<script lang="ts">

	import { T } from '@threlte/core';
import DirectionArrow from '../models/direction_arrow.svelte';
	import { Group } from 'three';
	import Orange from '../models/orange.svelte';
	import Red from '../models/red.svelte';

</script>

<T.Group rotation.y={Math.PI / 6}>
    <T.Group scale={0.1} position={[2,0,0]}>
        <Orange/>
    </T.Group>
    <T.Group scale={0.1} position={[-2,0,0]} rotation.y={-Math.PI}>
        <Orange/>
    </T.Group>
    <T.Group scale={0.1} position={[0,0,2]} rotation.y={Math.PI / -2}>
        <Orange/>
    </T.Group>
    <T.Group scale={0.1} position={[0,0,-2]} rotation.y={Math.PI / 2}>
        <Orange/>
    </T.Group>
</T.Group>



