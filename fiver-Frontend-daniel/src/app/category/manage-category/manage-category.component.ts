import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CategoryApiManagerService} from '../category-api-manager.service';
import {LoggerService} from '../../shared/logger.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';

import {AlertService} from '../_alert';
import {EndPoints} from '../../shared/EndPoints';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}

@Component({
    selector: 'app-manage-category',
    templateUrl: './manage-category.component.html',
    styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit, AfterViewInit {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    categories: any;
    category: any;
    updateContainer: string;

    successMessage: string;
    errorMessage: string;

    constructor(private apiService: CategoryApiManagerService,
                private loggerService: LoggerService,
                private spinner: NgxSpinnerService,
                private http: HttpClient,
                private endpoints: EndPoints,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.updateContainer = 'hidden';
        this.loadDatatable();
        this.successMessage = null;
        this.errorMessage = null;
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    loadDatatable() {
        const that = this;

        this.dtOptions = {
            pagingType: 'simple_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                that.http.post<DataTablesResponse>(this.endpoints.getAllCat,
                    dataTablesParameters, {}
                ).subscribe(resp => {
                    that.categories = resp.data;
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
                {data: 'name'}
            ]
        };
    }

    createCategory(name: string) {
        this.spinner.show();
        const data = {
            'name': name,
        };
        this.apiService.createCategory(data).subscribe((response: any) => {
                this.spinner.hide();
                console.log(response);
                this.successMessage = 'Category Created Successfully';
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance.destroy();
                    this.loadDatatable();
                    setTimeout(() => {
                        this.dtTrigger.next();
                        this.spinner.hide();
                    }, 500);

                    setTimeout(() => {
                        this.successMessage = null;
                    }, 2000);
                });
            },
            error => {
                this.spinner.hide();
                this.errorMessage = error;
                this.loggerService.log('error', error);
            }
        );
    }

    getData(id: any) {
        this.spinner.show();
        this.apiService.getCatById(id).subscribe((response: any) => {
                this.spinner.hide();
                this.updateContainer = 'show';
                this.category = response;
                console.log(response);
            },
            error => {
                this.spinner.hide();
                this.loggerService.log('error', error);
            }
        );
        console.log(id);
    }

    updateCategory(name: string, id: string) {
        const data = {
            'name': name,
        };
        this.apiService.updateCategory(data, id).subscribe((response: any) => {
                this.spinner.hide();
                this.updateContainer = 'hidden';
                this.category = null;
                this.successMessage = 'Category Updated Successfully';
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance.destroy();
                    this.loadDatatable();
                    setTimeout(() => {
                        this.dtTrigger.next();
                        this.spinner.hide();
                    }, 200);

                    setTimeout(() => {
                        this.successMessage = null;
                        this.updateContainer = 'hidden';
                    }, 2000);
                });
            },
            error => {
                this.spinner.hide();
                console.log(error);
            }
        );
    }

    hide() {
        this.updateContainer = 'hidden';
    }

    deleteData(id) {
        this.spinner.show();
        this.apiService.deleteCategory(id).subscribe((response: any) => {
                this.successMessage = 'Category Deleted Successfully';
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance.destroy();
                    this.loadDatatable();
                    setTimeout(() => {
                        this.dtTrigger.next();
                        this.spinner.hide();
                    }, 500);

                    setTimeout(() => {
                        this.successMessage = null;
                    }, 2000);
                });
            },
            error => {
                this.spinner.hide();
                console.log(error);
            }
        );
    }
}
