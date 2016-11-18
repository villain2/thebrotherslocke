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
  private isMouseDown: boolean  = false;
  private mousePos: any   = {x:0, y:0};


  @ViewChild("world") world: ElementRef;

  @HostListener('mousemove', ['$event'])
  mouseMoveHandler(event: MouseEvent)
  {
    this.mousePos.x     = event.layerX;
    this.mousePos.y     = event.layerY;
  }

  @HostListener('mousedown', ['$event'])
  mouseDownHandler(event: MouseEvent)
  {
    this.isMouseDown      = true;
    var len               = this.panels.length;

     //loop through all the panels to find which one we're one if any
     for (var i = 0; i < len; i++)
     {
       /*console.log(this.panels[i]);
       console.log(this.mousePos);*/
       if( (this.mousePos.x > this.panels[i].x) && (this.mousePos.x < this.panels[i].x + this.lockOne.panelWidth) )
       {
         if( (this.mousePos.y > this.panels[i].y) && (this.mousePos.y < this.panels[i].y + this.lockOne.panelHeight) )
         {
           console.log('x and y match');
         }
       }
     }
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
    console.log(this.lockOne);

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
      //document.addEventListener('mousedown', this.docMouseDownHandler, false);
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
    console.log(this.frames);

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
      color1   = this.lockOne.columnOne[i];
      //column 2
      xPos2    = ( Math.round(this.canvas.width/7) * 3 );
      yPos2    = (50 + this.lockOne.panelHeight) * i + 20;
      color2   = this.lockOne.columnTwo[i];
      //column 3
      xPos3    = ( Math.round(this.canvas.width/7) * 5 );
      yPos3    = (50 + this.lockOne.panelHeight) * i + 20;
      color3   = this.lockOne.columnThree[i];

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
        value: color1
      }
      this.panels.push(p);

      this.context.beginPath();
      this.context.rect(xPos2,yPos2,this.lockOne.panelWidth, this.lockOne.panelHeight);
      this.context.fillStyle  = color2;
      this.context.fill();
      p = {
        x: xPos2,
        y: yPos2,
        clicked: false,
        hover: false,
        value: color2
      }
      this.panels.push(p);

      this.context.beginPath();
      this.context.rect(xPos3,yPos3,this.lockOne.panelWidth, this.lockOne.panelHeight);
      this.context.fillStyle  = color3;
      this.context.fill();
      p = {
        x: xPos3,
        y: yPos3,
        clicked: false,
        hover: false,
        value: color3
      }
      this.panels.push(p);
    }

    this.requestAnimFrame ( this.tick );
    console.log(this.panels);
  }

  requestAnimFrame ( tick )
  {
    //this.tick();
  }


}
