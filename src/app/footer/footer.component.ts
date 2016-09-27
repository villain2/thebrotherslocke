import { Component, OnInit } from '@angular/core';
import { Episode } from '../episodes/episode';
import { EpisodesService } from '../episodes.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  providers: [ EpisodesService ]
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

}
