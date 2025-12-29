<script lang="ts">
    import { WeeksLivedStore } from "$lib/store/BirthDateStore";
    import { Progress } from "bits-ui";
    import { onMount } from "svelte";
    import { cubicInOut } from "svelte/easing";
    import { Tween } from "svelte/motion";

    const MAX_WEEKS_LIVED = 80 * 52;

    const progressTween = new Tween(0, { duration: 1000, easing: cubicInOut });
    const scaleTween = new Tween(0, { duration: 200, easing: cubicInOut });

    WeeksLivedStore.subscribe((value) => {
        if (value) {
            progressTween.set(0, { duration: 0 });
            progressTween.set((value / MAX_WEEKS_LIVED) * 100);
        }
    });

    onMount(() => {
        scaleTween.set(1);
    });
</script>

<Progress.Root
    value={Math.round(progressTween.current)}
    max={100}
    class={`relative h-2.5 w-full bg-yellow-100 overflow-hidden border rounded-full`}
    style={`transform: scaleY(${scaleTween.current}); transform-origin: center;`}
>
    <div
        class={`h-full w-full rounded-full bg-black`}
        style={`transform: translateX(-${100 - (100 * (progressTween.current ?? 0)) / 100}%)`}
    ></div>
</Progress.Root>
