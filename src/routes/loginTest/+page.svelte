<script lang="ts">
	import { interpretLog, isPositiveResult } from '$lib/api';
	import cookie from 'cookie';
	import { onMount } from 'svelte';
	let username: string;
	let password: string;

	async function submitLogin() {
		const res = await fetch(`/api/user/log`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		});
		const interpreted = await interpretLog<true>(res);

		if (isPositiveResult(interpreted)) {
			document.cookie = interpreted.usernameCookie;
			alert('login successful');
		} else {
			alert(`error: ${interpreted.error}\n${interpreted.message}`);
		}

		changeMsg();
	}

	function submitLogout(all: boolean) {
		return async () => {
			const cookies = cookie.parse(document.cookie);
			const username = cookies['username'];
			if (username === null) {
				alert('not logged in');
			}

			let url = `/api/user/log?username=${username}`;
			if (all) url += '&all';
			const res = await fetch(url, {
				method: 'GET'
			});
			const interpreted = await interpretLog<false>(res);

			if (isPositiveResult(interpreted)) {
				document.cookie = interpreted.usernameCookie;
				alert('logout successful');
			} else {
				alert(`error: ${interpreted.error}\n${interpreted.message}`);
			}

			changeMsg();
			location.reload();
		};
	}

	let msg = '';
	function changeMsg() {
		const cookies = cookie.parse(document.cookie);
		if (cookies['username']) msg = `logged in as ${cookies['username']}`;
		else msg = 'not logged in';
	}

	onMount(() => {
		changeMsg();
	});
</script>

<main>
	<h1>login</h1>
	{msg}
	<form on:submit|preventDefault={submitLogin}>
		<label for="username">username</label>
		<input type="text" name="username" id="username" bind:value={username} />
		<label for="password">password</label>
		<input type="password" name="password" id="password" bind:value={password} />
		<input type="submit" value="log in" />
	</form>
	<form on:submit|preventDefault={submitLogout(false)}>
		<input type="submit" value="log out" />
	</form>
	<form on:submit|preventDefault={submitLogout(true)}>
		<input type="submit" value="log out (from all)" />
	</form>
</main>
