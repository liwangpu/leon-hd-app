import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PageEvent, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data.service';
import { ListableEntity, Product } from '../../services/data.model';
import { PaginatorComponent } from '../../bambooComponents/common/paginator.component';
import { fuseAnimations } from '../../../../core/animations';

@Component({
    selector   : 'orders-page',
    templateUrl: './orderspage.component.html',
    styleUrls  : ['./orderspage.component.scss'],
    animations : fuseAnimations
})
export class OrdersPageComponent  implements AfterViewInit
{
    items: any;
    displayedColumns = ['id', 'content', 'state', 'stateTime'];

    @ViewChild('page') page: PaginatorComponent;

    constructor(private http: HttpClient, private dataService: DataService)
    {
        // this.items = [{ name: 'Apple', description: 'Hallo', icon: 'http://c.hiphotos.baidu.com/image/pic/item/4bed2e738bd4b31ccd851da88bd6277f9e2ff86c.jpg'}, 
        // {name: 'Bravo', description: 'Hi hi', icon: 'http://f.hiphotos.baidu.com/image/pic/item/c75c10385343fbf2f7da8133bc7eca8065388f2f.jpg'}];
        this.items = null;
    }

    ngAfterViewInit()
    {
        this.loadPage(1);
    }

    loadPage(page: number)
    {
        this.dataService.getOrders('', '', page, this.page.pageSize).subscribe(res =>{
            this.items = new MatTableDataSource(res.data);
            this.page.totalItems = res.total;
            this.page.updatePages(false);
        });
    }
}