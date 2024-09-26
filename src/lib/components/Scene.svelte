<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls, HTML } from '@threlte/extras'
  import { interactivity } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import ToyCar from './models/toyCar.svelte';
	import Arrow from './custom-model/arrow.svelte';
	import Road from './models/ROAD.svelte';

  interactivity()

  let showOptions = true
  let spotLightPos = spring(2)
  let spotLightIntensity = spring(4)
  let spotLightAngle = spring(Math.PI)
  let carPosZ = spring(-10, { stiffness: 0.005, damping: 0.2 })
  let directionalLightIntensity = spring(0.1)
  let cameraPosY = spring(0, { stiffness: 0.05, damping: 0.4 })
  function handleExplore() {
    showOptions = false
    $spotLightPos = 5
    $spotLightIntensity = 15
    $spotLightAngle = Math.PI / 6
    $cameraPosY = 0.1
    $carPosZ = 0
  }

  function handleBasicMode() {
    // Implement basic mode logic here
    console.log("Switching to basic mode")
  }

</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, $cameraPosY, 10]}
  fov={20}
>
  <OrbitControls
    enableZoom={false}
    enableDamping
  />
</T.PerspectiveCamera>

<T.Mesh
  rotation.x={-Math.PI / 2}
  receiveShadow
>
  <T.CircleGeometry args={[200, 40]} postion={{y:10}} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh>

<!-- <T.AmbientLight intensity={2} /> -->

<!-- <T.DirectionalLight 
  position={[5, 3, 0]} 
  intensity={$directionalLightIntensity} 
  castShadow
/> -->

<T.SpotLight
  position={[0, $spotLightPos, 0]}
  intensity={$spotLightIntensity}
  angle={$spotLightAngle}
  penumbra={1}
  castShadow
/>
<T.Group position.z={$carPosZ} scale={0.13} rotation.y={0}>
  <ToyCar/>
</T.Group>

<!-- <Arrow/> -->

<T.Group scale={[0.5,0.001,0.5]}  position.y={0}>
  <Road/>
</T.Group>

<HTML transform position.z={-10} position.y={3} scale={0.2}>
<div class="hero">
  <h1>Welcome to My Portfolio</h1>
  <p>Hi, I'm Alex, a passionate web developer with a knack for creating dynamic and responsive web applications. With a strong foundation in JavaScript, Svelte, and modern web technologies, I strive to build user-friendly and efficient solutions. Explore my projects and get to know more about my work.</p>
</div>
</HTML>




{#if showOptions}
<HTML
position.y={0.1}
position.z={0}
scale={0.3}
transform
>
<div class="card">
  <h3>Choose your mode</h3>
  <div class="group">
    <button on:click={handleBasicMode}>Basic Mode</button>
    <button class="orange" on:click={handleExplore}>Explore</button>
  </div>
</div>
</HTML>
{/if}


<style>
  h3{
    margin:0;
    padding:0;
    color:white;
    font-family: 'Courier New', Courier, monospace;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    border: 2px solid #3c4659;
  }

  button {
    margin: 10px;
    padding: 5px 10px;
    font-size: 18px;
    cursor: pointer;
    background-color: #3c4659;
    color: white;
    border: 2px solid #1e1e1e;
    border-radius: 10px;
    transition: background-color 0.3s, transform 0.2s;
  }
  button.orange{
    background-color: #d45628;
  }
  button.orange:hover{
    background-color: #d45628;
  }
  button:active{
    background-color: #1e1e1e;
    transform: scale(0.95);
  }

  button:hover {
    background-color: #202621;
    transform: scale(1.05);
  }

  button:active {
    background-color: #1e1e1e;
    transform: scale(0.95);
  }

  
</style>





