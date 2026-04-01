import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-oem-onboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './oem-onboard.component.html',
  styleUrls: ['./oem-onboard.component.scss']
})
export class OEMOnboardComponent implements OnInit {
  @Input() formOnly: boolean = false;

  public oemForm!: FormGroup;

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.oemForm = this.fb.group({
      OEM_Key: ['', Validators.required],
      OEM_Provider: ['', Validators.required],
      OEM_ProviderName: [''],
      OEM_Description: [''],
      History_TableName: [''],
      Productivity_TableName: [''],
      Is_Solution: [''],
      Is_ForLiveTracking: [''],
      AssetIdColumnName: [''],
      CCodeColumnName: [''],
      InstanceTimeColumnName: [''],
      InstanceDateColumnName: [''],
      WorkDoneUOM: [''],
      APPLICATION_NAME: [''],
      AssetSubCategory: ['']
    });
  }

  onSave(): void {
    if (this.oemForm.valid) {
      console.log('OEM Form Data:', this.oemForm.value);
    } else {
      this.oemForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.oemForm.reset();
  }
}
