import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { FileAsset } from "../../../../models/fileasset";
@Component({
  selector: 'app-file-upload-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  @Input() stepNames: Array<string>;
  @Output() onUploadStep: EventEmitter<IFileStepAsset> = new EventEmitter();
  uploadForm: FormGroup;
  items: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    // let aa = new FileAsset();
    // aa.
    // , name: new FormControl('', [Validators.required, Validators.maxLength(50)])
    // this.formGroups.forEach();
  }

  ngOnInit() {
    console.log(222, this.stepNames);
    // this.tmpGroup = this.formBuilder.group({
    //   name: new FormControl('', [Validators.required, Validators.maxLength(50)])
    // })
    // for (let name of this.stepName) {
    //   this.formGroups.push(this.formBuilder.group({
    //     id: [''],
    //     name: ['', Validators.required]
    //   }));
    // }

    console.log(444, this.stepNames.map(x => this.createItem()));

    this.uploadForm = this.formBuilder.group({
      items: this.formBuilder.array(this.stepNames.map(x => this.createItem()))
    });

    // let files = this.uploadForm.get('items') as FormArray;
    // files.push(this.createItem());
  }

  ngAfterViewInit(): void {

  }

  createItem(): FormGroup {

    return this.formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
  }
}

interface IFileStepAsset {
  step: number;
  stepName: string;
  Files: Array<FileAsset>;
}

