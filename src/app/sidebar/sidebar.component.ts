import {Component, OnInit, ElementRef, ViewChild, Renderer, trigger, state, style, transition, animate} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations:[
    trigger('collapseOut', [
      state('collapsed, void', style({
        right: '-183px'
      })),
      state('open', style({
        right: '0px'
      })),
      state('indicate', style({
        right: '-173px'
      })),
      transition('collapsed => indicate', animate('0.5s 0.5s cubic-bezier(0.77, 0, 0.175, 1)')),
      transition('indicate => collapsed', animate('0.5s 0.5s cubic-bezier(0.77, 0, 0.175, 1)')),
      transition('collapsed => open', animate('0.5s 0.5s cubic-bezier(0.77, 0, 0.175, 1)')),
      transition('open => collapsed', animate('0.5s 2s cubic-bezier(0.77, 0, 0.175, 1)'))
    ])
  ]
})
export class SidebarComponent implements OnInit
{
  @ViewChild('controlSidebar') input: ElementRef;

  constructor(private renderer: Renderer) { }

  private expanded: boolean;
  public sidebarObj: any;
  stateExpression: String;

  ngOnInit() {
    this.expanded  = false;
  }



  private over ()
  {
    this.sidebarObj    = this.input.nativeElement;

    //check if the sidebar is expanded or not
    if(!this.expanded)
    {
      //this.sidebarObj.setAttribute("style", "right: 0;");
      this.expanded   = true;
      this.stateExpression  = 'indicate';
    }
  }

  private out ()
  {
    console.log('mouse out');
    this.expanded   = false;
    //this.sidebarObj.setAttribute("style", "right: -183px");
    this.stateExpression  = 'collapsed';
  }

  public sideTrayOpen ()
  {
    console.log('open sidebar');
    this.expanded   = true;
    this.stateExpression = 'open';
  }

  public sideTrayClose ()
  {
    console.log('close sidebar');
    this.expanded   = false;
    this.stateExpression   = 'collapsed';

  }


}
