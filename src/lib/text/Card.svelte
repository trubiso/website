<script lang="ts">
	import './Card.scss';
	import EmoteZone from './EmoteZone.svelte';
	import Markup from './Markup.svelte';
</script>

<main class="card">
	<div class="card-timestamp">
		<slot name="timestamp" />
	</div>

	<div class="card-title">
		<Markup>
			<EmoteZone>
				<slot name="title" />
			</EmoteZone>
		</Markup>
	</div>

	<div class="card-body">
		<Markup>
			<EmoteZone>
				<slot name="body" />
			</EmoteZone>
		</Markup>
	</div>

	<div class="card-footer">
		<Markup>
			<EmoteZone>
				<slot name="footer">
					<span />
				</slot>
			</EmoteZone>
		</Markup>
	</div>
</main>
