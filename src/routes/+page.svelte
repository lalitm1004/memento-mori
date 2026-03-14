<script lang="ts">
	import BirthDateInput from "$lib/components/BirthDateInput.svelte";
	import Calendar from "$lib/components/Calendar.svelte";
	import Header from "$lib/components/Header.svelte";
	import { birthDateState } from "$lib/stores/BirthDate.svelte";

	$effect(() => {
		birthDateState.reset();
	});
</script>

<main
	class={`max-h-fit min-h-dvh md:w-[67ch] flex flex-col items-center md:mx-auto mx-4`}
>
	<Header />

	<BirthDateInput />

	<Calendar />
</main>
