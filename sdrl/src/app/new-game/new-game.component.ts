import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ScoreService } from '../score.service';
import { CombatLogService } from '../combat-log.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  constructor(
    private scoreService: ScoreService,
    private combatLogService: CombatLogService
  ) { }

  public playerName: string;
  public gameStarted = false;
  public gameOver = false;
  public name = '';

  @Output() startGame = new EventEmitter();

  ngOnInit() {
    // this is just for testing!!
    this.playerName = "Testing Athena";
    this.startNewGame();
  }

  startNewGame(): void
  {
    if(this.playerName)
    {
      this.scoreService.initiateNewGame();
      this.startGame.emit(this.playerName)
      this.gameStarted = true;
      this.combatLogService.addCustomLine("You awaken in a dark corridor...");
      this.combatLogService.addCustomLine("Venture forth and defeat the 100 Gremlins!");
    }
  }

  setGameOver(name: string)
  {
    this.name = name;
    this.gameOver = true;
  }

  getScore()
  {
    return this.scoreService.getCurrentScore();
  }

}
