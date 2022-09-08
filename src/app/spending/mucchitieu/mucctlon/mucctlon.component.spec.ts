import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MucctlonComponent } from './mucctlon.component';

describe('MucctlonComponent', () => {
  let component: MucctlonComponent;
  let fixture: ComponentFixture<MucctlonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MucctlonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MucctlonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
