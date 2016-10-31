import {HostListener, Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import './rxjs-operators';


declare const FB: any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  private _windRef: any;
  private _scrollPosition: number;
  private _headerObj: any;

  constructor(el: ElementRef)
  {
    this._windRef   = el.nativeElement;
  }

  @HostListener('window:scroll', ['$event'])
  track(event)
  {
    console.debug('scroll event', event);
    console.log(this._windRef.children[0].children[0]);
    this._headerObj   = this._windRef.children[0].children[0];
    this._scrollPosition  = event.path[0].scrollY;

    if(this._scrollPosition > 70)
    {
      this._headerObj.setAttribute("style", "background: white; -webkit-transition: all .5s; transition: all .50s;");
    }
    else
    {
      this._headerObj.setAttribute("style", "background: none; -webkit-transition: all .5s; transition: all .50s;");
    }
  }

  @ViewChild(FooterComponent)

  private footerComp: FooterComponent;

  ngAfterViewInit ()
  {
    console.log('open');
  }

  openEpisodes ()
  {
    console.log('open footer');
    this.footerComp.open('episodes');
  }

  openCharacters ()
  {
    console.log('open characters');
    this.footerComp.openCharacters();
  }

  title = 'The Brothers Locke Website';
}
