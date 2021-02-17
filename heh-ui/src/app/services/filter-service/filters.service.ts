import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getVendorById(id: string): string {
    return this.filterOptions.vendors.find((vendor: any) => {
      return vendor.id === id;
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

  setQueryParams(searchData: any): void {
    this.queryParams = '';
    this.queryTextParam = '';

    if (searchData.searchUserText) {
        this.queryParams =  `contains(name, '${searchData.searchUserText}') or contains(email, '${searchData.searchUserText}')`;
    }
    if (searchData.searchText || searchData.location ||
        searchData.categories || searchData.tags || searchData.vendors) {
    let locationParams = '';
    let categoryParams = '';
    let tagParams = '';
    let vendorParams = '';
    const resultParams: any = [];
    let continiusParams = '';

    if (searchData.searchText) {
      this.queryTextParam = `${searchData.searchText}`;
    }

    if (searchData.location) {
      locationParams = `addresses/any(a: a/cityId eq ${searchData.location})`;
      resultParams.push(locationParams);
    }

    if (searchData.categories.length) {
      searchData.categories.forEach((item: string, index: number) => {
        if (searchData.categories.length - 1 === index) {
          categoryParams += `categoryId eq ${item}`;
        } else {
          categoryParams += `categoryId eq ${item} or `;
        }
      });
      resultParams.push(categoryParams);
    } else {
      categoryParams = '';
    }

    if (searchData.tags.length) {
      searchData.tags.forEach((item: string, index: number) => {
        if (searchData.tags.length - 1 === index) {
          tagParams += `tagsIds/any(t: t eq ${item})`;
        } else {
          tagParams += `tagsIds/any(t: t eq ${item}) or `;
        }
      });
      resultParams.push(tagParams);
    } else {
      tagParams = '';
    }

    if (searchData.vendors.length) {
      searchData.vendors.forEach((item: string, index: number) => {
        if (searchData.vendors.length - 1 === index) {
          vendorParams += `vendorId eq ${item}`;
        } else {
          vendorParams += `vendorId eq ${item} or `;
        }
      });
      resultParams.push(vendorParams);
    } else {
      vendorParams = '';
    }

    if (resultParams.length) {
      resultParams.forEach((item: string, index: number) => {
        if (resultParams.length - 1 === index) {
          continiusParams += item;
          } else {
          continiusParams += `${item} and `;
          }
        });
      }
    this.queryParams = continiusParams;
    }
  }
}
