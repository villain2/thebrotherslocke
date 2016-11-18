import { Injectable } from "@angular/core";
import { LockOne } from '../lock-one/lock-one';

@Injectable()
export class LockOneService {
  lockOneData   = [
    new LockOne()
  ];
}
