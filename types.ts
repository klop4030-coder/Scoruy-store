
export enum LicenseStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  SUSPENDED = 'suspended',
  WAITING = 'waiting_for_activation'
}

export enum LicenseType {
  TRIAL = 'تجريبي (7 أيام)',
  MONTHLY = 'شهري (30 يوم)',
  YEARLY = 'سنوي (365 يوم)',
  LIFETIME = 'مدى الحياة',
  CUSTOM = 'مدة مخصصة'
}

export interface License {
  id: number;
  key: string;
  status: LicenseStatus;
  type: LicenseType;
  createdAt: string;
  startDate?: string;
  expiryDate?: string;
  hwid?: string;
  programName: string;
  lastUsedAt?: string;
  user?: string;
}

export interface DashboardStats {
  totalLicenses: number;
  activeLicenses: number;
  expiredLicenses: number;
  suspendedLicenses: number;
  pendingRequests: number;
  totalUsers: number;
  checkOperations: number;
}
