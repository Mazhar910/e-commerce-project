import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {EndPoints} from '../shared/EndPoints';

@Injectable({
    providedIn: 'root'
})
export class ApiManagerService {

    constructor(private http: HttpClient,
                private endpoints: EndPoints) {
    }

    public create(body): any {
        return this.http.post(this.endpoints.createProduct, body).pipe(
            catchError(this.handleError),
        );
    }

    public update(body, id): any {
        return this.http.put(this.endpoints.updateProduct + id, body).pipe(
            catchError(this.handleError),
        );
    }

    public getCategories(): any {
        return this.http.get(this.endpoints.getAllCatForProduct).pipe(
            catchError(this.handleError),
        );
    }

    public getCategoriesAll(): any {
        return this.http.get(this.endpoints.getCategoryCustomer).pipe(
            catchError(this.handleError),
        );
    }

    public getProductByCat(id): any {
        return this.http.get(this.endpoints.getProductByCategory + id).pipe(
            catchError(this.handleError),
        );
    }

    public getAllCartItem(): any {
        return this.http.get(this.endpoints.getCart).pipe(
            catchError(this.handleError),
        );
    }

    public deleteCartItem(id): any {
        return this.http.delete(this.endpoints.deleteItem + id).pipe(
            catchError(this.handleError),
        );
    }

    public addToCart(data): any {
        return this.http.post(this.endpoints.addToCart, data).pipe(
            catchError(this.handleError),
        );
    }

    public placeOrder(): any {
        return this.http.post(this.endpoints.createOrder, '').pipe(
            catchError(this.handleError),
        );
    }

    public getAll(): any {
        return this.http.get(this.endpoints.getProductCustomer).pipe(
            catchError(this.handleError),
        );
    }

    public getById(id): any {
        return this.http.get(this.endpoints.getProductById + id).pipe(
            catchError(this.handleError),
        );
    }

    public deleteProduct(id): any {
        return this.http.delete(this.endpoints.deleteProduct + id).pipe(
            catchError(this.handleError),
        );
    }


    private handleError(error: HttpErrorResponse): any {
        return throwError(error);
    }
}
