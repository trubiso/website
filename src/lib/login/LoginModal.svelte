<script lang="ts">
	import { lock } from '$lib/stores';
	import { onMount } from 'svelte';
	import './LoginModal.scss';
	import LoginModalForm from './LoginModalForm.svelte';

	export let onClose = () => {};

	onMount(() => {
		lock.set(true);
	});

	function close() {
		lock.set(false);
		onClose();
	}
</script>

<main class="login-modal">
	<div class="obstruct" on:click={close} />
	<div class="form">
		<!--<button on:click={close} style="z-index: 200;">I am done !</button>-->
		<LoginModalForm />
	</div>
</main>
