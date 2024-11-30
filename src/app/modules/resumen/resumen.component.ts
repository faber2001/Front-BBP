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
                fecha: [''],
                country: [''],
                language: [''],
            }),
            step2: this._formBuilder.group({
                nombre: ['', [Validators.maxLength(50)]],
                cargo: ['', [Validators.maxLength(50)]],
                correoElectronico: [
                    '',
                    [Validators.email],
                ],
                contacto: [
                    '',
                    [

                        Validators.pattern('^[0-9]{10}$'),
                    ],
                ],
            }),
            step3: this._formBuilder.group({
                tipoEstrategiaIdentificacion: [''],
                tipoPractica: [''],
                codigoPractica: [{ value: '', disabled: true }],
                tipologia: [{ value: ''}],
                estadoFlujo: [{ value: 'Buena Practica Candidata', disabled: true }],
                nivelBuenaPractica: [''],
                nombreDescriptivo: ['', Validators.maxLength(100)],
                propositoPractica: ['', Validators.maxLength(300)],
                objetivoPrincipal: [''],
                pushNotifications: ['everything', Validators.required],
            }),
            newFields: this._formBuilder.group({
                nombrePractica: [''],
                identificacion: [''],
                contenido: [''],
            }),
            step4: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [false],
                    featuredProducts: [false],
                    messages: [false],
                }),
                pushNotifications: ['everything'],
                impactoEsperado: this._formBuilder.array([]),
                metodologiaUsada: ['', [Validators.maxLength(500)]],
                duracionImplementacion: [''],
                etapasMetodologia: this._formBuilder.array([]),
                periodoDesarrollo: this._formBuilder.group({
                    inicio: [''],
                    fin: [''],
                }),
            }),
            step5: this._formBuilder.group({
                tipoMaterialProducido: this._formBuilder.array([], Validators.required),
                apoyoRecibido: this._formBuilder.array([], Validators.required),
                reconocimientos: ['', Validators.required],
                objetoControl: ['', Validators.required],
                taxonomiaEvento: this._formBuilder.array([], Validators.required),
                tipoActuacion: ['', Validators.required],
                documentoActuacion: ['', [Validators.pattern(/(\.pdf|\.docx|\.xlsx|\.pptx|\.zip)$/)]], // Carga de documentos
                descripcionResultados: ['', Validators.required],
            }),
        });
    }
    onPracticaChange(event: any): void {
        const selectedValue = event.value;
        const step3Form = this.horizontalStepperForm.get('step3');

        if (selectedValue === 'BP') {
            step3Form?.get('tipologia')?.enable();
            step3Form?.get('codigoPractica')?.setValue('BP-' + this.generateConsecutive());
        } else {
            step3Form?.get('tipologia')?.disable();
            step3Form?.get('codigoPractica')?.setValue('');
        }
    }

    private generateConsecutive(): string {
        const random = Math.floor(1000 + Math.random() * 9000);
        return random.toString();
    }
}
