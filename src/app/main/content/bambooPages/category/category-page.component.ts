import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data.service';
import { ListableEntity, Product } from '../../services/data.model';
import { PaginatorComponent } from '../../bambooComponents/common/paginator.component';

@Component({
    selector   : 'category-page',
    templateUrl: './category-page.component.html',
     styleUrls  : ['./category-page.component.scss']
})
export class CategoryPageComponent  implements AfterViewInit
{
    items: any[];

    @ViewChild('page') page: PaginatorComponent;

    constructor(private http: HttpClient, private dataService: DataService)
    {
        this.items = [{ name: 'Apple', description: 'Hallo', icon: 'http://c.hiphotos.baidu.com/image/pic/item/4bed2e738bd4b31ccd851da88bd6277f9e2ff86c.jpg'}, 
        {name: 'Bravo', description: 'Hi hi', icon: 'http://f.hiphotos.baidu.com/image/pic/item/c75c10385343fbf2f7da8133bc7eca8065388f2f.jpg'}];
    }

    ngAfterViewInit()
    {
        this.loadPage(1);
    }

    loadPage(page: number)
    {
        this.dataService.getProducts('', '', page, this.page.pageSize).subscribe(res =>{
            this.items = res.data;
            this.page.totalItems = res.total;
            this.page.updatePages(false);
        });
    }
}