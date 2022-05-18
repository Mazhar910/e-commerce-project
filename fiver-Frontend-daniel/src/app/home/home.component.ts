import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {ApiManagerService} from '../product/api-manager.service';
import {LoggerService} from '../shared/logger.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';
import {EndPoints} from '../shared/EndPoints';
import {AlertService} from '../dashboards/_alert';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    products: any;
    categories: any;
    fileName: any;
    logged: any;

    constructor(
        private apiService: ApiManagerService,
        private loggerService: LoggerService,
        private spinner: NgxSpinnerService,
        private alertService: AlertService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.getAllProduct();
        if (localStorage.getItem('user_token')) {
            this.logged = true;
        } else {
            this.logged = false;
        }
        this.getAllCategories();
    }

    logout() {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');
        this.router.navigate(['/authentication/login']);
    }

    getAllProduct() {
        this.spinner.show();
        this.apiService.getAll().subscribe((response: any) => {
                console.log(response);
                this.products = response;
            },
            error => {
                this.spinner.hide();
                this.loggerService.log('error', error);
            }
        );
        this.spinner.hide();
    }

    getAllProductByCat(id) {
        this.spinner.show();
        this.apiService.getProductByCat(id).subscribe((response: any) => {
                console.log(response);
                this.products = response;
            },
            error => {
                this.spinner.hide();
                this.loggerService.log('error', error);
            }
        );
        this.spinner.hide();
    }

    getAllCategories() {
        this.spinner.show();
        this.apiService.getCategoriesAll().subscribe((response: any) => {
                console.log(response);
                this.categories = response;
            },
            error => {
                this.spinner.hide();
                this.loggerService.log('error', error);
            }
        );
        this.spinner.hide();
    }


    addToCart(id: any, qty: any) {
        if (qty <= 0) {
            this.alertService.error('Qty Cannot be empty', {autoClose: true});
            return;
        }

        const data = {
            'productId': id,
            'quantity': qty
        };
        this.spinner.show();
        this.apiService.addToCart(data).subscribe((response: any) => {
                console.log(response);
                this.alertService.success(response.message, {autoClose: true});
            },
            error => {
                this.spinner.hide();
                this.loggerService.log('error', error);
                this.alertService.success(error.error.message, {autoClose: true});
                this.router.navigate(['/authentication/login']);
            }
        );
        this.spinner.hide();
    }

}
