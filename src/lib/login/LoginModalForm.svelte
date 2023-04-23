<script lang="ts">
	import { isPositiveResult } from '$lib/api';
	import { api } from '$lib/apiInteract';
	import { t } from '$lib/localization';
	import Emote from '$lib/text/Emote.svelte';
	import { createEventDispatcher } from 'svelte';
	import './LoginModalForm.scss';

	let registering = false;
	$: current = <'register' | 'login'>(registering ? 'register' : 'login');
	let inProgress = false;

	let username: string;
	let password: string;
	let passwordConfirm: string;

	const dispatch = createEventDispatcher();
	async function submit() {
		inProgress = true;
		if (registering) return alert('TODO: registering');

		const req = await api('user/login', { username, password });

		if (isPositiveResult(req)) {
			document.cookie = req.usernameCookie;
		} else {
			alert($t(`login.loginError_${req.error}`));
			alert(`error: ${req.error}\n${req.message}`);
		}

		inProgress = false;
		dispatch('login');
		if (isPositiveResult(req)) dispatch('loginSuccess');
	}

	function switchMode() {
		registering = !registering;
	}
</script>

<main class="login-modal-form">
	{#if inProgress}
		<span class="progress-text">
			{$t(`login.${current}InProgress`)}
		</span>
		<div class="spinner">
			<Emote name="silly" spinning scaling />
		</div>
	{:else}
		<form on:submit|preventDefault={submit} class:registering>
			<h1 class="title">{$t(`login.${current}Title`)}</h1>

			<div class="input">
				<label for="username">{$t('login.username')}</label>
				<input
					type="text"
					name="username"
					id="username"
					placeholder={$t('login.usernamePlaceholder')}
					bind:value={username}
				/>
			</div>
			<div class="input">
				<label for="password">{$t('login.password')}</label>
				<input
					type="password"
					name="password"
					id="password"
					placeholder={$t('login.passwordPlaceholder')}
					bind:value={password}
				/>
			</div>
			{#if registering}
				<div class="input">
					<label for="passwordConfirm">{$t('login.passwordConfirm')}</label>
					<input
						type="passwordConfirm"
						name="passwordConfirm"
						id="passwordConfirm"
						placeholder={$t('login.passwordConfirmPlaceholder')}
						bind:value={passwordConfirm}
					/>
				</div>
			{/if}

			<div class="button">
				<input type="submit" value={$t(`login.${current}Button`)} />
			</div>
		</form>

		<a class="switch" href="#h" on:click|preventDefault={switchMode}>
			{$t(`login.${current}Switch`)}
		</a>
	{/if}
</main>
