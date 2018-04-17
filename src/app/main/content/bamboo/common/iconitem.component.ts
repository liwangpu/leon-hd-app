import { Component, Input } from '@angular/core';

@Component({
    selector   : 'icon-item',
    templateUrl: './iconitem.component.html',
    styleUrls  : ['./iconitem.component.scss']
})
export class IconItemComponent
{
    @Input() Id: string;
    @Input() Name: string;
    @Input() Description: string;
    @Input() Icon: string;

    constructor()
    {

    }
}
