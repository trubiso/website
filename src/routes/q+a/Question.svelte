<script lang="ts">
  import './Question.scss';
	import { dateFormat } from "$lib/functions";
	import type { qa } from "@prisma/client";

  export let question: qa;
</script>

<main class="question">
  <div class="question-timestamp">
    {dateFormat(new Date(question.created_at))}
  </div>
  <div class="question-title">
    <b>{question.question}</b>
  </div>
  <div class="question-answer">
    {question.answer}
  </div>
</main>