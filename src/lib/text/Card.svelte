<script lang="ts">
	import './Card.scss';
</script>

<main class="card">
	<div class="card-timestamp"><slot name="timestamp" /></div>
	<div class="card-title"><slot name="title" /></div>
	<div class="card-answer"><slot name="answer" /></div>
</main>
