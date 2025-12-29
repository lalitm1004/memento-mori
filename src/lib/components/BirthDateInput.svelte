<script lang="ts">
    import { BirthDateStore } from "$lib/store/BirthDateStore";
    import checkDateValidity, { parseDate } from "$lib/utils/checkDateValidity";
    import { Button, Label } from "bits-ui";
    import gsap from "gsap";

    let birthDate: string = $state("");
    const isDateValid = $derived(checkDateValidity(birthDate));

    let inputLabel: HTMLDivElement;
    let inputField: HTMLDivElement;
    let submitButton: HTMLDivElement;

    const ANIMATION_CONFIG = {
        duration: 0.5,
        ease: "elastic.out(1, 0.75)",
    };

    const POSITIONS = {
        valid: { input: -24, button: 108 },
        invalid: { input: 0, button: 0 },
    };

    const animateElements = (isValid: boolean) => {
        const position = isValid ? POSITIONS.valid : POSITIONS.invalid;
        const elements = [
            { el: inputLabel, x: position.input },
            { el: inputField, x: position.input },
            { el: submitButton, x: position.button },
        ];

        elements.forEach(({ el, x }) => {
            if (el) {
                gsap.to(el, { x, ...ANIMATION_CONFIG });
            }
        });
    };

    $effect(() => {
        if (inputLabel && inputField && submitButton) {
            animateElements(isDateValid);
        }
    });

    const handleSubmit = () => {
        if (isDateValid) {
            const { day, month, year } = parseDate(birthDate)!;
            BirthDateStore.set(new Date(year, month - 1, day));
        } else {
            BirthDateStore.set(null);
        }
    };
</script>

<form class={`relative w-50 flex flex-col`}>
    <div bind:this={inputLabel}>
        <Label.Root
            id={`birthdate-input-label`}
            for={`birthdate-input`}
            class={`w-full text-sm ml-2 mb-1`}
        >
            Enter your birthdate
        </Label.Root>
    </div>

    <div class={`relative h-16 flex items-center`}>
        <input
            bind:this={inputField}
            bind:value={birthDate}
            id={`birthdate-input`}
            aria-labelledby={`birthdate-input-label`}
            class={`z-10 w-50 h-16 bg-yellow-100 px-2 mr-2 text-xl border rounded-md opacity-100 focus:outline-none focus:ring-0`}
            placeholder={`DD/MM/YYYY`}
        />

        <div
            bind:this={submitButton}
            class={`absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2`}
        >
            <Button.Root
                id={`submit-button`}
                onclick={handleSubmit}
                disabled={!isDateValid}
                class={`h-12 aspect-square bg-transparent hover:bg-neutral-800/10 grid place-items-center border rounded-full cursor-pointer transition-colors duration-200`}
            >
                {@render skullSvg()}
            </Button.Root>
        </div>
    </div>
</form>

{#snippet skullSvg()}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class={`h-6 aspect-square fill-none stroke-current stroke-2 lucide lucide-skull-icon lucide-skull`}
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="m12.5 17-.5-1-.5 1h1z" />
        <path
            d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"
        />
        <circle cx="15" cy="12" r="1" />
        <circle cx="9" cy="12" r="1" />
    </svg>
{/snippet}
