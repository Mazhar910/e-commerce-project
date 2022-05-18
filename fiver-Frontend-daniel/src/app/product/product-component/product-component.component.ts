import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../../dashboards/_alert';
import {EndPoints} from 'src/app/shared/EndPoints';
import {LoggerService} from 'src/app/shared/logger.service';
import {Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InventoryApiService} from '../../inventory/InventoryApi.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {InventoryDialogService} from '../../inventory/_modal/InventoryDialog.service';

@Component({
    selector: 'app-product-component',
    templateUrl: './product-component.component.html',
    styleUrls: ['./product-component.component.css']
})

export class ProductComponentComponent implements OnInit {
    submitted = false;
    createData: FormGroup;
    updateData: FormGroup;
    fileName: any;
    base64textString: any;
    outlets: any;

    constructor(private modalService: NgbModal,
                private formBuilder: FormBuilder,
                private spinner: NgxSpinnerService,
                private apiService: InventoryApiService,
                private router: Router,
                private dialogService: InventoryDialogService,
                private endpoints: EndPoints) {
    }

    ngOnInit(): void {
        this.formInitialization();
        this.getAllProductLine();
    }

    formInitialization() {
        this.createData = new FormGroup({
            productName: new FormControl('', [
                Validators.required,
            ]),

            productCode: new FormControl('', [
                Validators.required,
            ]),

            productScale: new FormControl('', [
                Validators.required,
            ]),

            productVendor: new FormControl('', [
                Validators.required,
            ]),

            productDescription: new FormControl('', [
                Validators.required,
            ]),

            quantityInStock: new FormControl('', [
                Validators.required,
            ]),

            buyPrice: new FormControl('', [
                Validators.required,
            ]),

            sellingPrice: new FormControl('', [
                Validators.required,
            ])
        });
    }

    create(product_image, outlet_id) {
        this.spinner.show();
        this.onUploadChange(product_image.files[0]);

        setTimeout(() => {
            this.createData.addControl('image', new FormControl(this.base64textString));
            this.createData.addControl('productLines', new FormControl(outlet_id));

            console.log(this.createData.value);

            this.apiService.post(this.createData.value, this.endpoints.createProduct).subscribe((response: any) => {
                    console.log(response);
                    this.spinner.hide();
                    this.dialogService.open(response.message, 'Successful', 'success', environment.info);

                    this.createData.reset();
                    this.formInitialization();
                },
                error => {
                    this.spinner.hide();
                    this.dialogService.open('Something went wrong!', environment.error_message, 'danger', environment.error);
                }
            );
        }, 500);

    }

    onUploadChange(file: any): any {
        if (file) {
            const reader = new FileReader();
            this.fileName = file.name;
            reader.onload = this.handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    handleReaderLoaded(e: any): any {
        this.base64textString = btoa(e.target.result);
    }

    getAllProductLine() {
        this.spinner.show();
        this.apiService.get('', this.endpoints.getAllPL).subscribe((response: any) => {
                console.log(response);
                this.outlets = response;
            },
            error => {
                this.spinner.hide();
            }
        );
        this.spinner.hide();
    }
}

