import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode } from '../episodes/episode';
import { EpisodesService } from '../episodes.service';

@Component({
  selector: 'app-episodes-details',
  templateUrl: './episodes.details.component.html',
  styleUrls: ['./episodes.details.component.css'],
  providers: [
    EpisodesService
  ]
})

export class EpisodesDetailsComponent implements OnInit {
  private id;
  private sub;
  private episodeNumber;
  private episodeContent;

  constructor(private route: ActivatedRoute,
              private _episodeService: EpisodesService) { }


  errorMessage: String;
  episodes:Episode[];

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' into a number
      this.episodeNumber  = this.id+1;
    });

    this.getEpisodes();
  }

  getEpisodes()
  {
    this._episodeService.getEpisodes()
      .subscribe(
        episodes => this.episodes = episodes,
        error => this.errorMessage = <any>error
      );

    console.log(this.episodes);
  }

  ngOnDestroy ()
  {
    this.sub.unsubscribe();
  }

}
