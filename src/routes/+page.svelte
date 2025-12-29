<script lang="ts">
    import BirthDateInput from "$lib/components/BirthDateInput.svelte";
    import Header from "$lib/components/Header.svelte";
</script>

<main
    class={`min-h-dvh md:w-[67ch] flex flex-col items-center md:mx-auto mx-4`}
>
    <Header />

    <BirthDateInput />
</main>
