<script lang="ts">
    import { Button } from "bits-ui";
    import ProgressBar from "./ProgressBar.svelte";
    import { BirthDateStore } from "$lib/store/BirthDateStore";
</script>

<header class={`w-full flex flex-col items-center gap-4`}>
    <h1 class={`md:text-7xl text-4xl`}>Memento Mori</h1>

    <div class={`w-full flex flex-col gap-2`}>
        {#if $BirthDateStore}
            <ProgressBar />
        {:else}
            <div class={`h-2.5 w-full grid place-items-center`}>
                <hr class={`w-full border rounded-md`} />
            </div>
        {/if}

        <div class={`w-full flex justify-between px-10`}>
            <Button.Root class={`w-15 hover:text-neutral-500`} href={`/year`}>
                Year
            </Button.Root>

            <Button.Root
                class={`w-15 hover:text-neutral-500`}
                href={`https://github.com/lalitm1004/memento-mori`}
                target={`_blank`}
                rel={`noopener noreferrer`}
            >
                Github
            </Button.Root>
        </div>
    </div>
</header>
