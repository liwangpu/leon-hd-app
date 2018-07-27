import { Component, OnInit } from '@angular/core';
import { MediaFilePaginatorLaunchService } from './media-file-paginator-launch.service';

@Component({
  selector: 'app-media-file',
  templateUrl: './media-file.component.html',
  styleUrls: ['./media-file.component.scss'],
  providers: [MediaFilePaginatorLaunchService]
})
export class MediaFileComponent implements OnInit {

  constructor(public launch: MediaFilePaginatorLaunchService) { }

  ngOnInit() {
  }

}
