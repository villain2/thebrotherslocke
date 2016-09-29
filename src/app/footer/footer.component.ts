import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Episode } from '../episodes/episode';
import { EpisodesService } from '../episodes.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  providers: [ EpisodesService ],
  animations: [
    trigger('collapseOut', [
      state('collapsed, void', style({
        bottom: '-600px'
      })),
      state('open', style({
        bottom: '0px'
      })),
      transition('collapsed => open', animate('0.75s cubic-bezier(0.785, 0.135, 0.15, 0.86)')),
      transition('open => collapsed', animate('0.75s cubic-bezier(0.785, 0.135, 0.15, 0.86)'))
    ])
  ]
})
export class FooterComponent implements OnInit {

  constructor(private _episodeService: EpisodesService) { }

  errorMessage: String;
  episodes:Episode[];
  episodeImageMargin: Number;
  stateExpression: String;

  ngOnInit() {
    this.getEpisodes();
    this.episodeImageMargin = 200;
  }

  getEpisodes()
  {
    this._episodeService.getEpisodes()
      .subscribe(
        episodes => this.episodes = episodes,
        error => this.errorMessage = <any>error
      );
  }

  collapse (tray)
  {
    console.log('collapse tray: ' + tray);
    this.stateExpression  = 'collapsed';
  }

  open (tray)
  {
    console.log('open tray: ' + tray);
    this.stateExpression = 'open';
  }

}
