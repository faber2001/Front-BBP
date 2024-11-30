import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../../optionsDropdown/users/users.component';
import { CatalogComponent } from './../../catalog/catalog.component';
import { CharacterizationComponent } from '../../optionsDropdown/characterization/characterization.component';
import { PublicationComponent } from '../../optionsDropdown/publication/publication.component';
import { RolesServicesComponent } from '../../optionsDropdown/rolesServices/rolesServices.component';
import { TrackingComponent } from '../../optionsDropdown/tracking/tracking.component';
import { WorkflowComponent } from '../../optionsDropdown/workflow/workflow.component';

// Definición de rutas
const routes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'characterization', component: CharacterizationComponent },
    { path: 'publication', component: PublicationComponent },
    { path: 'rolesServices', component: RolesServicesComponent },
    { path: 'tracking', component: TrackingComponent },
    { path: 'workflow', component: WorkflowComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' } // Ruta por defecto
];

@Component({
    selector: 'example',
    standalone: true,
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatIconModule,
        MatTableModule,
        MatMenuModule,
        RouterModule
    ]
})
export class ExampleComponent {
    /**
     * Constructor
     */
    constructor() {}
}
