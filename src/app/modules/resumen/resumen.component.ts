import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormBuilder,
    FormGroup
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
import { ResumenService } from './resumen.service'; // Asegúrate de que la ruta es correcta
import Swal from 'sweetalert2';


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
        MatNativeDateModule,
    ],
    providers: [MatDatepickerModule],
})
export class ResumenComponent implements OnInit {
    horizontalStepperForm: UntypedFormGroup;
    selectedFile: File | null = null;

    constructor(private _formBuilder: UntypedFormBuilder,
        private resumenService: ResumenService) {}

    triggerFileInput(): void {
        const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
        fileInput?.click();
      }

      onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input?.files?.length) {
        this.selectedFile = input.files[0];
        console.log('Archivo seleccionado:', this.selectedFile);
      }
    }

    submitForm(): void {
        if (this.horizontalStepperForm.valid) {
          // Definir los campos multiseleccionables
          const multiSelectFields = [
            'apoyoRecibido',
            'etapasMetodologia',
            'impactoEsperado',
            'taxonomiaEvento',
            'tipoMaterialProducido',
          ];

          // Obtener los valores del formulario
          const formValues = this.horizontalStepperForm.getRawValue();

          // Transformar los campos multiseleccionables en cadenas separadas por comas
          multiSelectFields.forEach((field) => {
            Object.keys(formValues).forEach((step) => {
              if (
                formValues[step] &&
                formValues[step][field] &&
                Array.isArray(formValues[step][field])
              ) {
                formValues[step][field] = formValues[step][field].join(',');
              }
            });
          });

          // Aplana el objeto si es necesario y envía los datos
          const flattenedValues = this.flattenObject(formValues);

          this.resumenService.sendFormDataAsJson(flattenedValues).subscribe(
            (response) => {
              // Mostrar alerta de éxito usando SweetAlert2
              Swal.fire({
                title: '¡Formulario Enviado!',
                text: 'Tu formulario ha sido enviado con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then(() => {
                // Redirigir a otra página o vista después de un segundo
                window.location.href = './example';
              });
            },
            (error) => {
              // Mostrar alerta de error usando SweetAlert2
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar el formulario. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            }
          );


        } else {
          console.warn('Formulario no válido');
        }
    }

    ngOnInit(): void {
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                fechaDiligenciamiento: [''],
                nombreEntidad: [''],
                nombreDependenciaArea: [''],
            }),
            step2: this._formBuilder.group({
                nombre: ['', [Validators.maxLength(50)]],
                cargo: ['', [Validators.maxLength(50)]],
                correo: [
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
                estadoFlujo: [{ value: '' }],
                nivelBuenaPractica: [''],
                nombreDescriptivoBuenaPractica: ['', Validators.maxLength(100)],
                propositoPractica: ['', Validators.maxLength(300)],
                objetivoPrincipalPractica: [''],
            }),
            step4: this._formBuilder.group({
                impactoEsperado: [''],
                metodologiaUsada: ['', [Validators.maxLength(500)]],
                duracionImplementacion: [''],
                etapasMetodologia: [''],
                periodoDesarrolloInicio: [''],
                periodoDesarrolloFin: [''],
            }),
            step5: this._formBuilder.group({
                tipoMaterialProducido: [''],
                apoyoRecibido: [''],
                reconocimientosNacionalesInternacionales: [''],
                objetoControl: [''],
                taxonomiaEvento: [''],
                tipoActuacion: [''],
                descripcionResultados: [''],
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
    onDateChange(event: any, stepName: string, controlName: string): void {
        const date = event.value;
        const formattedDate = this.formatDate(date);
        this.horizontalStepperForm.get(`${stepName}.${controlName}`)?.setValue(formattedDate);
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    flattenObject(obj: any): any {
        let result: any = {};

        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              const temp = this.flattenObject(obj[key]);
              for (const subKey in temp) {
                if (temp.hasOwnProperty(subKey)) {
                  if (subKey.startsWith('step')) {
                    result[subKey.substring(subKey.indexOf('.') + 1)] = temp[subKey];
                  } else {
                    result[subKey] = temp[subKey];
                  }
                }
              }
            } else {
              result[key] = obj[key];
            }
          }
        }
        return result;
      }
}
