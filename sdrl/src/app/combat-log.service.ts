import { Injectable } from '@angular/core';
import { takeRight } from 'lodash'
@Injectable({
  providedIn: 'root'
})
export class CombatLogService {

  private lines: string[] = [];

  constructor() { }

  addLine(line: string): void
  {
    this.lines.push(line);
  }

  getLogEntries(entries: number): string[]
  {
    return takeRight(this.lines, entries)
  }


}
