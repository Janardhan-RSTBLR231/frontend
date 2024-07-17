export interface Role {
    id: string;
    name: string;
    accessUpload: boolean;
    accessBAC: boolean;
    accessTransaction: boolean;
    accessHistory: boolean;
    accessConfig: boolean;
    accessUserMngt: boolean;
    accessRevenue: boolean;
    accessRole: boolean;
    accessDownload: boolean,
    canDelete: boolean;
}