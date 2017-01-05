/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestGLComponent } from './test-gl.component';

describe('TestGLComponent', () => {
  let component: TestGLComponent;
  let fixture: ComponentFixture<TestGLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
