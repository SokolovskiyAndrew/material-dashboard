import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() confirmTitle = '';
  @Input() confirmDescription = '';

  constructor() {}

  ngOnInit(): void {}
}
