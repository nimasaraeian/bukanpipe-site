const OPEN_STATE_KEY = "bukan-assistant-open";

export function readAssistantOpenPreference(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return sessionStorage.getItem(OPEN_STATE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeAssistantOpenPreference(open: boolean): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    if (open) {
      sessionStorage.setItem(OPEN_STATE_KEY, "1");
    } else {
      sessionStorage.removeItem(OPEN_STATE_KEY);
    }
  } catch {
    // sessionStorage unavailable — ignore
  }
}
