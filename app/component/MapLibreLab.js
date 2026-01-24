import React, { useEffect, useRef, useState } from 'react';
import { useConfigContext } from '../configurations/ConfigContext';

const MAPLIBRE_VERSION = '5.16.0';
const MAPLIBRE_JS = `https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.js`;
const MAPLIBRE_CSS = `https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.css`;
const MAPLIBRE_CSP_WORKER = `/maplibre/maplibre-gl-csp-worker.js`;

function loadCssOnce(href) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve();
    if ([...document.styleSheets].some(s => s.href && s.href.includes(href))) return resolve();

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = (e) => reject(e);
    document.head.appendChild(link);
  });
}

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve();
    if (window.maplibregl) return resolve();

    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

async function ensureMapLibre() {
  await loadCssOnce(MAPLIBRE_CSS);
  await loadScriptOnce(MAPLIBRE_JS);

  const ml = window.maplibregl;
  if (!ml || !ml.Map) throw new Error('MapLibre failed to load (window.maplibregl missing).');

  // Make worker loading explicit (helps CSP + avoids bundler worker drama)
  if (typeof ml.setWorkerUrl === 'function') ml.setWorkerUrl(MAPLIBRE_CSP_WORKER);
  else ml.workerUrl = MAPLIBRE_CSP_WORKER;

  return ml;
}

export default function MapLibreLab() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const config = useConfigContext(); // ✅ this matches your ConfigContext.js

  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const maplibregl = await ensureMapLibre();
        if (cancelled) return;

        const lat =
          (config && config.defaultMapCenter && config.defaultMapCenter.lat) || 31.9539;
        const lon =
          (config && config.defaultMapCenter && config.defaultMapCenter.lon) || 35.9106;

        // If you later add a style URL into config, you can read it here.
        // For now: solid known-working MapLibre demo style (vector tiles).
        const styleUrl =
          (config && config.URL && (config.URL.MAPLIBRE_STYLE || config.URL.MAPLIBRE_STYLE_URL)) ||
          'https://demotiles.maplibre.org/style.json';

        // Clean old map instance (hot reload / remount)
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }

        //adds RTL support
        if (typeof window !== 'undefined' && maplibregl && typeof maplibregl.setRTLTextPlugin === 'function') {
          if (!window.__ML_RTL__) {
            maplibregl.setRTLTextPlugin(
              '/assets/mapbox-gl-rtl-text.js',
              (err) => err && console.error('RTL plugin failed:', err),
              true //lazy load
            );
            window.__ML_RTL__ = true;
          }
        }

        mapRef.current = new maplibregl.Map({
          container: mapContainerRef.current,
          style: styleUrl,
          center: [lon, lat],
          zoom: 12,
        });

        mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-right');
      } catch (e) {
        if (!cancelled) setErr(e?.message || String(e));
      }
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [config]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {err && (
        <div
          style={{
            position: 'absolute',
            zIndex: 5,
            top: 12,
            left: 12,
            right: 12,
            padding: 12,
            background: 'rgba(0,0,0,0.75)',
            color: '#fff',
            borderRadius: 8,
            fontSize: 12,
            lineHeight: 1.4,
          }}
        >
          MapLibreLab error: {err}
        </div>
      )}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}