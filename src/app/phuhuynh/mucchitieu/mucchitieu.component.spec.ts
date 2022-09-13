import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MucchitieuComponent } from './mucchitieu.component';

describe('MucchitieuComponent', () => {
  let component: MucchitieuComponent;
  let fixture: ComponentFixture<MucchitieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MucchitieuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MucchitieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
