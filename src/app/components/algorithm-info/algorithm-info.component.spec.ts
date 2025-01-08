import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmInfoComponent } from './algorithm-info.component';

describe('AlgorithmInfoComponent', () => {
  let component: AlgorithmInfoComponent;
  let fixture: ComponentFixture<AlgorithmInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
