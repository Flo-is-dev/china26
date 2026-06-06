/**
 * main.js — Point d'entrée. Câble le drawer ville, les onglets et
 * l'hydratation des vignettes Wikipedia.
 */

import { mountPanel } from "./panel.js";
import { hydrateThumbs } from "./images.js";

(async function bootstrap() {
    const loading = document.getElementById("loading");
    const panelEl = document.getElementById("panel");
    const host = document.getElementById("panelInner");

    // Section qui doit céder la place au panel quand on clique une ville
    const itinerairePanel = document.querySelector(
        '.tab-panel[data-tab-panel="itineraire"]',
    );

    // 1) Drawer
    const panel = mountPanel({
        panel: panelEl,
        host,
        onClose: () => {
            if (itinerairePanel) itinerairePanel.classList.remove("is-detail");
        },
    });

    // 2) UI : légende cliquable — l'ouverture du drawer cache la grille des villes
    document.querySelectorAll(".legend-item").forEach((item) => {
        item.addEventListener("click", () => {
            const city = item.dataset.city;
            if (!city) return;
            if (itinerairePanel) itinerairePanel.classList.add("is-detail");
            panel.open(city);
        });
    });

    // 3) UI : Échap pour fermer le drawer
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && panel.isOpen()) panel.close();
    });

    // 4) Clic en dehors du drawer le ferme s'il est ouvert
    document.addEventListener("click", (e) => {
        if (!panel.isOpen()) return;
        if (panelEl.contains(e.target)) return;
        if (e.target.closest(".legend-item")) return;
        panel.close();
    });

    // 5) UI : onglets Itinéraire / Nourriture
    const tabs = document.querySelectorAll(".tab[data-tab]");
    const panels = document.querySelectorAll(".tab-panel[data-tab-panel]");
    function activateTab(name) {
        tabs.forEach((t) => {
            const active = t.dataset.tab === name;
            t.classList.toggle("is-active", active);
            t.setAttribute("aria-selected", active ? "true" : "false");
            t.setAttribute("tabindex", active ? "0" : "-1");
        });
        panels.forEach((p) => {
            const active = p.dataset.tabPanel === name;
            p.classList.toggle("is-active", active);
            if (active) p.removeAttribute("hidden");
            else p.setAttribute("hidden", "");
        });
    }
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => activateTab(tab.dataset.tab));
        tab.addEventListener("keydown", (e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            e.preventDefault();
            const list = Array.from(tabs);
            const i = list.indexOf(tab);
            const next =
                e.key === "ArrowRight"
                    ? list[(i + 1) % list.length]
                    : list[(i - 1 + list.length) % list.length];
            activateTab(next.dataset.tab);
            next.focus();
        });
    });

    // 6) Lightbox de la carte hero (clic → zoom plein écran)
    const heroImg = document.querySelector(".hero-figure img");
    const lightbox = document.getElementById("lightbox");
    if (heroImg && lightbox) {
        const lightboxImg = lightbox.querySelector(".lightbox-img");
        const lightboxClose = lightbox.querySelector(".lightbox-close");

        const openLightbox = () => {
            lightboxImg.src = heroImg.src;
            lightboxImg.alt = heroImg.alt;
            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        };
        const closeLightbox = () => {
            lightbox.classList.remove("open");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        };

        heroImg.addEventListener("click", openLightbox);
        lightboxClose.addEventListener("click", closeLightbox);
        // Clic sur le fond (hors de l'image) ferme la lightbox.
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.classList.contains("open")) {
                closeLightbox();
            }
        });
    }

    // 7) Hydrate les vignettes Wikipedia (étapes + plats)
    hydrateThumbs(document);

    // 8) Fade out du loader
    setTimeout(() => loading && loading.classList.add("hidden"), 400);
})();
