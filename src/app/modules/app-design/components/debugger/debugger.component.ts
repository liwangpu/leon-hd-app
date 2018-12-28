import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-debugger',
  templateUrl: './debugger.component.html',
  styleUrls: ['./debugger.component.scss']
})
export class DebuggerComponent implements OnInit {

  debuggingTool: string;
  constructor() { }

  ngOnInit() {

  }//ngOnInit

  toggleDebuggerTool(toolName: string) {
    this.debuggingTool = toolName;
  }//toggleDebuggerTool

}
