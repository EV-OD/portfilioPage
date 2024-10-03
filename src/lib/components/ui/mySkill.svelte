<script lang="ts">
    import { T, useTask } from '@threlte/core';
    import { ContactShadows, Float, Grid, OrbitControls, HTML } from '@threlte/extras';
    import { Text } from '@threlte/extras'

    let firstContent = "Oh, you are intrested 😍,\n then let me tell you about my skills"
    let firstContentBatched = ""
    export let cameraPosForCarZ:number;
    import { mapValue } from '../../../utils';
    let shouldShowFirstContent = true

    let firstContentScale = spring(0)
    let secondContentScale = spring(0)

    import tilt from '../../../tilt.js';
    import { spring } from 'svelte/motion';
    import { Mesh } from 'three';
	import { scale } from 'svelte/transition';
    let skills = [
        {
            name: "HTML, CSS",
            color: "rgb(139, 0, 0)", // darkred
            level: 80,
            scale:0
        },
        {
            name: "Javascript",
            color: "rgb(0, 0, 139)", // darkblue
            level: 90,
            scale:0
        },
        {
            name: "Python",
            color: "rgb(0, 100, 0)", // darkgreen
            level: 70,
            scale:0
        },
        {
            name: "Reactjs",
            color: "rgb(204, 204, 0)", // darkyellow
            level: 85,
            scale:0
        },
        {
            name: "Nextjs",
            color: "rgb(128, 0, 128)", // darkpurple
            level: 75,
            scale:0
        },
        {
            name: "Git",
            color: "rgb(255, 140, 0)", // darkorange
            level: 65,
            scale:0
        },
        {
            name: "C/C++",
            color: "rgb(255, 20, 147)", // darkpink
            level: 60,
            scale:0
        },
        {
            name: "Svelte",
            color: "rgb(139, 69, 19)", // darkbrown
            level: 80,
            scale:0
        },
        {
            name: "QML",
            color: "rgb(0, 128, 128)", // teal
            level: 70,
            scale:0
        },
        {
            name: "Three.js",
            color: "rgb(0, 0, 0)", // black
            level: 75,
            scale:0
        },
        {
            name: "Django",
            color: "rgb(34, 139, 34)", // forestgreen
            level: 65,
            scale:0
        },
        {
            name: "Figma",
            color: "rgb(255, 0, 255)", // magenta
            level: 60,
            scale:0
        },
        {
            name: "Blender",
            color: "rgb(255, 165, 0)", // orange
            level: 70,
            scale:0
        }
    ]
    // firstContentBatched should be filled with character of firstContent as cameraPosForCarZ decrease from -7 to -10
    $:{
        if(cameraPosForCarZ < -7 && cameraPosForCarZ >= -13){
            let mapping = mapValue(cameraPosForCarZ, -7, -13, 0, firstContent.length)
            firstContentBatched = firstContent.slice(0, mapping)
            $firstContentScale = 0.2
            $secondContentScale = 0
        }
        if(cameraPosForCarZ < -14){
            shouldShowFirstContent = false
            $secondContentScale = 1
            $firstContentScale = 0
            let mapping = mapValue(cameraPosForCarZ, -14, -20, 0, skills.length)
        }
    }

    // <!-- make a 3d bar graph like structure for my skills -->
    //  <!-- my skill (html, css), (javascript), (python), (reactjs), (nextjs), (git), (c/c++), (svelte) -->


</script>


    

<T.Group position={[7,1.7,10]} rotation.y={Math.PI + Math.PI / 6} scale={$firstContentScale}>
    <Text
  text={firstContentBatched}
  color="black"
  fontSize={2}
  anchorX="50%"
  anchorY="100%"
/>
</T.Group>

<!-- make a 3d bar graph like structure for my skills -->
 <!-- my skill (html, css), (javascript), (python), (reactjs), (nextjs), (git), (c/c++), (svelte) -->

 <T.Group position={[10,0,40]} rotation.y={Math.PI + Math.PI / 6} scale={$secondContentScale}>
    {#each skills as skill, index}
        <T.Group position={[index * 2, 0, 0]}>
            <T.Mesh position={[0, 0.5, 0]} scale={[1, (skill.level / 10), 1]} rotation.y={Math.PI / 4}>
                <T.BoxGeometry args={[1, 1, 1]} />
                <T.MeshStandardMaterial color={skill.color} />
            </T.Mesh>
            <Text text={skill.name} position={[-0.5, -4 + (100 / 10), 0]} color="black" fontSize={0.3} />
            <T.PointLight color={skill.color} intensity={100} position={[-4, 0, 0]} />
        </T.Group>
    {/each}
</T.Group>







<style>
.firstContent{
    width: 1000px;
    font-size: 3em;
    font-family: 'Courier New', Courier, monospace;
    background: linear-gradient(45deg, #3e3e3e, #e09437);
    /* background: rgb(228, 228, 228); */
    color:white;
    padding: 10px;
    padding-inline: 50px;
    border-radius: 6px;
}

.secondContent{
    background: linear-gradient(45deg, #3e3e3e, #e09437);
    /* background: rgb(228, 228, 228); */
    color:white;
    padding:10px;
    padding-inline: 50px;
    border-radius: 6px;
}

button{
    background: linear-gradient(45deg, #af1b1b, #db8722);
    /* background: rgb(228, 228, 228); */
    color:white;
    padding:10px;
    padding-inline: 50px;
    border-radius: 6px;
    border:none;
    margin: 10px;
    font-size: 1.5em;
    cursor: pointer;
}
</style>
