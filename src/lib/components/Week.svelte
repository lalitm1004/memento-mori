<script lang="ts">
    interface Props {
        week_number: number;
        tween_current: number;
        x: number;
        y: number;
    }
    const { week_number, tween_current, x, y }: Props = $props();

    const BOX_SIZE_PX = 25;

    const isFilled = $derived(week_number <= tween_current);

    const FILLED_COLOR = "#000000";
    const STROKE_COLOR = "#000000";
    const BG_COLOR = "#FEF9C2";
</script>

<rect
    id={week_number.toString()}
    height={BOX_SIZE_PX}
    width={BOX_SIZE_PX}
    {x}
    {y}
    stroke={STROKE_COLOR}
    fill={isFilled ? FILLED_COLOR : BG_COLOR}
>
    <title>Week {week_number}</title>
</rect>
