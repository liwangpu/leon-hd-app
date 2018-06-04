import { Component, OnInit, OnDestroy } from "@angular/core";
import { fuseAnimations } from "../../../../core/animations";
import { MaterialMdService } from "./material-md.service";

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  animations: fuseAnimations,
  providers: [MaterialMdService]
})
export class MaterialComponent implements OnInit, OnDestroy {

  constructor(public mdSrv: MaterialMdService) {
  }
  ngOnInit() {

  }

  ngOnDestroy(): void {

  }//ngOnDestroy

}
