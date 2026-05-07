const inputClasses =
  "rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-slate-950 shadow-none outline-none transition focus:border-[#004D40]/40 focus:ring-4 focus:ring-[#004D40]/10 dark:border-white/10 dark:bg-white/10 dark:text-white"

export const duitClerkAppearance = {
  variables: {
    colorPrimary: "#004D40",
    colorText: "#0F172A",
    colorTextSecondary: "#475569",
    colorBackground: "transparent",
    colorInputBackground: "rgba(255,255,255,0.78)",
    colorInputText: "#0F172A",
    colorDanger: "#B42318",
    colorSuccess: "#004D40",
    borderRadius: "20px",
    fontFamily: "Manrope, Inter, system-ui, sans-serif",
    spacingUnit: "0.95rem",
  },
  elements: {
    rootBox: "duit-clerk-root w-full",
    cardBox:
      "duit-clerk-card-box w-full rounded-none border-0 bg-transparent p-0 shadow-none",
    card: "duit-clerk-card w-full bg-transparent p-0 shadow-none",
    header: "duit-clerk-header hidden",
    headerTitle: "duit-clerk-header-title text-slate-950 dark:text-white",
    headerSubtitle: "duit-clerk-header-subtitle text-slate-600 dark:text-slate-300",
    main: "duit-clerk-main gap-5",
    form: "duit-clerk-form gap-4",
    formField: "duit-clerk-form-field gap-2",
    formFieldLabel:
      "duit-clerk-form-label mb-2 block text-sm font-semibold text-slate-900 dark:text-white",
    formFieldInput: `duit-clerk-form-input ${inputClasses}`,
    formFieldInputShowPasswordButton:
      "duit-clerk-password-button text-slate-500 hover:text-[#004D40]",
    formButtonPrimary:
      "duit-clerk-primary-button h-12 rounded-xl bg-[#004D40] px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,77,64,0.18)] transition hover:bg-[#003A30] focus:ring-4 focus:ring-[#004D40]/15",
    socialButtons: "duit-clerk-social-buttons gap-3",
    socialButtonsBlockButton:
      "duit-clerk-social-button h-12 rounded-xl border border-black/10 bg-white/75 text-sm font-semibold text-slate-950 shadow-none transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
    socialButtonsBlockButtonText: "duit-clerk-social-text text-sm font-semibold",
    dividerLine: "duit-clerk-divider-line bg-black/10 dark:bg-white/10",
    dividerText: "duit-clerk-divider-text text-xs font-semibold text-slate-500",
    footer: "duit-clerk-footer mt-4",
    footerAction: "duit-clerk-footer-action text-sm text-slate-600 dark:text-slate-300",
    footerActionText: "duit-clerk-footer-action-text",
    footerActionLink:
      "duit-clerk-footer-action-link font-semibold text-[#004D40] hover:text-[#003A30]",
    identityPreview:
      "duit-clerk-identity-preview rounded-xl border border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/10",
    formFieldErrorText: "duit-clerk-error mt-2 text-sm font-medium text-red-700",
    alert: "duit-clerk-alert rounded-xl border border-red-200 bg-red-50 text-red-800",
    alertText: "duit-clerk-alert-text text-sm",
    otpCodeFieldInput:
      "duit-clerk-otp-input rounded-xl border border-black/10 bg-white/80 text-slate-950 dark:border-white/10 dark:bg-white/10 dark:text-white",
    userButtonAvatarBox:
      "duit-clerk-user-avatar h-9 w-9 ring-2 ring-money-green/10",
    userButtonPopoverCard:
      "duit-clerk-user-popover rounded-2xl border border-black/10 bg-white/90 shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-950/90",
    userButtonPopoverActionButton:
      "duit-clerk-user-action rounded-xl text-slate-700 hover:bg-[#004D40]/10 hover:text-[#004D40] dark:text-slate-200",
  },
}
