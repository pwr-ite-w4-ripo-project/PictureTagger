import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicSendFormComponent } from './pic-send-form.component';

describe('PicSendFormComponent', () => {
  let component: PicSendFormComponent;
  let fixture: ComponentFixture<PicSendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicSendFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PicSendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
