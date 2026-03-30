/* ============================================================
   THE TEA JOURNEY — Maps (Leaflet)
   ============================================================ */

const MAPS = {};
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

const TERRAIN_TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
const TERRAIN_ATTR = 'Tiles &copy; Esri &mdash; Sources: Esri, DeLorme, USGS, NPS';

function createMap(containerId, center, zoom, opts = {}) {
    const tileUrl = opts.vintage ? TERRAIN_TILE : TILE_URL;
    const tileAttr = opts.vintage ? TERRAIN_ATTR : TILE_ATTR;

    const map = L.map(containerId, {
        center: center,
        zoom: zoom,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
    });
    L.tileLayer(tileUrl, { attribution: tileAttr, maxZoom: 18 }).addTo(map);
    return map;
}

function addPulsingMarker(map, lat, lng, color, size) {
    const pulseSize = size || 12;
    const icon = L.divIcon({
        className: 'pulse-marker',
        html: `<div style="
            width: ${pulseSize}px; height: ${pulseSize}px;
            background: ${color || '#C8872B'};
            border-radius: 50%;
            box-shadow: 0 0 0 0 ${color || '#C8872B'};
            animation: pulse-ring 2s ease-out infinite;
        "></div>
        <style>
            @keyframes pulse-ring {
                0% { box-shadow: 0 0 0 0 ${color || 'rgba(200,135,43,0.5)'}; }
                100% { box-shadow: 0 0 0 ${pulseSize}px rgba(200,135,43,0); }
            }
        </style>`,
        iconSize: [pulseSize, pulseSize],
        iconAnchor: [pulseSize / 2, pulseSize / 2],
    });
    return L.marker([lat, lng], { icon }).addTo(map);
}

function addMarkerWithPopup(map, stop, color) {
    const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            width: 10px; height: 10px;
            background: ${color || '#C8872B'};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
    });
    const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);
    marker.bindPopup(`
        <h4>${stop.name}</h4>
        ${stop.year ? `<span class="popup-year">${stop.year}</span>` : ''}
        <p class="popup-detail">${stop.detail}</p>
    `);
    return marker;
}

function animatePolyline(map, coords, color, weight, dashArray) {
    const line = L.polyline(coords, {
        color: color || '#C8872B',
        weight: weight || 3,
        opacity: 0.8,
        dashArray: dashArray || null,
        lineCap: 'round',
        lineJoin: 'round',
    }).addTo(map);
    return line;
}

function drawCurvedLine(map, from, to, color, weight) {
    // Approximate a curve using a midpoint offset
    const midLat = (from[0] + to[0]) / 2;
    const midLng = (from[1] + to[1]) / 2;
    const latDiff = Math.abs(from[0] - to[0]);
    const lngDiff = Math.abs(from[1] - to[1]);
    const offset = Math.max(latDiff, lngDiff) * 0.15;

    const controlLat = midLat + offset;
    const controlLng = midLng;

    const points = [];
    for (let t = 0; t <= 1; t += 0.05) {
        const lat = (1 - t) * (1 - t) * from[0] + 2 * (1 - t) * t * controlLat + t * t * to[0];
        const lng = (1 - t) * (1 - t) * from[1] + 2 * (1 - t) * t * controlLng + t * t * to[1];
        points.push([lat, lng]);
    }
    return animatePolyline(map, points, color, weight || 2, '6 4');
}

/* ---- Map Initializers ---- */

function initMap1() {
    if (MAPS.map1) return;
    const map = createMap('map1', [28, 100], 5, { vintage: true });
    MAPS.map1 = map;

    // Origin marker with pulsing effect
    addPulsingMarker(map, TEA_DATA.origin.lat, TEA_DATA.origin.lng, '#C8872B', 16);
    L.marker([TEA_DATA.origin.lat, TEA_DATA.origin.lng], {
        icon: L.divIcon({
            className: '',
            html: `<div style="
                background: rgba(200,135,43,0.15);
                border: 2px solid rgba(200,135,43,0.4);
                border-radius: 50%;
                width: 60px; height: 60px;
            "></div>`,
            iconSize: [60, 60],
            iconAnchor: [30, 30],
        })
    }).addTo(map).bindPopup(`<h4>${TEA_DATA.origin.label}</h4><p class="popup-detail">${TEA_DATA.origin.detail}</p>`);

    // Early tea regions
    TEA_DATA.earlyRegions.forEach(r => {
        addMarkerWithPopup(map, r, '#4A7C59');
    });
}

function initMap3() {
    if (MAPS.map3) return;
    const map = createMap('map3', [30, 105], 4, { vintage: true });
    MAPS.map3 = map;

    // Yunnan route
    animatePolyline(map, TEA_DATA.teaHorseRoad.yunnanRoute, '#C8872B', 3.5);
    // Sichuan route
    animatePolyline(map, TEA_DATA.teaHorseRoad.sichuanRoute, '#8B2500', 3);

    // Stops
    TEA_DATA.teaHorseRoad.stops.forEach(s => addMarkerWithPopup(map, s, '#C8872B'));

    // Japan/Korea spread
    TEA_DATA.japanSpread.forEach(s => {
        drawCurvedLine(map, s.from, s.to, '#4A7C59', 2);
    });
    TEA_DATA.japanStops.forEach(s => addMarkerWithPopup(map, s, '#4A7C59'));
}

function initMap4() {
    if (MAPS.map4) return;
    const map = createMap('map4', [15, 60], 2);
    MAPS.map4 = map;

    animatePolyline(map, TEA_DATA.maritimeRoutes.portuguese, '#1a5276', 2.5, '6 4');
    animatePolyline(map, TEA_DATA.maritimeRoutes.dutch, '#e67e22', 2.5, '8 4');
    animatePolyline(map, TEA_DATA.maritimeRoutes.british, '#C8872B', 3);

    TEA_DATA.maritimePorts.forEach(s => addMarkerWithPopup(map, s, '#1a5276'));
}

function initMap6() {
    if (MAPS.map6) return;
    const map = createMap('map6', [25, 105], 4);
    MAPS.map6 = map;

    animatePolyline(map, TEA_DATA.fortuneJourney.secretRoute, '#8B2500', 3, '4 6');
    animatePolyline(map, TEA_DATA.fortuneJourney.toIndia, '#4A7C59', 3);

    TEA_DATA.fortuneJourney.stops.forEach(s => addMarkerWithPopup(map, s, '#8B2500'));
}

function initMap7() {
    if (MAPS.map7) return;
    const map = createMap('map7', [15, 82], 4, { vintage: true });
    MAPS.map7 = map;

    TEA_DATA.indiaRegions.forEach(r => {
        const icon = L.divIcon({
            className: 'region-marker',
            html: `<div style="
                width: 14px; height: 14px;
                background: #4A7C59;
                border: 2px solid white;
                border-radius: 50%;
                box-shadow: 0 0 0 3px rgba(74,124,89,0.3), 0 2px 8px rgba(0,0,0,0.2);
            "></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
        });
        L.marker([r.lat, r.lng], { icon }).addTo(map)
            .bindPopup(`<h4>${r.name}</h4><p class="popup-detail">${r.detail}</p><p class="popup-year">${r.type}</p>`);
    });
}

function initMap8() {
    if (MAPS.map8) return;
    const map = createMap('map8', [10, 50], 2);
    MAPS.map8 = map;

    animatePolyline(map, TEA_DATA.clipperRoute, '#C8872B', 3);
    TEA_DATA.raceStops.forEach(s => addMarkerWithPopup(map, s, '#C8872B'));

    // Add a ship icon at Foochow
    const shipIcon = L.divIcon({
        className: '',
        html: '<div style="font-size:24px">&#x26F5;</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
    L.marker([26.06, 119.31], { icon: shipIcon }).addTo(map);
}

function initMap9() {
    if (MAPS.map9) return;
    const map = createMap('map9', [15, 60], 2);
    MAPS.map9 = map;

    TEA_DATA.globalSpread.forEach(s => {
        drawCurvedLine(map, s.from, s.to, s.color, 2);
        // Small marker at destination
        const destIcon = L.divIcon({
            className: '',
            html: `<div style="
                width: 8px; height: 8px;
                background: ${s.color};
                border: 1.5px solid white;
                border-radius: 50%;
                box-shadow: 0 1px 4px rgba(0,0,0,0.3);
            "></div>`,
            iconSize: [8, 8],
            iconAnchor: [4, 4],
        });
        L.marker(s.to, { icon: destIcon }).addTo(map)
            .bindPopup(`<h4>${s.label}</h4><span class="popup-year">${s.year}</span>`);
    });

    // Origin markers
    addPulsingMarker(map, 30.27, 120.15, '#C8872B', 10); // China
    addPulsingMarker(map, 26.5, 91.7, '#4A7C59', 10);   // India
}

function initMap10() {
    if (MAPS.map10) return;
    const map = createMap('map10', [20, 40], 2);
    MAPS.map10 = map;

    // We'll load GeoJSON for country boundaries
    loadWorldGeoJSON(map);
}

function getProductionColor(production) {
    if (production >= 3000000) return '#0d3b07';
    if (production >= 1000000) return '#1a5e0f';
    if (production >= 500000) return '#2d7a1e';
    if (production >= 100000) return '#5a9e3f';
    if (production >= 50000) return '#8cc269';
    if (production >= 10000) return '#c6e2a8';
    return '#f0f7e8';
}

function loadWorldGeoJSON(map) {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
        .then(r => r.json())
        .then(geojson => {
            // Build lookup from our data
            const prodLookup = {};
            TEA_DATA.productionData.forEach(d => {
                prodLookup[d.code] = d;
            });

            // Also map country names to codes for matching
            const nameLookup = {};
            TEA_DATA.productionData.forEach(d => {
                nameLookup[d.country.toLowerCase()] = d;
            });

            L.geoJSON(geojson, {
                style: function(feature) {
                    const code = feature.properties.ISO_A2;
                    const name = (feature.properties.ADMIN || '').toLowerCase();
                    const data = prodLookup[code] || nameLookup[name];

                    if (data) {
                        return {
                            fillColor: getProductionColor(data.production),
                            fillOpacity: 0.8,
                            weight: 1,
                            color: '#666',
                            opacity: 0.5,
                        };
                    }
                    return {
                        fillColor: '#e8e8e8',
                        fillOpacity: 0.3,
                        weight: 0.5,
                        color: '#ccc',
                        opacity: 0.3,
                    };
                },
                onEachFeature: function(feature, layer) {
                    const code = feature.properties.ISO_A2;
                    const name = (feature.properties.ADMIN || '').toLowerCase();
                    const data = prodLookup[code] || nameLookup[name];

                    if (data) {
                        const formattedProd = data.production >= 1000000
                            ? (data.production / 1000000).toFixed(1) + 'M'
                            : data.production >= 1000
                            ? Math.round(data.production / 1000) + 'K'
                            : data.production;

                        layer.bindPopup(`
                            <div class="country-popup">
                                <h4>${data.country}</h4>
                                <div class="production">${formattedProd} tonnes/year</div>
                                <div class="tea-type-info">${data.teaType}</div>
                                <div class="learned-from">Learned from: ${data.learnedFrom}</div>
                                <span class="popup-year">First cultivated: ${data.year}</span>
                            </div>
                        `);

                        layer.on('mouseover', function() {
                            this.setStyle({ weight: 2, color: '#333', fillOpacity: 0.9 });
                        });
                        layer.on('mouseout', function() {
                            this.setStyle({ weight: 1, color: '#666', fillOpacity: 0.8 });
                        });
                    }
                }
            }).addTo(map);
        })
        .catch(err => console.warn('Could not load GeoJSON:', err));
}

/* ---- Map init dispatcher ---- */
const MAP_INITIALIZERS = {
    'map1': initMap1,
    'map3': initMap3,
    'map4': initMap4,
    'map6': initMap6,
    'map7': initMap7,
    'map8': initMap8,
    'map9': initMap9,
    'map10': initMap10,
};

function initMapIfVisible(mapId) {
    const container = document.getElementById(mapId);
    if (!container) return;
    const init = MAP_INITIALIZERS[mapId];
    if (init) init();
    // Fix Leaflet rendering after visibility change
    setTimeout(() => {
        if (MAPS[mapId]) MAPS[mapId].invalidateSize();
    }, 200);
}
