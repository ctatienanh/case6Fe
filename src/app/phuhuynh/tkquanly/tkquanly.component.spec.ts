import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TkquanlyComponent } from './tkquanly.component';

describe('TkquanlyComponent', () => {
  let component: TkquanlyComponent;
  let fixture: ComponentFixture<TkquanlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TkquanlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TkquanlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
