import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../services/data.model';
import { Subscription } from 'rxjs/Subscription';
import { fuseAnimations } from '../../../../core/animations';
import { GetByIdService } from '../getById.service';

@Component({
    selector   : 'product-detail',
    templateUrl: './productdetail.component.html',
    styleUrls  : ['./productdetail.component.scss'],
    animations : fuseAnimations
})
export class ProductDetailComponent implements OnInit, OnDestroy
{
    @Input() product: Product;

    onOrderChanged: Subscription;

    constructor(
        private service: GetByIdService
    )
    {

    }

    ngOnInit()
    {
        // Subscribe to update order on changes
        this.onOrderChanged = this.service.onOrderChanged.subscribe(product => { this.product = product; });
    }

    ngOnDestroy()
    {
        this.onOrderChanged.unsubscribe();
    }

}
