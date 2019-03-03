import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { NewEquipmentComponent } from './new-equipment/new-equipment.component';
import { EquipmentDisplayComponent } from './equipment-display/equipment-display.component';
import { CombatLogComponent } from './combat-log/combat-log.component';
import { EnemyStatsComponent } from './enemy-stats/enemy-stats.component';
import { NewGameComponent } from './new-game/new-game.component';
import { FormsModule } from '@angular/forms';
import { CombatActionComponent } from './combat-action/combat-action.component';
import { RoomSelectComponent } from './room-select/room-select.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlayerStatsComponent,
    NewEquipmentComponent,
    EquipmentDisplayComponent,
    CombatLogComponent,
    EnemyStatsComponent,
    NewGameComponent,
    CombatActionComponent,
    RoomSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
