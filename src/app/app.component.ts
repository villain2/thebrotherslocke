import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent
{

  getBottomTray(type)
  {
    console.log(type);
  }
  title = 'The Brothers Locke Website';
}
