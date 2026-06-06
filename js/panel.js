/**
 * panel.js — Drawer "ville" : ouverture, fermeture, rendu, événements.
 *
 * Un drawer qui glisse depuis le bord droit, instance unique, attaché via
 * `mountPanel({ panel, host, onClose })` qui retourne `{ open, close, isOpen }`.
 *
 * Aucune dépendance directe au globe : le découplage se fait via la
 * callback `onClose` (utilisée pour recadrer la caméra).
 *
 * Vignettes : on rend les `<img data-wiki="...">` puis on délègue à
 * `hydrateThumbs` qui résout les URLs Wikipedia en arrière-plan.
 */

import { tripData, flexibleItinerary } from "./data.js";
import { hydrateThumbs } from "./images.js";

/* ------------------------------------------------------------
   Helpers
   ------------------------------------------------------------ */

const HTML_ESCAPE = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
};
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => HTML_ESCAPE[c]);
}

function thumb(wikiTitle, alt, sizeClass = "") {
    const t = escapeHtml(wikiTitle || "");
    const a = escapeHtml(alt || "");
    return `<span class="thumb ${sizeClass}"><img data-wiki="${t}" alt="${a}" loading="lazy" /></span>`;
}

/* ------------------------------------------------------------
   Tags : icônes SVG line-style, monochromatiques (currentColor).
   Le rendu se fait via `tagsHtml(tags)` qui filtre les tags inconnus.
   Ajouter un tag = ajouter une entrée dans TAG_ICONS + TAG_LABELS.
   ------------------------------------------------------------ */

const SVG_ATTR =
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"';

const TAG_ICONS = {
    unesco: `<svg ${SVG_ATTR}><path d="M12 2.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 15.78l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L12 2.5z"/></svg>`,
    tradition: `<svg ${SVG_ATTR}><path d="M3 9l9-6 9 6"/><path d="M5 9v11h14V9"/><path d="M9 13v7M15 13v7M3 9h18M3 20h18"/></svg>`,
    modern: `<svg ${SVG_ATTR}><path d="M4 21V8h6v13M14 21V3h6v18M3 21h18"/><path d="M7 11h0M7 14h0M7 17h0M17 7h0M17 10h0M17 13h0M17 16h0"/></svg>`,
    nature: `<svg ${SVG_ATTR}><path d="M3 20l5-9 4 6 3-4 6 7H3z"/></svg>`,
    food: `<svg ${SVG_ATTR}><path d="M3 11h18a9 9 0 01-18 0z"/><path d="M2 11h20"/><path d="M7 7l1 4M12 5v6M17 7l-1 4"/></svg>`,
    show: `<svg ${SVG_ATTR}><path d="M21 15a4 4 0 01-8 0V5h8z"/><path d="M11 15a4 4 0 01-8 0V5h8z"/></svg>`,
    night: `<svg ${SVG_ATTR}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
    temple: `<svg ${SVG_ATTR}><path d="M12 3l-7 5h14l-7-5z"/><path d="M5 8v3M19 8v3M3 11h18M6 11v9M18 11v9M10 11v9M14 11v9M3 20h18"/></svg>`,
    shopping: `<svg ${SVG_ATTR}><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V5a3 3 0 016 0v3"/></svg>`,
    cable: `<svg ${SVG_ATTR}><path d="M2 5l20-2"/><path d="M12 4v3"/><path d="M9 7h6v9a3 3 0 01-6 0z"/></svg>`,
    photo: `<svg ${SVG_ATTR}><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/></svg>`,
    view: `<svg ${SVG_ATTR}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`,
    panda: `<svg ${SVG_ATTR}><circle cx="12" cy="13" r="7"/><circle cx="6.5" cy="6.5" r="2"/><circle cx="17.5" cy="6.5" r="2"/><circle cx="9" cy="12.5" r="0.9" fill="currentColor"/><circle cx="15" cy="12.5" r="0.9" fill="currentColor"/></svg>`,
};

const TAG_LABELS = {
    unesco: "UNESCO",
    tradition: "Tradition",
    modern: "Moderne",
    nature: "Nature",
    food: "Gastronomie",
    show: "Spectacle",
    night: "De nuit",
    temple: "Temple",
    shopping: "Shopping",
    cable: "Téléphérique",
    photo: "Photo",
    view: "Panorama",
    panda: "Pandas",
};

function tagsHtml(tags) {
    if (!Array.isArray(tags) || !tags.length) return "";
    const items = tags
        .filter((t) => TAG_ICONS[t])
        .map(
            (t) =>
                `<span class="place-tag" data-tag="${t}" title="${escapeHtml(TAG_LABELS[t] || t)}" aria-label="${escapeHtml(TAG_LABELS[t] || t)}">${TAG_ICONS[t]}</span>`,
        )
        .join("");
    return items ? `<span class="place-tags">${items}</span>` : "";
}

/* ------------------------------------------------------------
   Cercle de distance — radar SVG : 1 (centre) → 4 (excursion journée).
   Plus le cercle est grand, plus le lieu est loin.
   Couleur appliquée via `data-cercle` côté CSS.
   ------------------------------------------------------------ */

const CERCLE_LABELS = {
    1: "Centre — accessible à pied / métro court",
    2: "Proche — métro 15-30 min",
    3: "Excursion — demi-journée prévue",
    4: "Excursion journée — train ou route",
};

function cercleIcon(cercle) {
    const c = Number(cercle) || 1;
    const op = (n) => (c >= n ? "1" : "0.18");
    return `
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="12" r="5" stroke-opacity="${op(2)}"/>
      <circle cx="12" cy="12" r="8" stroke-opacity="${op(3)}"/>
      <circle cx="12" cy="12" r="11" stroke-opacity="${op(4)}"/>
    </svg>`;
}

/* Extrait le numéro du cercle (1-4) à partir d'une zone string ou
   du champ explicite `cercle` du premier place. Fallback : 1. */
function cercleFromZone(placesInZone) {
    const explicit = placesInZone[0]?.cercle;
    if (explicit) return Number(explicit);
    const m = placesInZone[0]?.zone?.match(/Cercle\s*(I{1,3}V?|IV)/i);
    if (!m) return 1;
    const roman = m[1].toUpperCase();
    const map = { I: 1, II: 2, III: 3, IV: 4 };
    return map[roman] || 1;
}

/* ------------------------------------------------------------
   Renderers — fonctions pures (état → HTML)
   ------------------------------------------------------------ */

/* ------------------------------------------------------------
   Carte — vraie carte interactive Leaflet/OpenStreetMap, en tête du
   drawer. Un marqueur par lieu à visiter (couleur de la ville), popup
   au clic. Coordonnées WGS84 (correctes sur tuiles OSM), indexées par
   `ville` puis par `nom` exact du lieu dans data.js.
   ------------------------------------------------------------ */

const PLACE_COORDS = {
    Chengdu: {
        "Panda Base": [30.7386, 104.1419],
        "People's Park": [30.6595, 104.0549],
        "Wenshu Yuan Monastery": [30.6813, 104.079],
        "Kuanzhai Alley": [30.6678, 104.048],
        "Daci Temple": [30.6559, 104.0806],
        "Anshun Bridge": [30.6442, 104.0834],
        "Jiuyanqiao Bar Street": [30.639, 104.089],
        "Spectacle Traditionnel": [30.668, 104.047],
        "Yulin District": [30.6264, 104.0581],
        "Eastern Suburb Memory": [30.6711, 104.1206],
        "Quartier Tech": [30.6557, 104.0806],
        "Luodai Ancient Town": [30.6417, 104.325],
        "Mount Qingcheng": [30.9105, 103.5578],
    },
    Chongqing: {
        Hongyadong: [29.565, 106.58],
        "Liziba Station": [29.55083, 106.53528],
        "Xiao Pi Cha Guan (Jiaotong)": [29.5005, 106.5095],
        "Jiefangbei & WFC": [29.5628, 106.5772],
        "Yangtze Cableway": [29.5588, 106.5828],
        "Spectacle Chongqing 1949": [29.579, 106.454],
        Shibati: [29.5535, 106.572],
        "Mountain City Alley": [29.552, 106.5685],
        Ciqikou: [29.5812, 106.4497],
        Kuixinglou: [29.5614, 106.5781],
        "Quartier Tech": [29.5635, 106.578],
        "Minxin Jiayuan Night Market": [29.636, 106.532],
        "Spots Dystopiques": [29.562, 106.588],
    },
    Zhangjiajie: {
        "Tianmen Shan": [29.04988, 110.47889],
        "Parc Avatar (Wulingyuan)": [29.333, 110.5],
        "Pont de Verre (Grand Canyon)": [29.3987, 110.6982],
        "Rivière Golden Whip": [29.32, 110.43],
    },
    Pékin: {
        "Cité Interdite": [39.9163, 116.3972],
        "Grande Muraille (Mutianyu)": [40.4319, 116.5704],
        Hutongs: [39.9368, 116.403],
        "Canard Laqué": [39.8997, 116.3958],
        "Temple du Ciel": [39.8822, 116.4066],
        "Quartier moderne Sanlitun": [39.9337, 116.4549],
        "Parc Jingshan": [39.9281, 116.3906],
    },
};

function renderMap(city) {
    return `
    <div class="panel-map">
      <div
        class="panel-map-canvas"
        id="cityMapCanvas"
        role="img"
        aria-label="Carte de ${escapeHtml(city.ville)} et de ses lieux à visiter"
      ></div>
    </div>`;
}

/**
 * Initialise la carte Leaflet après injection du HTML. Place un marqueur
 * coloré par lieu disposant de coordonnées, puis cadre la vue sur
 * l'ensemble. Retourne l'instance de carte (à détruire au prochain rendu).
 */
function initCityMap(city, container) {
    if (typeof L === "undefined") return null;
    const el = container.querySelector("#cityMapCanvas");
    if (!el) return null;

    const coords = PLACE_COORDS[city.ville] || {};
    const map = L.map(el, {
        scrollWheelZoom: false,
        zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const points = [];
    city.masterListe.forEach((p) => {
        const c = coords[p.nom];
        if (!c) return;
        points.push(c);
        const marker = L.circleMarker(c, {
            radius: 7,
            color: "#ffffff",
            weight: 2,
            fillColor: city.couleur,
            fillOpacity: 0.95,
        }).addTo(map);
        const star = p.incontournable ? "★ " : "";
        marker.bindPopup(
            `<strong>${star}${escapeHtml(p.nom)}</strong><br>` +
                `<span style="font-family:var(--font-cn);">${escapeHtml(p.pinyin)}</span>`,
        );
        marker.bindTooltip(escapeHtml(p.nom), { direction: "top" });
    });

    if (points.length > 1) {
        map.fitBounds(points, { padding: [28, 28], maxZoom: 14 });
    } else if (points.length === 1) {
        map.setView(points[0], 13);
    } else {
        map.setView([35, 105], 4);
    }

    // Le drawer s'ouvre via une transition ; on recalcule la taille une
    // fois l'animation lancée pour éviter une carte à moitié grise.
    setTimeout(() => map.invalidateSize(), 250);

    return map;
}

function renderHeader(city, currentTab, order) {
    return `
    ${renderMap(city)}
    <div class="panel-header">
      <div class="panel-color-bar" style="background: ${city.couleur};"></div>
      <button class="panel-close" data-action="close" aria-label="Fermer">×</button>
      <div class="panel-headline">
        <span class="panel-rubric">Étape ${order} sur 4</span>
        <span class="panel-headline-sep" aria-hidden="true">·</span>
        <span class="panel-pinyin">${escapeHtml(city.pinyin)}</span>
      </div>
    </div>
    <div class="tabs" role="tablist">
      <button class="tab ${currentTab === "planning" ? "active" : ""}" data-tab="planning" role="tab">Itinéraire jour par jour</button>
      <button class="tab ${currentTab === "master" ? "active" : ""}" data-tab="master" role="tab">Tous les lieux</button>
    </div>`;
}

function renderPlanning(city) {
    const itin = flexibleItinerary[city.ville] || [];
    if (!itin.length) {
        return '<p style="font-style:italic;color:var(--ink-meta);">Aucun planning pour cette ville.</p>';
    }

    return itin
        .map((day) => {
            const places = day.placeIds
                .map((id) => city.masterListe.find((p) => p.id === id))
                .filter(Boolean);

            const placesHtml = places
                .map(
                    (p) => `
        <div class="day-place" data-cercle="${p.cercle || 1}">
          ${thumb(p.wikiTitle || city.wikiTitle, p.nom, "thumb-md")}
          <div class="day-place-body">
            <div class="day-place-name">
              ${p.incontournable ? '<span class="place-star">★</span>' : ""}
              ${escapeHtml(p.nom)}
              ${tagsHtml(p.tags)}
            </div>
            <div class="day-place-pinyin">${escapeHtml(p.pinyin)}</div>
            <div class="day-place-tip">${escapeHtml(p.conseil)}</div>
            <div class="day-place-toggle" aria-hidden="true">
              <span class="toggle-more">Voir le détail</span>
              <span class="toggle-less">Réduire</span>
            </div>
          </div>
        </div>`,
                )
                .join("");

            const dateBadge = day.date
                ? `<span class="day-date">${escapeHtml(day.date)}</span>`
                : "";
            return `
      <div class="day-card">
        <div class="day-title">${escapeHtml(day.day)}${dateBadge}</div>
        ${day.subtitle ? `<div class="day-subtitle">${escapeHtml(day.subtitle)}</div>` : ""}
        ${placesHtml}
      </div>`;
        })
        .join("");
}

function renderMaster(city, onlyIncontournables) {
    let places = [...city.masterListe];
    if (onlyIncontournables) places = places.filter((p) => p.incontournable);

    places.sort((a, b) => {
        const z = a.zone.localeCompare(b.zone);
        return z !== 0 ? z : b.note - a.note;
    });

    const zonesMap = new Map();
    for (const p of places) {
        if (!zonesMap.has(p.zone)) zonesMap.set(p.zone, []);
        zonesMap.get(p.zone).push(p);
    }

    const filterHtml = `
    <div class="filter-bar">
      <button class="filter-btn ${onlyIncontournables ? "active" : ""}" data-action="filter">
        ★ Incontournables uniquement
      </button>
      <span class="place-count">${places.length} lieu${places.length > 1 ? "x" : ""}</span>
    </div>`;

    let zonesHtml = "";
    zonesMap.forEach((placesInZone, zone) => {
        const cercle = cercleFromZone(placesInZone);
        const cercleLabel = CERCLE_LABELS[cercle] || "";
        const cardsHtml = placesInZone
            .map((p) => {
                const wiki = escapeHtml(p.wikiTitle || city.wikiTitle);
                const alt = escapeHtml(p.nom);
                return `
        <div class="place-card" data-place-id="${p.id}" data-cercle="${p.cercle || cercle}">
          <span class="thumb place-thumb">
            <img data-wiki="${wiki}" alt="${alt}" loading="lazy" />
            <span class="place-overlay">
              <span class="place-overlay-top">
                <span class="place-rating">${p.note}<small>/10</small></span>
                ${tagsHtml(p.tags)}
              </span>
              <span class="place-info">
                <span class="place-name">
                  ${p.incontournable ? '<span class="place-star">★</span>' : ""}
                  ${escapeHtml(p.nom)}
                </span>
                <span class="place-pinyin">${escapeHtml(p.pinyin)}</span>
                <span class="place-meta">${escapeHtml(p.temps)}</span>
              </span>
            </span>
          </span>
          <div class="place-tip">${escapeHtml(p.conseil)}</div>
        </div>`;
            })
            .join("");

        zonesHtml += `
      <div class="zone-group" data-cercle="${cercle}">
        <h3 class="zone-title" title="${escapeHtml(cercleLabel)}">
          <span class="zone-cercle" data-cercle="${cercle}">${cercleIcon(cercle)}</span>
          <span class="zone-name">${escapeHtml(zone)}</span>
        </h3>
        ${cardsHtml}
      </div>`;
    });

    if (zonesMap.size === 0) {
        zonesHtml =
            '<p style="font-style:italic;color:var(--ink-meta);text-align:center;padding:2rem 0;">Aucun lieu ne correspond.</p>';
    }

    const logisticsHtml = `
    <div class="logistics">
      <h3>Conseils logistiques</h3>
      <ul>
        ${city.conseilsLogistiques.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}
      </ul>
    </div>`;

    return filterHtml + zonesHtml + logisticsHtml;
}

/* ------------------------------------------------------------
   Mount — assemble l'instance
   ------------------------------------------------------------ */

/**
 * @param {Object} opts
 * @param {HTMLElement} opts.panel - L'élément drawer (`.panel`)
 * @param {HTMLElement} opts.host  - Le conteneur où injecter le contenu (`#panelInner`)
 * @param {() => void} [opts.onClose] - Callback déclenchée à la fermeture
 * @returns {{ open: (cityName: string) => void, close: () => void, isOpen: () => boolean }}
 */
export function mountPanel({ panel, host, onClose }) {
    const state = {
        city: null,
        order: 0,
        tab: "planning",
        onlyIncontournables: false,
        map: null,
    };

    function render() {
        if (!state.city) return;

        // Détruit la carte précédente avant de remplacer le DOM (sinon
        // Leaflet conserve des écouteurs sur un conteneur orphelin).
        if (state.map) {
            try {
                state.map.remove();
            } catch (_) {
                /* conteneur déjà retiré */
            }
            state.map = null;
        }

        const body =
            state.tab === "planning"
                ? renderPlanning(state.city)
                : renderMaster(state.city, state.onlyIncontournables);

        host.innerHTML =
            renderHeader(state.city, state.tab, state.order) +
            `<div class="panel-content">${body}</div>`;

        // Carte interactive + hydratation des vignettes après injection
        state.map = initCityMap(state.city, host);
        hydrateThumbs(host);
    }

    function open(cityName) {
        const idx = tripData.itineraireData.findIndex(
            (c) => c.ville === cityName,
        );
        if (idx === -1) return;
        state.city = tripData.itineraireData[idx];
        state.order = idx + 1;
        state.tab = "planning";
        state.onlyIncontournables = false;
        render();
        panel.classList.add("open");
        panel.setAttribute("aria-hidden", "false");
    }

    function close() {
        if (!panel.classList.contains("open")) return;
        panel.classList.remove("open");
        panel.setAttribute("aria-hidden", "true");
        if (typeof onClose === "function") onClose();
    }

    function isOpen() {
        return panel.classList.contains("open");
    }

    function setTab(tab) {
        state.tab = tab;
        render();
        const c = host.querySelector(".panel-content");
        if (c) c.scrollTop = 0;
    }

    function toggleFilter() {
        state.onlyIncontournables = !state.onlyIncontournables;
        render();
    }

    /* ----- Délégation d'événements ----- */
    host.addEventListener("click", (e) => {
        const target = e.target.closest(
            "[data-action], [data-tab], .place-card, .day-place",
        );
        if (!target) return;

        if (target.dataset.action === "close") return close();
        if (target.dataset.action === "filter") return toggleFilter();
        if (target.dataset.tab) return setTab(target.dataset.tab);
        if (
            target.classList.contains("place-card") ||
            target.classList.contains("day-place")
        ) {
            target.classList.toggle("expanded");
        }
    });

    /* Empêche le handler "outside click" du document de voir les clics
       internes au drawer. Sans ça, un clic sur un onglet (qui re-render
       host) faisait disparaître e.target → contains() renvoyait false →
       le drawer se fermait. */
    panel.addEventListener("click", (e) => e.stopPropagation());

    return { open, close, isOpen };
}
