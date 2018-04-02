import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../services/data.model';
import { Subscription } from 'rxjs/Subscription';
import { fuseAnimations } from '../../../../core/animations';
import { GetByIdService } from '../getById.service';

@Component({
    selector   : 'order-detail',
    templateUrl: './orderdetail.component.html',
    styleUrls  : ['./orderdetail.component.scss'],
    animations : fuseAnimations
})
export class OrderDetailComponent implements OnInit, OnDestroy
{
    @Input() order: Order;

    onOrderChanged: Subscription;

    constructor(
        private service: GetByIdService
    )
    {

    }

    ngOnInit()
    {
        // Subscribe to update order on changes
        this.onOrderChanged = this.service.onOrderChanged.subscribe(order => { this.order = order; });
    }

    ngOnDestroy()
    {
        this.onOrderChanged.unsubscribe();
    }

}
