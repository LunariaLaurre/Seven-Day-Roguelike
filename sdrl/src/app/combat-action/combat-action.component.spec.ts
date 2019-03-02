import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatActionComponent } from './combat-action.component';

describe('CombatActionComponent', () => {
  let component: CombatActionComponent;
  let fixture: ComponentFixture<CombatActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombatActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
