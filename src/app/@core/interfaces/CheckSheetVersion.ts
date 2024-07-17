export interface Reviewer {
    reviewerId: string;
    reviewerName: string;
    department: string;
    email: string;
    reviewedOn: string;
    isReviewed: boolean;
    seqOrder: number;
}

export interface Approver {
    approverId: string;
    approverName: string;
    department: string;
    email: string;
    approvedOn: string;
    isApproved: boolean;
    seqOrder: number;
}

export interface ApproverandReviewer {
    reviewers: Reviewer[];
    approvers: Approver[];
    uniqueId: string;
}

export interface Checkpoint {
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

export interface CheckSheetVersionDTO {
    isReviewed: boolean;
    isApproved: boolean;
    status: string;
    department: string;
    line: string;
    maintenaceClass: string;
    station: string;
    equipment: string;
    equipmentCode: string;
    location: string;
    subLocation: string;
    reviewers: Reviewer[];
    approvers: Approver[];
    checkPoints: Checkpoint[];
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
    revision: string;
    changeDetails: string;
    id: string;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date ;
    modifiedBy: string ;
    isActive: boolean;
}

export interface ChecksheetData {
    id: string;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
    isActive: boolean;
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
    revision: string;
    changeDetails: string;
    userAction: string;
    activateOn:  Date;
}

export interface UserActions {
    isReadOnly: boolean;
    showReplicateCheckSheet: boolean;
    showCreateNewVersion: boolean;
    showAddCheckPoint: boolean;
    showSubmit: boolean;
    showReview: boolean;
    showApprove: boolean;
    showReject: boolean;
}
