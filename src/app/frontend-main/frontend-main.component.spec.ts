import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendMainComponent } from './frontend-main.component';

describe('FrontendMainComponent', () => {
  let component: FrontendMainComponent;
  let fixture: ComponentFixture<FrontendMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontendMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
