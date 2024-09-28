<script lang="ts">
	import Building2 from '../../models/building2.svelte';
	import Building1 from '../../models/building1.svelte';
	import { T } from '@threlte/core';
	let b1Width = 4.1;
	let b2Width = Math.abs(-8.1 - 1);
    let b2RotatedWidth = Math.abs(-8.1+16.2)
    export let totalWidth = b1Width * 2


</script>
<T.Group position.x={50} position.z={b1Width / -2}>
    <T.Group rotation.y={Math.PI}>
        <Building1 />
    </T.Group>
</T.Group>
<T.Group position.x={50} position.z={b1Width / 2}>
    <T.Group rotation.y={Math.PI}>
        <Building1 />
    </T.Group>
</T.Group>
