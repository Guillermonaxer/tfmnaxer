import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpLoginComponent } from './pop-up-login.component';

describe('PopUpLoginComponent', () => {
  let component: PopUpLoginComponent;
  let fixture: ComponentFixture<PopUpLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpLoginComponent]
    });
    fixture = TestBed.createComponent(PopUpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
