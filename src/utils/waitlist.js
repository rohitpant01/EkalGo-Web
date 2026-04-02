import { supabase } from './supabase';
import emailjs from '@emailjs/browser';

const STORAGE_KEY = 'ekalgo_waitlist';

export async function addToWaitlist(email) {
  if (!email || !isValidEmail(email)) return { success: false, error: 'Invalid email address' };

  const existing = getWaitlist();
  if (existing.includes(email.toLowerCase())) {
    return { success: false, alreadyExists: true, error: 'You\'re already on the list! 🎉' };
  }

  try {
    // 1. Save to Supabase (Primary Persistence)
    const { error: supabaseError } = await supabase
      .from('waitlist')
      .upsert({ email: email.toLowerCase() }, { onConflict: 'email' });

    if (supabaseError) {
      console.warn("Supabase Save Error:", supabaseError.message);
    }

    // 2. EmailJS Notification
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const emailJSPromise = (async () => {
      if (!serviceId || !templateId || !publicKey) return;
      return emailjs.send(serviceId, templateId, { user_email: email }, publicKey);
    })();

    // 3. Formspree Notification
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

    // Execute notifications simultaneously
    await Promise.allSettled([emailJSPromise, formspreePromise]);

    // 4. Local Storage Backup
    const updated = [...existing, email.toLowerCase()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  } catch (error) {
    console.error("Waitlist Error:", error);
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
