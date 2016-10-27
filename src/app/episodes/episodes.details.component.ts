import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-episodes-details',
  templateUrl: './episodes.details.component.html'
})

export class EpisodesDetailsComponent implements OnInit {
  private id;
  private sub;
  private episodeNumber;

  constructor(private route: ActivatedRoute ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' into a number
      this.episodeNumber  = this.id+1;
    });
  }

  ngOnDestroy ()
  {
    this.sub.unsubscribe();
  }

}
