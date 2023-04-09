<script lang="ts">
	import { t } from '$lib/localization';
	import './LoginModalForm.scss';

	let registering = false;
	$: current = <'register' | 'login'>(registering ? 'register' : 'login');

	let username: string;
	let password: string;
	let passwordConfirm: string;

	function submit() {}

	function switchMode() {
		registering = !registering;
	}
</script>

<main class="login-modal-form">
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
</main>
