import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'resumen',
    standalone: true,
    templateUrl: './resumen.component.html',
    styleUrl: './resumen.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [MatDatepickerModule],
})
export class ResumenComponent implements OnInit {
    horizontalStepperForm: UntypedFormGroup;

    constructor(private _formBuilder: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                fecha: ['', Validators.required],
                country: ['', Validators.required],
                language: ['', Validators.required],
            }),
            step2: this._formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                userName: ['', Validators.required],
                about: [''],
            }),
            step3: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true],
                }),
                pushNotifications: ['everything', Validators.required],
            }),
            // Nuevo paso para los campos adicionales
            newFields: this._formBuilder.group({
                nombrePractica: ['', Validators.required],
                identificacion: ['', Validators.required],
                contenido: ['', Validators.required],
            }),
        });
    }
}
