export interface CheckSheetTransaction {
  checkPointTransactions: CheckPointTransaction[];
  checkSheetId: string;
  department: string;
  line: string;
  maintenaceClass: string;
  station: string;
  equipment: string;
  equipmentCode: string;
  location: string;
  subLocation: string;
  checkSheetDay: string;
  startedBy: string;
  startedOn: string;
  validatedBy: string;
  validatedOn: string;
  status: string;
  colorCode: string;
  ngRecordExists: boolean;
  isLocked: boolean;
  lockedOn: string;
  name: string;
  lineId: string;
  departmentId: string;
  uniqueId: string;
  equipmentId: string;
  maintenaceClassId: string;
  stationId: string;
  locationId: string;
  subLocationId: string;
  version: number;
  shift: string;
  revision: string;
  changeDetails: string;
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedOn: string;
  modifiedBy: string;
  isActive: boolean;
}

export interface CheckPointTransaction {
  frequencyText: string;
  checkRecord: string;
  comments: string;
  isForToday: boolean;
  name: string;
  standard: string;
  condition: string;
  method: string;
  fileName: string;
  uniqueFileName: string;
  seqOrder: number;
  id: string;
  frequencyType: string;
  completeInSeconds: number;
  weekDays: number[];
  monthDays: number[];
  yearlyMonths: number[];
  yearlyMonthDays: number[];
}


export interface UserActions {
  isReadOnly: boolean;
  showExportPrintVersion: boolean;
  showSubmitButton: boolean;
  showApproveButton: boolean;
}

export interface BadgeCount {
  OK: number;
  NG: number;
  AbnormalCanUse: number;
  NA:number
}
