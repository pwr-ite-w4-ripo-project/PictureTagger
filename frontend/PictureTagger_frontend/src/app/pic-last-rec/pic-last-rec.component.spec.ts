import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicLastRecComponent } from './pic-last-rec.component';

describe('PicLastRecComponent', () => {
  let component: PicLastRecComponent;
  let fixture: ComponentFixture<PicLastRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicLastRecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PicLastRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
