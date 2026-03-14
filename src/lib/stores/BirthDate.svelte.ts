import { MS_PER_WEEK } from '$lib/constants';

class BirthDateState {
    birthDate: Date | null = $state(null);

    weeksLived: number | null = $derived.by(() => {
        if (!this.birthDate) return null;
        const diffMs = Date.now() - this.birthDate.getTime();
        return Math.floor(diffMs / MS_PER_WEEK);
    });

    setBirthDate(date: Date | null) {
        this.birthDate = date;
    }

    reset() {
        this.birthDate = null;
    }
}

export const birthDateState = new BirthDateState();
