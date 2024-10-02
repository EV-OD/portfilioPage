<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { ContactShadows, Float, Grid, OrbitControls, HTML } from '@threlte/extras';
    let firstContent = "Oh, you are intrested 😍, then let me tell you about my skills"
    let firstContentBatched = ""
    export let cameraPosForCarZ:number;
	import { mapValue } from '../../../utils';
    let shouldShowFirstContent = true

    // firstContentBatched should be filled with character of firstContent as cameraPosForCarZ decrease from -7 to -10
    $:{
        if(cameraPosForCarZ < -7 && cameraPosForCarZ >= -13){
            shouldShowFirstContent = true
            let mapping = mapValue(cameraPosForCarZ, -7, -13, 0, firstContent.length)
            firstContentBatched = firstContent.slice(0, mapping)
        }
        if(cameraPosForCarZ < -15){
            shouldShowFirstContent = false
        }
    }


    


</script>

{#if shouldShowFirstContent}
<HTML transform position={[10,2,20]} rotation.y={Math.PI } scale={0.2}>
    <div class="firstContent">
        <h1>{firstContentBatched}</h1>
    </div>
</HTML>
{/if}


<style>
.firstContent{
    width: 1000px;
    font-size: 3em;
    font-family: 'Courier New', Courier, monospace;
    background-color: rgb(217, 217, 217);
    padding: 10px;
    padding-inline: 50px;
    border-radius: 10px;
}
</style>
