<script lang="ts">
    let msPassed = $state(0);
    let msTotal = $state(0);
    let percentage = $state(0);
    let currentYear = $state(0);

    const updateTimeMetrics = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();

        if (currentYear !== 0 && year !== currentYear) {
            currentYear = year;
            msPassed = 0;
            msTotal = 0;
            percentage = 0;
        } else {
            currentYear = year;
        }

        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year + 1, 0, 1);

        msPassed = currentDate.getTime() - startOfYear.getTime();
        msTotal = endOfYear.getTime() - startOfYear.getTime();
        percentage = (msPassed / msTotal) * 100;
    };

    $effect(() => {
        updateTimeMetrics();
        const intervalId = setInterval(updateTimeMetrics, 16);
        return () => clearInterval(intervalId);
    });
</script>

<main class={`relative h-dvh w-dvw grid place-items-center`}>
    <div class={`bg-yellow-100 md:px-14 p-6 rounded-md`}>
        <p class={`md:text-xl text-lg`}>
            The year is
            {percentage ? percentage.toFixed(14) : "----------"}
            % over
        </p>
    </div>
</main>
