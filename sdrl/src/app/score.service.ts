import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private totalScore: number;
  private progressLevel: number;
  
  constructor() { }

  initiateNewGame()
  {
    this.totalScore = 0;
    this.progressLevel = 0;
  }

  getCurrentScore(): number
  {
    return this.totalScore;
  }

  getCurrentProgressLevel(): number
  {
    return this.progressLevel;
  }

  levelUp(): void
  {
    this.progressLevel ++;
    this.totalScore += this.progressLevel*1000;
  }
}
