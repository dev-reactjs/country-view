export const pieData = [
    { date: 0, value: 100 }
];

// Melbourne and Sydney lat long saved to mark circle on it
export const markerData = [
     { latitude: -37.400935, longitude: 144.346457, id: "mel" },
     { latitude: -33.665143, longitude: 150.009900, id: "sed" }
]

// Australia lat long used as default
export const defaultLocation = {
    longitude: 133.817201,
    latitude: -25.712759,
    zoom: 2.6,
    width: "100vw",
    height: "100vh",
}

export const animationDuration = 250;

export const animationConfig = {
    to: async (next) => {
      await next({ t: 1 });
    },
    from: { t: 0 },
    config: { duration: animationDuration },
    reset: true
}

export const PAINT_MAP_POLYGON = { 'fill-color': '#228b22', 'fill-opacity': 0.4 };
