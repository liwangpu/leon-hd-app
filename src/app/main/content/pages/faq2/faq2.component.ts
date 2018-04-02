import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Faq2Service } from './faq2.service';
import { FuseUtils } from '../../../../core/fuseUtils';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector   : 'fuse-faq2',
    templateUrl: './faq2.component.html',
    styleUrls  : ['./faq2.component.scss']
})
export class FuseFaq2Component implements OnInit, OnDestroy
{
    faqs: any;
    faqsFiltered: any;
    step = 0;
    searchInput;
    onFaqsChanged: Subscription;

    constructor(private faqService: Faq2Service)
    {
        this.searchInput = new FormControl('');
    }

    ngOnInit()
    {
        this.onFaqsChanged =
            this.faqService.onFaqsChanged
                .subscribe(response => {
                    this.faqs = response;
                    this.faqsFiltered = response;
                });

        this.searchInput.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchText => {
                this.faqsFiltered = FuseUtils.filterArrayByString(this.faqs, searchText);
            });
    }

    setStep(index: number)
    {
        this.step = index;
    }

    nextStep()
    {
        this.step++;
    }

    prevStep()
    {
        this.step--;
    }

    ngOnDestroy()
    {
        this.onFaqsChanged.unsubscribe();
    }
}
