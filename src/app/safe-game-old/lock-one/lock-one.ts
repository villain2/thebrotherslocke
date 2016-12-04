export class LockOne {
  constructor(
  public id: number = 0,
  public name: string = "Lock One",
  public panelHeight: number = 50,
  public panelWidth: number = 100,
  public columnAnswers: any = ["yellow", "red", "blue", "empty", "empty",
    "red", "empty", "empty", "blue", "yellow",
    "empty", "blue", "red", "yellow", "empty"],
  public columnDefaults: any = ["empty", "empty", "empty", "empty", "empty",
    "empty", "empty", "empty", "empty", "empty",
    "empty", "empty", "empty", "empty", "empty"],
  public useColors: boolean = true,
  public useSymbols: boolean = false,
  public totalAnswers: number = 3,
  public correct: boolean = false,
  public timeLimit: number = 45,
  public meter: number = 0,
  public meterMax: number = 250,
  public meterReduce: number  = 50,
  public meterDifficulty: number = 0.5){}
}
