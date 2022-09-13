import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilephComponent } from './profileph.component';

describe('ProfilephComponent', () => {
  let component: ProfilephComponent;
  let fixture: ComponentFixture<ProfilephComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilephComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilephComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
