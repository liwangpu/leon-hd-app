import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector   : 'paginator',
    templateUrl: './paginator.component.html',
    styleUrls  : ['./paginator.component.scss']
})
export class PaginatorComponent
{
    curPage: number;
    totalPages: number;
    @Input() totalItems: number;
    @Input() pageSize: number;
    @Output() onLoad: EventEmitter<number> = new EventEmitter<number>();

    pageSizeOptions = [5, 10, 15, 20, 50, 100];

    constructor()
    {
        this.totalItems = 0;
        this.pageSize = 10;
        this.curPage = 1;
        this.totalPages = 2;
    }

    updatePages(reload: boolean)
    {
        if(this.pageSize < 1)
        {
            this.pageSize = 1;
        }
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        console.log('paginator update pages items ' + this.totalItems + ' pagesize ' + this.pageSize + ' pages ' + this.totalPages);
        if(reload)
        {
            this.loadPage(this.curPage);
        }
    }

    firstPage()
    {
        if(this.curPage != 1)
        {
            this.curPage = 1;
            this.onLoad.emit(this.curPage);
        }
    }

    lastPage()
    {
        if(this.curPage != this.totalPages)
        {
            this.curPage = this.totalPages;
            this.onLoad.emit(this.curPage);
        }
    }

    nextPage()
    {
        if(this.curPage < this.totalPages)
        {
            this.curPage += 1;
            this.onLoad.emit(this.curPage);
        }
    }

    previousPage()
    {
        if(this.curPage > 1)
        {
            this.curPage -= 1;
            this.onLoad.emit(this.curPage);
        }
    }

    loadPage(page: number)
    {
        if(page < 1)
        {
            page = 1;
        }
        if(page > this.totalPages)
        {
            page = this.totalPages;
        }
        this.curPage = page;
        this.onLoad.emit(this.curPage);
    }
}
