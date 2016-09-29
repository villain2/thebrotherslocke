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

  openFooter ()
  {
    console.log('open footer');
    this.footerComp.open('episodes');
    //this.footerComp.open();
  }

  title = 'The Brothers Locke Website';
}
