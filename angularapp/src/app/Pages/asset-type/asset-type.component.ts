import { Component, inject, signal, effect, OnInit, computed } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AssetType, AssetTypeUpsert } from './asset-type.model';
import { AssetTypeService } from './asset-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-type',
  imports: [
    CommonModule,
    ReactiveFormsModule   // ✅ REQUIRED
  ],

  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.css']
})
export class AssetTypeComponent {
  showForm = signal(false);

  toggleForm() {
    this.showForm.update(show => !show);
    if (!this.showForm()) {
      this.cancel();
    }
  }
  assetTypeForm: FormGroup;

  alertTitle = 'Asset Type Configuration';
  assetSubtitle = '1325009H - Mobile Concrete Batching Plant';

  service = inject(AssetTypeService);
  assetTypes = signal<AssetType[]>([]);
  editingId = signal<number|null>(null);

  constructor(private fb: FormBuilder) {
    this.assetTypeForm = this.fb.group({
      Asset_Type: ['', Validators.required],
      Asset_Code: ['', Validators.required],
      ShortCode: [''],

      EquipmentCategory: ['', Validators.required],

      Exp_Working_Hrs: [''],
      Exp_Idle_Hrs: [''],
      Exp_OFF_Hrs: [''],
      Exp_Runtime_Hrs: [''],

      Exp_IdleFuelBurnRate: [''],
      Exp_WorkingFuelBurnRate: [''],
      Exp_RuntimeFuelBurnRate: [''],

      Engine_Oil_Pressure_LTL: [''],
      Engine_Oil_Pressure_UTL: [''],

      Transmission_Temperature_LTL: [''],
      Transmission_Temperature_UTL: [''],

      KW_Hours_Benchmark: [''],
      Average_RPM: [''],

      Is_Critical_Flag: ['0'],
      Criticality: ['Medium'],

      DashboardURL: ['']
    });

    effect(() => {
      if (!this.showForm()) {
        this.load();
      }
    });
  }

  async save() {
    if (this.assetTypeForm.invalid) {
      this.assetTypeForm.markAllAsTouched();
      return;
    }
    const payload = this.assetTypeForm.value as AssetTypeUpsert;
    try {
    if (this.editingId()) {
        await firstValueFrom(this.service.update(this.editingId() as number, payload));
      } else {
        await firstValueFrom(this.service.create(payload));
      }
      this.cancel(); // close form first
      this.load();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  onCancel() {
    this.cancel();
    this.toggleForm();
  }

  cancel() {
    this.assetTypeForm.reset();
    this.editingId.set(null);
  }
  async load() {
    try {
      const data = await firstValueFrom(this.service.getAll());
      this.assetTypes.set(data);
    } catch (error) {
      console.error('Load error:', error);
    }
  }

  edit(asset: AssetType) {
    this.assetTypeForm.patchValue(asset);
    this.editingId.set(asset.Asset_Type_Key);
    this.toggleForm();
  }

  async delete(id: number) {
    if (confirm(`Delete asset type ${id}?`)) {
      try {
        await firstValueFrom(this.service.delete(id));
        await this.load();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  }

  totalFields = [
  'Asset_Type',
  'Asset_Code',
  'EquipmentCategory',
  'Exp_Working_Hrs',
  'Exp_Idle_Hrs',
  'Exp_OFF_Hrs',
  'Exp_Runtime_Hrs',
  'Exp_IdleFuelBurnRate',
  'Exp_WorkingFuelBurnRate',
  'Exp_RuntimeFuelBurnRate',
  'Engine_Oil_Pressure_LTL',
  'Engine_Oil_Pressure_UTL',
  'Transmission_Temperature_LTL',
  'Transmission_Temperature_UTL',
  'KW_Hours_Benchmark',
  'Average_RPM',
  'DashboardURL'
];

get completionPercent(): number {
  const filled = this.totalFields.filter(field => {
    const value = this.assetTypeForm.get(field)?.value;
    return value !== null && value !== '';
  }).length;

  return Math.round((filled / this.totalFields.length) * 100);
}
}