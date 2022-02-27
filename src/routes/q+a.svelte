<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
    import type { qa } from '@prisma/client';

	export const load: Load = async ({ fetch }) => {
		const { questions } = await fetch('/api/fetchQuestions').then(r => r.json());
		return {
			props: {
				questions
			}
		};
	};
</script>

<script lang="ts">
    export let questions : qa[];
</script>

{#each questions as question} 
    <div class="question">
        {new Date(question.created_at)}
        <div class="question-title">
            {question.question}
        </div>
        <div class="question-body">
            {question.answer}
        </div>
    </div>
{/each}
