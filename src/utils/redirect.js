const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL || null;
const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL || null;
const APK_URL = "https://drive.google.com/uc?export=download&id=1s_o4OsQyDHOcmMB1cK7YHlQHFnGbYvXY";

export function redirectToPlayStore() {
  if (PLAY_STORE_URL && PLAY_STORE_URL !== 'https://play.google.com/store/apps/details?id=com.ekalgo.app') {
    window.open(PLAY_STORE_URL, '_blank');
    return true;
  }
  return false; // triggers "Coming Soon" in UI
}

export function redirectToAPK() {
  window.open(APK_URL, '_self');
  return true;
}

export function redirectToAppStore() {
  if (APP_STORE_URL && APP_STORE_URL !== 'https://apps.apple.com/app/ekalgo/id000000000') {
    window.open(APP_STORE_URL, '_blank');
    return true;
  }
  return false;
}

export function isAndroid() {
  return typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
}

export function isIOS() {
  return typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function redirectToApp() {
  if (isAndroid()) return redirectToAPK();
  if (isIOS()) return redirectToAppStore();
  return redirectToAPK();
}
