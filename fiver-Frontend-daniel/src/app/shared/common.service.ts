import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {CommonEndPoints} from './CommonEndPoints';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  public available_balance: any;

  constructor(private http: HttpClient,
              private endpoints: CommonEndPoints) {
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }
}
