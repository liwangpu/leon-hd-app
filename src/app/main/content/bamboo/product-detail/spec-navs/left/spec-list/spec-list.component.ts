import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../../../../core/animations';

@Component({
  selector: 'app-product-spec-nav-left-spec-list',
  templateUrl: './spec-list.component.html',
  styleUrls: ['./spec-list.component.scss'],
  animations : fuseAnimations
})
export class SpecListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
