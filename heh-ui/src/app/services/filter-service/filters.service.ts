import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { cloneDeep } from 'lodash';
import { forEach, isEqual, size, includes, find } from 'lodash';
import { forkJoin, Observable } from 'rxjs';

import { BASE_API_URL } from 'src/app/global';

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
    headers = headers.append('accept', '*/*');

    return this.http.get(`${BASE_API_URL}/odata/Vendor`, {headers});
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
    this.getLocations().subscribe((data) => {
      this.countriesCities = data;
    });

    this.filterOptions = this.getDefaultFilters();

    const promises = [this.getLocations(), this.getCategoriesTags(), this.getVendors()];

    return forkJoin(promises).toPromise().then((response) => {
      forEach(response[0], (address: any) => {
        forEach(address.cities, (city: any) => {
          this.filterOptions.locations.push({
            id: city.id,
            viewValue: `${address.country}, ${city.name}`
          });
        });
      });

      forEach(response[1], (category: any) => {
        addItemToFilters(this.filterOptions.categories, category);

        forEach(category.tags, (tag: any) => {
          this.filterOptions.tags.push({
            id: tag.id,
            viewValue: tag.name,
            categoryId: tag.categoryId
          });
        });
      });

      forEach(response[2].value, (vendor: any) => {
        this.filterOptions.vendors.push({
          id: vendor.id,
          viewValue: vendor.name,
          addresses: vendor.addresses
        });
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
    return find(this.filterOptions.tags, (tag: any) => {
      return isEqual(tag.id, id);
    })?.viewValue;
  }

  getCategoryById(id: string): string {
    return find(this.filterOptions.categories, (category: any) => {
      return isEqual(category.id, id);
    })?.viewValue;
  }

  getFilters(): any {
    return cloneDeep(this.filterOptions);
  }

  getAddressByCityId(cityId: string): string {
    let address = '';

    forEach(this.filterOptions.locations, (item: any) => {
      if (isEqual(cityId, item.id)) {
        address = item.viewValue;
      }
    });
    return address;
  }

  getCountryById(countryId: string): string {
    let country = '';

    forEach(this.countriesCities, (item: any) => {
      if (isEqual(countryId, item.id)) {
        country = item.country;
      }
    });
    return country;
  }

  getFiltersParams(filters: any): any {
    const objDate = new Date(Date.now());
    const objDateString = new Date(Date.now()).toString();

    const dueMonth = (objDate.getMonth() + 1).toString().length === 1 ?
                      `0${(objDate.getMonth() + 1).toString()}` :
                      (objDate.getMonth() + 1).toString();

    let queryParams = '';

    if (filters.experationDate && filters.location.length) {
      queryParams = `endDate ge ${objDateString.slice(11, 15)}-` + dueMonth +
                    `-${objDateString.slice(8, 10)}T00:00:00Z and `;
    }

    if (filters.experationDate && !filters.location.length) {
      queryParams = `endDate ge ${objDateString.slice(11, 15)}-` + dueMonth +
        `-${objDateString.slice(8, 10)}T00:00:00Z`;
    }

    let resultParams: any = [];
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
          if (filters[key].length) {
            resultParams.push(
              `${FILTERS_MAP.get(key)}/any(a: a/countryId eq ${filters[key][0]} ${filters[key][1] ? `and (a/cityId eq null or a/cityId eq ${filters[key][1]}))` : `)`}`
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

    resultParams = resultParams.filter((item: string) => size(item));
    forEach(resultParams, (item: string, index: number) => {
        queryParams +=
          isEqual(size(resultParams) - 1, index) ? item : `${item} and `;
      });

    return { queryParams, queryTextParam, queryStartDate, queryEndDate };
  }

buildListQuery(filters: any, key: string): string {
    let query = '';

    const mapped = (filters[key] || []).map((item: string) => `'${item}'` );

    if (size(mapped) >= 1) {
      query +=
      `${FILTERS_MAP.get(key)}` + (includes(['vendorCategories', 'tags'], key)
      ? `/any(t: t in [${mapped}])` : ` in [${mapped}]`);
    }

    return query;
  }

getQueryParams(filters: any, top: number, skip: number, skipPagination?: boolean): any {
  let params = new HttpParams();

  const filtersParams = this.getFiltersParams(filters);

  if (!skipPagination) {
    params = params.append('$top', `${top}`);
    params = params.append('$skip', `${skip}`);
    params = params.append('$count', 'true');
  }

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

  if (filters.experationDate) {
    params = params.append('$orderby', 'startDate asc');
  }

  if (filters.statisticsOrderby) {
    params = params.append('$orderby', 'viewsAmount desc');
  }

  return params;
  }
}
