// Kill switch for every mail-related feature (contact section, nav/footer
// CTAs and the /api/contact route). Defaults to disabled; set USE_MAIL=true
// in the environment once SMTP is configured to turn it back on.
export function isMailEnabled(): boolean {
  return process.env.USE_MAIL === "true";
}
