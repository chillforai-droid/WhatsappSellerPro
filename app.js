const DEFAULT_MESSAGES = [
"नमस्ते 🙏 हमारी नई collection अभी आई है। क्या मैं आपको latest designs और prices भेज दूँ?",
"🔥 NEW ARRIVAL 🔥 आज हमारी नई collection आ गई है। Photos और prices के लिए message करें।",
"✨ Fresh Stock Alert! नए designs अब available हैं।",
"🏷️ Special price today. Offer खत्म होने से पहले availability पूछ लें।",
"⚠️ Limited Stock! इस design के कुछ ही pieces बाकी हैं।",
"🚨 Going Fast! आपका पसंदीदा size जल्दी खत्म हो सकता है।",
"❤️ आपका feedback हमारे लिए बहुत जरूरी है। Product पसंद आया हो तो छोटा सा review भेजें।",
"📖 Latest Catalogue चाहिए? 'CATALOGUE' reply करें।",
"🛒 Order करने के लिए Product + Size + Quantity भेजें।",
"नमस्ते 😊 आपने हमारी collection के बारे में पूछा था। क्या मैं available designs भेज दूँ?",
"आपके पसंद किए product की availability check कर दूँ?",
"अगर आप चाहें तो मैं आपकी budget range में 3 options भेज सकता हूँ।",
"🎉 Festival Collection अब available है। Latest designs के लिए message करें।",
"आपका order करने के लिए बहुत-बहुत धन्यवाद ❤️",
"आपका भरोसा हमारे लिए बहुत खास है। धन्यवाद 🙏"
];
let messages=[]; for(let i=0;i<100;i++){let m=DEFAULT_MESSAGES[i%DEFAULT_MESSAGES.length]; messages.push(i>=DEFAULT_MESSAGES.length?m+"\\n\\nDetails के लिए “"+["CATALOGUE","PRICE","SIZE","ORDER","NEW"][i%5]+"” reply करें।":m)}
const styles=[
{name:"Minimal",bg:"#f4efe7",text:"#111827",accent:"#111827"},
{name:"Elegant",bg:"#efe7df",text:"#30251f",accent:"#7c2d12"},
{name:"Bold",bg:"#111827",text:"#ffffff",accent:"#047857"},
{name:"Soft",bg:"#f3f4f6",text:"#111827",accent:"#7c3aed"},
{name:"Festive",bg:"#fff7ed",text:"#431407",accent:"#ea580c"},
{name:"Fresh",bg:"#ecfdf5",text:"#064e3b",accent:"#059669"}
];
let state;try{state=JSON.parse(localStorage.getItem("seller_pro_state")||"null")}catch(e){state=null}state=state&&typeof state==="object"?state:null;state=state||{
brand:{shopName:"",tagline:"",wa:"",city:"",logo:"",cta:"WHATSAPP TO ORDER",primary:"#111827",accent:"#047857"},
products:[],customMessages:[]
};
state.brand=Object.assign({shopName:"",tagline:"",wa:"",city:"",logo:"",cta:"WHATSAPP TO ORDER",primary:"#111827",accent:"#047857"},state.brand||{});
state.products=Array.isArray(state.products)?state.products:[];state.customMessages=Array.isArray(state.customMessages)?state.customMessages:[];
let currentSVG="", currentOrder="";window._pendingImage="";window._editingProductId=null;

document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.getElementById(b.dataset.tab).classList.add("active");});
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]))}
function xml(s){return esc(s)}
function saveAll(){state.brand={shopName:val("shopName"),tagline:val("tagline"),wa:val("wa").replace(/\D/g,""),city:val("city"),logo:val("logo"),cta:val("cta")||"WHATSAPP TO ORDER",primary:val("primary"),accent:val("accent")};saveState();syncBrand();showToast("Saved ✓")}
function previewLocalImage(e){let f=e.target.files?.[0];if(!f)return;if(!f.type.startsWith("image/"))return alert("Please choose an image file.");if(f.size>2.5*1024*1024)return alert("Please choose an image under 2.5 MB.");let r=new FileReader();r.onload=()=>{window._pendingImage=r.result;document.getElementById("imageName").textContent=f.name+" • ready"};r.onerror=()=>alert("Image could not be read. Please try another image.");r.readAsDataURL(f)}
function openGuide(){document.getElementById("guideModal").classList.add("show")}
function closeGuide(){document.getElementById("guideModal").classList.remove("show")}
function showQuickStart(){alert("Quick Start:\\n1. Brand → details save करें\\n2. Products → product + photo add करें\\n3. Templates → status generate करें\\n4. Catalogue → share करें\\n5. Tools → WhatsApp order link बनाएं\\n6. Backup → data सुरक्षित रखें")}
function syncBrand(){for(const [k,v] of Object.entries(state.brand)){let e=document.getElementById(k);if(e)e.value=v}document.getElementById("dashName").textContent=state.brand.shopName||"Your Shop";document.getElementById("dashTag").textContent=state.brand.tagline||"Set up your brand and start adding products.";document.getElementById("countProducts").textContent=state.products.length;populateProductSelects();renderProducts();renderMessages();renderCatalogue();document.getElementById("tplCta").value=state.brand.cta}
function val(id){return document.getElementById(id).value}
function resetBrand(){state.brand={shopName:"",tagline:"",wa:"",city:"",logo:"",cta:"WHATSAPP TO ORDER",primary:"#111827",accent:"#047857"};saveState();syncBrand()}
function saveState(){try{localStorage.setItem("seller_pro_state",JSON.stringify(state));return true}catch(e){alert("Storage is full. Please export a backup and remove some large product photos.");return false}}
function updateProductFormMode(){let b=document.querySelector('#products .btn.success');if(b)b.textContent=window._editingProductId?"Update Product":"Add Product"}
function clearProductForm(){["pn","pp","pc","pca","ps","pcol","pd"].forEach(x=>document.getElementById(x).value="");let f=document.getElementById("pi");if(f)f.value="";let n=document.getElementById("imageName");if(n)n.textContent="No photo selected";window._pendingImage="";window._editingProductId=null;updateProductFormMode()}
function addProduct(){let p={id:window._editingProductId||Date.now(),name:val("pn").trim(),price:val("pp"),compare:val("pc"),category:val("pca"),sizes:val("ps"),colors:val("pcol"),image:window._pendingImage||"",desc:val("pd")};if(!p.name)return alert("Product name डालें");if(window._editingProductId){let i=state.products.findIndex(x=>String(x.id)===String(window._editingProductId));if(i>=0)state.products[i]=p}else state.products.push(p);saveState();clearProductForm();syncBrand()}
function removeProduct(id){state.products=state.products.filter(p=>p.id!==id);saveState();syncBrand()}
function editProduct(id){let p=state.products.find(x=>String(x.id)===String(id));if(!p)return;window._editingProductId=p.id;document.getElementById("pn").value=p.name||"";document.getElementById("pp").value=p.price||"";document.getElementById("pc").value=p.compare||"";document.getElementById("pca").value=p.category||"";document.getElementById("ps").value=p.sizes||"";document.getElementById("pcol").value=p.colors||"";document.getElementById("pd").value=p.desc||"";window._pendingImage=p.image||"";document.getElementById("imageName").textContent=p.image?"Existing photo kept":"No photo selected";document.querySelector('[data-tab="products"]').click();document.getElementById("pn").focus();updateProductFormMode()}
function renderProducts(){let q=(val("productSearch")||"").toLowerCase(), arr=state.products.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q));document.getElementById("productList").innerHTML=arr.map(p=>`<div class="item"><div class="itemline"><div><b>${esc(p.name)}</b><div class="muted">${esc(p.category)} • ₹${esc(p.price)} • ${esc(p.sizes)}</div></div><div class="actions"><button class="btn alt" onclick="editProduct(${p.id})">Edit</button><button class="btn danger" onclick="removeProduct(${p.id})">Delete</button></div></div></div>`).join("")||'<div class="notice">No products yet.</div>'}
function populateProductSelects(){let opts=state.products.map(p=>`<option value="${p.id}">${esc(p.name)} — ₹${esc(p.price)}</option>`).join("")||'<option value="">Add product first</option>';["tplProduct","orderProduct"].forEach(id=>{let e=document.getElementById(id);if(e)e.innerHTML=opts});document.getElementById("tplStyle").innerHTML=styles.map((s,i)=>`<option value="${i}">${s.name}</option>`).join("")}
function makeTemplate(){let style=styles[+val("tplStyle")||0],p=state.products.find(x=>String(x.id)===String(val("tplProduct")))||{},headline=val("tplHeadline")||"NEW ARRIVAL",sub=val("tplSub"),cta=val("tplCta")||state.brand.cta;let photo=p.image?`<img src="${esc(p.image)}">`:`<span>ADD PRODUCT PHOTO</span>`;document.getElementById("templatePreview").innerHTML=`<div class="status-card"><div class="status-preview" style="--status-bg:${style.bg};--status-text:${style.text};--status-accent:${state.brand.accent}"><div class="s-shop">${esc(state.brand.shopName||"YOUR SHOP NAME")}</div><div class="s-city">${esc(state.brand.city||"YOUR CITY")}</div><div class="photo">${photo}</div><div class="s-head">${esc(headline)}</div><div class="s-product">${esc(p.name||"PRODUCT NAME")} • ₹${esc(p.price||"___")}</div><div class="s-extra">${esc(sub)}</div><div class="s-cta">${esc(cta)}</div></div><div class="actions"><button class="btn" onclick="downloadSVG()">Download SVG</button><button class="btn alt" onclick="downloadPNG()">Download PNG</button></div></div>`;currentSVG=svgFor(style,p,headline,sub,cta)}
function svgFor(style,p,headline,sub,cta){let photo=p.image&&String(p.image).startsWith("data:image/")?`<image href="${xml(p.image)}" x="120" y="350" width="840" height="820" preserveAspectRatio="xMidYMid slice"/>`:`<rect x="120" y="350" width="840" height="820" rx="35" fill="#ddd"/><text x="540" y="770" text-anchor="middle" font-family="Arial" font-size="38" fill="#777">ADD PRODUCT PHOTO</text>`;return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920"><rect width="1080" height="1920" fill="${style.bg}"/><rect x="55" y="55" width="970" height="1810" rx="42" fill="${style.bg}" stroke="${style.text}" stroke-width="5"/>${state.brand.logo&&String(state.brand.logo).startsWith("data:image/")?`<image href="${xml(state.brand.logo)}" x="470" y="75" width="140" height="90" preserveAspectRatio="xMidYMid meet"/>`:""}<text x="540" y="185" text-anchor="middle" font-family="Arial" font-size="50" font-weight="700" fill="${style.text}">${xml(state.brand.shopName||"YOUR SHOP NAME")}</text><text x="540" y="240" text-anchor="middle" font-family="Arial" font-size="25" fill="${style.text}">${xml(state.brand.city||"YOUR CITY")}</text>${photo}<text x="540" y="1320" text-anchor="middle" font-family="Arial" font-size="62" font-weight="700" fill="${style.text}">${xml(headline)}</text><text x="540" y="1390" text-anchor="middle" font-family="Arial" font-size="32" fill="${style.text}">${xml(p.name||"PRODUCT NAME")} • ₹${xml(p.price||"___")}</text><text x="540" y="1450" text-anchor="middle" font-family="Arial" font-size="27" fill="${style.text}">${xml(sub)}</text><rect x="260" y="1540" width="560" height="100" rx="50" fill="${state.brand.accent}"/><text x="540" y="1605" text-anchor="middle" font-family="Arial" font-size="32" font-weight="700" fill="#fff">${xml(cta)}</text><text x="540" y="1710" text-anchor="middle" font-family="Arial" font-size="28" fill="${style.text}">📲 ${xml(state.brand.wa||"91XXXXXXXXXX")}</text></svg>`}
function downloadBlob(content,type,filename){try{let url=URL.createObjectURL(content instanceof Blob ? content : new Blob([content],{type}));let a=document.createElement("a");a.href=url;a.download=filename;a.rel="noopener";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return true}catch(e){alert("Download failed. Please try again.");return false}}
function downloadSVG(){if(!currentSVG)makeTemplate();if(currentSVG)downloadBlob(currentSVG,"image/svg+xml","seller-status.svg")}
function printStatus(){window.print()}
function renderMessages(){let q=(val("msgSearch")||"").toLowerCase(), arr=[...messages,...state.customMessages];arr=arr.map((m,i)=>({m,i})).filter(x=>x.m.toLowerCase().includes(q)).slice(0,100);document.getElementById("messageList").innerHTML=arr.map((x)=>`<div class="item"><div>${esc(x.m)}</div><div class="actions"><button class="btn alt" onclick='copyText(${JSON.stringify(x.m)})'>Copy</button></div></div>`).join("")}
function openMessageAdd(){openModal("Add custom message",`<label>Message</label><textarea id="customMsg" rows="6"></textarea><div class="actions"><button class="btn success" onclick="addMessage()">Add Message</button></div>`)}
function addMessage(){let m=val("customMsg").trim();if(m){state.customMessages.push(m);saveState();closeModal();renderMessages()}}
async function copyText(t){t=String(t??"");if(!t)return false;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(t);showToast("Copied ✓");return true}}catch(e){}try{let ta=document.createElement("textarea");ta.value=t;ta.setAttribute("readonly","");ta.style.position="fixed";ta.style.opacity="0";ta.style.left="-9999px";document.body.appendChild(ta);ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);let ok=document.execCommand("copy");ta.remove();if(ok){showToast("Copied ✓");return true}}catch(e){}showToast("Copy failed — text is ready to select manually");return false}
function showToast(message){let old=document.getElementById("sellerToast");if(old)old.remove();let el=document.createElement("div");el.id="sellerToast";el.textContent=message;el.style.cssText="position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;background:#111827;color:#fff;padding:11px 16px;border-radius:999px;font-weight:800;box-shadow:0 8px 30px #0003";document.body.appendChild(el);setTimeout(()=>el.remove(),1800)}
function renderCatalogue(){document.getElementById("cataloguePreview").innerHTML=state.products.map(p=>`<div class="prod"><div class="prodphoto">${p.image?`<img src="${esc(p.image)}">`:"PRODUCT PHOTO"}</div><h3>${esc(p.name)}</h3><div class="price">₹${esc(p.price)}</div><div class="muted">${esc(p.sizes)} • ${esc(p.colors)}</div><button class="btn" style="width:100%;margin-top:8px" onclick="selectOrder(${p.id})">WhatsApp Order</button></div>`).join("")||'<div class="notice">Add products to see catalogue.</div>'}
function selectOrder(id){document.getElementById("orderProduct").value=id;document.querySelector('[data-tab="tools"]').click();generateOrder()}
function generateOrder(){let p=state.products.find(x=>String(x.id)===String(val("orderProduct")));if(!p)return alert("Product add करें");let msg=val("orderMessage")+"\nProduct: "+p.name+"\nPrice: ₹"+p.price+"\nSize: "+p.sizes+"\nColor: "+p.colors;currentOrder=state.brand.wa?"https://wa.me/"+state.brand.wa+"?text="+encodeURIComponent(msg):"";document.getElementById("orderLink").textContent=currentOrder||"Brand में WhatsApp number save करें."}
async function copyOrder(){generateOrder();if(currentOrder)await copyText(currentOrder)}
function calc(){let b=+val("buy")||0,s=+val("sell")||0,c=+val("cost")||0;document.getElementById("profit").textContent="Profit: ₹"+(s-b-c)+" • Margin: "+(s?(((s-b-c)/s)*100).toFixed(1):0)+"%"}
["buy","sell","cost"].forEach(id=>document.getElementById(id).addEventListener("input",calc))
function catalogueHTML(){let cards=state.products.map(p=>`<article class="card"><div class="photo">${p.image?`<img src="${esc(p.image)}" style="width:100%;height:100%;object-fit:cover">`:"PRODUCT PHOTO"}</div><h2>${esc(p.name)}</h2><b>₹${esc(p.price)}</b><p>${esc(p.sizes)} • ${esc(p.colors)}</p><a href="https://wa.me/${state.brand.wa}?text=${encodeURIComponent("Hi, I want "+p.name+" - ₹"+p.price)}">ORDER ON WHATSAPP</a></article>`).join("");return `<!doctype html><html><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(state.brand.shopName)}</title><style>body{font-family:Arial;margin:0;background:#f5f5f5;padding:16px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.card{background:#fff;padding:10px;border-radius:15px}.photo{aspect-ratio:1;background:#eee;border-radius:10px;display:grid;place-items:center}.photo img{border-radius:10px}a{display:block;background:${state.brand.accent};color:#fff;text-decoration:none;text-align:center;padding:11px;border-radius:10px;margin-top:9px}@media(max-width:520px){.grid{grid-template-columns:1fr}}</style><h1>${esc(state.brand.shopName||"Your Shop")}</h1><p>${esc(state.brand.tagline)}</p><div class="grid">${cards}</div></html>`}
function openCatalogue(){let w=window.open("about:blank","_blank");if(!w){alert("Browser ने new tab block किया है. Download HTML इस्तेमाल करें.");return}w.document.open();w.document.write(catalogueHTML());w.document.close()}
function downloadCatalogue(){downloadBlob(catalogueHTML(),"text/html","my-catalogue.html")}
function exportBackup(){downloadBlob(JSON.stringify(state,null,2),"application/json","seller-studio-backup.json")}
function importBackup(e){let f=e.target.files?.[0];if(!f)return;let r=new FileReader();r.onload=()=>{try{let incoming=JSON.parse(r.result);if(!incoming||typeof incoming!=="object"||!Array.isArray(incoming.products)||!incoming.brand)throw new Error("Invalid structure");state={brand:Object.assign({shopName:"",tagline:"",wa:"",city:"",logo:"",cta:"WHATSAPP TO ORDER",primary:"#111827",accent:"#047857"},incoming.brand),products:incoming.products.filter(p=>p&&p.name),customMessages:Array.isArray(incoming.customMessages)?incoming.customMessages.filter(Boolean):[]};window._pendingImage="";window._editingProductId=null;currentSVG="";currentOrder="";saveState();syncBrand();clearProductForm();showToast("Backup restored ✓")}catch(err){alert("Invalid backup file. Please select a Seller Studio backup JSON.")}e.target.value=""};r.onerror=()=>{alert("Backup file could not be read.");e.target.value=""};r.readAsText(f)}
function openModal(title,body){document.getElementById("modalTitle").textContent=title;document.getElementById("modalBody").innerHTML=body;document.getElementById("modal").classList.add("show")}
function closeModal(){document.getElementById("modal").classList.remove("show")}
function saveState(){try{localStorage.setItem("seller_pro_state",JSON.stringify(state));return true}catch(e){alert("Storage is full. Please export a backup and remove some large product photos.");return false}}
syncBrand();updateProductFormMode();calc();renderMessages();renderCatalogue();try{if(!localStorage.getItem("seller_welcome_seen")&&!state.products.length)document.getElementById("welcome").style.display="flex"}catch(e){}

function closeWelcome(){let w=document.getElementById("welcome");if(w)w.style.display="none";try{localStorage.setItem("seller_welcome_seen","1")}catch(e){}}
function previewLogo(e){
  let f=e.target.files?.[0]; if(!f)return;
  if(!f.type.startsWith("image/"))return alert("Please choose an image file.");
  if(f.size>1.5*1024*1024)return alert("Please choose a logo under 1.5 MB.");
  let r=new FileReader();
  r.onload=()=>{state.brand.logo=r.result;document.getElementById("logo").value="";document.getElementById("logoName").textContent=f.name+" • ready";saveState();syncBrand();};
  r.onerror=()=>alert("Logo could not be read.");
  r.readAsDataURL(f);
}
function demoPhoto(label){
  let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900"><rect width="900" height="900 rx="60" fill="#f3f4f6"/><circle cx="450" cy="330" r="190" fill="#e5e7eb"/><path d="M190 760 Q450 430 710 760" fill="#d1d5db"/><text x="450" y="840" text-anchor="middle" font-family="Arial" font-size="44" font-weight="700" fill="#374151">${xml(label)}</text></svg>`;
  return "data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(svg)));
}
function loadDemoStore(){
  if(state.products.length && !confirm("Current products मौजूद हैं. Demo Store load करने से current data replace होगा. Continue?"))return;
  state={brand:{shopName:"StyleNest Fashion",tagline:"Everyday fashion, simple ordering",wa:"919876543210",city:"Dhanbad",logo:"",cta:"ORDER ON WHATSAPP",primary:"#111827",accent:"#7c3aed"},products:[
    {id:101,name:"Classic Kurti",price:"799",compare:"999",category:"Kurti",sizes:"M / L / XL / XXL",colors:"Pink, Black, Blue",image:demoPhoto("KURTI"),desc:"Comfortable daily-wear kurti."},
    {id:102,name:"Festive Saree",price:"1299",compare:"1599",category:"Saree",sizes:"Free Size",colors:"Red, Green",image:demoPhoto("SAREE"),desc:"Festive look with a lightweight feel."},
    {id:103,name:"Casual Shirt",price:"699",compare:"899",category:"Shirt",sizes:"M / L / XL",colors:"White, Navy",image:demoPhoto("SHIRT"),desc:"Clean casual style for daily wear."}
  ],customMessages:[]};
  currentSVG="";currentOrder="";window._pendingImage="";window._editingProductId=null;
  saveState();syncBrand();clearProductForm();renderProducts();renderCatalogue();renderMessages();populateTemplateControls();showToast("Demo Store loaded ✓");
  document.querySelector('[data-tab="dashboard"]').click();
}
function factoryReset(){
  if(!confirm("Factory Reset सभी local shop data हटा देगा. पहले Backup लेना बेहतर है. Continue?"))return;
  state={brand:{shopName:"",tagline:"",wa:"",city:"",logo:"",cta:"WHATSAPP TO ORDER",primary:"#111827",accent:"#047857"},products:[],customMessages:[]};
  currentSVG="";currentOrder="";window._pendingImage="";window._editingProductId=null;
  saveState();syncBrand();clearProductForm();renderProducts();renderCatalogue();renderMessages();populateTemplateControls();showToast("Reset complete ✓");
}
function downloadPNG(){
  if(!currentSVG)makeTemplate();
  if(!currentSVG)return;
  let blob=new Blob([currentSVG],{type:"image/svg+xml;charset=utf-8"}),url=URL.createObjectURL(blob),img=new Image();
  img.onload=()=>{
    let c=document.createElement("canvas");c.width=1080;c.height=1920;
    let ctx=c.getContext("2d");ctx.drawImage(img,0,0);URL.revokeObjectURL(url);
    c.toBlob(b=>{if(b)downloadBlob(b,"image/png","seller-status.png");else alert("PNG export failed.");},"image/png");
  };
  img.onerror=()=>{URL.revokeObjectURL(url);alert("PNG export failed. Try SVG export instead.");};
  img.src=url;
}
