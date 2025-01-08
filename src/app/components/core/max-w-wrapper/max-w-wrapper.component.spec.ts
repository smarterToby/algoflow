import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxWWrapperComponent } from './max-w-wrapper.component';

describe('MaxWWrapperComponent', () => {
  let component: MaxWWrapperComponent;
  let fixture: ComponentFixture<MaxWWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxWWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxWWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
