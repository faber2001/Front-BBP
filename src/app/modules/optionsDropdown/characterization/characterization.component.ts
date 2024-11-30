import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@Component({
    selector     : 'characterization',
    standalone   : true,
    templateUrl  : './characterization.component.html',
    styleUrl     : './characterization.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatTableModule,
        MatIconModule,
        MatTableModule,
        MatMenuModule,

    ],
})

export class CharacterizationComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
