import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

export type LoginFormData = { username: string };

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output() submitLoginForm: EventEmitter<LoginFormData> = new EventEmitter();

  onSubmit(form: NgForm) {
    if (form.status !== 'VALID') {
      return;
    }

    this.signalFormSubmit(form.value);
  }

  signalFormSubmit(formData: LoginFormData) {
    this.submitLoginForm.emit(formData);
  }
}
