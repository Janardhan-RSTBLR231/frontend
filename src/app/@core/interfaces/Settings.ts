export interface Settings {
    locktime: number;
    shifts: Shift[];
    senderEmailAddress: string;
    smtpEnableSSL: boolean;
    smtpHost: string;
    smtpPort: number;
    smtpUserId: string;
    smtpPassword: string;
    id: string;
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
    modifiedBy: string;
    isActive: boolean;
}

export interface Shift {
    name: string;
    startTime: string;
    endTime: string;
}