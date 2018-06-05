import { Component, OnInit } from '@angular/core';
import { MediaFileMdService } from './media-file-md.service';

@Component({
  selector: 'app-media-file',
  templateUrl: './media-file.component.html',
  styleUrls: ['./media-file.component.scss'],
  providers: [MediaFileMdService]
})
export class MediaFileComponent implements OnInit {

  constructor(public mdSrv: MediaFileMdService) { }

  ngOnInit() {
  }

}
