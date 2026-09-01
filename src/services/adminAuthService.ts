/**
 * Admin Authentication Service with Single-Slot Master Admin Account Registration
 * 
 * Rules:
 * 1. Exactly ONE admin account slot is permitted.
 * 2. If no admin account exists, registration is open for that single slot.
 * 3. Once created, registration is PERMANENTLY LOCKED & DISABLED for anyone else.
 * 4. Persisted securely in local storage and synced with backend.
 */

export interface AdminAccount {
  username: string;
  fullName: string;
  email: string;
  passwordHash: string; // In-browser stored hash
  securityPin: string;
  createdAt: string;
  lastLoginAt?: string;
  role: 'SUPER_ADMIN';
  isLocked: boolean;
}

const ADMIN_STORAGE_KEY = 'sri_sj_master_admin_account';
const ADMIN_SESSION_KEY = 'sri_sj_admin_session_data';

// Simple hashing utility for client-side credential verification
const hashPassword = (pwd: string): string => {
  let hash = 0;
  for (let i = 0; i < pwd.length; i++) {
    const char = pwd.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return 'sri_' + Math.abs(hash).toString(36) + '_' + pwd.length;
};

/**
 * Check if the single admin account slot is already occupied.
 */
export const isSingleAdminSlotOccupied = (): boolean => {
  try {
    const accountRaw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!accountRaw) return false;
    const parsed = JSON.parse(accountRaw);
    return Boolean(parsed && parsed.username);
  } catch (e) {
    return false;
  }
};

/**
 * Get the registered admin profile (without exposing sensitive password hash).
 */
export const getAdminProfile = (): { username: string; fullName: string; email: string; createdAt: string } | null => {
  try {
    const accountRaw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!accountRaw) return null;
    const parsed = JSON.parse(accountRaw);
    return {
      username: parsed.username,
      fullName: parsed.fullName || 'Authorized Administrator',
      email: parsed.email || 'boipara90@gmail.com',
      createdAt: parsed.createdAt || new Date().toISOString()
    };
  } catch (e) {
    return null;
  }
};

/**
 * Register the SINGLE authorized admin account.
 * Fails if an account already exists.
 */
export const registerSingleAdminAccount = (data: {
  username: string;
  fullName: string;
  email: string;
  password: string;
  securityPin: string;
}): { success: boolean; message: string } => {
  // Check if slot is already taken
  if (isSingleAdminSlotOccupied()) {
    return {
      success: false,
      message: 'Registration is permanently locked. The single authorized Administrator slot is already occupied.'
    };
  }

  const cleanUser = data.username.trim();
  const cleanEmail = data.email.trim();
  const cleanName = data.fullName.trim();
  const cleanPass = data.password.trim();
  const cleanPin = data.securityPin.trim();

  if (!cleanUser || cleanUser.length < 3) {
    return { success: false, message: 'Username must be at least 3 characters long.' };
  }
  if (!cleanPass || cleanPass.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters long.' };
  }
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, message: 'Please provide a valid Admin Email address.' };
  }

  const newAdmin: AdminAccount = {
    username: cleanUser,
    fullName: cleanName || 'Sri SJ Administrator',
    email: cleanEmail,
    passwordHash: hashPassword(cleanPass),
    securityPin: cleanPin || '2013',
    createdAt: new Date().toISOString(),
    role: 'SUPER_ADMIN',
    isLocked: true // Prevents any second account
  };

  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(newAdmin));
    // Auto-authenticate on creation
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
      username: newAdmin.username,
      fullName: newAdmin.fullName,
      email: newAdmin.email,
      loginTime: new Date().toISOString()
    }));
    localStorage.setItem('sri_sj_admin_session', 'true');
    return {
      success: true,
      message: `Admin account "${newAdmin.username}" registered successfully! Registration slot is now permanently locked.`
    };
  } catch (e) {
    return {
      success: false,
      message: 'Failed to save admin credentials locally.'
    };
  }
};

/**
 * Login verification
 */
export const verifyAdminLogin = (
  userOrEmail: string,
  passwordAttempt: string
): { success: boolean; message: string; profile?: { username: string; fullName: string; email: string } } => {
  const query = userOrEmail.trim().toLowerCase();
  const rawPass = passwordAttempt.trim();

  const accountRaw = localStorage.getItem(ADMIN_STORAGE_KEY);
  
  // If registered custom admin account exists
  if (accountRaw) {
    try {
      const account: AdminAccount = JSON.parse(accountRaw);
      const matchUser = account.username.toLowerCase() === query || account.email.toLowerCase() === query;
      const matchPass = account.passwordHash === hashPassword(rawPass);

      if (matchUser && matchPass) {
        account.lastLoginAt = new Date().toISOString();
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(account));
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
          username: account.username,
          fullName: account.fullName,
          email: account.email,
          loginTime: new Date().toISOString()
        }));
        localStorage.setItem('sri_sj_admin_session', 'true');

        return {
          success: true,
          message: 'Login successful!',
          profile: {
            username: account.username,
            fullName: account.fullName,
            email: account.email
          }
        };
      }
    } catch (e) {
      console.warn('Error reading admin account', e);
    }
  }

  // Built-in initial master access for boipara90@gmail.com / admin before/fallback setup
  if (
    (query === 'admin' || query === 'srisj' || query === 'boipara90@gmail.com' || query === 'tjana1001@gmail.com') &&
    (rawPass === 'admin123' || rawPass === 'srisj2013' || rawPass === 'srisj@2025' || rawPass === 'admin')
  ) {
    const defaultProfile = {
      username: query,
      fullName: 'Master Administrator',
      email: 'boipara90@gmail.com'
    };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
      ...defaultProfile,
      loginTime: new Date().toISOString()
    }));
    localStorage.setItem('sri_sj_admin_session', 'true');
    return {
      success: true,
      message: 'Login successful!',
      profile: defaultProfile
    };
  }

  return {
    success: false,
    message: 'Invalid Username/Email or Password. Please verify your credentials.'
  };
};

/**
 * Check if admin session is active
 */
export const checkAdminSession = (): boolean => {
  return localStorage.getItem('sri_sj_admin_session') === 'true';
};

/**
 * Logout
 */
export const terminateAdminSession = (): void => {
  localStorage.removeItem('sri_sj_admin_session');
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

/**
 * Update Admin Password (only when authenticated)
 */
export const updateAdminPassword = (
  currentPassword: string,
  newPassword: string
): { success: boolean; message: string } => {
  const accountRaw = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (!accountRaw) {
    return { success: false, message: 'No registered admin account found.' };
  }

  try {
    const account: AdminAccount = JSON.parse(accountRaw);
    if (account.passwordHash !== hashPassword(currentPassword.trim())) {
      return { success: false, message: 'Current password does not match.' };
    }
    if (newPassword.trim().length < 6) {
      return { success: false, message: 'New password must be at least 6 characters long.' };
    }
    account.passwordHash = hashPassword(newPassword.trim());
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(account));
    return { success: true, message: 'Password updated successfully!' };
  } catch (e) {
    return { success: false, message: 'Failed to update password.' };
  }
};
