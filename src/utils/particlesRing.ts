const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 2;
const LEFT_COLOR = "00B2A9";
const RIGHT_COLOR = "00C4B2";
const NUM_POINTS = 2500;

/**
 * --- Credit ---
 * https://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position
 */
const getGradientStop = (ratio: number) => {
    // Clamp ratio to the range [0, 1]
    ratio = Math.min(Math.max(ratio, 0), 1);

    // Match two-character groups in the hexadecimal color string
    const c0 = LEFT_COLOR.match(/.{1,2}/g)?.map((oct) => parseInt(oct, 16) * (1 - ratio)) ?? [];
    const c1 = RIGHT_COLOR.match(/.{1,2}/g)?.map((oct) => parseInt(oct, 16) * ratio) ?? [];

    // Ensure both arrays have exactly 3 elements, defaulting to 0 if not
    const ci = [0, 1, 2].map((i) => {
        const base0 = c0[i] || 0; // Default to 0 if undefined
        const base1 = c1[i] || 0; // Default to 0 if undefined
        return Math.min(Math.round(base0 + base1), 255);
    });

    const color = ci
        .reduce((a, v) => (a << 8) + v, 0)
        .toString(16)
        .padStart(6, "0");

    return `#${color}`;
};


const calculateColor = (x: number) => {
    const maxDiff = MAX_RADIUS * 2;
    const distance = x + MAX_RADIUS;

    const ratio = distance / maxDiff;

    const stop = getGradientStop(ratio);
    return stop;
};

const randomFromInterval = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

export const pointsInner = Array.from(
    { length: NUM_POINTS },
    (v, k) => k + 1
).map((num) => {
    const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
    const randomAngle = Math.random() * Math.PI * 2;

    const x = Math.cos(randomAngle) * randomRadius;
    const y = Math.sin(randomAngle) * randomRadius;
    const z = randomFromInterval(-DEPTH, DEPTH);

    const color = calculateColor(x);

    return {
    idx: num,
    position: [x, y, z],
    color,
    };
});

export const pointsOuter = Array.from(
    { length: NUM_POINTS / 4 },
    (v, k) => k + 1
).map((num) => {
    const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
    const angle = Math.random() * Math.PI * 2;

    const x = Math.cos(angle) * randomRadius;
    const y = Math.sin(angle) * randomRadius;
    const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);

    const color = calculateColor(x);

    return {
    idx: num,
    position: [x, y, z],
    color,
    };
});