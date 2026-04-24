import { Component, Input, inject, signal, effect, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Angular Material imports for new HTML */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-asset-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './asset-onboarding.component.html',
  styleUrls: ['./asset-onboarding.component.scss']
})
export class AssetOnboardingComponent {
  @Input() formOnly = false;
  showForm = signal(false);
  editingId = signal<number|null>(null);

  assetForm: FormGroup;


  toggleForm() {
    this.showForm.update(show => !show);
    if (!this.showForm()) {
      this.cancel();
    }
  }

  constructor(private fb: FormBuilder) {
    this.assetForm = this.fb.group({
      // Basic Asset Info
      Asset_ID: [''],
      Asset_Name: ['', Validators.required],
      Asset_Code: ['', Validators.required],
Asset_Type: ['', Validators.required],
      Asset_Type_Key: [null, Validators.required],
      Asset_Fuel_Type: [''],
      Asset_Device_Type: [''],
      Asset_Product_Name: [''],

      // Dates
      Asset_Manufacturer_Year: [null],
      Asset_Onboarded_Date: [''],
      Asset_Start_Date: [''],
      Asset_End_Date: [''],
      LastMaintainedDate: [''],
      Job_StartDate: [''],
      Job_EndDate: [''],

      // Status & Movement
      Asset_Status: ['Active'],
      Asset_Movement: [''],
      Asset_Serial_Number: [''],
      IMEI_Number: [''],
      OEM_Key: [null],
      Section_Key: [null, Validators.required],
      Project_Key: [null, Validators.required],

      // Flags
      Is_Active_flag: ['Y'],
      Is_Delete_flag: ['N'],
      IsCurrent_Job: ['Y'],
      IsOwnedAsset: ['Y'],
      Is_DeHired: ['N'],

      // Technical
      CompanyCode: [''],
      AssetCapacity: [null],
      Asset_Tag: [''],
      ExpectedWorkingHours: [null],
      RegistrationNo: [''],
      Ais_Fuel: [''],
      EnergyMeterType: [''],
      TimeZone: ['']
    });

    effect(() => {
      if (!this.showForm() && !this.formOnly) {
        // load mock data if needed
      }
    });

    effect(() => {
      if (this.formOnly) {
        this.showForm.set(true);
      }
    });
  }

  save() {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      console.log('Form invalid');
      return;
    }
    console.log('Asset Onboarding Submitted (Full Payload):', this.assetForm.value);
    alert('Asset onboarded successfully!');
    this.cancel();
  }

  cancel() {
    this.assetForm.reset({
      Asset_Status: 'Active',
      Is_Active_flag: 'Y',
      Is_Delete_flag: 'N',
      IsCurrent_Job: 'Y',
      IsOwnedAsset: 'Y',
      Is_DeHired: 'N'
    });
    this.editingId.set(null);
  }

  onCancel() {
    this.cancel();
    this.toggleForm();
  }

  // Progress tracking - list ALL fields (37 total, exclude auto Asset_Key)
  totalFields = [
    'Asset_ID', 'Asset_Name', 'Asset_Code', 'Asset_Type', 'Asset_Type_Key', 'Asset_Fuel_Type',
    'Asset_Device_Type', 'Asset_Product_Name', 'Asset_Manufacturer_Year', 'Asset_Onboarded_Date',
    'Asset_Status', 'Asset_Movement', 'Asset_Serial_Number', 'IMEI_Number', 'OEM_Key',
    'Section_Key', 'Project_Key', 'Asset_Start_Date', 'Asset_End_Date', 'Record_Created_Run_id',
    'Record_modified_run_id', 'RecordCreateTimestamp', 'RecordModifyTimestamp', 'Is_Active_flag',
    'Is_Delete_flag', 'LastMaintainedDate', 'Job_StartDate', 'Job_EndDate', 'IsCurrent_Job',
    'IsOwnedAsset', 'CompanyCode', 'AssetCapacity', 'Is_DeHired', 'Asset_Tag', 'ExpectedWorkingHours',
    'RegistrationNo', 'Ais_Fuel', 'EnergyMeterType', 'TimeZone'
  ];

  get completionPercent(): number {
    const filled = this.totalFields.filter(field => {
      const control = this.assetForm.get(field);
      if (!control) return false;
      const value = control.value;
      return value !== null && value !== '' && value !== undefined;
    }).length;
    return Math.round((filled / this.totalFields.length) * 100);
  }
}

