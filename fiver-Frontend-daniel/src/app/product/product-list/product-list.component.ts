import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {InventoryApiService} from '../../inventory/InventoryApi.service';
import {EndPoints} from '../../shared/EndPoints';

class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    products: any;
    outlets: any;

    constructor(private spinner: NgxSpinnerService,
                private apiService: InventoryApiService,
                private router: Router,
                private endpoints: EndPoints,
                private http: HttpClient) {
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnInit(): void {
        this.loadDatatables(0);
    }

    loadDatatables(outlet_id) {
        const that = this;
        this.dtOptions = {
            pagingType: 'simple_numbers',
            pageLength: 5,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                that.http.post<DataTablesResponse>(this.endpoints.getProducts,
                    dataTablesParameters, {}
                ).subscribe(resp => {
                    that.products = resp.data;
                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: []
                    });
                });
            },
            searching: true,
            columns: [
                {data: 'productName', searchable: true},
                {data: 'productCode'},
                {data: 'productScale'},
                {data: 'productVendor'},
                {data: 'productDescription'},
                {data: 'quantityInStock'},
                {data: 'buyPrice'},
                {data: 'sellingPrice'},
                {data: 'image'},
            ]
        };
    }

    getAllProduct() {
        this.spinner.show();
        this.apiService.get('', this.endpoints.getProducts).subscribe((response: any) => {
                console.log(response);
            },
            error => {
                this.spinner.hide();
            }
        );
        this.spinner.hide();
    }


    gotoUpdate(id) {
        localStorage.removeItem('product_id');
        this.router.navigate(['product/update']);
        localStorage.setItem('product_id', id);
    }

    deleteData(id) {
        this.spinner.show();
        this.apiService.delete(id, this.endpoints.deleteProduct).subscribe((response: any) => {
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance.destroy();
                    this.loadDatatables(0);
                    setTimeout(() => {
                        this.dtTrigger.next();
                        this.spinner.hide();
                    }, 1500);
                });
            },
            error => {
                this.spinner.hide();
            }
        );
        this.spinner.hide();
    }

    filterByOutletId(outletId) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.loadDatatables(outletId);
            setTimeout(() => {
                this.dtTrigger.next();
                this.spinner.hide();
            }, 500);
        });
    }
}
