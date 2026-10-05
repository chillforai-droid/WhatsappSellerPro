TOOLNEST — WhatsApp Seller Studio PRO
CLOUDFLARE FIXED PACKAGE

इस version में HTML और app JavaScript अलग serve होते हैं। इससे पहले वाला
source-code दिखने वाला deployment issue avoid होता है।

FILES
- index.html = main webpage
- app.js = complete app JavaScript
- worker.js = Cloudflare Worker; इसमें दोनों files embedded हैं
- README_CLOUDFLARE_FIXED.txt = setup guide

RECOMMENDED: CLOUDFLARE WORKER
1. Cloudflare Dashboard → Workers & Pages → अपना Worker खोलें।
2. Edit Code / Code editor में पुराने code को पूरा हटाएँ।
3. worker.js का पूरा code paste करें।
4. Save and Deploy करें।
5. केवल अपना root workers.dev URL खोलें।

उदाहरण:
https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/

ध्यान दें:
- /app.js खोलने पर JavaScript text दिखना normal है।
- Customer को root URL दें, /app.js नहीं।
- अगर root URL पर source code दिखे, तो Worker के बजाय static index.html serve हो रहा है।

STATIC HOSTING / CLOUDFLARE PAGES
index.html और app.js को एक ही folder में रखें:
  /index.html
  /app.js

index.html पहले से:
  <script src="/app.js" defer></script>
का उपयोग करता है।

TEST
Root URL पर ToolNest / WhatsApp Seller Studio PRO का UI दिखना चाहिए।
