import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor() { }

  private expanded: boolean;

  expanded  = false;

  ngOnInit() {

  }

  private over ()
  {
    //check if the sidebar is expanded or not
    if(!expanded)
    {

    }
  }

}
