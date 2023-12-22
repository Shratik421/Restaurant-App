import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  //define the post, get ,put ,delete
  //create restaurant using post method

  postRestaurant(data: any) {
    return this._http.post<any>('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //getRestaurant data using get method
  getRestaurant() {
    return this._http.get<any>('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //update restaurant using put metod
  updateRestaurant(data: any, id: number) {
    return this._http.put<any>('http://localhost:3000/posts/'+ id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //delete restaurant usig delete method
  deleteRestaurant(id: number) {
    return this._http.delete<any>('http://localhost:3000/posts/'+ id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
