import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPresentation } from './company-presentation';

describe('CompanyPresentation', () => {
  let component: CompanyPresentation;
  let fixture: ComponentFixture<CompanyPresentation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyPresentation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
