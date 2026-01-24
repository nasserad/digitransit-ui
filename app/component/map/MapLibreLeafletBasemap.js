import React from 'react';
import L from 'leaflet';
import maplibregl from 'maplibre-gl';
import '@maplibre/maplibre-gl-leaflet';
import { withLeaflet } from 'react-leaflet/es/context';

class MapLibreLeafletBasemap extends React.PureComponent {
  componentDidMount() {
    const map = this.props.leaflet.map;

    // CSP-safe worker + RTL (you already have these files in app/static/maplibre/)
    if (!MapLibreLeafletBasemap._inited) {
      if (typeof maplibregl.setWorkerUrl === 'function') {
        maplibregl.setWorkerUrl('/maplibre/maplibre-gl-csp-worker.js');
      } else {
        maplibregl.workerUrl = '/maplibre/maplibre-gl-csp-worker.js';
      }
      maplibregl.setRTLTextPlugin('/maplibre/mapbox-gl-rtl-text.js', true);
      MapLibreLeafletBasemap._inited = true;
    }

    this.layer = L.maplibreGL({
      style: this.props.styleUrl,
      interactive: false,   // Leaflet stays in control (keeps Digitransit interactions)
      pane: 'tilePane',     // keep it behind overlays
    }).addTo(map);
  }

  componentWillUnmount() {
    if (this.layer) this.layer.remove();
  }

  render() {
    return null;
  }
}

export default withLeaflet(MapLibreLeafletBasemap);
