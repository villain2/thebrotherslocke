import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Episode } from '../episodes/episode';
import { EpisodesService } from '../episodes.service';
import { Character } from '../characters/character';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  providers: [
    EpisodesService,
    CharactersService ],
  animations: [
    trigger('collapseOut', [
      state('collapsed, void', style({
        bottom: '-600px'
      })),
      state('open', style({
        bottom: '0px'
      })),
      transition('collapsed => open', animate('0.75s 0.1s cubic-bezier(0.77, 0, 0.175, 1)')),
      transition('open => collapsed', animate('0.75s 0.1s cubic-bezier(0.77, 0, 0.175, 1)'))
    ]),
    trigger('collapseCharacters', [
      state('collapsec, void', style({
        bottom: '-600px'
      })),
      state('openc', style({
        bottom: '0px'
      })),
      transition('collapsec => openc', animate('0.75s 0.1s cubic-bezier(0.77, 0, 0.175, 1)')),
      transition('openc => collapsec', animate('0.75s 0.1s cubic-bezier(0.77, 0, 0.175, 1)'))
    ])
  ]
})
export class FooterComponent implements OnInit {

  constructor(private _episodeService: EpisodesService,
              private _characterService: CharactersService) { }

  errorMessage: String;
  episodes:Episode[];
  characters:Character[]
  episodeImageMargin: Number;
  stateExpression: String;

  ngOnInit() {
    this.getEpisodes();
    this.getCharacters();
    this.episodeImageMargin = 200;
  }

  showEpisode(epID)
  {
    //collapse tray
    this.collapse('episodes');
  }

  showCharacter(cID)
  {
    //collapse tray
    this.collapseCharacters();
  }

  getEpisodes()
  {
    this._episodeService.getEpisodes()
      .subscribe(
        episodes => this.episodes = episodes,
        error => this.errorMessage = <any>error
      );
  }

  getCharacters()
  {
    this._characterService.getCharacters()
      .subscribe(
        characters => this.characters = characters,
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

  collapseCharacters ()
  {
    console.log('collpase characters');
    this.stateExpression  = 'collapsec';
  }

  openCharacters ()
  {
    console.log('open characters');
    this.stateExpression = 'openc';
  }

}
