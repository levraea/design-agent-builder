
export const getSandpackStyles = (): string => {
  return `/* Tailwind CSS classes and custom styles */
  .bg-primary { background-color: #0f172a; }
  .text-primary-foreground { color: #f8fafc; }
  .hover\\:bg-primary\\/90:hover { background-color: rgba(15, 23, 42, 0.9); }
  .bg-destructive { background-color: #dc2626; }
  .text-destructive-foreground { color: #fef2f2; }
  .hover\\:bg-destructive\\/90:hover { background-color: rgba(220, 38, 38, 0.9); }
  .border-input { border-color: #e2e8f0; }
  .hover\\:bg-accent:hover { background-color: #f1f5f9; }
  .hover\\:text-accent-foreground:hover { color: #0f172a; }
  .bg-secondary { background-color: #f1f5f9; }
  .text-secondary-foreground { color: #0f172a; }
  .hover\\:bg-secondary\\/80:hover { background-color: rgba(241, 245, 249, 0.8); }
  .text-primary { color: #0f172a; }
  .text-muted-foreground { color: #64748b; }
  .ring-offset-background { --tw-ring-offset-color: #ffffff; }
  .focus-visible\\:ring-2:focus-visible { --tw-ring-width: 2px; }
  .focus-visible\\:ring-ring:focus-visible { --tw-ring-color: #0f172a; }
  .focus-visible\\:ring-offset-2:focus-visible { --tw-ring-offset-width: 2px; }
  
  /* Base styles */
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Utility classes */
  .p-1 { padding: 0.25rem; }
  .p-2 { padding: 0.5rem; }
  .p-3 { padding: 0.75rem; }
  .p-4 { padding: 1rem; }
  .p-6 { padding: 1.5rem; }
  .p-8 { padding: 2rem; }
  .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .px-8 { padding-left: 2rem; padding-right: 2rem; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .pt-0 { padding-top: 0; }
  
  .m-1 { margin: 0.25rem; }
  .m-2 { margin: 0.5rem; }
  .m-4 { margin: 1rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-4 { margin-top: 1rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  
  .w-full { width: 100%; }
  .h-10 { height: 2.5rem; }
  .h-9 { height: 2.25rem; }
  .h-11 { height: 2.75rem; }
  .max-w-2xl { max-width: 42rem; }
  .max-w-4xl { max-width: 56rem; }
  
  .bg-white { background-color: #ffffff; }
  .bg-gray-50 { background-color: #f9fafb; }
  .bg-blue-50 { background-color: #eff6ff; }
  .bg-green-50 { background-color: #f0fdf4; }
  .bg-red-50 { background-color: #fef2f2; }
  .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
  .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
  .from-blue-50 { --tw-gradient-from: #eff6ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 246, 255, 0)); }
  .to-green-50 { --tw-gradient-to: #f0fdf4; }
  .from-blue-500 { --tw-gradient-from: #3b82f6; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(59, 130, 246, 0)); }
  .to-green-500 { --tw-gradient-to: #22c55e; }
  .from-blue-600 { --tw-gradient-from: #2563eb; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0)); }
  .to-green-600 { --tw-gradient-to: #16a34a; }
  .hover\\:from-blue-600:hover { --tw-gradient-from: #2563eb; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0)); }
  .hover\\:to-green-600:hover { --tw-gradient-to: #16a34a; }
  
  .text-white { color: #ffffff; }
  .text-gray-700 { color: #374151; }
  .text-gray-500 { color: #6b7280; }
  .text-red-600 { color: #dc2626; }
  .text-red-800 { color: #991b1b; }
  .text-sm { font-size: 0.875rem; }
  .text-base { font-size: 1rem; }
  .text-lg { font-size: 1.125rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }
  .font-medium { font-weight: 500; }
  .font-semibold { font-weight: 600; }
  .font-bold { font-weight: 700; }
  .leading-none { line-height: 1; }
  .tracking-tight { letter-spacing: -0.025em; }
  .text-center { text-align: center; }
  
  .border { border-width: 1px; }
  .border-gray-200 { border-color: #e5e7eb; }
  .border-red-200 { border-color: #fecaca; }
  .rounded-md { border-radius: 0.375rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .rounded-t-lg { border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; }
  .rounded-full { border-radius: 9999px; }
  
  .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
  .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
  
  .flex { display: flex; }
  .inline-flex { display: inline-flex; }
  .grid { display: grid; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .space-y-1 > * + * { margin-top: 0.25rem; }
  .space-y-4 > * + * { margin-top: 1rem; }
  .space-y-6 > * + * { margin-top: 1.5rem; }
  .gap-4 { gap: 1rem; }
  
  .min-h-screen { min-height: 100vh; }
  .transform { transform: var(--tw-transform); }
  .hover\\:scale-105:hover { --tw-scale-x: 1.05; --tw-scale-y: 1.05; }
  .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
  .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
  .duration-200 { transition-duration: 200ms; }
  
  .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
  .focus\\:ring-2:focus { --tw-ring-width: 2px; }
  .focus\\:ring-blue-500:focus { --tw-ring-color: #3b82f6; }
  .disabled\\:opacity-50:disabled { opacity: 0.5; }
  .disabled\\:pointer-events-none:disabled { pointer-events: none; }
  .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
  
  /* Animation */
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }`;
};
