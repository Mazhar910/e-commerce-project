import {environment} from '../../environments/environment';
import {OnInit} from '@angular/core';

export class EndPoints {
    private baseUrl = environment.base_url;

    public readonly createCat = this.baseUrl + 'api/category/create';
    public readonly getAllCat = this.baseUrl + 'api/category/get/all';
    public readonly getSpecificCat = this.baseUrl + 'api/category/get/';
    public readonly updateCat = this.baseUrl + 'api/category/update/';
    public readonly deleteCat = this.baseUrl + 'api/category/delete/';

    public readonly createPL = this.baseUrl + 'api/productline/create';
    public readonly getAllPL = this.baseUrl + 'api/productline/get/all';
    public readonly updatePL = this.baseUrl + 'api/productline/update/';
    public readonly deletePL = this.baseUrl + 'api/productline/delete/';
    public readonly getSpecificPL = this.baseUrl + 'api/productline/get/';


    public readonly createProduct = this.baseUrl + 'api/product/create';
    public readonly getProducts = this.baseUrl + 'api/product/get/all';
    public readonly getProductById = this.baseUrl + 'api/product/get-by-id';
    public readonly updateProduct = this.baseUrl + 'api/product/update';
    public readonly getAllCatForProduct = this.baseUrl + 'api/product/get/all/cat';
    public readonly deleteProduct = this.baseUrl + 'api/product/delete';

    public readonly createOrder = this.baseUrl + 'api/order/all';
    public readonly getOrders = this.baseUrl + 'api/order/get/all';
    public readonly getUserOrder = this.baseUrl + 'api/order/get/all-by-user';

    public readonly addToCart = this.baseUrl + 'api/cart/add';
    public readonly getCart = this.baseUrl + 'api/cart/get';
    public readonly deleteItem = this.baseUrl + 'api/cart/delete/';

    public readonly getProductCustomer = this.baseUrl + 'api/customer/product/get/all';
    public readonly getCategoryCustomer = this.baseUrl + 'api/customer/category/get/all';
    public readonly getProductByCategory = this.baseUrl + 'api/customer/get-by-cat/';
}
