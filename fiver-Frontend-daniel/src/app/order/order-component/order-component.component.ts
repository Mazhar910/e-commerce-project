import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../../dashboards/_alert';
import {EndPoints} from 'src/app/shared/EndPoints';
import {LoggerService} from 'src/app/shared/logger.service';
import {ApiManagerService} from '../api-manager.service';
import {FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';

class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}

@Component({
    selector: 'app-order-component',
    templateUrl: './order-component.component.html',
    styleUrls: ['./order-component.component.css']
})


export class OrderComponentComponent implements OnInit, AfterViewInit {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    displayMonths = 1;
    navigation = 'select';
    outsideDays = 'visible';
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;

    products: any;
    regions: any;
    orders: any;
    category: {
        id: any;
        name: any;
        childCategory: any[];
    };
    selectedProduct: any[];
    product: any;
    updateContainer: string;
    selectedOrder: any;

    constructor(
        private apiService: ApiManagerService,
        private loggerService: LoggerService,
        private spinner: NgxSpinnerService,
        private http: HttpClient,
        private endpoints: EndPoints,
        private alertService: AlertService,
        private fb: FormBuilder,
        private fb_u: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.loadDatatables();
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    loadDatatables() {
        const that = this;
        let url = '';
        if (localStorage.getItem('user_roles').includes('ROLE_ADMIN') || localStorage.getItem('user_roles').includes('ROLE_SUPER_ADMIN')) {
            url = this.endpoints.getOrders;
        } else {
            url = this.endpoints.getUserOrder;
        }
        this.dtOptions = {
            pagingType: 'simple_numbers',
            pageLength: 5,
            serverSide: true,
            processing: true,
            ajax: (dataTablesss: any, callback) => {
                that.http.post<DataTablesResponse>(url, dataTablesss, {}
                ).subscribe(resp => {
                    that.orders = resp.data;
                    console.log(resp.data);
                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: []
                    });
                });
            },
            searching: false,
            columns: [
                {data: 'id'},
                {data: 'total'},
                {data: 'orderedProducts'},
            ]
        };
    }
}
