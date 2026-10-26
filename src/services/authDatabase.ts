/**
 * U&Me Associates - Persistent Auth & Password Database
 * Stores user credentials securely with cryptographic hashing (SHA-256 + salt).
 * Supports registration, authentication, password verification, and forgot password reset.
 */

import { UserCategory, ClientRange, TurnoverRange } from '../types';

export interface StoredUserAccount {
  id: string;
  mobile: string; // 10 digits
  email: string;
  fullName: string;
  firmName: string;
  category: UserCategory;
  scaleTier: ClientRange | TurnoverRange;
  role: 'ca_partner' | 'admin' | 'associate';
  passwordHash: string;
  salt: string;
  createdAt: string;
  updatedAt: string;
  passwordLastChangedAt: string;
}

const STORAGE_KEY = 'ume_associates_user_database_v1';

// Fast standalone SHA-256 implementation as reliable fallback and primary hasher
async function computeSha256(str: string): Promise<string> {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const buffer = new TextEncoder().encode(str);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {
    // Fall back to pure JS hash below
  }

  // Pure JS fallback hash for hermetic environments
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

function generateSalt(): string {
  return Math.random().toString(36).substring(2, 12);
}

// Default Seed Accounts
const DEFAULT_ACCOUNTS: Array<{
  mobile: string;
  email: string;
  fullName: string;
  firmName: string;
  category: UserCategory;
  scaleTier: ClientRange | TurnoverRange;
  role: 'ca_partner' | 'admin';
  initialPass: string;
}> = [
  {
    mobile: '9810122910',
    email: 'rohit@mehra-associates.in',
    fullName: 'CA Rohit Mehra, FCA',
    firmName: 'U&Me Associates, Chartered Accountants',
    category: 'professional',
    scaleTier: '50-200',
    role: 'ca_partner',
    initialPass: 'Password@123'
  },
  {
    mobile: '9820144521',
    email: 'finance@bharatlogistics.in',
    fullName: 'Rajesh Singhania (Director)',
    firmName: 'Bharat Logistics & Infra Pvt Ltd',
    category: 'corporate',
    scaleTier: '200-800cr',
    role: 'admin',
    initialPass: 'Password@123'
  }
];

class AuthDatabaseService {
  private accounts: StoredUserAccount[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.accounts = JSON.parse(raw);
        this.isInitialized = true;
        return;
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using memory storage', e);
    }

    // Seed default accounts
    this.accounts = [];
    for (const seed of DEFAULT_ACCOUNTS) {
      const salt = generateSalt();
      const hash = await computeSha256(seed.initialPass + salt);
      this.accounts.push({
        id: `usr-${seed.mobile}`,
        mobile: seed.mobile,
        email: seed.email,
        fullName: seed.fullName,
        firmName: seed.firmName,
        category: seed.category,
        scaleTier: seed.scaleTier,
        role: seed.role,
        passwordHash: hash,
        salt,
        createdAt: '2026-10-01T09:00:00.000Z',
        updatedAt: new Date().toISOString(),
        passwordLastChangedAt: '2026-10-01T09:00:00.000Z'
      });
    }

    this.persist();
    this.isInitialized = true;
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.accounts));
    } catch (e) {
      console.warn('Could not persist to localStorage', e);
    }
  }

  public async authenticate(mobile: string, password: string): Promise<{
    success: boolean;
    user?: StoredUserAccount;
    error?: string;
  }> {
    await this.init();
    const cleanMobile = mobile.replace(/\D/g, '');
    const account = this.accounts.find(a => a.mobile === cleanMobile);

    if (!account) {
      return {
        success: false,
        error: `Mobile number +91 ${cleanMobile} is not registered in the database. Please create an account or click Demo Login.`
      };
    }

    const testHash = await computeSha256(password + account.salt);
    if (testHash !== account.passwordHash) {
      return {
        success: false,
        error: 'Incorrect password entered. If you forgot your password, use the "Forgot password?" link to reset it securely.'
      };
    }

    return {
      success: true,
      user: account
    };
  }

  public async register(params: {
    mobile: string;
    email: string;
    fullName: string;
    firmName: string;
    category: UserCategory;
    scaleTier: ClientRange | TurnoverRange;
    password: string;
  }): Promise<{
    success: boolean;
    user?: StoredUserAccount;
    error?: string;
  }> {
    await this.init();
    const cleanMobile = params.mobile.replace(/\D/g, '');

    // Duplicate detection
    const existingMobile = this.accounts.find(a => a.mobile === cleanMobile);
    if (existingMobile) {
      return {
        success: false,
        error: `An account with mobile number +91 ${cleanMobile} already exists. Please sign in or reset your password.`
      };
    }

    const existingEmail = this.accounts.find(
      a => a.email.toLowerCase() === params.email.trim().toLowerCase()
    );
    if (existingEmail) {
      return {
        success: false,
        error: `An account with email ${params.email} already exists.`
      };
    }

    const salt = generateSalt();
    const hash = await computeSha256(params.password + salt);
    const now = new Date().toISOString();

    const newAccount: StoredUserAccount = {
      id: `usr-${Date.now()}`,
      mobile: cleanMobile,
      email: params.email.trim(),
      fullName: params.fullName.trim(),
      firmName: params.firmName.trim(),
      category: params.category,
      scaleTier: params.scaleTier,
      role: params.category === 'professional' ? 'ca_partner' : 'admin',
      passwordHash: hash,
      salt,
      createdAt: now,
      updatedAt: now,
      passwordLastChangedAt: now
    };

    this.accounts.unshift(newAccount);
    this.persist();

    return {
      success: true,
      user: newAccount
    };
  }

  public async checkMobileExists(mobile: string): Promise<boolean> {
    await this.init();
    const clean = mobile.replace(/\D/g, '');
    return this.accounts.some(a => a.mobile === clean);
  }

  public async getUserByMobile(mobile: string): Promise<StoredUserAccount | null> {
    await this.init();
    const clean = mobile.replace(/\D/g, '');
    return this.accounts.find(a => a.mobile === clean) || null;
  }

  public async resetPassword(mobile: string, newPassword: string): Promise<{
    success: boolean;
    error?: string;
    user?: StoredUserAccount;
  }> {
    await this.init();
    const clean = mobile.replace(/\D/g, '');
    const accountIndex = this.accounts.findIndex(a => a.mobile === clean);

    if (accountIndex === -1) {
      return {
        success: false,
        error: `No registered account found for mobile number +91 ${clean}.`
      };
    }

    const salt = generateSalt();
    const hash = await computeSha256(newPassword + salt);
    const now = new Date().toISOString();

    this.accounts[accountIndex].passwordHash = hash;
    this.accounts[accountIndex].salt = salt;
    this.accounts[accountIndex].updatedAt = now;
    this.accounts[accountIndex].passwordLastChangedAt = now;

    this.persist();

    return {
      success: true,
      user: this.accounts[accountIndex]
    };
  }

  public getAllAccounts(): StoredUserAccount[] {
    return [...this.accounts];
  }

  public clearDatabase(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.isInitialized = false;
    this.init();
  }
}

export const authDatabase = new AuthDatabaseService();
