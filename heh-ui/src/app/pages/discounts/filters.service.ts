import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {BASE_API_URL} from 'src/app/global';
import {cloneDeep} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  filterOptions: any;
  countriesCities: any;

  constructor(private http: HttpClient) {
    this.filterOptions = this.getDefaultFilters();
  }

  getDefaultFilters(): any {
    return {
      locations: [],
      categories: [],
      tags: [],
      vendors: []
    };
  }

  getToken(): any {
    const token = localStorage.getItem('isAuth');
    return token;
  }

  getLocations(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.get(`${BASE_API_URL}/api/location`, {headers});
  }

  getCategoriesTags(): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.get(`${BASE_API_URL}/api/category`, {headers});
  }

  getVendors(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.get(`${BASE_API_URL}/api/vendor`, {headers});
  }

  loadFilters(): any {
    this.getLocations().subscribe(data => {
      this.countriesCities = data;
    });

    this.filterOptions = this.getDefaultFilters();

    const promises = [this.getLocations(), this.getCategoriesTags(), this.getVendors()];

    return forkJoin(promises).toPromise().then((response) => {
      response[0].forEach((address: any) => {
        address.cities.forEach((city: any) => {
          this.filterOptions.locations.push({
            id: city.id,
            viewValue: `${address.country}, ${city.name}`
          });
        });
      });

      response[1].forEach((category: any) => {
        addItemToFilters(this.filterOptions.categories, category);

        category.tags.forEach((tag: any) => {
          this.filterOptions.tags.push({
            id: tag.id,
            viewValue: tag.name,
            categoryId: tag.categoryId
          });
        });
      });

      response[2].forEach((vendor: any) => {
        addItemToFilters(this.filterOptions.vendors, vendor);
      });
    });

    function addItemToFilters(dataArray: any, data: any): void {
      dataArray.push({
        id: data.id,
        viewValue: data.name
      });
    }
  }

  getTagById(id: string): string {
    return this.filterOptions.tags.find((tag: any) => {
      return tag.id === id;
    })?.viewValue;
  }

  getCategoryById(id: string): string {
    return this.filterOptions.categories.find((category: any) => {
      return category.id === id;
    })?.viewValue;
  }

  getFilters(): any {
    return cloneDeep(this.filterOptions);
  }

  getAddressByCityId(cityId: string): string {
    let address = '';
    this.filterOptions.locations.forEach((item: any) => {
      if (cityId === item.id ) {
      address = item.viewValue;
      }
    });
    return address;
  }
}
