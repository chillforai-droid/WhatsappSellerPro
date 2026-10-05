CLOUDFLARE FIXED V2

Use this version for the current blank-page issue.

For Cloudflare Pages + GitHub:
- Keep index.html and app.js in the repository root.
- Build command: leave empty / none.
- Build output directory: .
- Redeploy after replacing both files.

For Cloudflare Worker:
- Paste worker.js into Edit code and Deploy.
- Open only the root workers.dev URL.

This V2 waits for DOMContentLoaded and catches startup errors instead of silently
showing a blank page. The functions used by the HTML onclick handlers are
explicitly exposed on window.

If a browser-specific error still occurs, the page will display the exact error.
