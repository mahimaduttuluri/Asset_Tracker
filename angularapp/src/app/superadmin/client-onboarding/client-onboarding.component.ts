import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-onboarding',
  standalone: true,
  imports: [
    CommonModule,          // ✅ NgIf, JsonPipe
    ReactiveFormsModule,   // ✅ formGroup, formControlName
    RouterModule           // ✅ routerLink
  ],
  templateUrl: './client-onboarding.component.html',
  styleUrls: ['./client-onboarding.component.css']
})
export class ClientOnboardingComponent {

  onboardingForm: FormGroup;
  submittedPayload: any = null;

  passwordStrength = 0;
  passwordStrengthLabel = 'Weak';

  completionPercent = 0;

  constructor(private fb: FormBuilder) {
    this.onboardingForm = this.fb.group({
      clientCode: ['', Validators.required],
      clientName: ['', Validators.required],
      tenantPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    // Listen to form changes for progress
    this.onboardingForm.valueChanges.subscribe(() => {
      this.updateCompletionPercent();
    });
  }

  updateCompletionPercent() {
    const totalFields = 3;
    let completedFields = 0;

    if (this.onboardingForm.get('clientCode')?.value && this.onboardingForm.get('clientCode')?.valid) completedFields++;
    if (this.onboardingForm.get('clientName')?.value && this.onboardingForm.get('clientName')?.valid) completedFields++;
    if (this.onboardingForm.get('tenantPassword')?.value && this.onboardingForm.get('tenantPassword')?.valid) completedFields++;

    this.completionPercent = Math.round((completedFields / totalFields) * 100);
  }


  submitForm() {
    if (this.onboardingForm.invalid) {
      this.onboardingForm.markAllAsTouched();
      return;
    }

    this.submittedPayload = this.onboardingForm.value;
    console.log(this.submittedPayload);
  }

  cancel() {
    // Navigate back or emit close event
    window.history.back();
  }


  calculatePasswordStrength(password: string) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    this.passwordStrength = strength;
    this.passwordStrengthLabel =
      strength <= 2 ? 'Weak' : strength <= 4 ? 'Medium' : 'Strong';
  }
}
