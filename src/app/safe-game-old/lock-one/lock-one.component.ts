import {Component, ElementRef, ViewChild, OnInit, HostListener} from '@angular/core';
import { LockOneService } from '../lock-one/lock-one.service';
import { LockOne } from '../lock-one/lock-one';
import { Observable } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-lock-one',
  templateUrl: './lock-one.component.html',
  styleUrls: ['./lock-one.component.css']
})
export class LockOneComponent implements OnInit {

  lockOne:LockOne   = new LockOne();

  /** set variables **/
  private canvas: any;
  private context: any;
  private isMobile: any;
  private stage: any;
  private DEFAULT_WIDTH: number   = 900;
  private DEFAULT_HEIGHT: number  = 550;
  private FRAMERATE: number       = 60;
  public unlocked: boolean        = false;
  public failed: boolean          = false;
  private failedMessage: string;
  private failedText: string;
  private playing: boolean        = true;
  private panels: any   = []; //array of panels to track for mouseclicks

  //fps tracking
  private fps: number     = 0;
  private fpsMin: number  = 1000;
  private fpsMax: number  = 0;
  private timeLastSecond  = new Date().getTime();
  private frames: number  = 0;

  //sounds
  private buttonClickSound: any;
  private soundtrack: any;
  private alertSound: any;
  private successSound: any;
  private errorSound: any;
  private successButtonSound: any;

  //mouse tracking
  private isMouseDown: boolean    = false;
  private mousePos: any           = {x:0, y:0};
  private maxClicks: number       = 3;
  private currentClicks: number   = 0;

  //
  private timer: any;
  private timerSubscription: any;
  public ticks: number              = 0;
  public ticksDisplay: any;
  private disableMouse: boolean     = false;
  private answerArray: any          = [];
  private correctArray: any         = [];

  //game images
  public bgReady: boolean          = false;
  public bgImage:any               = new Image();
  private pool: any;


  @ViewChild("world") world: ElementRef;

  @HostListener('mousemove', ['$event'])
  mouseMoveHandler(event: MouseEvent)
  {
    this.mousePos.x     = event.layerX;
    this.mousePos.y     = event.layerY;
    var len               = this.panels.length;

    if(this.disableMouse == false)
    {
      //loop through all the panels to find which one we're one if any
      for (var i = 0; i < len; i++)
      {
        if( (this.mousePos.x > this.panels[i].x)
          && (this.mousePos.x < this.panels[i].x + this.lockOne.panelWidth)
          && (this.mousePos.y > this.panels[i].y)
          && (this.mousePos.y < this.panels[i].y + this.lockOne.panelHeight) )
        {
          this.panels[i].hover  = true;

          //increase the meter by meterDifficulty
          this.lockOne.meter    = this.lockOne.meter + this.lockOne.meterDifficulty;
          this.checkMeter();

          //get column name and set as variables for both the default and change arrays
          var currentArray      = 'this.lockOne.columnDefaults';
          var changeArray       = 'this.lockOne.columnAnswers';

          //use eval to select and manipulate the array
          eval(currentArray)[this.panels[i].panelID]     = eval(changeArray)[this.panels[i].panelID];
        }
        else
        {
          //set to no hover
          this.panels[i].hover    = false;

          //change back to black if not clicked
          if(!this.panels[i].clicked)
          {
            var currentArray      = 'this.lockOne.columnDefaults';
            eval(currentArray)[this.panels[i].panelID]     = "empty";
          }
        }
      }
    }
    //update canvas
    this.tick();
  }

  @HostListener('mouseup', ['$event'])
  mouseUpHandler(event: MouseEvent)
  {
    this.checkClicks();
    let timeoutId = setTimeout(() => {
      this.disableMouse     = false;
    }, 1750);
  }

  /*
  * Mousedown Handler
  */
  @HostListener('mousedown', ['$event'])
  mouseDownHandler(event: MouseEvent)
  {
    this.isMouseDown      = true;
    var len               = this.panels.length;

     //loop through all the panels to find which one we're on if any
     for (var i = 0; i < len; i++)
     {
       if( (this.mousePos.x > this.panels[i].x) && (this.mousePos.x < this.panels[i].x + this.lockOne.panelWidth) )
       {
         if( (this.mousePos.y > this.panels[i].y) && (this.mousePos.y < this.panels[i].y + this.lockOne.panelHeight) )
         {
           //console.log('x and y match');
           var currentArray    = 'this.lockOne.columnDefaults';
           var changeArray     = 'this.lockOne.columnAnswers';

           eval(currentArray)[this.panels[i].panelID]     = eval(changeArray)[this.panels[i].panelID];
           //console.log(this.panels[i].panelID);
           //console.log(this.lockOne);

           this.panels[i].clicked     = true;
           this.panels[i].value       = eval(currentArray)[this.panels[i].panelID];
           //console.log(this.panels[i]);

           //add to answer array
           var _panelValue, _panelID;
           _panelValue       = this.panels[i].value;
           _panelID          = this.panels[i].panelID;
           this.answerArray.push({_panelValue, _panelID});
           console.log(this.answerArray);

           this.currentClicks++;

           //trigger the sound
           this.buttonClickSound.play();
         }
       }
     }
    this.tick();
  }

  @HostListener('window:resize') onResize(event)
  {
    this.stage.width  = this.isMobile ? event.target.innerWidth : this.DEFAULT_WIDTH;
    this.stage.height   = this.isMobile ? event.target.innerHeight : this.DEFAULT_HEIGHT;

    //resize the canvas
    this.canvas.width     = this.stage.width;
    this.canvas.height    = this.stage.height;

    //determine x and y for canvas
    var cvx     = (window.innerWidth - this.stage.width) * 0.5;
    var cvy     = (window.innerHeight - this.stage.height) * 0.5;

    //position canvas
    this.canvas.style.position      = "absolute";
    this.canvas.style.left          = cvx + 'px';
    //this.canvas.style.top           = cvy + 'px';

    this.tick();
  }

  constructor() {}

  ngOnInit() {

    //flag if we're on mobile
    this.isMobile = !!navigator.userAgent.toLowerCase().match(/ipod|ipad|iphone|android/gi);

    /** set up the world **/
    this.stage = {
      width: this.isMobile ? window.innerWidth : this.DEFAULT_WIDTH,
      height: this.isMobile ? window.innerHeight : this.DEFAULT_HEIGHT
    };

    this.canvas   = this.world.nativeElement;

    /** init game **/
    if(this.canvas && this.world.nativeElement.getContext)
    {
      this.context  = this.canvas.getContext('2d');

      //register event listeners
      document.addEventListener('mouseup', this.docMouseUpHandler, false);
      this.canvas.addEventListener('touchstart', this.docTouchStartHandler, false);
      document.addEventListener('touchmove', this.docTouchMoveHandler, false);
      document.addEventListener('touchend', this.docTouchEndHandler, false);
      document.addEventListener('keydown', this.docKeyDownHandler, false);
      document.addEventListener('keyup', this.docKeyUpHandler, false);


      //if we're on mobile configure elements
      if ( this.isMobile )
      {
        //add mobile adjustments here
      }

      this.canvas.fillStyle   = '#ff0000';
      //resize the canvas
      this.canvas.width     = this.stage.width;
      this.canvas.height    = this.stage.height;

      //background image
      this.bgImage.onload = () =>
      {
        console.log('loading');
        this.bgReady    = true;
      };
      this.bgImage.src    = "assets/img/games/keyofthespire/hud_bg.png";

      //start sound
      this.soundPool(0);

      //create timer
      this.createTimer();
    }
    this.tick();
  }

  docMouseUpHandler ()
  {

  }

  docTouchStartHandler() {}
  docTouchMoveHandler() {}
  docTouchEndHandler() {}


  docKeyDownHandler() {}
  docKeyUpHandler() {}

  tick()
  {
    //get current time for this frame
    var frameTime   = new Date().getTime();
    var rowNumber   = 0;
    var p;

    //increase the frame count
    this.frames++;
    //console.log(this.frames);

    //check if a second has passed since last update of FPS
    if (frameTime > this.timeLastSecond + 1000)
    {
      //set min and max fps
      this.fps              = Math.min( Math.round( (this.frames * 1000) / (frameTime - this.timeLastSecond )), this.FRAMERATE);
      this.fpsMin           = Math.min( this.fpsMin, this.fps);
      this.fpsMax           = Math.max( this.fpsMax, this.fps);

      this.timeLastSecond   = frameTime;
      this.frames           = 0;
    }

    //clear canvas of old pixel data
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

    //draw background
    if(this.bgReady)
    {
      this.context.drawImage(this.bgImage, 0, 0);
    }


    //draw each interactive lock panel
    for (var i = 0; i < this.lockOne.columnAnswers.length; i++)
    {
      var xPos, yPos, color;

      //console.log(this.lockOne.columnDefaultOne);

      if( (i >= 0) && (i < 5) )
      {
        //column 1
        xPos    = ( Math.round(this.canvas.width/7) + 15 );
        yPos    = (50 + this.lockOne.panelHeight) * rowNumber + 20;
        color   = this.lockOne.columnDefaults[i];
      }
      else if( (i > 4) && ( i < 10) )
      {
        //column 2
        xPos    = ( Math.round(this.canvas.width/7) * 3 );
        yPos    = (50 + this.lockOne.panelHeight) * rowNumber + 20;
        color   = this.lockOne.columnDefaults[i];
      }
      else if( (i > 9) && (i < 15) )
      {
        //column 3
        xPos    = ( Math.round(this.canvas.width/7) * 5 );
        yPos    = (50 + this.lockOne.panelHeight) * rowNumber + 20;
        color   = this.lockOne.columnDefaults[i];
      }

      rowNumber++;
      if( rowNumber == 5)
      {
        rowNumber   = 0;
      };

      //if no color
      if(color == "empty") { color = "#000000" };

      //draw panels
      this.context.beginPath();
      this.context.rect(xPos,yPos,this.lockOne.panelWidth, this.lockOne.panelHeight);
      this.context.fillStyle  = color;
      this.context.shadowBlur   = 20;
      this.context.shadowColor  = color;
      this.context.fill();
      p = {
        x: xPos,
        y: yPos,
        clicked: false,
        hover: false,
        value: color,
        correct: false,
        panelID: i
      }
      if(this.panels.length < 15){ this.panels.push(p); }
    }

    //draw the meter fill
    this.context.beginPath();
    this.context.rect(828,362 - this.lockOne.meter,14,this.lockOne.meter);
    this.context.fillStyle      = "orange";
    this.context.shadowBlur     = 10;
    this.context.shadowColor    = "white";
    this.context.fill();

    this.requestAnimFrame ( this.tick );
  }

  /**
   * Check the current clicks and evaluate whether or not the sequence is correct.
   */
  checkClicks ()
  {
    var correctSequence;

    //reset the current clicks
    if(this.currentClicks >= this.maxClicks)
    {
      this.disableMouse       = true;
      var len       = this.lockOne.columnAnswers.length;

      //check if all the click values match
      for(var c = 0; c < this.answerArray.length; c++)
      {
        if( (this.answerArray[c]._panelValue == this.answerArray[0]._panelValue)
          && (this.answerArray[c]._panelValue != "empty") )
        {
          correctSequence   = true;
        }
        else
        {
          correctSequence   = false;
          break;
        }
      }

      if(correctSequence == true)
      {

        this.correctArray.push(this.answerArray[0]._panelValue);

        //if correctSequence is true, set the base data to reflect the matched panels
        //on the next tick
        for(var c = 0; c < this.lockOne.columnAnswers.length; c++)
        {
          this.lockOne.columnDefaults[c]    = "empty";
          this.panels[c].clicked            = false;

          for(var a = 0; a < this.correctArray.length; a++)
          {
            if(this.lockOne.columnAnswers[c] == this.correctArray[a])
            {
              this.lockOne.columnDefaults[c]    = this.correctArray[a];
              this.panels[c].clicked    = true;
            }
          }
        }

        //reduce meter
        this.lockOne.meter    = this.lockOne.meter - this.lockOne.meterReduce;

        //play sound
        this.successButtonSound.play();
      }
      else
      {
        //play error sound
        this.errorSound.play();

        //set them all to default if there are no correct answers in array
        if(this.correctArray.length == 0)
        {
          for (var a = 0; a < this.lockOne.columnDefaults.length; a++)
          {

            this.lockOne.columnDefaults[a]      = "empty";
            this.panels[a].clicked              = false;
          }
        }
        else
        {
          for (var a = 0; a < this.lockOne.columnDefaults.length; a++)
          {
            var matched   = false;
            for (var m = 0; m < this.correctArray.length; m++)
            {
              if(this.lockOne.columnDefaults[a] == this.correctArray[m])
              {
                this.lockOne.columnDefaults[a]  = this.correctArray[m];
                this.panels[a].clicked          = true;
                matched     = true;
                break;
              }
            }

            //if not match turn to default
            if(!matched)
            {
              this.lockOne.columnDefaults[a]      = "empty";
              this.panels[a].clicked              = false;
            }
          }
        }
      }

      //reset answer array
      this.currentClicks    = 0;
      this.answerArray    = [];

      //check if we've completed the stage
      if(this.correctArray.length == this.lockOne.totalAnswers)
      {
        this.gameOver("success");
      }
    }
    this.tick();
  }

  soundPool (maxSize)
  {
    var size    = maxSize;//max sounds allowed in the pool
    var pool    = [];
    this.pool   = pool;
    var curSound  = 0;

    //populate pool array with current sound
    var soundtrack                  = new Audio("assets/audio/games/keyofthespire/soundtrack.wav");
    soundtrack.volume               = .35;
    soundtrack.loop                 = true;
    soundtrack.load();

    this.buttonClickSound           = new Audio("assets/audio/games/keyofthespire/buttonclick.wav");
    this.buttonClickSound.volume    = .5;
    this.buttonClickSound.load();

    //alert
    this.alertSound                 = new Audio("assets/audio/games/keyofthespire/alert.wav");
    this.alertSound.volume          = .5;
    this.alertSound.load();

    //success
    this.successSound               = new Audio("assets/audio/games/keyofthespire/success.wav");
    this.successSound.volume        = .5;
    this.successSound.load();

    //error
    this.errorSound                 = new Audio("assets/audio/games/keyofthespire/error.wav");
    this.errorSound.volume          = .5;
    this.errorSound.load();

    //error
    this.successButtonSound             = new Audio("assets/audio/games/keyofthespire/button-success.wav");
    this.successButtonSound.volume      = .5;
    this.successButtonSound.load();

    //play sound
    soundtrack.play();

  }

  checkMeter ()
  {
    //see if we hit the max
    if(this.lockOne.meter >= this.lockOne.meterMax)
    {
      this.gameOver("meter");
    }
  }

  createTimer ()
  {
    this.timer  = Observable.timer(2000,1000);
    this.timerSubscription   = this.timer.subscribe(t => this.tickerFunc(t));
  }

  tickerFunc(tick)
  {
    this.ticks  = tick;
    var startingTime          = this.lockOne.timeLimit - this.ticks;
    var minutes               = Math.floor(startingTime / 60);
    var displayMinutes        = (minutes >= 10) ? minutes : "0" + minutes;
    var seconds               = Math.floor(startingTime % 60);
    var displaySeconds        = (seconds >= 10) ? seconds : "0" + seconds;
    this.ticksDisplay   = "" + displayMinutes + " : " + displaySeconds + "";
    if(this.ticks >= this.lockOne.timeLimit)
    {
      this.gameOver("time");
    }
  }

  /**
   *
   * @description Game Over Handler
   */
  gameOver (type)
  {
    console.log("Game Over!" + type);
    this.timerSubscription.unsubscribe();
    switch (type)
    {
      case "success":
        //hide clock

        //close the lock

        //display success message
        this.successSound.play();
        this.unlocked    = true;
        console.log(this.unlocked);

        break;

      case "time":
        this.alertSound.play();
        this.ticksDisplay   = "00:00";
        this.failed     = true;
        this.failedMessage  = "Time Is Up!";
        this.failedText     = "You have been caught by Avidity authorities! Once you escape, you can try again.";
        break;

      case "meter":
        this.alertSound.play();
        this.failed     = true;
        this.failedMessage  = "You Have Been Detected!";
        this.failedText     = "Too much tampering with open nodes have alerted the Avidity authorities that someone was in their system. Once you escape, you can try again.";
        break;
    }
  }

  requestAnimFrame ( tick )
  {
    //this.tick();
  }


}
