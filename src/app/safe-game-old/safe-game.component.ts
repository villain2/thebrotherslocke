import { Component, OnInit, ViewChild } from '@angular/core';
import { LockOneComponent } from '../safe-game-old/lock-one/lock-one.component';
import { LockOne } from '../safe-game-old/lock-one/lock-one';

@Component({
  moduleId: module.id,
  selector: 'app-safe-game',
  templateUrl: './safe-game.component.html',
  styleUrls: ['./safe-game.component.css']
})
export class SafeGameComponent implements OnInit {

  @ViewChild(LockOneComponent) lockOneComp:LockOneComponent;

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
  lockOne: LockOne;
  lockOneComponent: LockOneComponent;

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

  changeGame (gameNum)
  {
    console.log('change game to: ' + gameNum);
    this.loadGame(gameNum);
  }

  private loadGame (gameNum)
  {
    //reset all
    this.levels.startPage     = false;
    this.levels.lockOne       = false;
    this.levels.lockTwo       = false;
    this.levels.lockThree       = false;
    this.levels.lockFour       = false;
    this.levels.lockFive       = false;

    switch (gameNum)
    {
      case 1:
        this.levels.lockOne       = true;
        break;

      case 2:
        this.levels.lockTwo       = true;
        break;

      case 3:
        this.levels.lockThree       = true;
        break;

      case 4:
        this.levels.lockFour       = true;
        break;

      case 5:
        this.levels.lockFive       = true;
        break;
    }
  }

  /** start the game on click **/
  private beginGame ()
  {
    this.instructionsOn       = false;
    this.lockOneComp.startGameTimer();
  }

}
