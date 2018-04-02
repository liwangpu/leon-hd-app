import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';

@Component({
    selector     : 'raw-asset',
    templateUrl  : './rawasset.component.html',
    styleUrls    : ['./rawasset.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RawAssetComponent implements OnInit
{

    constructor()
    {

    }

    ngOnInit()
    {

    }
}
