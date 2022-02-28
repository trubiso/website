<script lang="ts">
	import type { qa } from '@prisma/client';
	import { formatDate } from './vars';
    import { scale } from 'svelte/transition';
    import './question.scss';
import EmoteText from './emoteText.svelte';

	export let question: qa;
</script>

<div class="question" transition:scale>
	<div class="question-timestamp">
		{formatDate(new Date(question.created_at))}
	</div>
	<div class="question-title">
        <EmoteText text={question.question} />
	</div>
	<div class="question-answer">
		<EmoteText text={question.answer} html />
    </div>
</div>
