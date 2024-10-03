<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { ContactShadows, Float, Grid, OrbitControls, HTML } from '@threlte/extras';
	import { interactivity } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { cubicOut, expoInOut } from 'svelte/easing';
	import ToyCar from './models/toyCar.svelte';
	import Arrow from './custom-model/arrow.svelte';
	import Road from './models/ROAD.svelte';
	import Typewriter from 'svelte-typewriter';
	import {
		BoxGeometry,
		Vector3,
		MeshStandardMaterial,
		Group,
		type Object3DEventMap,
		PerspectiveCamera
	} from 'three';
	import BuildingPack from './custom-model/buildingPack.svelte';
	import { layers } from '@threlte/extras';
	import { tweened } from 'svelte/motion';
	import { AutoColliders, CollisionGroups, Debug } from '@threlte/rapier';
	import type { ActionName } from './models/toyCar.svelte';
	import { mapValue } from '../../utils';

	import MySkill from './ui/mySkill.svelte';

	layers();

	interactivity();

	let showOptions = true;
	let spotLightPos = spring(2);
	let spotLightIntensity = spring(4);
	let spotLightAngle = spring(Math.PI);
	let carPosZ = tweened(-10, { duration: 2000, easing: cubicOut });
	let carPosZ2 = tweened(0, { duration: 1000, easing: expoInOut });
	let directionalLightIntensity = spring(0.1);
	let cameraPosY = spring(0, { stiffness: 0.05, damping: 0.4 });
	let userDetailState: 'main' | 'menu' | 'projects' | 'skills' | 'find-me' = 'main';

	let cameraPosForCarZ = 0;

	let isMenuShown = false;
	let isContentShown = false;

	let cameraGroupRotation = spring(0, { stiffness: 0.01, damping: 0.3 });
	let isRotating = false;
	let rotationDirection = 1; // 1 for clockwise, -1 for
	let carIsMoving: 1 | -1 | 0 = 0;
	let carPosZFinal = 0;
	let carPosPrevZ = 0;
	let toyCarRef: (Group<Object3DEventMap> & Group<Object3DEventMap>) | undefined;
	let playAnimation: (animationName: ActionName) => void;
	let stopAnimation: (animationName: ActionName) => void;
	let playForwardMovingAnimation: (increaseRate: number) => void;
	let playBackwardMovingAnimation: (increaseRate: number) => void;
	let stopMovingAnimation: () => void;

	let forwardWheelRotation = 0;
	let backwardWheelRotation = 0;

	let buildingPackScale = tweened(0, { duration: 300, delay: 300, easing: cubicOut });

	function handleExplore() {
		showOptions = false;
		$spotLightPos = 5;
		$spotLightIntensity = 15;
		$spotLightAngle = Math.PI / 6;
		$cameraPosY = 0.1;
		$carPosZ = 0;
	}
	let cameraVector: Vector3 = new Vector3(0, $cameraPosY, 10);
	$: {
		cameraVector = new Vector3(0, $cameraPosY, 10);
	}
	let animationAngle = 0;

	function handleBasicMode() {
		// Implement basic mode logic here
		console.log('Switching to basic mode');
	}

	let JourneyStarted = false;
	let shouldMySkillbeShown = false;
	let wasJourneyStarted = false;

	function startJourney() {
		animationAngle = 0;
		JourneyStarted = true;
		wasJourneyStarted = true;
		isMenuShown = false;
		isContentShown = true;
		isRotating = true;
		rotationDirection = 1; // Rotate clockwise
		cameraVector = new Vector3(0, $cameraPosY, 10);
	}


	useTask((delta) => {
		if (JourneyStarted && cameraPosForCarZ < 18) {
			shouldGoRight = false;
			carIsMoving = -1;
			isContentShown = true;
			carPosZFinal = $carPosZ - 1;
			forwardWheelRotation -= 0.1;
			backwardWheelRotation -= 0.1;
			cameraRef.lookAt(0, 0, carPosZFinal);
			setCarPosZ(carPosZFinal);
		}
		if (cameraPosForCarZ >= 18) {
			JourneyStarted = false;
			shouldGoLeft = true;
			shouldGoRight = true;
			carIsMoving = 0;
		}
		if (cameraPosForCarZ <= -8) {
			shouldMySkillbeShown = true;
		} else {
			shouldMySkillbeShown = false;
		}

		if(cameraPosForCarZ <= 0 && wasJourneyStarted){
			isContentShown = false;
		}
	});

	function handleBack() {
		if (userDetailState === 'menu') {
			animationAngle = 0; // Reset animation angle
			isRotating = true;
			rotationDirection = -1; // Rotate counterclockwise
			$buildingPackScale = 0;
		}
	}

	function handleProject() {}

	useTask((delta) => {
		if (Math.abs(animationAngle) > Math.PI / 2) {
			isRotating = false;
			// this means we were at main and it will go to menu
			if (userDetailState === 'main' && rotationDirection === 1) {
				userDetailState = 'menu';
				isMenuShown = false;
				$buildingPackScale = 1;
			} else if (userDetailState === 'menu' && rotationDirection === -1) {
				userDetailState = 'main';
				isMenuShown = false;
			}
		} else {
			if (isRotating) {
				animationAngle += delta * 1.1 * rotationDirection;
				let diffAngle;
				if (userDetailState === 'menu') {
					diffAngle =
						cameraVector.angleTo(new Vector3(-10, $cameraPosY, 0)) - Math.abs(animationAngle);
				} else if (userDetailState === 'main') {
					diffAngle =
						cameraVector.angleTo(new Vector3(0, $cameraPosY, 10)) - Math.abs(animationAngle);
					shouldGoRight = false;
					carPosZFinal = $carPosZ - 1;
					forwardWheelRotation -= 0.1;
					backwardWheelRotation -= 0.1;
					cameraRef.lookAt(0, 0, carPosZFinal);
					setCarPosZ(carPosZFinal);
				}
				if (diffAngle) {
					cameraVector = cameraVector.applyAxisAngle(
						new Vector3(0, 1, 0),
						diffAngle * rotationDirection
					);
				}
			}
		}
	});

	$: {
		if ($carPosZ > -5 && !wasJourneyStarted) {
			isContentShown = true;
			// isMenuShown = true;
		}
	}

	let shouldGoLeft = true;
	let shouldGoRight = true;

	$: {
		if (carIsMoving !== 0 && !JourneyStarted) {
			cameraPosForCarZ = $carPosZ * -1;
		}
		if (JourneyStarted) {
			cameraPosForCarZ = $carPosZ * -1;
		}
	}

	const setCarPosZ = async (posZ: number) => {
		await carPosZ.set(posZ);
		shouldGoLeft = true;
		shouldGoRight = true;
		carIsMoving = 0;
		stopMovingAnimation();
		console.log('finished moving');
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowRight' && shouldGoRight) {
			carIsMoving = 1;
			shouldGoLeft = false;
			carPosZFinal = $carPosZ + carIsMoving;
			forwardWheelRotation += 0.1;
			backwardWheelRotation += 0.1;
			cameraRef.lookAt(0, 0, carPosZFinal);
			setCarPosZ(carPosZFinal);
		}
		if (e.key === 'ArrowLeft' && shouldGoLeft) {
			carIsMoving = -1;
			shouldGoRight = false;
			carPosZFinal = $carPosZ + carIsMoving;
			forwardWheelRotation -= 0.1;
			backwardWheelRotation -= 0.1;
			cameraRef.lookAt(0, 0, carPosZFinal);
			setCarPosZ(carPosZFinal);
		}
	};
	$: {
		if (cameraRef) {
			cameraRef.lookAt(0, 0, cameraPosForCarZ);
		}
	}

	let cameraRef: PerspectiveCamera;
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<T.Group position={cameraVector.toArray()} layers={'all'}>
	<T.Group position.z={cameraPosForCarZ}>
		<T.PerspectiveCamera
			makeDefault
			fov={20}
			on:create={({ ref }) => {
				cameraRef = ref;
				// cameraRef.lookAt(0,0,cameraPosForCarZ)
			}}
		>
			<OrbitControls enableZoom={false} enableDamping enabled={!isRotating} />
		</T.PerspectiveCamera>
	</T.Group>
</T.Group>

<T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
	<T.CircleGeometry args={[200, 40]} postion={{ y: 10 }} />
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
<CollisionGroups groups={[0]}>
	<T.Group position.z={$carPosZ} scale={0.13} rotation.y={0} layers={[1]}>
		<T.Group position.z={$carPosZ2}>
			<ToyCar
				ref={toyCarRef}
				bind:playAnimation
				bind:stopAnimation
				bind:playForwardMovingAnimation
				bind:playBackwardMovingAnimation
				bind:stopMovingAnimation
				bind:forwardWheelRotation
				bind:backwardWheelRotation
			/>
		</T.Group>
	</T.Group>
</CollisionGroups>

<!-- <AutoColliders shape={'cuboid'}>
	<T.Mesh
		receiveShadow
		castShadow
		position={[0, 1, 10]}
		geometry={new BoxGeometry(60, 2.55, 0.15)}
		material={new MeshStandardMaterial({
			transparent: true,
			opacity: 0.5,
			color: 0x333333
		})}
	/>
</AutoColliders> -->

<T.Group scale={[0.5, 0.001, 0.5]} position.y={0}>
	<Road />
</T.Group>

<T.Group scale={$buildingPackScale}>
	<BuildingPack />
</T.Group>

{#if shouldMySkillbeShown}
	<T.Group>
		<MySkill {cameraPosForCarZ} />
	</T.Group>
{/if}

{#if isContentShown}
	<HTML transform position.z={-10} position.y={2} scale={0.2}>
		<div class={isContentShown ? "" : "hide"}>
		<div class="hero">
			<Typewriter mode="concurrent">
				<h1>Welcome to My World</h1>
			</Typewriter>
			<Typewriter mode="loop">
				<p>
					Hi, I'm <strong class="high head-high">Rabin Lamichhane</strong>, a passionate
					<strong class="high">developer</strong> with a knack for creating dynamic and responsive applications.
					With a strong foundation in JavaScript, Svelte, and modern web technologies, I strive to build
					user-friendly and efficient solutions. Explore my projects and get to know more about my work.
				</p>
			</Typewriter>
		<div tabindex="1" role="button" class="project" on:click={startJourney}>
			Let's Start the Journey !
			<svg
				width="40"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="size-6"
			>
				<path
					fill-rule="evenodd"
					d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>
		</div>
	</div>
	</HTML>


{/if}


{#if showOptions}
	<HTML position.y={0.1} position.z={0} scale={0.3} transform>
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
	h3 {
		margin: 0;
		padding: 0;
		color: white;
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
		transition:
			background-color 0.3s,
			transform 0.2s;
	}
	button.orange {
		background-color: #d45628;
	}
	button.orange:hover {
		background-color: #d45628;
	}
	button:active {
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
	.hero h1 {
		font-size: 2.8rem;
	}
	.hero p {
		font-size: 1.5em;
		line-height: 3ch;
	}
	.project {
		width: 400px;
		margin-left: auto;
		background-color: transparent;
		padding: 20px;
		border-radius: 10px;
		border: 2px solid #3c4659;
		color: black;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
		font-size: 2em;
		cursor: pointer;
		display: flex;
		justify-content: center;
		gap: 10px;
	}
	.project:hover {
		background-color: #222731;
		color: white;
	}
	.high {
		background-color: rgb(76, 73, 73);
		color: white;
		padding: 5px 10px;
		font-size: 1.6em;
		border-radius: 5px;
	}
	.head-high {
		background-color: rgb(190, 100, 100);
	}
	.hide{
		display: none;
	}
</style>
