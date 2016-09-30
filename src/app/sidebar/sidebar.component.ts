import {Component, OnInit, ElementRef, ViewChild, Renderer} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit
{
  @ViewChild('controlSidebar') input: ElementRef;

  constructor(private renderer: Renderer) { }

  private expanded: boolean;
  public sidebarObj: any;

  ngOnInit() {
    this.expanded  = false;
  }


  private over ()
  {
    console.log(this);
    this.sidebarObj    = this.input.nativeElement;
    console.log(this.sidebarObj);

    //check if the sidebar is expanded or not
    if(!this.expanded)
    {

    }
  }

}
