<script lang="ts">
	import cookie from 'cookie';
	import { onMount } from 'svelte';
	let username: string;
	let password: string;

	async function submitLogin() {
		const req = await fetch(`/api/user/log`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		});
		const result = await req.json();

		switch (req.status) {
			case 500:
				alert(`error: ${result.body.error}\n${result.body.message}`);
				break;
			case 200:
				document.cookie = result.body.usernameCookie;
				alert('login successful');
				break;
			default:
				alert(`unhandled status ${req.status}`);
				break;
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
			const req = await fetch(url, {
				method: 'GET'
			});
			const result = await req.json();

			switch (req.status) {
				case 500:
					alert(`error: ${result.body.error}\n${result.body.message}`);
					break;
				case 200:
					document.cookie = result.body.usernameCookie;
					alert('logout successful');
					break;
				default:
					alert(`unhandled status ${req.status}`);
					break;
			}

			changeMsg();
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
