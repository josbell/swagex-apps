import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'swagex-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss']
})
export class CallToActionComponent implements OnInit {
  @Output() signUpClicked = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onSignUpClicked() {
    this.signUpClicked.emit();
  }
}
