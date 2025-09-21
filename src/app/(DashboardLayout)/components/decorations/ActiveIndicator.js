export default function ActiveIndicator() {
  return (
    <svg
      className="absolute left-0 inset-y-0 h-full text-violet-500 sm:hidden"
      viewBox="0 0 32 52"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      role="presentation"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0-13.19c0-2.18-1.76-3.94-3.94-3.94s-3.94 1.76-3.94 
          3.94V8.19c0 5.98-3.94 11.7-3.94 17.68s3.94 11.7 
          3.94 17.68v25.07c0 2.18 1.76 3.94 3.94 3.94s3.94-1.76 
          3.94-3.94V54.74c0-9.84 11.82-19.03 11.82-28.87 
          0-.68-.07-1.35-.19-2-1.69-8.66-11.64-16.22-11.64-25.05V-13.2z"
        fill="currentColor"
      />
    </svg>
  );
}
