import { Component, ViewEncapsulation } from '@angular/core';
import {MatTableModule} from  '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    styleUrl     : './example.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatIconModule,
        MatTableModule,
        MatIconModule,
        MatMenuModule
    ]
})
export class ExampleComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
