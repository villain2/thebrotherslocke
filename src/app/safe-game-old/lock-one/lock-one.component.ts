import {Component, ElementRef, ViewChild, OnInit, HostListener} from '@angular/core';
import { LockOneService } from '../lock-one/lock-one.service';
import { LockOne } from '../lock-one/lock-one';

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
  private rowOnePanels: any;
  private rowTwoPanels: any;
  private rowThreePanels: any;
  private player: any;
  private panels: any   = []; //array of panels to track for mouseclicks

  //fps tracking
  private fps: number     = 0;
  private fpsMin: number  = 1000;
  private fpsMax: number  = 0;
  private timeLastSecond  = new Date().getTime();
  private frames: number  = 0;

  //mouse tracking
  private isMouseDown: boolean    = false;
  private mousePos: any           = {x:0, y:0};
  private maxClicks: number       = 3;
  private currentClicks: number   = 0;

  //
  private timeout: any;
  private disableMouse: boolean     = false;
  private answerArray: any          = [];


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

          //get column name and set as variables for both the default and change arrays
          var currentArray      = 'this.lockOne.columnDefault' + this.panels[i].column;
          var changeArray       = 'this.lockOne.column' + this.panels[i].column;

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
            var currentArray      = 'this.lockOne.columnDefault' + this.panels[i].column;
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
    console.log(this.panels);

     //loop through all the panels to find which one we're one if any
     for (var i = 0; i < len; i++)
     {
       if( (this.mousePos.x > this.panels[i].x) && (this.mousePos.x < this.panels[i].x + this.lockOne.panelWidth) )
       {
         if( (this.mousePos.y > this.panels[i].y) && (this.mousePos.y < this.panels[i].y + this.lockOne.panelHeight) )
         {
           console.log('x and y match');
           var currentArray    = 'this.lockOne.columnDefault' + this.panels[i].column;
           var changeArray     = 'this.lockOne.column' + this.panels[i].column;

           eval(currentArray)[this.panels[i].panelID]     = eval(changeArray)[this.panels[i].panelID];
           console.log(this.panels[i].panelID);
           console.log(this.lockOne);

           this.panels[i].clicked     = true;
           this.panels[i].value       = eval(currentArray)[this.panels[i].panelID];
           console.log(this.panels[i]);

           //add to answer array
           this.answerArray.push(this.panels[i].value);

           this.currentClicks++;
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

    //draw each interactive lock panel
    for (var i = 0; i < this.lockOne.columnOne.length; i++)
    {
      var xPos1, yPos1, color1,
        xPos2, yPos2, color2,
        xPos3, yPos3, color3;

      //set x position for all
      xPos1    = ( Math.round(this.canvas.width/7) );
      yPos1    = (50 + this.lockOne.panelHeight) * i + 20;
      color1   = this.lockOne.columnDefaultOne[i];
      //column 2
      xPos2    = ( Math.round(this.canvas.width/7) * 3 );
      yPos2    = (50 + this.lockOne.panelHeight) * i + 20;
      color2   = this.lockOne.columnDefaultTwo[i];
      //column 3
      xPos3    = ( Math.round(this.canvas.width/7) * 5 );
      yPos3    = (50 + this.lockOne.panelHeight) * i + 20;
      color3   = this.lockOne.columnDefaultThree[i];

      //if no color
      if(color1 == "empty") { color1 = "#000000" };
      if(color2 == "empty") { color2 = "#000000" };
      if(color3 == "empty") { color3 = "#000000" };

      //draw panels
      this.context.beginPath();
      this.context.rect(xPos1,yPos1,this.lockOne.panelWidth, this.lockOne.panelHeight);
      this.context.fillStyle  = color1;
      this.context.fill();
      p = {
        x: xPos1,
        y: yPos1,
        clicked: false,
        hover: false,
        value: color1,
        column: "One",
        correct: false,
        panelID: i
      }
      if(this.panels.length < 15){ this.panels.push(p); }

      this.context.beginPath();
      this.context.rect(xPos2,yPos2,this.lockOne.panelWidth, this.lockOne.panelHeight);
      this.context.fillStyle  = color2;
      this.context.fill();
      p = {
        x: xPos2,
        y: yPos2,
        clicked: false,
        hover: false,
        value: color2,
        column: "Two",
        correct: false,
        panelID: i
      }
      if(this.panels.length < 15){ this.panels.push(p); }

      this.context.beginPath();
      this.context.rect(xPos3,yPos3,this.lockOne.panelWidth, this.lockOne.panelHeight);
      this.context.fillStyle  = color3;
      this.context.fill();
      p = {
        x: xPos3,
        y: yPos3,
        clicked: false,
        hover: false,
        value: color3,
        column: "Three",
        correct: false,
        panelID: i
      }
      if(this.panels.length < 15){ this.panels.push(p); }
    }

    this.requestAnimFrame ( this.tick );
    //console.log(this.panels);
  }

  /**
   * Check the current clicks and evaluate whether or not the sequence is correct.
   */
  checkClicks ()
  {
    var correctSequence     = true;

    //reset the current clicks
    if(this.currentClicks >= this.maxClicks)
    {
      console.log('too many clicks! reset!');

      //check if all the click values match
      for(var c = 0; c < this.answerArray.length; c++)
      {
        if(this.answerArray[c] !== this.answerArray[0])
        {
          correctSequence     = false;
        }
      }
      console.log(this.answerArray);
      console.log(correctSequence);debugger;


      this.disableMouse       = true;
      var len       = this.lockOne.columnDefaultOne.length;
      for (var i = 0; i < len; i++)
      {
        var resetValue    = "empty";
        this.lockOne.columnDefaultOne[i]    = resetValue;
        this.lockOne.columnDefaultTwo[i]    = resetValue;
        this.lockOne.columnDefaultThree[i]  = resetValue;
      }
      this.currentClicks    = 0;

      //reset panel click values
      for (var p = 0; p < this.panels.length; p++)
      {
        this.panels[p].clicked  = false;
      }
    }
    this.tick();
  }

  requestAnimFrame ( tick )
  {
    //this.tick();
  }


}
