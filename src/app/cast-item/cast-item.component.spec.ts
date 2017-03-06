/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CastItemComponent } from './cast-item.component';

describe('CastItemComponent', () => {
  let component: CastItemComponent;
  let fixture: ComponentFixture<CastItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
