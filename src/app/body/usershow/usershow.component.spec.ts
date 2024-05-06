import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsershowComponent } from './usershow.component';

describe('UsershowComponent', () => {
  let component: UsershowComponent;
  let fixture: ComponentFixture<UsershowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsershowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsershowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
