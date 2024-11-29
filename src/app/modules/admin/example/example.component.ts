import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    styleUrl     : './example.component.scss',
    encapsulation: ViewEncapsulation.None,
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
