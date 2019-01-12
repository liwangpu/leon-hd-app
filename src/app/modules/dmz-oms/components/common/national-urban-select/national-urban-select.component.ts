import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NationalUrbanService, NationalUrbanTypeEnum, NationalUrban } from 'micro-dmz-oms';
import { forkJoin, Observable, of } from 'rxjs';
import { debounceTime, startWith, map, switchMap, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-national-urban-select',
  templateUrl: './national-urban-select.component.html',
  styleUrls: ['./national-urban-select.component.scss']
})
export class NationalUrbanSelectComponent implements OnInit {

  allProvince: Array<NationalUrban> = [];
  refCities: Array<NationalUrban> = [];
  proviceOptions: Observable<Array<NationalUrban>>;
  cityOptions: Array<NationalUrban> = [];
  provinceControl = new FormControl();
  cityControl = new FormControl();
  @Output() urbanChange = new EventEmitter<{ province: string, city: string, county: string }>();
  @Input() provinceId: string;
  @Input() cityId: string;
  @Input() countyId: string;
  constructor(protected nationSrv: NationalUrbanService) {

  }//constructor

  ngOnInit() {

    //由于省不是很多,一次性加载就好了
    this.nationSrv.query('', NationalUrbanTypeEnum.Province, undefined, 0, 99).subscribe(res => {
      this.allProvince = res.data;
      this.proviceOptions = of(this.allProvince);
    });//subscribe

    let provinceInit$ = this.nationSrv.getById(this.provinceId).pipe(tap(res => {
      this.provinceControl.patchValue(res);
      this.refCities = res.children ? res.children : [];
      this.cityOptions = this.refCities;
    }));
    let cityInit$ = this.nationSrv.getById(this.cityId).pipe(tap(res => this.cityControl.patchValue(res)));

    forkJoin(provinceInit$, cityInit$).subscribe(res => {
      this.provinceControl.valueChanges.pipe(debounceTime(500))
        .pipe(startWith(''))
        .pipe(map(x => (typeof x) === 'string' ? x : x.name))
        .pipe(map(name => {
          let arr = name ? this.allProvince.filter(x => x.name.indexOf(name) > -1) : this.allProvince;
          return [name, arr];
        }))
        .subscribe(fus => {
          this.proviceOptions = of(fus[1]);
          let name = fus[0];
          if (name == '' || !this.allProvince.some(x => x.name == name)) {
            this.urbanChange.next(this.getUrban());
          }
        });//subscribe

      this.cityControl.valueChanges.pipe(debounceTime(500))
        .pipe(map(x => (typeof x) === 'string' ? x : x.name))
        .pipe(map(name => {
          let arr = name ? this.refCities.filter(x => x.name.indexOf(name) > -1) : this.refCities;
          return [name, arr];
        })).subscribe(fus => {
          this.cityOptions = fus[1];
          let name = fus[0];
          if (name == '' || !this.refCities.some(x => x.name == name)) {
            this.urbanChange.next(this.getUrban());
          }
        });//subscribe

    });//subscribe

  }//ngOnInit

  proviceDisplayFn(province?: NationalUrban): string | undefined {
    return province ? province.name : undefined;
  }//proviceDisplayFn

  cityDisplayFn(city?: NationalUrban): string | undefined {
    return city ? city.name : undefined;
  }//cityDisplayFn

  onProvinceSelect(evt: MatAutocompleteSelectedEvent) {
    let province = evt.option.value;
    this.nationSrv.getById(province.id).pipe(map(res => res && res.children ? res.children : []))
      .subscribe(arr => {
        this.refCities = arr;
        this.cityOptions = arr;
        let currentCity = this.cityControl.value;
        //city不属于该province
        if (!arr.some(x => x.id == currentCity.id)) {
          this.cityControl.patchValue({});
        }//if
        this.urbanChange.next(this.getUrban());
      });//subscribe
  }//onProvinceSelect

  onCitySelect(evt: MatAutocompleteSelectedEvent) {
    let city = evt.option.value;
    this.urbanChange.next(this.getUrban());
  }//onCitySelect

  getUrban() {
    let province = this.provinceControl.value;
    let city = this.cityControl.value;
    return {
      province: province && province.id ? province.id : '',
      city: city && city.id ? city.id : '',
      county: ''
    };
  }//getUrban

}
