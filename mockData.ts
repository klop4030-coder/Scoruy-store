
import { License, LicenseStatus, LicenseType } from './types';

export const mockLicenses: License[] = [
  {
    id: "6",
    key: "FLCN-2VVQ-CE4X-W71Q-LLYI",
    status: LicenseStatus.WAITING,
    type: LicenseType.YEARLY,
    createdAt: "2026-01-25 23:18",
    expiryDate: "2027-01-25",
    programName: "Falcon Pro",
    user: "بدون مستخدم"
  },
  {
    id: "5",
    key: "FLCN-VWKP-IL88-IYIG-RUJF",
    status: LicenseStatus.ACTIVE,
    type: LicenseType.MONTHLY,
    createdAt: "2026-01-24 23:18",
    expiryDate: "2026-02-24",
    hwid: "6DC4C9EC-F904-7...",
    programName: "Falcon Pro",
    lastUsedAt: "2026-01-25 10:00"
  },
  {
    id: "4",
    key: "FLCN-2ZHF-OTHV-R99A-V6UP",
    status: LicenseStatus.ACTIVE,
    type: LicenseType.YEARLY,
    createdAt: "2026-01-23 23:18",
    expiryDate: "2027-01-23",
    hwid: "8B2F1A0C-E123-4...",
    programName: "Falcon Pro"
  },
  {
    id: "3",
    key: "FLCN-YO4U-LCXD-S0VB-XSQQ",
    status: LicenseStatus.ACTIVE,
    type: LicenseType.YEARLY,
    createdAt: "2026-01-23 23:18",
    expiryDate: "2027-01-23",
    hwid: "A1D5E9C2-B001-9...",
    programName: "Falcon Pro"
  },
  {
    id: "2",
    key: "FLCN-BEKE-CISR-VG5T-S2TM",
    status: LicenseStatus.ACTIVE,
    type: LicenseType.LIFETIME,
    createdAt: "2026-01-22 23:18",
    expiryDate: "N/A",
    hwid: "C4F8A2D1-E999-2...",
    programName: "Falcon Pro"
  }
];

export const mockStats = {
  totalLicenses: 6,
  activeLicenses: 5,
  expiredLicenses: 0,
  pendingRequests: 0,
  totalUsers: 1,
  checkOperations: 10
};
