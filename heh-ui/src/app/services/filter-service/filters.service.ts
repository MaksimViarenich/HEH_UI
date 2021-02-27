import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { BASE_API_URL } from 'src/app/global';
import { cloneDeep } from 'lodash';

export const FILTERS_MAP = new Map([
  ['categories', 'categoryId'],
  ['vendors', 'vendorId'],
  ['tags', 'tagsIds'],
  ['location', 'addresses'],
  ['vendorCategories', 'categoriesIds'],
  ['idForVendor', 'id']
  ]);

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

  getLocations(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.get(`${BASE_API_URL}/api/location`, {headers});
  }

  getCategoriesTags(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.get(`${BASE_API_URL}/api/category`, {headers});
  }

  getVendors(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.get(`${BASE_API_URL}/api/vendor`, {headers});
  }

  addNewCategory(newCategory: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', `application/json;odata.metadata=minimal;odata.streaming=true`);
    headers = headers.append('accept', '*/*');

    return this.http.post(`${BASE_API_URL}/api/category`, newCategory, {headers});
  }

  editCategory(category: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Content-Type', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.put(`${BASE_API_URL}/api/category`, category, {headers});
  }

  deleteCategory(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    return this.http.delete(`${BASE_API_URL}/api/category?id=${id}`, {headers});
  }

  addNewTag(newTag: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', `application/json;odata.metadata=minimal;odata.streaming=true`);
    headers = headers.append('accept', '*/*');

    return this.http.post(`${BASE_API_URL}/api/tag`, newTag, {headers});
  }

  editTag(tag: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Content-Type', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.put(`${BASE_API_URL}/api/tag`, tag, {headers});
  }

  deleteTag(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

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
    let resultParams: any = [];
    let queryParams = '';
    let queryTextParam = '';
    let queryStartDate = '';
    let queryEndDate = '';

    for (const key in filters) {
      if (!filters.hasOwnProperty(key))
      { continue; }

      switch (key) {
        case 'vendorCategories':
        case 'tags':
          resultParams.push(this.buildListQuery(filters, key));
          break;

        case 'categories':
          if (!filters.hasOwnProperty('vendorCategories')) {
            resultParams.push(this.buildListQuery(filters, key));
          }
          break;

        case 'vendors':
          if (!filters.hasOwnProperty('idForVendor')) {
            resultParams.push(this.buildListQuery(filters, key));
          }
          break;

        case 'idForVendor':
          resultParams.push(this.buildListQuery(filters, key));
          break;

        case 'location':
          if (filters[key]) {
            resultParams.push(
              `${FILTERS_MAP.get(key)}/any(a: a/cityId eq ${filters[key]})`
            );
          }
          break;

        case 'searchUserText':
          if (filters[key]) {
            queryParams = `contains(name, '${filters[key]}') or contains(email, '${filters[key]}')`;
          }
          break;

        case 'searchHistoryText':
          if (filters[key]) {
              resultParams.push(`contains(userName, '${filters[key]}') or contains(userEmail, '${filters[key]}') or contains(description, '${filters[key]}')`);
          }
          break;

        case 'historyLocation':
          if (filters[key]) {
              resultParams.push(`UserAddress/CityId eq ${filters[key]}`);
          }
          break;

        case 'searchText':
          if (filters[key]) {
            queryTextParam = filters[key];
          }
          break;

        case 'startDate':
          if (filters[key]) {
            queryStartDate = filters[key];
          }
          break;

        case 'endDate':
          if (filters[key]) {
            queryEndDate = filters[key];
          }
          break;

        case 'searchNotificationText':
          if (filters[key]) {
            queryParams = `contains(title, '${filters[key]}') or contains(message, '${filters[key]}')`;
          }
          break;
        }
      }

    resultParams = resultParams.filter((item: string) => item.length);
    resultParams.forEach((item: string, index: number) => {
        queryParams +=
          resultParams.length - 1 === index ? item : `${item} and `;
      });

    return { queryParams, queryTextParam, queryStartDate, queryEndDate };
  }

buildListQuery(filters: any, key: string): string {
    let query = '';

    const mapped = (filters[key] || []).map((item: string) => `'${item}'` );

    if (mapped.length >= 1) {
      query +=
      `${FILTERS_MAP.get(key)}` + (['vendorCategories', 'tags'].includes(key)
      ? `/any(t: t in [${mapped}])` : ` in [${mapped}]`);
    }

    return query;
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

    if (filtersParams.queryStartDate && !filtersParams.queryEndDate) {
      params = params.append('startDate', `${filtersParams.queryStartDate}T00:00:00Z`);
      params = params.append('endDate', `${filtersParams.queryStartDate}T00:00:00Z`);
    }

    if (filtersParams.queryEndDate && filtersParams.queryStartDate) {
      params = params.append('startDate', `${filtersParams.queryStartDate}T00:00:00Z`);
      params = params.append('endDate', `${filtersParams.queryEndDate}T00:00:00Z`);
    }

    if (filtersParams.queryParams) {
      params = params.append('$filter', filtersParams.queryParams);
    }

    return params;
  }
}
