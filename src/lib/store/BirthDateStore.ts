import { derived, writable, type Readable } from "svelte/store";

export const BirthDateStore = writable<Date | null>(null);

export const WeeksLivedStore: Readable<number | null> = derived(
    [BirthDateStore],
    ([$birthDate]): number | null => {
        if (!$birthDate) {
            return null;
        }

        const now = new Date();
        const diffMs = now.getTime() - $birthDate.getTime();
        const weeksLived = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
        return weeksLived;
    }
)