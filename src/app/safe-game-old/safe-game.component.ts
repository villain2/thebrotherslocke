import { Component, OnInit } from '@angular/core';
//import { LockOne } from '../safe-game-old/lock-one/lock-one.component';

@Component({
  moduleId: module.id,
  selector: 'app-safe-game',
  templateUrl: './safe-game.component.html',
  styleUrls: ['./safe-game.component.css']
})
export class SafeGameComponent implements OnInit {

  constructor() { }

  public clock:any;
  public score:number;
  public tamperValue:number; //the value of the tamper scale
  private life:boolean;
  private currentLock:number;
  private totalLocks:number;
  private lockManifest: string;
  private levels: any;
  private instructionsOn: boolean;

  ngOnInit() {
    this.life   = true;
    this.instructionsOn   = true;
    this.levels   = {
      "startPage": true,
      "lockOne": false,
      "lockTwo": false,
      "lockThree": false,
      "lockFour": false,
      "lockFive": false
    };
  }

  private startGame ()
  {
    this.levels.startPage     = false;
    this.levels.lockOne       = true;
  }

  /** start the game on click **/
  private beginGame ()
  {
    this.instructionsOn       = false;

  }

}
