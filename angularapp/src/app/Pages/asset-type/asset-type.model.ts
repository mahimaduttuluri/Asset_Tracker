export interface AssetType {
  Asset_Type_Key: number;

  Asset_Type?: string | null;
  Asset_Code?: string | null;

  Exp_Working_Hrs?: number | null;
  Exp_Idle_Hrs?: number | null;
  Exp_OFF_Hrs?: number | null;
  Exp_Runtime_Hrs?: number | null;

  Exp_IdleFuelBurnRate?: number | null;
  Exp_WorkingFuelBurnRate?: number | null;
  Exp_RuntimeFuelBurnRate?: number | null;

  Engine_Oil_Pressure_LTL?: number | null;
  Engine_Oil_Pressure_UTL?: number | null;

  KW_Hours_Benchmark?: number | null;
  Average_RPM?: number | null;

  Transmission_Temperature_LTL?: number | null;
  Transmission_Temperature_UTL?: number | null;

  Is_Critical_Flag?: number | null; // 0/1 from DB
  Criticality?: string | null;

  DashboardURL?: string | null;
  IconCssName?: string | null;

  SortingOrderId?: number | null;
  EquipmentCategory_Key?: number | null;

  ImageFileData?: string | null; // assume API returns base64 string
  ShortCode?: string | null;
}

export type AssetTypeUpsert = Omit<AssetType, 'Asset_Type_Key'> & Partial<Pick<AssetType, 'Asset_Type_Key'>>;