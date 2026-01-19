import React from 'react';

const MAPLIBRE_JS = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js';
const MAPLIBRE_CSS = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css';

/**
 * Load MapLibre only once (no bundler, avoids webpack loader issues)
 */
function loadMapLibre() {
  if (typeof window !== 'undefined' && window.maplibregl) {
    return Promise.resolve(window.maplibregl);
  }

  return new Promise((resolve, reject) => {
    // CSS
    if (!document.querySelector(`link[href="${MAPLIBRE_CSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = MAPLIBRE_CSS;
      document.head.appendChild(link);
    }

    // JS
    if (document.querySelector(`script[src="${MAPLIBRE_JS}"]`)) {
      const t = setInterval(() => {
        if (window.maplibregl) {
          clearInterval(t);
          resolve(window.maplibregl);
        }
      }, 50);

      setTimeout(() => {
        clearInterval(t);
        reject(new Error('MapLibre load timeout'));
      }, 15000);

      return;
    }

    const script = document.createElement('script');
    script.src = MAPLIBRE_JS;
    script.async = true;
    script.onload = () => resolve(window.maplibregl);
    script.onerror = () => reject(new Error('Failed to load MapLibre JS'));
    document.head.appendChild(script);
  });
}

/**
 * Works for:
 *  - /maplab
 *  - /amman/maplab
 *  - /anything/maplab
 */
function getBasePath() {
  const p = window.location.pathname || '/';
  // remove trailing slash (except root)
  const path = p.length > 1 ? p.replace(/\/+$/, '') : p;

  if (path.endsWith('/maplab')) return path.slice(0, -'/maplab'.length) || '';
  if (path === '/maplab') return '';
  return '';
}

export default class MapLibreLab extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.containerRef = React.createRef();
    this.state = { err: null };
  }

  componentDidMount() {
    loadMapLibre()
      .then((maplibregl) => {
        const base = getBasePath();
        // NOTE: this file must exist in your built assets, e.g. static/mapstyles/amman-raster.json
        const styleUrl = `${base}/mapstyles/amman-raster.json`;

        this.map = new maplibregl.Map({
          container: this.containerRef.current,
          style: styleUrl,
          center: [35.9106, 31.9539], // Amman
          zoom: 11,
        });

        this.map.addControl(new maplibregl.NavigationControl(), 'top-right');
      })
      .catch((e) => this.setState({ err: e.message || String(e) }));
  }

  componentWillUnmount() {
    if (this.map) this.map.remove();
  }

  render() {
    if (this.state.err) {
      return <div style={{ padding: 16 }}>MapLibre error: {this.state.err}</div>;
    }
    return (
      <div
        ref={this.containerRef}
        style={{ width: '100%', height: '100vh' }}
      />
    );
  }
}
