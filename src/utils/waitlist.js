import emailjs from '@emailjs/browser';

const STORAGE_KEY = 'ekalgo_waitlist';

export async function addToWaitlist(email) {
  if (!email || !isValidEmail(email)) return { success: false, error: 'Invalid email address' };

  const existing = getWaitlist();
  if (existing.includes(email.toLowerCase())) {
    return { success: false, alreadyExists: true, error: 'You\'re already on the list! 🎉' };
  }

  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn("EmailJS environment variables are missing! Notification will not send.");
    }

    const emailJSPromise = (async () => {
      if (!serviceId || !templateId || !publicKey) return;
      return emailjs.send(serviceId, templateId, { user_email: email }, publicKey);
    })();

    const formspreePromise = fetch('https://formspree.io/f/xvzvqgjl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        email: email, 
        _subject: 'New Waitlist Signup on EkalGo Web!' 
      })
    });

    // Execute both storage/notification methods simultaneously
    await Promise.allSettled([emailJSPromise, formspreePromise]);

    const updated = [...existing, email.toLowerCase()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  } catch (error) {
    console.error("EmailJS Error:", error);
    return { success: false, error: 'Failed to join waitlist. Please try again.' };
  }
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
