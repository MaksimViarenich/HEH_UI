import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Injectable, NgZone } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  geocoder: any;

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  findLocation(address: string): any {
    // tslint:disable-next-line: prefer-const
    let obj = {
      lat: 0,
      lng: 0
    };

    if (!this.geocoder) {
      this.geocoder = new google.maps.Geocoder();
    }

    this.geocoder.geocode({ address }, (results: any, status: any) => {
      if (status === 'OK' && results) {
        obj.lat = results[0].geometry.location.lat();
        obj.lng = results[0].geometry.location.lng();
      }
    });

    return obj;
  }
}
