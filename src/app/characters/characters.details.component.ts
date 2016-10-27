import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters.details.component.html'
})

export class CharactersDetailsComponent implements AfterViewInit {
  private id;
  private sub;

  constructor(private route: ActivatedRoute ) {}

  ngAfterViewInit ()
  {
    this.sub  = this.route.params.subscribe(params =>
    {
      this.id   = +params['id'];
    })
  }

  ngOnDestroy ()
  {
    this.sub.unsubscribe();
  }
}
