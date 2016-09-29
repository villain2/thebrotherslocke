import {AfterViewInit, ViewChild } from '@angular/core';
import {Component, OnInit} from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import './rxjs-operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit
{

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
    //this.footerComp.open();
  }

  openCharacters ()
  {
    console.log('open characters');
    this.footerComp.openCharacters();
  }

  title = 'The Brothers Locke Website';
}
