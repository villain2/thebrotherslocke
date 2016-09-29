import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Episode } from '../episodes/episode';
import { EpisodesService } from '../episodes.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  providers: [ EpisodesService ],
  animations: [
    trigger('collapseOut', [
      state('inactive', style({
        marginTop: 300
      })),
      state('active', style({
        marginTop: 0
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class FooterComponent implements OnInit {

  constructor(private _episodeService: EpisodesService) { }

  errorMessage: String;
  episodes:Episode[];
  episodeImageMargin: Number;

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

  collapseTray ()
  {
    console.log('collapse tray');
  }

}
