type Coordinates = {
    x: number,
    y: number,
};

const generateCalendarGrid = (): Coordinates[] => {
    const INITIAL_X = 55;
    const INITIAL_Y = 55;
    const BOX_WIDTH = 25;
    const GAP = 10;
    const MOAT = 50;
    const WEEKS_PER_ROW = 52;
    const TOTAL_ROWS = 80;

    const coords = [];

    for (let row = 0; row < TOTAL_ROWS; row++) {
        const extraMoats = Math.floor(row / 10);

        const y = INITIAL_Y + row * (BOX_WIDTH + GAP) + extraMoats * MOAT;

        for (let col = 0; col < WEEKS_PER_ROW; col++) {
            const x = INITIAL_X + col * (BOX_WIDTH + GAP);

            coords.push({ x, y });
        }
    }

    return coords;
}

export default generateCalendarGrid;