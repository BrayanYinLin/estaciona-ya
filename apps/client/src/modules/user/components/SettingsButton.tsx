export function SettingsButton() {
  return (
    <button
      type="button"
      className="btn btn-outline btn-sm gap-2 text-base-content/70"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="opacity-80"
      >
        <path
          d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M19 12a7 7 0 01-.1 1.2l2 1.6-2 3.4-2.4-1a7.1 7.1 0 01-2 .9l-.4 2.6H9.9l-.4-2.6a7.1 7.1 0 01-2-.9l-2.4 1-2-3.4 2-1.6A7 7 0 015 12a7 7 0 01.1-1.2l-2-1.6 2-3.4 2.4 1a7.1 7.1 0 012-.9l.4-2.6h4.2l.4 2.6a7.1 7.1 0 012 .9l2.4-1 2 3.4-2 1.6c.1.4.1.8.1 1.2z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <span>Settings</span>
    </button>
  )
}
