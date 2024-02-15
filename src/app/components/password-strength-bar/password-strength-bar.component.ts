import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PasswordStrength } from 'src/app/enums/password-strength';
import { PasswordValidationColorSet } from 'src/app/interfaces/password-validation-color-set';

@Component({
  selector: 'app-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrl: './password-strength-bar.component.css'
})
export class PasswordStrengthBarComponent implements OnChanges {
  @Input({ required: true }) public passwordStrength!: PasswordStrength; 
  
  @Input() colorSet : PasswordValidationColorSet = {
    neutral: "gray",
    dangerous: "red",
    cautious: "yellow",
    successfull: "green"
  };

  public sectionColors!: string[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['passwordStrength']) {
      this.setSectionsColors();
    }
  } 

  private setSectionsColors() {
    switch(this.passwordStrength) {
      case PasswordStrength.Empty: {
        this.sectionColors = Array(3).fill(this.colorSet.neutral);
        break;
      }
      case PasswordStrength.NotEnoughCharacters: {
        this.sectionColors = Array(3).fill(this.colorSet.dangerous);
        break;
      }
      case PasswordStrength.Easy: {
        this.sectionColors = [ this.colorSet.dangerous, this.colorSet.neutral, this.colorSet.neutral ];
        break;
      }
      case PasswordStrength.Medium: {
        this.sectionColors = [ this.colorSet.cautious, this.colorSet.cautious, this.colorSet.neutral ];
        break;
      }
      case PasswordStrength.Strong: {
        this.sectionColors = Array(3).fill(this.colorSet.successfull);
        break;
      }
    }
  }
}
