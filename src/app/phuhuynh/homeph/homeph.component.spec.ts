import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomephComponent } from './homeph.component';

describe('HomephComponent', () => {
  let component: HomephComponent;
  let fixture: ComponentFixture<HomephComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomephComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomephComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
