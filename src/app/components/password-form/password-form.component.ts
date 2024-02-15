import { Component, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PasswordStrength } from 'src/app/enums/password-strength';
import { PasswordStrengthValidator } from 'src/app/validators/password-strength-validator';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css'
})
export class PasswordFormComponent {
  public passwordForm: FormGroup;
  public passwordStrength: PasswordStrength = PasswordStrength.Empty;

  constructor(private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      password: new FormControl<string>('', PasswordStrengthValidator.validateStrength)
    })
  }

  onPasswordChange() {
    this.passwordStrength = this.passwordForm.get('password')?.getError('strength');
  }
}
