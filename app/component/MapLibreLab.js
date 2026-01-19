import React from 'react';

const MAPLIBRE_JS  = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js';
const MAPLIBRE_CSS = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css';

function loadMapLibre() {
  if (typeof window !== 'undefined' && window.maplibregl) return Promise.resolve(window.maplibregl);

  return new Promise((resolve, reject) => {
    // CSS once
    if (!document.querySelector(`link[href="${MAPLIBRE_CSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = MAPLIBRE_CSS;
      document.head.appendChild(link);
    }

    // JS once
    if (document.querySelector(`script[src="${MAPLIBRE_JS}"]`)) {
      const t = setInterval(() => {
        if (window.maplibregl) { clearInterval(t); resolve(window.maplibregl); }
      }, 50);
      setTimeout(() => { clearInterval(t); reject(new Error('MapLibre load timeout')); }, 15000);
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
        const style = {
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: [
                'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            }
          },
          layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
        };

        this.map = new maplibregl.Map({
          container: this.containerRef.current,
          style,
          center: [35.9106, 31.9539], // Amman-ish
          zoom: 11
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
      return <div style={{ padding: 16 }}>MapLibre failed: {this.state.err}</div>;
    }
    return <div ref={this.containerRef} style={{ width: '100%', height: '100vh' }} />;
  }
}
