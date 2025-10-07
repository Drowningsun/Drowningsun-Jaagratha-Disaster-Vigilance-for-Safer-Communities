declare module 'mapbox-gl' {
  export const accessToken: string
  export class Map {
    constructor(opts: any)
    on(event: string, cb: any): void
    getBounds(): any
    getCenter(): any
    getZoom(): number
    flyTo(opts: any): void
    addSource(id: string, source: any): void
    addLayer(layer: any): void
    addSource(id: string, source: any): void
    setLayoutProperty(layerId: string, prop: string, value: any): void
  }
  export class Marker {
    constructor(opts?: any)
    setLngLat(latlng: [number, number]): this
    setPopup(popup: any): this
    addTo(map: any): this
    remove(): void
  }
  export class Popup {
    constructor(opts?: any)
    setHTML(html: string): this
  }
  export default {
    Map: Map,
    Marker: Marker,
    Popup: Popup,
    accessToken: '' as string,
  }
}
