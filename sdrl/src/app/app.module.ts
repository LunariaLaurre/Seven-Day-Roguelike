import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { NewEquipmentComponent } from './new-equipment/new-equipment.component';
import { EquipmentDisplayComponent } from './equipment-display/equipment-display.component';
import { CombatLogComponent } from './combat-log/combat-log.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlayerStatsComponent,
    NewEquipmentComponent,
    EquipmentDisplayComponent,
    CombatLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
