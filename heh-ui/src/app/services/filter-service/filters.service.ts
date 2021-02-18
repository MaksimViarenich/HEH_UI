import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { BASE_API_URL } from 'src/app/global';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  filterOptions: any;
  countriesCities: any;
  queryParams = '';
  queryTextParam = '';

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
    return localStorage.getItem('isAuth');
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

  addNewCategory(newCategory: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('Content-Type', `application/json;odata.metadata=minimal;odata.streaming=true`);
    headers = headers.append('accept', '*/*');

    return this.http.post(`${BASE_API_URL}/api/category`, newCategory, {headers});
  }

  deleteCategory(id: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.delete(`${BASE_API_URL}/api/category?id=${id}`, {headers});
  }

  addNewTag(newTag: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('Content-Type', `application/json;odata.metadata=minimal;odata.streaming=true`);
    headers = headers.append('accept', '*/*');

    return this.http.post(`${BASE_API_URL}/api/tag`, newTag, {headers});
  }

  deleteTag(id: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.delete(`${BASE_API_URL}/api/tag?id=${id}`, {headers});
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
      if (cityId === item.id) {
        address = item.viewValue;
      }
    });
    return address;
  }

  getFiltersParams(filters: any): any {
    const filtersMap = new Map()
      .set('categories', 'categoryId')
      .set('vendors', 'vendorId')
      .set('tags', 'tagsIds')
      .set('location', 'addresses');

    let queryParams = '';
    let queryTextParam = '';

    const resultParams: any = [];

    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        let queryString = '';

        switch (key) {
          case 'categories':
          case 'vendors':
            if (filters[key].length) {
              filters[key].forEach((item: string, index: number) => {
                queryString += `${filtersMap.get(key)} eq ${item}`;
                queryString += filters.categories.length - 1 === index ? '' : ' or ';
              });

              resultParams.push(queryString);
            }
            break;

          case 'tags':
            if (filters[key].length) {
              filters[key].forEach((item: string, index: number) => {
                queryString += `${filtersMap.get(key)}/any(t: t eq ${item})`;
                queryString += filters.categories.length - 1 === index ? '' : ' or ';
              });

              resultParams.push(queryString);
            }
            break;

          case 'location':
            if (filters[key]) {
              queryString = `${filtersMap.get(key)}/any(a: a/cityId eq ${filters[key]})`;
              resultParams.push(queryString);
            }
            break;

          case 'searchText':
            if (filters[key]) {
              queryTextParam = filters[key];
            }
            break;

          case 'searchUserText':
            if (filters[key]) {
              queryParams = `contains(name, '${filters[key]}') or contains(email, '${filters[key]}')`;
            }
            break;
        }
      }
    }

    if (resultParams.length) {
      resultParams.forEach((item: string, index: number) => {
        queryParams += resultParams.length - 1 === index ? item : `${item} and `;
      });
    }

    return {queryParams, queryTextParam};
  }

  getQueryParams(filters: any, top: number, skip: number): any {
    let params = new HttpParams();

    const filtersParams = this.getFiltersParams(filters);

    params = params.append('$top', `${top}`);
    params = params.append('$skip', `${skip}`);
    params = params.append('$count', 'true');

    if (filtersParams.queryTextParam) {
      params = params.append('searchText', filtersParams.queryTextParam);
    }

    if (filtersParams.queryParams) {
      params = params.append('$filter', filtersParams.queryParams);
    }

    return params;
  }
}
