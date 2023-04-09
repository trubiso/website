<script lang="ts">
	import { lock } from '$lib/stores';
	import { createEventDispatcher, onMount } from 'svelte';
	import './LoginModal.scss';
	import LoginModalForm from './LoginModalForm.svelte';

	onMount(() => {
		lock.set(true);
	});

	function close() {
		lock.set(false);
		dispatch('close');
	}

	const dispatch = createEventDispatcher();
</script>

<main class="login-modal">
	<div class="obstruct" on:click={close} />
	<div class="form">
		<!--<button on:click={close} style="z-index: 200;">I am done !</button>-->
		<LoginModalForm on:login on:loginSuccess={close} />
	</div>
</main>
