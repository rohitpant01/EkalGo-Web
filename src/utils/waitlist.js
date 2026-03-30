const STORAGE_KEY = 'ekalgo_waitlist';

export function addToWaitlist(email) {
  if (!email || !isValidEmail(email)) return { success: false, error: 'Invalid email address' };

  const existing = getWaitlist();
  if (existing.includes(email.toLowerCase())) {
    return { success: false, error: 'You\'re already on the list! 🎉' };
  }

  const updated = [...existing, email.toLowerCase()];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return { success: true };
}

export function getWaitlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isOnWaitlist(email) {
  return getWaitlist().includes(email.toLowerCase());
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
