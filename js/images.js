/**
 * images.js — Récupère une vignette depuis la REST API Wikipedia.
 *
 *   Endpoint :  https://en.wikipedia.org/api/rest_v1/page/summary/{title}
 *   Sortie    :  data.thumbnail.source (URL d'image directe)
 *
 * - Cache mémoire : un même `title` ne déclenche qu'un seul fetch.
 * - Déduplication : si plusieurs appels tombent en parallèle pour le même
 *   titre, ils partagent la même promesse en vol.
 * - Échec silencieux : retourne `null` (le rendu affichera le placeholder).
 *
 * Pas de clé API requise. CORS activé côté Wikipedia.
 */

const ENDPOINT = "https://en.wikipedia.org/api/rest_v1/page/summary/";

const cache = new Map(); // title -> url|null
const inflight = new Map(); // title -> Promise<url|null>

/**
 * @param {string} title - Titre d'article Wikipedia (en, format URL-safe possible).
 * @returns {Promise<string|null>} URL de la vignette, ou null si absente.
 */
export async function getImage(title) {
    if (!title) return null;
    if (cache.has(title)) return cache.get(title);
    if (inflight.has(title)) return inflight.get(title);

    const promise = fetchImage(title);
    inflight.set(title, promise);

    const url = await promise;
    cache.set(title, url);
    inflight.delete(title);
    return url;
}

async function fetchImage(title) {
    try {
        // `title` peut déjà être pré-encodé (parenthèses, %27, ...). On normalise
        // en décodant puis ré-encodant pour être idempotent.
        const safe = encodeURIComponent(decodeURIComponent(title));
        const res = await fetch(ENDPOINT + safe, {
            headers: { Accept: "application/json" },
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.thumbnail?.source || data.originalimage?.source || null;
    } catch (err) {
        console.warn(`[images] échec pour "${title}" :`, err);
        return null;
    }
}

/**
 * Hydrate tous les <img data-wiki="..."> dans un conteneur :
 * dès que l'URL est résolue, on remplit `src`. En cas d'échec, on
 * marque l'élément `.is-fallback` pour styliser le placeholder.
 *
 * @param {HTMLElement} root
 */
export function hydrateThumbs(root) {
    root.querySelectorAll("img[data-wiki]").forEach(async (img) => {
        const title = img.dataset.wiki;
        const url = await getImage(title);
        if (url) {
            img.src = url;
            img.addEventListener("load", () => img.classList.add("is-loaded"), {
                once: true,
            });
        } else {
            img.classList.add("is-fallback");
        }
    });
}
