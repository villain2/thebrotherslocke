export class LockOne {
  constructor(
  public id: number = 0,
  public name: string = "Lock One",
  public panelHeight: number = 50,
  public panelWidth: number = 100,
  public columnOne: any = ["yellow", "red", "blue", "empty", "empty"],
  public columnTwo: any = ["red", "empty", "empty", "blue", "yellow"],
  public columnThree: any = ["empty", "blue", "red", "yellow", "empty"],
  public useColors: boolean = true,
  public useSymbols: boolean = false,
  public totalAnswers: number = 3,
  public correct: boolean = false,
  public timer: number = 45,
  public meter: number = 0){}
}
