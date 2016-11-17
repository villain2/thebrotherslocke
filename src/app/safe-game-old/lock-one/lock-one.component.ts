import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LockOne } from '../lock-one/lock-one';

@Component({
  moduleId: module.id,
  selector: 'app-lock-one',
  templateUrl: './lock-one.component.html',
  styleUrls: ['./lock-one.component.css']
})
export class LockOneComponent implements AfterViewInit {

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

  @ViewChild("world") world: ElementRef;

  constructor() {}

  ngAfterViewInit() {
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
      document.addEventListener('mousemove', this.docMouseMoveHandler, false);
      this.canvas.fillStyle   = '#ff0000';
    }
    /*this.canvas.fillStyle = '#ff0000';
    this.canvas.fillRect(10, 10, 150, 150);*/

    /*let canvas: CanvasRenderingContext2D  = this.world.nativeElement.getContext("2d");
    canvas.fillStyle  = '#ff0000';
    canvas.fillRect(10,10,100,100);*/


    this.tick();
  }

  docMouseMoveHandler ()
  {

  }

  tick()
  {
    requestAnimationFrame(()=> {
      this.tick();
    });
  }


}
