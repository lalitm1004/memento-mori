<script lang="ts">
	import { birthDateState } from "$lib/stores/BirthDate.svelte";
	import generateCalendarGrid from "$lib/utils/generateCalendarGrid";
	import Week from "./Week.svelte";
	import { cubicInOut } from "svelte/easing";
	import { Tween } from "svelte/motion";

	const calendarGrid = generateCalendarGrid();

	const progressTween = new Tween(0, { duration: 1000, easing: cubicInOut });

	$effect(() => {
		const weeksLived = birthDateState.weeksLived;
		if (weeksLived) {
			progressTween.set(0, { duration: 0 });
			progressTween.set(weeksLived);
		} else {
			progressTween.set(0, { duration: 0 });
		}
	});
</script>

<svg viewBox={`0 0 1920 3240`}>
	{#each calendarGrid as cell, idx}
		<Week
			week_number={idx + 1}
			tween_current={progressTween.current}
			{...cell}
		/>
	{/each}
</svg>
