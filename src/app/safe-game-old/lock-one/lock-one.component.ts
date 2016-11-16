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

  @ViewChild("world") world: ElementRef;

  constructor() {}


  ngAfterViewInit() {
    this.canvas   = this.world.nativeElement;
    console.log(this.canvas);
    this.canvas.width   = 900;
    this.canvas.height  = 550;

    if(this.canvas && this.world.nativeElement.getContext)
    {
      this.canvas.fillStyle   = '#ff0000';
    }
    /*this.canvas.fillStyle = '#ff0000';
    this.canvas.fillRect(10, 10, 150, 150);*/

    /*let canvas: CanvasRenderingContext2D  = this.world.nativeElement.getContext("2d");
    canvas.fillStyle  = '#ff0000';
    canvas.fillRect(10,10,100,100);*/


    this.tick();
  }

  tick()
  {
    requestAnimationFrame(()=> {
      this.tick();
    });
  }


}
