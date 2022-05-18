import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../product/api-manager.service';
import {LoggerService} from '../shared/logger.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';
import {EndPoints} from '../shared/EndPoints';
import {AlertService} from '../dashboards/_alert';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: any;

    constructor(
        private apiService: ApiManagerService,
        private loggerService: LoggerService,
        private spinner: NgxSpinnerService,
        private http: HttpClient,
        private endpoints: EndPoints,
        private alertService: AlertService
    ) {
    }

    ngOnInit(): void {
        this.getAllCartItems();
    }

    getAllCartItems() {
        this.spinner.show();
        this.apiService.getAllCartItem().subscribe((response: any) => {
                console.log(response);
                this.cartItems = response;
            },
            error => {
                this.spinner.hide();
                this.loggerService.log('error', error);
            }
        );
        this.spinner.hide();
    }

    deleteCartItem(id) {
        this.spinner.show();
        this.apiService.deleteCartItem(id).subscribe((response: any) => {
                console.log(response);
                this.alertService.success('Cart Item Deleted Successfully');
                setTimeout(() => {
                    this.getAllCartItems();
                }, 500);
            },
            error => {
                this.spinner.hide();
                this.loggerService.log('error', error);
            }
        );
        this.spinner.hide();
    }


    placeOrder() {
        this.spinner.show();
        this.apiService.placeOrder().subscribe((response: any) => {
                console.log(response);
                this.alertService.success('Order Placed Successfully');
                setTimeout(() => {
                    this.getAllCartItems();
                }, 500);
            },
            error => {
                this.spinner.hide();
                this.loggerService.log('error', error);
            }
        );
        this.spinner.hide();

    }
}
