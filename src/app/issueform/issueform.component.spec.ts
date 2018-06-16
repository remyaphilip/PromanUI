import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueformComponent } from './issueform.component';

describe('IssueformComponent', () => {
  let component: IssueformComponent;
  let fixture: ComponentFixture<IssueformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
