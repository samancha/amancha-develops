import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoftwarePgComponent } from './software-pg.component';
import { FullCalendarModule } from '@fullcalendar/angular';

describe('SoftwarePgComponent', () => {
  let component: SoftwarePgComponent;
  let fixture: ComponentFixture<SoftwarePgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwarePgComponent, FullCalendarModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwarePgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
