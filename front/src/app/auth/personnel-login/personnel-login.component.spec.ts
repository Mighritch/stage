import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelLoginComponent } from './personnel-login.component';

describe('PersonnelLoginComponent', () => {
  let component: PersonnelLoginComponent;
  let fixture: ComponentFixture<PersonnelLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelLoginComponent]
    });
    fixture = TestBed.createComponent(PersonnelLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
