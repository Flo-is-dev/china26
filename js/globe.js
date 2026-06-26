/**
 * globe.js — Module Globe : initialisation, données spatiales, focus.
 *
 * Encapsule entièrement l'instance globe.gl. L'extérieur ne dialogue qu'avec
 * un petit contrat :
 *   - createGlobe({ container, onPointClick }) → { focusCity, focusChina }
 *
 * La librairie globe.gl est chargée en UMD via <script> dans le HTML
 * (elle expose `window.Globe`). On ne l'importe pas en module pour éviter
 * les problèmes de bundling.
 */

import { tripData, cityCoords, ROUTE_ORDER } from "./data.js";

/** Vue par défaut centrée sur la Chine — altitude basse → on ne voit que la zone. */
const CHINA_VIEW = Object.freeze({ lat: 33, lng: 108, altitude: 0.55 });

/* Sources géographiques :
   - Frontières : world-atlas 50m (Natural Earth) — meilleure résolution
     que 110m (côtes plus précises, plus d'îles) ; ~2 Mo gzipped.
   - Fleuves   : Natural Earth 50m via le mirror GeoJSON de M. Afford.
     Filtrés par bbox Chine pour ne dessiner que les cours d'eau locaux. */
const COUNTRIES_TOPOJSON_URL =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const RIVERS_GEOJSON_URL =
    "https://cdn.jsdelivr.net/gh/martynafford/natural-earth-geojson@master/50m/physical/ne_50m_rivers_lake_centerlines.json";
const TOPOJSON_CLIENT_URL =
    "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";

/* Bbox Chine élargie : on filtre les fleuves dont au moins un point
   tombe dedans. Inclut Mongolie sud / Asie du Sud-Est nord pour les
   cours d'eau qui longent la frontière. */
const CHINA_BBOX = { lngMin: 73, lngMax: 135, latMin: 18, latMax: 54 };

/* Coordonnées Séoul — escale annexe non incluse dans l'itinéraire,
   reliée à Pékin par un arc « extension » distinct. */
const SEOUL = Object.freeze({
    lat: 37.5665,
    lng: 126.978,
    city: "Séoul",
    pinyin: "서울",
});

/* ------------------------------------------------------------
   Helpers : préparation des données spatiales
   ------------------------------------------------------------ */

function buildPoints() {
    const trip = tripData.itineraireData.map((c, idx) => ({
        ...cityCoords[c.ville],
        city: c.ville,
        color: c.couleur,
        pinyin: c.pinyin,
        // Numéro d'étape = ordre chronologique (ROUTE_ORDER), pas l'ordre du tableau.
        order: ROUTE_ORDER.indexOf(c.ville) + 1 || idx + 1,
        extension: false,
    }));
    // Séoul : point annexe, plus petit, ton or — clairement « hors voyage ».
    const seoul = {
        lat: SEOUL.lat,
        lng: SEOUL.lng,
        city: SEOUL.city,
        color: "#d3a86a",
        pinyin: SEOUL.pinyin,
        order: 0,
        extension: true,
    };
    return [...trip, seoul];
}

/* Décalage volontaire au nord du point : sans ça le sprite-label
   est raycasté avant le point cliquable et intercepte les clics. */
const LABEL_LAT_OFFSET = 1.6;
function buildLabels(points) {
    return points.map((p) => ({
        lat: p.lat + LABEL_LAT_OFFSET,
        lng: p.lng,
        text: p.city,
    }));
}

/* Arcs : deux strates superposées.
   1. `network` — trait fin animé entre toutes les paires de villes (6 arcs
      pour 4 villes). Effet « graphe » subtil en arrière-plan.
   2. `route` — l'itinéraire chronologique (3 arcs consécutifs), trait plus
      épais, gradient encre→rouge éditorial. Dessiné après pour passer
      au-dessus du réseau. */
function buildArcs() {
    const cities = ROUTE_ORDER;
    const consecutive = new Set();
    for (let i = 0; i < cities.length - 1; i++) {
        consecutive.add(`${cities[i]}|${cities[i + 1]}`);
        consecutive.add(`${cities[i + 1]}|${cities[i]}`);
    }

    const network = [];
    for (let i = 0; i < cities.length; i++) {
        for (let j = i + 1; j < cities.length; j++) {
            if (consecutive.has(`${cities[i]}|${cities[j]}`)) continue;
            const from = cityCoords[cities[i]];
            const to = cityCoords[cities[j]];
            network.push({
                startLat: from.lat,
                startLng: from.lng,
                endLat: to.lat,
                endLng: to.lng,
                kind: "network",
            });
        }
    }

    const route = [];
    for (let i = 0; i < cities.length - 1; i++) {
        const from = cityCoords[cities[i]];
        const to = cityCoords[cities[i + 1]];
        route.push({
            startLat: from.lat,
            startLng: from.lng,
            endLat: to.lat,
            endLng: to.lng,
            kind: "route",
        });
    }

    // Extension : arc Pékin → Séoul (escale annexe, hors itinéraire).
    const pekin = cityCoords["Pékin"];
    const extension = [
        {
            startLat: pekin.lat,
            startLng: pekin.lng,
            endLat: SEOUL.lat,
            endLng: SEOUL.lng,
            kind: "extension",
        },
    ];

    return [...network, ...route, ...extension];
}

/* ------------------------------------------------------------
   Helpers : tooltip HTML
   ------------------------------------------------------------ */

function pointTooltip(d) {
    return `
    <div style="
      background: #faf8f3;
      color: #121212;
      padding: 10px 14px;
      border: 1px solid #1a1a1a;
      box-shadow: 3px 3px 0 #1a1a1a;
      font-family: 'Lora', Georgia, serif;
      min-width: 180px;
    ">
      <div style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.62rem; font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase; color: #b8252c;">Étape ${d.order} / 4</div>
      <div style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.15rem; color: #121212; margin-top: 3px; line-height: 1.1;">${d.city}</div>
      <div style="font-family: 'Ma Shan Zheng', serif; font-size: 0.95rem; color: #767676; margin-top: 2px;">${d.pinyin}</div>
      <div style="font-family: 'Inter', system-ui, sans-serif; font-size: 0.62rem; letter-spacing: 1.5px; text-transform: uppercase; color: #767676; margin-top: 8px; padding-top: 6px; border-top: 1px solid #d8d4ca;">Cliquez pour lire</div>
    </div>`;
}

/* ------------------------------------------------------------
   Setup globe
   ------------------------------------------------------------ */

function applyGlobeMaterial(world) {
    const mat = world.globeMaterial();
    // Océans : bleu éditorial désaturé — façon carte vintage Le Monde,
    // contraste net avec les terres sépia (#d8cdb2) et la Chine rouge.
    mat.color.set("#5b7e96");
    if (mat.emissive && mat.emissive.set) mat.emissive.set("#0f1d2a");
    if ("emissiveIntensity" in mat) mat.emissiveIntensity = 0.06;
    if ("shininess" in mat) mat.shininess = 0;
}

function applyControls(world) {
    const c = world.controls();
    c.enableDamping = true;
    c.dampingFactor = 0.15;
    c.rotateSpeed = 0.35;
    // Empêche le dézoom global → la vue reste serrée sur la zone Chine
    c.minDistance = 140;
    c.maxDistance = 230;
    c.autoRotate = false;
}

/** Détecte la Chine quel que soit le schéma de propriétés du dataset. */
function isChina(feat) {
    const p = feat.properties || {};
    const name = p.name || p.NAME || p.ADMIN || "";
    if (name === "China") return true;
    // world-atlas : `id` numérique ISO-3166. La Chine = 156.
    return feat.id === "156" || feat.id === 156;
}

/** Exclut l'Antarctique pour ne pas distordre la vue à basse altitude. */
function isAntarctica(feat) {
    const p = feat.properties || {};
    const name = p.name || p.NAME || p.ADMIN || "";
    if (name === "Antarctica") return true;
    return feat.id === "010" || feat.id === 10;
}

async function loadCountries(world) {
    const [topo, topojson] = await Promise.all([
        fetch(COUNTRIES_TOPOJSON_URL).then((r) => {
            if (!r.ok) throw new Error(`TopoJSON HTTP ${r.status}`);
            return r.json();
        }),
        import(TOPOJSON_CLIENT_URL),
    ]);

    if (!topo || !topo.objects || !topo.objects.countries) {
        throw new Error("TopoJSON invalide : objects.countries manquant");
    }

    const features = topojson
        .feature(topo, topo.objects.countries)
        .features.filter((f) => !isAntarctica(f));

    /* Stylisation : la Chine est dramatiquement surélevée, rouge dense,
       avec flancs vermillon profonds et liseré quasi-noir. Les autres
       pays s'effacent vers un sépia plus pâle, presque plats, pour ne
       pas concurrencer le sujet. Effet « la Chine en relief sur la mer ». */
    world
        .polygonsData(features)
        .polygonCapColor((f) =>
            isChina(f) ? "#c4232b" : "#d2c5a8",
        )
        .polygonSideColor((f) =>
            isChina(f)
                ? "rgba(120, 18, 24, 0.88)"
                : "rgba(60, 48, 32, 0.22)",
        )
        .polygonStrokeColor((f) => (isChina(f) ? "#2a0608" : "#5a4d3a"))
        .polygonAltitude((f) => (isChina(f) ? 0.045 : 0.005))
        .polygonsTransitionDuration(800);

    console.log(`[Sinarum Atlas] ${features.length} pays chargés.`);
}

/* Charge les fleuves Natural Earth 50m, ne garde que ceux qui passent
   dans la bbox Chine, puis les rend en `pathsData`. Non bloquant —
   en cas d'échec réseau, le globe reste fonctionnel sans fleuves. */
function pointInChinaBbox([lng, lat]) {
    return (
        lng >= CHINA_BBOX.lngMin &&
        lng <= CHINA_BBOX.lngMax &&
        lat >= CHINA_BBOX.latMin &&
        lat <= CHINA_BBOX.latMax
    );
}

async function loadRivers(world) {
    const res = await fetch(RIVERS_GEOJSON_URL);
    if (!res.ok) throw new Error(`Rivers HTTP ${res.status}`);
    const data = await res.json();
    if (!data || !Array.isArray(data.features)) {
        throw new Error("GeoJSON fleuves invalide");
    }

    /* Chaque feature peut être LineString (1 brin) ou MultiLineString
       (plusieurs brins). On extrait les brins individuels et on garde
       ceux qui touchent la Chine. Format pour globe.gl : tableau de
       points [lat, lng]. */
    const paths = [];
    for (const f of data.features) {
        const g = f.geometry;
        if (!g) continue;
        const lines =
            g.type === "LineString"
                ? [g.coordinates]
                : g.type === "MultiLineString"
                  ? g.coordinates
                  : [];
        for (const line of lines) {
            if (line.some(pointInChinaBbox)) {
                paths.push(line.map(([lng, lat]) => [lat, lng]));
            }
        }
    }

    world
        .pathsData(paths)
        .pathPointLat((p) => p[0])
        .pathPointLng((p) => p[1])
        .pathColor(() => "rgba(220, 235, 245, 0.6)")
        .pathStroke(0.35)
        .pathDashLength(0)
        .pathDashGap(0)
        // Au-dessus du polygone Chine (0.045) pour rester visibles ;
        // float très léger au-dessus des autres terres, peu perceptible.
        .pathPointAlt(() => 0.05)
        .pathTransitionDuration(0);

    console.log(`[Sinarum Atlas] ${paths.length} fleuves rendus (bbox Chine).`);
}

/* ------------------------------------------------------------
   API publique
   ------------------------------------------------------------ */

/**
 * @param {Object} opts
 * @param {HTMLElement} opts.container - DIV qui héberge le canvas WebGL.
 * @param {(cityName: string) => void} opts.onPointClick - Handler clic point.
 * @returns {Promise<{ focusCity: Function, focusChina: Function }>}
 */
export async function createGlobe({ container, onPointClick }) {
    if (typeof window.Globe === "undefined") {
        throw new Error("globe.gl n'est pas chargé (window.Globe absent).");
    }

    const points = buildPoints();
    const labels = buildLabels(points);
    const arcs = buildArcs();

    const world = new window.Globe(container, { animateIn: true })
        .backgroundColor("rgba(0,0,0,0)")
        // Atmosphère minimale — discrète sur fond papier clair
        .showAtmosphere(true)
        .atmosphereColor("#1a1a1a")
        .atmosphereAltitude(0.1)
        .pointsData(points)
        // Hauteur > 0.045 (altitude Chine) pour ne pas être avalés par
        // le relief ; Séoul moins haute (point annexe, plus discret).
        .pointAltitude((d) => (d.extension ? 0.04 : 0.06))
        .pointRadius((d) => (d.extension ? 0.45 : 0.65))
        .pointColor("color")
        .pointResolution(20)
        .pointLabel(pointTooltip)
        .onPointClick((d) => {
            // Séoul est purement décorative : pas d'ouverture de panel.
            if (d.extension) return;
            onPointClick && onPointClick(d.city);
        })
        .arcsData(arcs)
        // Couleur : route = encre→rouge ; extension = rouge→or (escale
        // annexe) ; network = rouge translucide pulsé.
        .arcColor((d) => {
            if (d.kind === "route") return ["#1a1a1a", "#b8252c"];
            if (d.kind === "extension")
                return ["#b8252c", "#d3a86a"];
            return ["rgba(184,37,44,0)", "rgba(184,37,44,0.55)", "rgba(184,37,44,0)"];
        })
        // Dash : route long net ; extension dash moyen ; network pointillé fin.
        .arcDashLength((d) =>
            d.kind === "route" ? 0.4 : d.kind === "extension" ? 0.22 : 0.04,
        )
        .arcDashGap((d) =>
            d.kind === "route" ? 0.18 : d.kind === "extension" ? 0.12 : 0.5,
        )
        // Animation : route 2.4s ; extension 3s ; network 5s (impulsion lente).
        .arcDashAnimateTime((d) =>
            d.kind === "route" ? 2400 : d.kind === "extension" ? 3000 : 5000,
        )
        // Épaisseur : route 0.5 ; extension 0.32 ; network 0.18.
        .arcStroke((d) =>
            d.kind === "route" ? 0.5 : d.kind === "extension" ? 0.32 : 0.18,
        )
        .arcAltitudeAutoScale(0.32)
        .labelsData(labels)
        .labelLat("lat")
        .labelLng("lng")
        .labelText("text")
        .labelSize(0.55)
        .labelColor(() => "#1a1a1a")
        .labelAltitude(0.075)
        .labelResolution(2)
        .labelDotRadius(0)
        .labelIncludeDot(false)
        // Le label est décalé au nord du point pour ne pas bloquer le clic
        // — mais on garde le texte cliquable comme raccourci utilisateur.
        .onLabelClick((d) => onPointClick && onPointClick(d.text));

    applyGlobeMaterial(world);
    applyControls(world);

    // Vue initiale rapprochée Chine
    world.pointOfView(CHINA_VIEW, 0);

    // Resize → suit le conteneur (responsive)
    const resize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        world.width(w).height(h);
    };
    window.addEventListener("resize", resize);
    resize();

    // Frontières — non bloquant pour l'init du reste
    try {
        await loadCountries(world);
    } catch (err) {
        console.error("[Sinarum Atlas] Frontières non chargées :", err);
    }

    // Fleuves — non bloquant aussi : leur absence n'invalide pas le globe
    try {
        await loadRivers(world);
    } catch (err) {
        console.warn("[Sinarum Atlas] Fleuves non chargés :", err);
    }

    return {
        /** Centre la caméra sur une ville (animation 1s). */
        focusCity(cityName) {
            const c = cityCoords[cityName];
            if (!c) return;
            world.pointOfView(
                { lat: c.lat - 2, lng: c.lng, altitude: 0.5 },
                1000,
            );
        },
        /** Recadre sur la vue Chine par défaut. */
        focusChina() {
            world.pointOfView(CHINA_VIEW, 1000);
        },
    };
}
