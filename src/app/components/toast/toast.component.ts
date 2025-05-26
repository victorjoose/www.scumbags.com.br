import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `
    <div *ngIf="visible" class="toast">
      <div>{{ message }}</div>
    </div>
  `,
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() message = '';
  visible = false;

  show(message: string) {
    this.message = message;
    this.visible = true;
    setTimeout(() => this.visible = false, 3000);
  }
}
