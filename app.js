const STORAGE_KEY = "webLibraryAkiraRen_v1";
const LOCAL_IMAGE_FALLBACK = "imagen-respaldo-biblioteca.png";

const defaultData = {
  links: [
    {id:"demo1", title:"YouTube", description:"Ejemplo de página guardada en la biblioteca.", platform:"YouTube", category:"Películas y Series", url:"https://www.youtube.com/", image:"", tags:["video"], favorite:false, createdAt:Date.now()-120000, lastOpened:Date.now()-120000},
    {id:"demo2", title:"ChatGPT", description:"Ejemplo de herramienta de IA.", platform:"Otros", category:"Imperio", url:"https://chatgpt.com/", image:"", tags:["IA"], favorite:true, createdAt:Date.now()-720000, lastOpened:Date.now()-720000},
    {id:"demo3", title:"GitHub", description:"Repositorios y proyectos de programación.", platform:"GitHub", category:"Historia", url:"https://github.com/", image:"", tags:["codigo"], favorite:false, createdAt:Date.now()-3600000, lastOpened:Date.now()-3600000}
  ],
  images: [],
  music: {
    intro: "Tu biblioteca musical guardada directamente desde el dispositivo.",
    collections: [{id:"music-akira",name:"Akira Ren OST",icon:"♫",description:"Música y bandas sonoras de Akira Ren."}],
    items: []
  },
  imageCollections: [
    {id:"akira-ren", name:"Akira Ren", icon:"👤", description:"Imágenes exclusivas de Akira Ren."},
    {id:"sofia", name:"Sofía", icon:"👤", description:"Imágenes exclusivas de Sofía."}
  ],
  customCategories: [],
  history: {
    intro: "Esta es la historia de Akira Ren: su origen, evolución, capítulos, sagas, temporadas y cada etapa que construye su legado.",
    menus: [
      {id:"hist-root-sagas", name:"Sagas", type:"Saga", icon:"📚", description:"Sagas principales de la historia."},
      {id:"hist-root-temporadas", name:"Temporadas", type:"Temporada", icon:"🎬", description:"Temporadas y grandes etapas."}
    ],
    items: []
  },
  empire: {
    intro: "Un sistema extraordinario convirtió a Akira Ren en una figura poderosa y millonaria, permitiéndole construir un imperio de empresas, hoteles, islas y propiedades.",
    items: []
  },
  empireMeta: { edits: {}, deleted: [] },
  papeleria: [],
  profile: {
    name: "Akira Ren",
    subtitle: "Guardián Nocturno · Soberano de tu mundo digital 👑",
    biography: "Akira Ren es la identidad central de WEB LIBRARY: un personaje construido alrededor del conocimiento, la estrategia, la tecnología y una evolución sin límite. Esta ficha reúne su historia, atributos, poderes, habilidades, características, equipo, relaciones y cualquier nuevo dato que quieras agregar.\n\nLa biblioteca funciona como un archivo vivo del personaje: puedes editar cada apartado, sustituir su imagen, agregar fotografías y ampliar la información indefinidamente.",
    title: "Guardián Nocturno",
    titleDescription: "El conocimiento es la llave que abre todos los mundos.",
    libraryDescription: "Perfil digital y archivo personal de Akira Ren.",
    characterImage: "Akira Ren - Ficha del Personaje.png",
    identity: { level:"47", className:"Asesino / Estratega", age:"19", species:"Humano / Evolución desconocida", alignment:"Guardián independiente" },
    stats: [
      {name:"Fuerza",value:85},{name:"Velocidad",value:92},{name:"Inteligencia",value:97},{name:"Resistencia",value:90},
      {name:"Percepción",value:94},{name:"Energía",value:96},{name:"Serenidad",value:78},{name:"Suerte",value:88}
    ],
    powers: ["Dominio de las sombras","Percepción nocturna","Estrategia avanzada","Adaptación y evolución","Control de energía","Regeneración y resistencia","Desarrollo de habilidades sin límite"],
    skills: ["Paso Nocturno","Análisis táctico","Combate estratégico","Infiltración","Concentración absoluta","Lectura del entorno","Aprendizaje acelerado"],
    characteristics: ["Tranquilo","Observador","Estratégico","Resiliente","Independiente","Protector","Ambicioso","En constante evolución"],
    life: ["Infancia y origen","Despertar de habilidades","Entrenamiento","Primeras misiones","Construcción de su legado","Etapa actual: evolución continua"],
    equipment: ["Armadura nocturna","Anillo de las Sombras","Armas estratégicas","Dispositivos tecnológicos","Sistema de información"],
    achievements: ["Superar sus propios límites","Dominar múltiples habilidades","Construir un archivo de conocimiento","Convertir la información en poder","Mantener una evolución constante"],
    relationships: [],
    customSections: [],
    photos: []
  }
};

let data = loadData();
let currentView = "home";
let currentCategory = null;
let pendingLinkImage = "";
let pendingGalleryImage = "";
let pendingProfilePhoto = "";
let currentImageCollectionId = null;
let currentHistoryMenuId = null;
let currentHistoryTrashView = false;
let pendingHistoryImage = "";
let pendingEmpireImage = "";
let pendingMusicFile = "";
let currentMusicCollectionId = null;
let currentPapeleriaView = false;
window.empireRuntimeItems = {};

window.addEventListener("message", (event)=>{
  if(event.data?.type === "AKIRA_EMPIRE_UPDATED" && event.data.empireMeta){
    data.empireMeta = event.data.empireMeta;
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(createStorageSafeData(data))); }catch{}
  }
});

function loadData(){
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if(!saved) return structuredClone(defaultData);
    const parsed=JSON.parse(saved);
    const merged={...structuredClone(defaultData), ...parsed, profile:{...structuredClone(defaultData.profile), ...(parsed.profile||{})}};
    if(!Array.isArray(merged.imageCollections) || !merged.imageCollections.length) merged.imageCollections=structuredClone(defaultData.imageCollections);
    merged.imageCollections=merged.imageCollections.map(c=>({...c,icon:c.icon||"👤"}));
    if(!Array.isArray(merged.images)) merged.images=[];
    merged.music={...structuredClone(defaultData.music),...(parsed.music||{})};
    merged.music.collections=Array.isArray(merged.music.collections)?merged.music.collections:structuredClone(defaultData.music.collections);
    merged.music.items=Array.isArray(merged.music.items)?merged.music.items:[];
    merged.history={...structuredClone(defaultData.history),...(parsed.history||{})};
    merged.history.menus=Array.isArray(merged.history.menus)?merged.history.menus:structuredClone(defaultData.history.menus);
    merged.history.items=Array.isArray(merged.history.items)?merged.history.items:[];
    merged.empire={...structuredClone(defaultData.empire),...(parsed.empire||{})};
    merged.empire.items=Array.isArray(merged.empire.items)?merged.empire.items:[];
    merged.empire.menus=Array.isArray(merged.empire.menus)?merged.empire.menus:[];
    merged.empire.overrides=merged.empire.overrides&&typeof merged.empire.overrides==="object"?merged.empire.overrides:{};
    merged.empire.hiddenStaticIds=Array.isArray(merged.empire.hiddenStaticIds)?merged.empire.hiddenStaticIds:[];
    merged.papeleria=Array.isArray(merged.papeleria)?merged.papeleria:[];
    // Rename only the two categories requested by the user while keeping existing entries.
    merged.links=(merged.links||[]).map(x=>({...x,category:x.category==="Tecnología"?"Historia":x.category==="Productividad"?"Imperio":x.category}));
    return merged;
  } catch(e){ return structuredClone(defaultData); }
}
const IMAGE_DB_NAME = "AkiraRenImageDB";
const IMAGE_DB_STORE = "images";

function openImageDB(){
  return new Promise((resolve,reject)=>{
    if(!window.indexedDB) return reject(new Error("IndexedDB no disponible"));
    const req=indexedDB.open(IMAGE_DB_NAME,1);
    req.onupgradeneeded=()=>{ if(!req.result.objectStoreNames.contains(IMAGE_DB_STORE)) req.result.createObjectStore(IMAGE_DB_STORE); };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error||new Error("No se pudo abrir el almacenamiento de imágenes"));
  });
}
async function putStoredImage(key,value){
  const db=await openImageDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(IMAGE_DB_STORE,"readwrite");
    tx.objectStore(IMAGE_DB_STORE).put(value,key);
    tx.oncomplete=()=>{db.close();resolve();};
    tx.onerror=()=>{db.close();reject(tx.error||new Error("No se pudo guardar la imagen"));};
  });
}
async function getStoredImage(key){
  try{
    const db=await openImageDB();
    return await new Promise((resolve,reject)=>{
      const tx=db.transaction(IMAGE_DB_STORE,"readonly"), req=tx.objectStore(IMAGE_DB_STORE).get(key);
      req.onsuccess=()=>{db.close();resolve(req.result||"");};
      req.onerror=()=>{db.close();reject(req.error);};
    });
  }catch{return "";}
}

function imageStorageKey(section,id,field="image"){
  return `akira-ren:${section}:${id||crypto.randomUUID()}:${field}`;
}

async function prepareLocalStorageData(source){
  const copy=structuredClone(source);
  const tasks=[];
  const storeField=(obj,field,key)=>{
    if(!obj || typeof obj[field] !== "string" || !obj[field].startsWith("data:image/")) return;
    const value=obj[field];
    const storageKey=key || imageStorageKey("misc",crypto.randomUUID(),field);
    tasks.push(putStoredImage(storageKey,value));
    obj[field]=`idb-image:${storageKey}`;
  };
  (copy.links||[]).forEach(x=>storeField(x,"image",imageStorageKey("link",x.id,"image")));
  (copy.images||[]).forEach(x=>{
    storeField(x,"url",imageStorageKey("gallery",x.id,"url"));
    storeField(x,"image",imageStorageKey("gallery",x.id,"image"));
  });
  (copy.history?.items||[]).forEach(x=>storeField(x,"image",imageStorageKey("history",x.id,"image")));
  (copy.music?.items||[]).forEach(x=>storeField(x,"url",imageStorageKey("music",x.id,"url")));
  (copy.empire?.items||[]).forEach(x=>storeField(x,"image",imageStorageKey("empire",x.id,"image")));
  (copy.papeleria||[]).forEach(x=>{if(x.item){storeField(x.item,"image",imageStorageKey("papeleria",x.id,"image"));storeField(x.item,"url",imageStorageKey("papeleria",x.id,"url"));}});
  Object.entries(copy.empire?.overrides||{}).forEach(([id,x])=>storeField(x,"image",imageStorageKey("empire-override",id,"image")));
  (copy.profile?.photos||[]).forEach(x=>storeField(x,"image",imageStorageKey("profile-photo",x.id,"image")));
  if(typeof copy.profile?.characterImage === "string" && copy.profile.characterImage.startsWith("data:image/"))
    storeField(copy.profile,"characterImage",imageStorageKey("profile","character","characterImage"));
  await Promise.all(tasks);
  return copy;
}

async function hydrateStoredImages(obj){
  const tasks=[];
  const restore=(target,field)=>{
    const value=target?.[field];
    if(typeof value!=="string" || !value.startsWith("idb-image:")) return;
    const key=value.slice("idb-image:".length);
    tasks.push(getStoredImage(key).then(img=>{if(img) target[field]=img;}));
  };
  (obj.links||[]).forEach(x=>restore(x,"image"));
  (obj.images||[]).forEach(x=>{restore(x,"url");restore(x,"image");});
  (obj.history?.items||[]).forEach(x=>restore(x,"image"));
  (obj.music?.items||[]).forEach(x=>restore(x,"url"));
  (obj.empire?.items||[]).forEach(x=>restore(x,"image"));
  (obj.papeleria||[]).forEach(x=>{if(x.item){restore(x.item,"image");restore(x.item,"url");}});
  Object.values(obj.empire?.overrides||{}).forEach(x=>restore(x,"image"));
  (obj.profile?.photos||[]).forEach(x=>restore(x,"image"));
  restore(obj.profile,"characterImage");
  await Promise.all(tasks);
  return obj;
}

function createStorageSafeData(source){
  const copy=structuredClone(source);
  const strip=(obj,field)=>{
    if(typeof obj?.[field] === "string" && obj[field].startsWith("data:image/")) obj[field]="";
  };
  (copy.links||[]).forEach(x=>strip(x,"image"));
  (copy.images||[]).forEach(x=>{strip(x,"url");strip(x,"image");});
  (copy.history?.items||[]).forEach(x=>strip(x,"image"));
  (copy.music?.items||[]).forEach(x=>strip(x,"url"));
  (copy.empire?.items||[]).forEach(x=>strip(x,"image"));
  (copy.papeleria||[]).forEach(x=>{if(x.item){strip(x.item,"image");strip(x.item,"url");}});
  Object.values(copy.empire?.overrides||{}).forEach(x=>strip(x,"image"));
  (copy.profile?.photos||[]).forEach(x=>strip(x,"image"));
  strip(copy.profile,"characterImage");
  return copy;
}

async function save(){
  try{
    const safe=await prepareLocalStorageData(data);
    const serialized=JSON.stringify(safe);
    try{
      localStorage.setItem(STORAGE_KEY+"_previous",localStorage.getItem(STORAGE_KEY)||serialized);
    }catch(e){
      try{localStorage.removeItem(STORAGE_KEY+"_previous");localStorage.setItem(STORAGE_KEY+"_previous",serialized);}catch{}
    }
    try{
      localStorage.setItem(STORAGE_KEY,serialized);
    }catch(e){
      const lighter=createStorageSafeData(safe);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(lighter));
    }
    if(window.WLCloud?.enabled){
      // El guardado local es independiente de Supabase. Si la nube falla,
      // NO debemos decir que la información no se guardó: el navegador ya la conservó.
      try{
        const cloudSource=structuredClone(data);
        await window.WLCloud.save(cloudSource);
        console.info("WEB LIBRARY: sincronizado con Supabase.");
      }catch(cloudError){
        console.error("WEB LIBRARY: falló la sincronización con Supabase:", cloudError);
        const msg=cloudError?.message || cloudError?.error_description || String(cloudError);
        console.warn("La información quedó guardada localmente. Motivo de Supabase:", msg);
        try{
          localStorage.setItem("webLibraryAkiraRen_cloud_error", JSON.stringify({message:msg,at:new Date().toISOString()}));
        }catch{}
      }
    }
    return true;
  }catch(e){
    console.error(e);
    alert("No se pudo guardar la información localmente. Revisa el espacio disponible del navegador e inténtalo de nuevo.");
    return false;
  }
}

async function initializeCloud(){
  if(!window.WLCloud?.enabled) return;
  try{
    const cloudData=await window.WLCloud.load();
    if(cloudData){
      data={...structuredClone(defaultData),...cloudData,profile:{...structuredClone(defaultData.profile),...(cloudData.profile||{})}};
      if(!Array.isArray(data.imageCollections) || !data.imageCollections.length) data.imageCollections=structuredClone(defaultData.imageCollections);
      data.imageCollections=data.imageCollections.map(c=>({...c,icon:c.icon||"👤"}));
      if(!Array.isArray(data.images)) data.images=[];
      data.music={...structuredClone(defaultData.music),...(data.music||{})}; data.music.collections=Array.isArray(data.music.collections)?data.music.collections:structuredClone(defaultData.music.collections); data.music.items=Array.isArray(data.music.items)?data.music.items:[];
      data.history={...structuredClone(defaultData.history),...(data.history||{})}; data.history.menus=Array.isArray(data.history.menus)?data.history.menus:structuredClone(defaultData.history.menus); data.history.items=Array.isArray(data.history.items)?data.history.items:[];
      data.empire={...structuredClone(defaultData.empire),...(data.empire||{})}; data.empire.items=Array.isArray(data.empire.items)?data.empire.items:[]; data.empire.menus=Array.isArray(data.empire.menus)?data.empire.menus:[]; data.empire.overrides=data.empire.overrides||{}; data.empire.hiddenStaticIds=Array.isArray(data.empire.hiddenStaticIds)?data.empire.hiddenStaticIds:[]; data.papeleria=Array.isArray(data.papeleria)?data.papeleria:[];
      data.links=(data.links||[]).map(x=>({...x,category:x.category==="Tecnología"?"Historia":x.category==="Productividad"?"Imperio":x.category}));
      prepareLocalStorageData(data).then(safe=>{ try{ localStorage.setItem(STORAGE_KEY,JSON.stringify(safe)); }catch{}; return hydrateStoredImages(data); }).then(()=>{ if(currentView !== "home") renderView(); });
      console.info("WEB LIBRARY: datos cargados desde Supabase.");
    }else{
      await window.WLCloud.save(data);
    }
  }catch(err){
    console.warn("WEB LIBRARY: Supabase no disponible; se mantiene el modo local.",err);
  }
}

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function showWorkspace(view, category=null){
  if(category==="Imperio" && currentCategory!=="Imperio") window.currentEmpireSubmenuId=null;
  currentView = view; currentCategory = category;
  if(category !== "Imágenes") currentImageCollectionId = null;
  $("#home").classList.toggle("hidden", view !== "home");
  $("#workspace").classList.toggle("hidden", view === "home");
  if(view === "home") return;
  const titles = {
    categories:"Categorías", favorites:"Favoritos", recents:"Páginas recientes",
    settings:"Configuración"
  };
  $("#workspaceTitle").textContent = category ? `Categoría: ${category}` : (titles[view] || "Biblioteca");
  $("#globalSearch").value = "";
  $("#typeFilter").value = "all"; $("#platformFilter").value = "all";
  renderView();
}

function escapeHtml(s=""){
  return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function safeUrl(u){
  try { const x = new URL(u); return ["http:","https:"].includes(x.protocol) ? x.href : "#"; }
  catch { return "#"; }
}
function renderView(){
  if(currentView === "settings") return renderSettings();
  if(currentView === "categories") return renderCategories();

  // Módulos especiales de la biblioteca.
  if(currentCategory === "Imágenes") return renderImagesGallery();
  if(currentCategory === "Música") return renderMusicLibrary();
  if(currentCategory === "Historia") return renderHistory();
  if(currentCategory === "Imperio") return renderEmpire();
  if(currentCategory === "Papelería") return renderPapeleria();

  let items = [];
  if(currentView === "favorites") items = data.links.filter(x=>x.favorite);
  else if(currentView === "recents") items = [...data.links].sort((a,b)=>(b.lastOpened||b.createdAt)-(a.lastOpened||a.createdAt));
  else items = data.links.filter(x=>!currentCategory || x.category === currentCategory);

  const q = $("#globalSearch").value.trim().toLowerCase();
  const type = $("#typeFilter").value;
  const platform = $("#platformFilter").value;
  items = items.filter(x=>{
    const hay = [x.title,x.description,x.platform,x.category,...(x.tags||[])].join(" ").toLowerCase();
    return (!q || hay.includes(q)) && (platform==="all" || x.platform===platform) && (type==="all" || type==="link");
  });

  $("#content").innerHTML = `
    <div class="section-head">
      <div><h2>${escapeHtml(currentCategory || (currentView==="favorites"?"⭐ Favoritos":"🔗 Biblioteca"))}</h2>
      <p>${items.length} elemento(s) encontrado(s).</p></div>
      <button class="primary-btn" data-action="add-link">＋ Agregar página</button>
    </div>
    <div class="cards">${items.length ? items.map(linkCard).join("") : emptyState("No hay páginas aquí todavía.","Agrega un enlace y aparecerá en tu biblioteca.")}</div>
  `;
}
function renderImagesGallery(){
  const q = $("#globalSearch").value.trim().toLowerCase();
  const collections = data.imageCollections || [];
  const active = collections.find(c=>c.id===currentImageCollectionId) || null;
  let items = (data.images || []).filter(x => {
    const inCollection = active ? x.collectionId === active.id : true;
    const hay = [x.title, x.description, x.category, x.collectionName].join(" ").toLowerCase();
    return inCollection && (!q || hay.includes(q));
  });

  if(!active){
    $("#content").innerHTML = `
      <div class="section-head">
        <div><h2>🖼️ Imágenes</h2><p>Crea menús independientes para cada persona o colección.</p></div>
        <button class="primary-btn" data-action="new-image-collection">＋ Nuevo menú</button>
      </div>
      <div class="category-grid image-collection-grid">
        ${collections.map(c=>`<div class="image-menu-card"><button type="button" class="image-menu-open" data-image-collection="${escapeHtml(c.id)}"><div class="icon">${escapeHtml(c.icon||"👤")}</div><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.description||"Solo muestra las imágenes de esta colección.")}</p><small>${data.images.filter(x=>x.collectionId===c.id).length} imagen(es)</small></button><div class="image-menu-actions"><button class="small-btn" data-image-collection-edit="${escapeHtml(c.id)}">Editar</button><button class="small-btn danger" data-image-collection-delete="${escapeHtml(c.id)}">Eliminar</button></div></div>`).join("")}
      </div>
      <div style="height:18px"></div>
      <div class="section-head">
        <div><h3>📦 Imágenes sin menú</h3><p>Fotos antiguas o que todavía no has asignado a una colección.</p></div>
        <button class="primary-btn" data-action="add-image">＋ Agregar imagen</button>
      </div>
      <div class="cards image-gallery-cards">${(data.images.filter(x=>!x.collectionId).length) ? data.images.filter(x=>!x.collectionId).map(imageCard).join("") : emptyState("No hay imágenes sin menú.","Crea un menú y asígnale cada fotografía.")}</div>
    `;
    return;
  }

  $("#content").innerHTML = `
    <div class="section-head">
      <div><button class="small-btn" data-action="back-image-menus">← Menús</button><h2>👤 ${escapeHtml(active.name)}</h2><p>${items.length} imagen(es) de esta colección.</p></div>
      <button class="primary-btn" data-action="add-image">＋ Agregar imagen</button>
    </div>
    <div class="cards image-gallery-cards">${items.length ? items.map(imageCard).join("") : emptyState(`No hay imágenes de ${escapeHtml(active.name)}.`,`Agrega una imagen y quedará guardada exclusivamente en este menú.`)}</div>
  `;
}

function sendToPapeleria(kind,item,location={}){
  if(!item)return;
  data.papeleria=Array.isArray(data.papeleria)?data.papeleria:[];
  data.papeleria.unshift({id:crypto.randomUUID(),kind,item:structuredClone(item),location:structuredClone(location),title:item.title||item.name||item.filename||kind,deletedAt:Date.now()});
}
function restorePapeleria(ids){
  const wanted=new Set(ids); const kept=[];
  for(const entry of (data.papeleria||[])){
    if(!wanted.has(entry.id)){kept.push(entry);continue;}
    const loc=entry.location||{}, item=structuredClone(entry.item);
    if(entry.kind==='empire-static'){
      data.empire.hiddenStaticIds=(data.empire.hiddenStaticIds||[]).filter(id=>id!==loc.staticId);
      
    }else if(entry.kind==='history-page'){
      data.history.documents=data.history.documents||{}; const pages=data.history.documents[loc.menuId]||(data.history.documents[loc.menuId]=[]); pages.splice(Math.max(0,Math.min(loc.index??pages.length,pages.length)),0,item);
    }else if(entry.kind==='link') data.links.splice(Math.max(0,Math.min(loc.index??data.links.length,data.links.length)),0,item);
    else if(entry.kind==='image') data.images.splice(Math.max(0,Math.min(loc.index??data.images.length,data.images.length)),0,item);
    else if(entry.kind==='music') data.music.items.splice(Math.max(0,Math.min(loc.index??data.music.items.length,data.music.items.length)),0,item);
    else if(entry.kind==='history-item') data.history.items.splice(Math.max(0,Math.min(loc.index??data.history.items.length,data.history.items.length)),0,item);
    else if(entry.kind==='empire-item') data.empire.items.splice(Math.max(0,Math.min(loc.index??data.empire.items.length,data.empire.items.length)),0,item);
    else if(entry.kind==='history-menu') data.history.menus.splice(Math.max(0,Math.min(loc.index??data.history.menus.length,data.history.menus.length)),0,item);
    else if(entry.kind==='empire-menu') data.empire.menus.splice(Math.max(0,Math.min(loc.index??data.empire.menus.length,data.empire.menus.length)),0,item);
    else if(entry.kind==='image-collection') data.imageCollections.splice(Math.max(0,Math.min(loc.index??data.imageCollections.length,data.imageCollections.length)),0,item);
    else if(entry.kind==='music-collection') data.music.collections.splice(Math.max(0,Math.min(loc.index??data.music.collections.length,data.music.collections.length)),0,item);
    else if(entry.kind==='custom-category') data.customCategories.splice(Math.max(0,Math.min(loc.index??data.customCategories.length,data.customCategories.length)),0,item);
    else if(entry.kind==='profile-stat'){data.profile.stats=data.profile.stats||[];data.profile.stats.splice(Math.max(0,Math.min(loc.index??data.profile.stats.length,data.profile.stats.length)),0,item);}
    else if(entry.kind==='profile-section'){data.profile.customSections=data.profile.customSections||[];data.profile.customSections.splice(Math.max(0,Math.min(loc.index??data.profile.customSections.length,data.profile.customSections.length)),0,item);}
    else if(entry.kind==='profile-photo'){data.profile.photos=data.profile.photos||[];data.profile.photos.splice(Math.max(0,Math.min(loc.index??data.profile.photos.length,data.profile.photos.length)),0,item);}
    else kept.push(entry);
  }
  data.papeleria=kept; save(); renderPapeleria();
}
function renderPapeleria(){
  data.papeleria=Array.isArray(data.papeleria)?data.papeleria:[];
  if(Array.isArray(data.history?.trash)&&data.history.trash.length){
    const seen=new Set(data.papeleria.map(x=>x.id));
    data.history.trash.forEach(old=>{if(seen.has(old.id))return;data.papeleria.push({id:old.id||crypto.randomUUID(),kind:"history-page",item:{id:old.originalPageId||crypto.randomUUID(),title:old.title||old.originalMenuName||"Hoja de Historia",content:old.content||""},location:{menuId:old.originalMenuId||"hist-root-sagas",index:old.originalIndex||0,label:`Historia / ${old.originalMenuName||"Hoja"}`,menuName:old.originalMenuName||"Historia",originalMenu:old.originalMenu},title:old.title||"Hoja de Historia",deletedAt:old.deletedAt||Date.now()});});
    data.history.trash=[]; save();
  }
  const rows=(data.papeleria||[]).map(x=>`<article class="card special-card"><div class="card-body"><label class="check"><input type="checkbox" data-papeleria-select value="${escapeHtml(x.id)}"> Seleccionar</label><span class="badge">${escapeHtml(x.kind||"Archivo")}</span><h3>${escapeHtml(x.title||"Elemento eliminado")}</h3><p>Ubicación original: ${escapeHtml(x.location?.label||x.location?.menuName||x.location?.category||x.location?.section||"Biblioteca")}</p><small>${new Date(x.deletedAt||Date.now()).toLocaleString()}</small></div></article>`).join("");
  $("#content").innerHTML=`<div class="special-hero history-hero"><div><span class="special-kicker">🗑️ ARCHIVO GENERAL DE RECUPERACIÓN</span><h2>📂 PAPELERÍA</h2><p>Todo lo eliminado de los menús de la biblioteca se conserva aquí hasta restaurarlo o borrarlo definitivamente.</p></div></div><div class="special-actions history-trash-actions"><button class="primary-btn" data-action="papeleria-restore-selected">Restaurar archivos seleccionados</button><button class="small-btn" data-action="papeleria-restore-all">Restaurar todo</button><button class="small-btn danger" data-action="papeleria-empty">Eliminar permanentemente todo</button></div><div class="special-toolbar"><span>${(data.papeleria||[]).length} elemento(s) en Papelería</span></div><div class="cards special-grid">${rows||emptyState("Papelería está vacía.","Los elementos eliminados de la biblioteca aparecerán aquí.")}</div>`;
}
function renderHistory(){
  const h=data.history||defaultData.history;
  h.menus=Array.isArray(h.menus)?h.menus:[];
  h.items=Array.isArray(h.items)?h.items:[];
  h.documents=h.documents&&typeof h.documents==="object"?h.documents:{};
  h.trash=Array.isArray(h.trash)?h.trash:[];

  if(currentHistoryTrashView){
    const rows=h.trash.map((item)=>`<article class="history-trash-item"><label class="history-trash-select"><input type="checkbox" value="${escapeHtml(item.id)}" data-trash-select> Seleccionar</label><h3>${escapeHtml(item.title||"Hoja de Historia")}</h3><p>Ubicación original: ${escapeHtml(item.originalMenuName||"Historia")}</p><div class="history-trash-preview">${escapeHtml(String(item.content||"").replace(/<[^>]*>/g," ").slice(0,500))}</div></article>`).join("");
    $("#content").innerHTML=`<div class="special-hero history-hero"><div><span class="special-kicker">🗑️ ARCHIVO DE RECUPERACIÓN</span><h2>📂 PAPELERÍA</h2><p>Contenido eliminado de Historia. Puedes restaurarlo a su ubicación original.</p></div></div><div class="special-actions history-trash-actions"><button class="primary-btn" data-action="history-trash-restore-selected">Restaurar archivos seleccionados</button><button class="small-btn" data-action="history-trash-restore-all">Restaurar todo</button><button class="small-btn danger" data-action="history-trash-empty">Eliminar permanentemente todo</button><button class="small-btn" data-action="back-history-menu">← Historia</button></div><div class="special-toolbar"><span>${h.trash.length} archivo(s) en Papelería</span></div><div class="cards special-grid">${rows||emptyState("Papelería está vacía.","Los elementos eliminados de Historia aparecerán aquí.")}</div>`;
    return;
  }

  const active=h.menus.find(m=>m.id===currentHistoryMenuId)||null;
  if(active){
    const key=active.id;
    const pages=Array.isArray(h.documents[key])?h.documents[key]:[{id:crypto.randomUUID(),content:"",title:active.name||"Hoja de Historia"}];
    h.documents[key]=pages;
    const childMenus=h.menus.filter(m=>m.parentId===active.id);
    const childMenuCards=childMenus.map(m=>`<div class="history-menu-card"><button class="history-menu-open" data-history-menu="${escapeHtml(m.id)}"><div class="icon">${escapeHtml(m.icon||"📁")}</div><h3>${escapeHtml(m.name)}</h3><p>${escapeHtml(m.description||"Menú de historia")}</p><small>${(h.documents[m.id]||[]).length} hoja(s)</small></button></div>`).join("");
    const pageHtml=pages.map((p,i)=>`<section class="history-page-card"><div class="history-page-actions"><button class="primary-btn" data-history-page-action="save" data-page-id="${escapeHtml(p.id)}">GUARDAR</button><button class="small-btn" data-history-page-action="edit" data-page-id="${escapeHtml(p.id)}">EDITAR</button><button class="small-btn danger" data-history-page-action="delete" data-page-id="${escapeHtml(p.id)}">ELIMINAR</button></div><div class="history-blank-page" contenteditable="false" spellcheck="true" data-history-page="${escapeHtml(p.id)}" aria-label="Hoja editable ${i+1}">${p.content||""}</div></section>`).join("");
    $("#content").innerHTML=`<div class="special-hero history-hero"><div><span class="special-kicker">📜 ARCHIVO HISTÓRICO</span><h2>${escapeHtml(active.icon||"📜")} ${escapeHtml(active.name)}</h2></div><div class="special-actions"><button class="primary-btn" data-action="add-history-page">＋ Nueva hoja en blanco</button><button class="small-btn" data-action="new-history-menu">＋ Nuevo submenú</button></div></div><div class="special-toolbar"><span>Documento editable · ${pages.length} hoja(s)</span><div class="toolbar-actions"><button class="small-btn" data-action="back-history-menu">← Menús</button></div></div>${childMenuCards?`<div class="category-grid history-menu-grid">${childMenuCards}</div>`:""}<div class="history-document-pages">${pageHtml}</div>`;
    $("#content").querySelectorAll("[data-history-page]").forEach(el=>el.addEventListener("input",()=>{const p=(data.history.documents[key]||[]).find(x=>x.id===el.dataset.historyPage);if(p){p.content=el.innerHTML;save();}}));
    return;
  }

  const q=$("#globalSearch").value.trim().toLowerCase();
  const childMenus=h.menus.filter(m=>!m.parentId);
  const items=h.items.filter(x=>!x.menuId&&(!q||[x.type,x.title,x.description].join(" ").toLowerCase().includes(q)));
  const total=h.items.length;
  const menuCards=childMenus.map(m=>{
    const count=h.items.filter(x=>x.menuId===m.id).length;
    const pageCount=(h.documents[m.id]||[]).length;
    return `<div class="history-menu-card"><button class="history-menu-open" data-history-menu="${escapeHtml(m.id)}"><div class="icon">${escapeHtml(m.icon||"📁")}</div><h3>${escapeHtml(m.name)}</h3><p>${escapeHtml(m.description||"Menú de historia")}</p><small>${count} elemento(s) · ${pageCount} hoja(s)</small></button><div class="history-menu-actions"><button class="small-btn" data-history-menu-edit="${escapeHtml(m.id)}">Editar</button><button class="small-btn danger" data-history-menu-delete="${escapeHtml(m.id)}">Eliminar</button></div></div>`;
  }).join("");
  const cards=items.map(historyCard).join("");
  const trashCard="";
  $("#content").innerHTML=`<div class="special-hero history-hero"><div><span class="special-kicker">📜 ARCHIVO HISTÓRICO</span><h2>📜 Historia de Akira Ren</h2><p>${escapeHtml(h.intro||"")}</p></div><div class="special-actions"><button class="primary-btn" data-action="new-history-menu">＋ Nuevo menú</button><button class="small-btn" data-action="add-history">＋ Capítulo / elemento</button></div></div><div class="special-toolbar"><span>${total} registro(s) en toda la historia</span><div class="toolbar-actions"><button class="small-btn" data-action="edit-history-intro">✏️ Editar descripción</button></div></div><div class="category-grid history-menu-grid">${menuCards}${trashCard}</div><div class="section-head"><div><h3>Elementos sin menú</h3><p>Selecciona un menú de saga, temporada, capítulo o etapa para abrir sus hojas.</p></div></div><div class="cards special-grid">${cards||emptyState("No hay elementos fuera de un menú.","Selecciona un menú para abrir tu documento editable.")}</div>`;
}

function historyPageAction(action,pageId){
  const h=data.history; h.documents=h.documents||{}; h.trash=Array.isArray(h.trash)?h.trash:[];
  const sourceId=currentHistoryMenuId; const pages=h.documents[sourceId]||[]; const idx=pages.findIndex(p=>p.id===pageId); if(idx<0)return;
  const page=pages[idx];
  if(action==="edit") { const el=document.querySelector(`[data-history-page="${CSS.escape(pageId)}"]`); if(el){el.contentEditable="true";el.focus();el.style.outline="2px solid rgba(67,217,255,.45)";} return; }
  if(action==="delete"){
    if(!confirm("¿Mover esta hoja a PAPELERÍA? Podrás restaurarla después."))return;
    const menu=(h.menus||[]).find(m=>m.id===sourceId)||{};
    sendToPapeleria("history-page",page,{menuId:sourceId,index:idx,label:`Historia / ${menu.name||"Hoja"}`,menuName:menu.name||"Historia"});
    pages.splice(idx,1); if(!pages.length)pages.push({id:crypto.randomUUID(),content:"",title:menu.name||"Hoja de Historia"}); h.documents[sourceId]=pages; save(); renderHistory(); return;
  }
  if(action==="save"){
    const level=prompt("¿En qué nivel deseas guardar esta hoja? Escribe: Saga, Temporada, Etapa u Otro nivel.","Saga"); if(level===null)return;
    let type=level.trim(); if(!type)return;
    if(/^otro nivel$/i.test(type)){type=prompt("Escribe el nombre del otro nivel:","Capítulo");if(type===null||!type.trim())return;type=type.trim();}
    const destinationName=prompt(`Nombre del destino de tipo “${type}”. Puedes usar un menú existente o escribir uno nuevo:`,(h.menus||[]).find(m=>m.id===sourceId)?.name||""); if(destinationName===null||!destinationName.trim())return;
    let destination=(h.menus||[]).find(m=>m.name.toLowerCase()===destinationName.trim().toLowerCase()&&(!m.type||String(m.type).toLowerCase()===type.toLowerCase())); if(destination&&!destination.type)destination.type=type;
    if(!destination){destination={id:crypto.randomUUID(),name:destinationName.trim(),type,icon:/saga/i.test(type)?"📚":/temporada/i.test(type)?"🎬":/etapa/i.test(type)?"🧭":"📁",description:`${type} de la Historia de Akira Ren`}; if(/temporada|etapa|capítulo|capitulo/i.test(type))destination.parentId=sourceId; h.menus.push(destination);}
    if(destination.id!==sourceId){pages.splice(idx,1);if(!pages.length)pages.push({id:crypto.randomUUID(),content:"",title:(h.menus||[]).find(m=>m.id===sourceId)?.name||"Hoja de Historia"});h.documents[sourceId]=pages;h.documents[destination.id]=Array.isArray(h.documents[destination.id])?h.documents[destination.id]:[];h.documents[destination.id].push(page);currentHistoryMenuId=destination.id;}
    save();renderHistory();return;
  }
}
function restoreHistoryTrash(ids){
  const h=data.history;h.trash=Array.isArray(h.trash)?h.trash:[];h.documents=h.documents||{};const wanted=new Set(ids);
  const restore=h.trash.filter(x=>wanted.has(x.id));
  restore.forEach(item=>{
    let menu=(h.menus||[]).find(m=>m.id===item.originalMenuId);
    if(!menu&&item.originalMenu){menu=structuredClone(item.originalMenu);if(!menu.id)menu.id=item.originalMenuId||crypto.randomUUID();h.menus.push(menu);}
    const targetId=menu?.id||item.originalMenuId||"hist-root-restaurado";
    if(!menu){menu={id:targetId,name:item.originalMenuName||"Historia restaurada",type:"Etapa",icon:"📜",description:"Ubicación restaurada desde Papelería"};h.menus.push(menu);}
    h.documents[targetId]=Array.isArray(h.documents[targetId])?h.documents[targetId]:[];
    const page={id:item.originalPageId||crypto.randomUUID(),title:item.title||menu.name,content:item.content||""};
    h.documents[targetId].splice(Math.min(Math.max(0,item.originalIndex||0),h.documents[targetId].length),0,page);
  });
  h.trash=h.trash.filter(x=>!wanted.has(x.id));save();currentHistoryTrashView=true;renderHistory();
}

function historyCard(x){return `<article class="card special-card">${x.image?`<div class="card-cover" style="background-image:url('${escapeHtml(x.image)}'),url('${LOCAL_IMAGE_FALLBACK}');background-size:cover;background-position:center"></div>`:`<div class="special-placeholder">📜</div>`}<div class="card-body"><span class="badge">${escapeHtml(x.type||"Historia")}</span><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.description||"Sin descripción.")}</p><div class="card-actions"><button class="small-btn" data-history-edit="${escapeHtml(x.id)}">Editar</button><button class="small-btn danger" data-history-delete="${escapeHtml(x.id)}">Eliminar</button></div></div></article>`}
function openHistoryMenu(id){ currentHistoryTrashView=false; currentHistoryMenuId=id; showWorkspace("category","Historia"); }
function openHistoryMenuModal(id=null){
  const m=(data.history.menus||[]).find(x=>x.id===id);
  $("#historyMenuModal").classList.remove("hidden"); $("#historyMenuModalTitle").textContent=id?"Editar menú de historia":(currentHistoryMenuId?"Nuevo submenú":"Nuevo menú de historia");
  $("#historyMenuEditId").value=id||""; $("#historyMenuTitle").value=m?.name||""; $("#historyMenuIcon").value=m?.icon||"📁"; $("#historyMenuDescription").value=m?.description||"";
}
function deleteHistoryMenu(id){
  const m=(data.history.menus||[]).find(x=>x.id===id); if(!m)return;
  if((data.history.menus||[]).some(x=>x.parentId===id)){alert("No puedes eliminar este menú mientras tenga menús dentro. Elimina o mueve primero sus submenús.");return;}
  if((data.history.items||[]).some(x=>x.menuId===id)){alert("Este menú contiene elementos. Muévelos o elimínalos antes de borrar el menú.");return;}
  if((data.history.documents?.[id]||[]).length){alert("Este menú contiene hojas. Elimina o mueve primero las hojas a Papelería.");return;}
  if(!confirm(`¿Mover el menú “${m.name}” a Papelería?`))return;
  const index=data.history.menus.findIndex(x=>x.id===id);sendToPapeleria("history-menu",m,{index,label:`Historia / ${m.name}`});
  data.history.menus=data.history.menus.filter(x=>x.id!==id); if(currentHistoryMenuId===id)currentHistoryMenuId=null; save(); renderHistory();
}
function openHistoryModal(id=null){
  const x=(data.history?.items||[]).find(a=>a.id===id); const h=data.history||defaultData.history;
  $("#historyModal").classList.remove("hidden"); $("#historyModalTitle").textContent=id?"Editar elemento de la historia":"Agregar elemento de la historia";
  $("#historyEditId").value=id||""; $("#historyType").value=x?.type||"Capítulo"; $("#historyTitle").value=x?.title||""; $("#historyDescription").value=x?.description||"";
  $("#historyMenuSelect").innerHTML=`<option value="">Sin menú</option>`+(h.menus||[]).map(m=>`<option value="${escapeHtml(m.id)}">${escapeHtml(m.name)}</option>`).join("");
  $("#historyMenuSelect").value=x?.menuId||currentHistoryMenuId||"";
  pendingHistoryImage=x?.image||""; $("#historyImageFile").value=""; setPreview("#historyImagePreview",pendingHistoryImage);
}

// Datos originales del catálogo Imperio Akira Ren, separados por categoría.
const IMPERIO_CATEGORIAS = [{"id":"empresas","title":"EMPRESAS","count":1000000,"icon":"🏢","desc":"Empresas reales incorporadas como referencias narrativas y empresas ficticias generadas por el Sistema.","img":"building","sourceType":"Empresa"},{"id":"bancos","title":"BANCOS","count":100000,"icon":"🏦","desc":"Sistema bancario mundial y bancos ficticios del Imperio.","img":"building","sourceType":"Banco"},{"id":"comercio","title":"COMERCIOS","count":1000000,"icon":"🛍️","desc":"Supermercados, tiendas, centros comerciales y comercios digitales.","img":"building","sourceType":"Comercio"},{"id":"telecom","title":"TELECOMUNICACIONES","count":100000,"icon":"📡","desc":"Redes móviles, internet, fibra, comunicaciones orbitales y telecomunicaciones.","img":"technology","sourceType":"Telecomunicaciones"},{"id":"energia","title":"ENERGÍA","count":100000,"icon":"⚡","desc":"Energía eléctrica, petróleo, gas, solar, eólica, nuclear y fusión ficticia.","img":"factory","sourceType":"Energía"},{"id":"mineria","title":"MINERÍA","count":100000,"icon":"⛏️","desc":"Minería terrestre, recursos minerales y minería espacial ficticia.","img":"factory","sourceType":"Minería"},{"id":"seguros","title":"SEGUROS","count":100000,"icon":"🛡️","desc":"Seguros financieros, propiedades, vehículos, empresas y activos ficticios.","img":"building","sourceType":"Seguros"},{"id":"lujo","title":"LUJO","count":100000,"icon":"💎","desc":"Alta relojería, joyería, moda, vehículos y experiencias de lujo.","img":"luxury","sourceType":"Lujo"},{"id":"restaurantes","title":"RESTAURANTES","count":1000000,"icon":"🍽️","desc":"Restaurantes, cafeterías, cadenas gastronómicas y restaurantes del Sistema.","img":"restaurant","sourceType":"Restaurante"},{"id":"medios","title":"MEDIOS","count":100000,"icon":"📺","desc":"Televisión, cine, música, streaming y medios digitales.","img":"city","sourceType":"Medios"},{"id":"gaming","title":"GAMING","count":100000,"icon":"🎮","desc":"Videojuegos, plataformas, estudios y entretenimiento interactivo.","img":"technology","sourceType":"Gaming"},{"id":"educacion","title":"EDUCACIÓN","count":100000,"icon":"🎓","desc":"Universidades, academias, centros de investigación y campus futuristas.","img":"building","sourceType":"Educación"},{"id":"salud","title":"SALUD","count":100000,"icon":"🏥","desc":"Hospitales, clínicas, investigación y biotecnología ficticia.","img":"building","sourceType":"Salud"},{"id":"deportes","title":"DEPORTES","count":100000,"icon":"🏆","desc":"Equipos, estadios, competiciones, ligas e infraestructura deportiva.","img":"sports","sourceType":"Deportes"},{"id":"propiedades","title":"PROPIEDADES","count":1000000,"icon":"🏠","desc":"Residencias, terrenos, complejos, oficinas y propiedades del Imperio.","img":"house","sourceType":"Propiedad"},{"id":"mansiones","title":"MANSIONES","count":100000,"icon":"🏰","desc":"Residencias imperiales, palacios y mansiones de ultra lujo.","img":"mansion","sourceType":"Mansión"},{"id":"islas","title":"ISLAS","count":100000,"icon":"🏝️","desc":"Islas reales referenciadas y territorios ficticios del Sistema.","img":"island","sourceType":"Isla"},{"id":"edificios","title":"EDIFICIOS","count":1000000,"icon":"🏙️","desc":"Rascacielos, torres, oficinas, complejos residenciales y megaestructuras.","img":"building","sourceType":"Edificio"},{"id":"autos","title":"AUTOS","count":1000000,"icon":"🚗","desc":"Vehículos deportivos, eléctricos, clásicos y modelos ficticios.","img":"car","sourceType":"Auto"},{"id":"motos","title":"MOTOS","count":1000000,"icon":"🏍️","desc":"Motocicletas, superbikes y motos futuristas.","img":"car","sourceType":"Moto"},{"id":"yates","title":"YATES","count":100000,"icon":"🛥️","desc":"Yates privados, megayates y embarcaciones de lujo.","img":"ship","sourceType":"Yate"},{"id":"helicopteros","title":"HELICÓPTEROS","count":100000,"icon":"🚁","desc":"Helicópteros civiles, ejecutivos, de rescate y modelos futuristas ficticios.","img":"plane","sourceType":"Helicóptero"},{"id":"aviones","title":"AVIONES","count":100000,"icon":"✈️","desc":"Aviación privada, comercial, ejecutiva y aeronaves futuristas.","img":"plane","sourceType":"Avión"},{"id":"trenes","title":"TRENES","count":100000,"icon":"🚆","desc":"Trenes de alta velocidad, metro, carga y ferrocarriles futuristas.","img":"train","sourceType":"Trenes"},{"id":"transporte","title":"TRANSPORTE","count":100000,"icon":"🚚","desc":"Aviación, transporte terrestre, marítimo y logística global.","img":"ship","sourceType":"Transporte"},{"id":"infraestructura","title":"INFRAESTRUCTURA","count":1000000,"icon":"🌉","desc":"Carreteras, puentes, túneles, aeropuertos, puertos, metros y megaobras.","img":"building","sourceType":"Infraestructura"},{"id":"ciudades","title":"CIUDADES","count":100000,"icon":"🌆","desc":"Ciudades reales como referencias y megaciudades ficticias del Imperio.","img":"city","sourceType":"Ciudad"},{"id":"fabricas","title":"FÁBRICAS","count":1000000,"icon":"🏭","desc":"Fábricas de automóviles, chips, baterías, robots, alimentos y tecnología.","img":"factory","sourceType":"Fábrica"},{"id":"tecnologias","title":"TECNOLOGÍAS","count":1000000,"icon":"🤖","desc":"IA, robótica, computación cuántica, energía, biotecnología y tecnología espacial.","img":"technology","sourceType":"Tecnología"},{"id":"hoteles","title":"HOTELES","count":1000000,"icon":"🏨","desc":"Hoteles urbanos, resorts, hoteles orbitales y complejos de lujo.","img":"hotel","sourceType":"Hoteles"},{"id":"barcos","title":"BARCOS","count":100000,"icon":"🚢","desc":"Cruceros, cargueros, megayates, buques y naves marítimas ficticias.","img":"ship","sourceType":"Barcos"},{"id":"satelites","title":"SATÉLITES","count":100000,"icon":"🛰️","desc":"Satélites de comunicación, navegación, ciencia y defensa ficticia.","img":"satellite","sourceType":"Satélite"},{"id":"espacio","title":"FLOTA ESPACIAL","count":100000,"icon":"🚀","desc":"Naves, estaciones orbitales, cargueros y exploradores espaciales ficticios.","img":"space","sourceType":"Espacio"},{"id":"mundos","title":"MUNDOS","count":100000,"icon":"🌌","desc":"Planetas, lunas, colonias y mundos ficticios creados por el Sistema.","img":"mars","sourceType":"Mundo"}];
const IMPERIO_REFERENCIAS = [["Nvidia","Empresa","Estados Unidos","Tecnología y semiconductores","technology"],["Apple","Empresa","Estados Unidos","Tecnología y electrónica","technology"],["Microsoft","Empresa","Estados Unidos","Software y tecnología","technology"],["Alphabet / Google","Empresa","Estados Unidos","Internet y tecnología","technology"],["Amazon","Empresa","Estados Unidos","Comercio y tecnología","building"],["Meta","Empresa","Estados Unidos","Tecnología y plataformas digitales","technology"],["Tesla","Empresa","Estados Unidos","Automóviles y energía","car"],["Samsung","Empresa","Corea del Sur","Electrónica y tecnología","technology"],["Toyota","Empresa","Japón","Automóviles","car"],["Sony","Empresa","Japón","Electrónica y entretenimiento","technology"],["Intel","Empresa","Estados Unidos","Semiconductores","technology"],["IBM","Empresa","Estados Unidos","Tecnología","technology"],["Oracle","Empresa","Estados Unidos","Software","technology"],["Cisco","Empresa","Estados Unidos","Redes","technology"],["ASML","Empresa","Países Bajos","Equipos para semiconductores","technology"],["TSMC","Empresa","Taiwán","Semiconductores","technology"],["SpaceX","Empresa","Estados Unidos","Espacio","space"],["Saudi Aramco","Empresa","Arabia Saudita","Energía","factory"],["Shell","Empresa","Global","Energía","factory"],["ExxonMobil","Empresa","Estados Unidos","Energía","factory"],["Coca-Cola","Empresa","Global","Bebidas","food"],["PepsiCo","Empresa","Global","Alimentos y bebidas","food"],["Nestlé","Empresa","Suiza","Alimentos","food"],["LVMH","Empresa","Francia","Lujo","luxury"],["Walmart","Empresa","Estados Unidos","Comercio","building"],["Berkshire Hathaway","Empresa","Estados Unidos","Inversiones","building"],["BlackRock","Empresa","Estados Unidos","Inversiones","building"],["JPMorgan Chase","Empresa","Estados Unidos","Finanzas","building"],["Johnson & Johnson","Empresa","Estados Unidos","Salud","building"],["UnitedHealth Group","Empresa","Estados Unidos","Salud","building"],["Siemens","Empresa","Alemania","Industria","factory"],["General Electric","Empresa","Estados Unidos","Industria","factory"],["Mitsubishi","Empresa","Japón","Industria","factory"],["Novo Nordisk","Empresa","Dinamarca","Biotecnología y salud","technology"],["Ecopetrol","Empresa","Colombia","Energía","factory"],["Bancolombia","Empresa","Colombia","Finanzas","building"],["Grupo Aval","Empresa","Colombia","Finanzas","building"],["Grupo Sura","Empresa","Colombia","Finanzas y seguros","building"],["Grupo Nutresa","Empresa","Colombia","Alimentos","food"],["Grupo Argos","Empresa","Colombia","Infraestructura","building"],["Cementos Argos","Empresa","Colombia","Construcción","factory"],["ISA","Empresa","Colombia","Infraestructura energética","factory"],["Terpel","Empresa","Colombia","Energía y combustibles","factory"],["Alpina","Empresa","Colombia","Alimentos","food"],["Postobón","Empresa","Colombia","Bebidas","food"],["Rappi","Empresa","Colombia","Tecnología y comercio","technology"],["Avianca","Empresa","Colombia","Transporte aéreo","plane"],["Banco de Bogotá","Banco","Colombia","Banca","building"],["Banco de Occidente","Banco","Colombia","Banca","building"],["Davivienda","Banco","Colombia","Banca","building"],["JPMorgan Chase","Banco","Estados Unidos","Banca internacional","building"],["Bank of America","Banco","Estados Unidos","Banca","building"],["ICBC","Banco","China","Banca","building"],["Wells Fargo","Banco","Estados Unidos","Banca","building"],["Citigroup","Banco","Estados Unidos","Banca","building"],["HSBC","Banco","Reino Unido","Banca internacional","building"],["UBS","Banco","Suiza","Banca","building"],["BNP Paribas","Banco","Francia","Banca","building"],["Santander","Banco","España","Banca","building"],["BBVA","Banco","España","Banca","building"],["Bancolombia","Banco","Colombia","Banca","building"],["Davivienda","Banco","Colombia","Banca","building"],["Éxito","Comercio","Colombia","Supermercados","building"],["Carulla","Comercio","Colombia","Supermercados","building"],["Olímpica","Comercio","Colombia","Supermercados","building"],["D1","Comercio","Colombia","Retail","building"],["Ara","Comercio","Colombia","Retail","building"],["Alkosto","Comercio","Colombia","Electrónica y retail","technology"],["Ktronix","Comercio","Colombia","Electrónica","technology"],["Falabella","Comercio","Colombia","Retail","building"],["Homecenter","Comercio","Colombia","Hogar y construcción","building"],["Jumbo","Comercio","Colombia","Supermercados","building"],["Costco","Comercio","Estados Unidos","Retail","building"],["Carrefour","Comercio","Francia","Retail","building"],["IKEA","Comercio","Suecia","Hogar","building"],["Zara","Comercio","España","Moda","luxury"],["Claro","Telecomunicaciones","Colombia","Telecomunicaciones","technology"],["Movistar","Telecomunicaciones","España/Global","Telecomunicaciones","technology"],["Tigo","Telecomunicaciones","Colombia","Telecomunicaciones","technology"],["ETB","Telecomunicaciones","Colombia","Telecomunicaciones","technology"],["WOM","Telecomunicaciones","Colombia","Telecomunicaciones","technology"],["Verizon","Telecomunicaciones","Estados Unidos","Telecomunicaciones","technology"],["AT&T","Telecomunicaciones","Estados Unidos","Telecomunicaciones","technology"],["Vodafone","Telecomunicaciones","Reino Unido","Telecomunicaciones","technology"],["Deutsche Telekom","Telecomunicaciones","Alemania","Telecomunicaciones","technology"],["EPM","Energía","Colombia","Energía y servicios públicos","factory"],["Celsia","Energía","Colombia","Energía","factory"],["Promigas","Energía","Colombia","Gas e infraestructura","factory"],["Enel","Energía","Italia/Global","Energía","factory"],["Engie","Energía","Francia","Energía","factory"],["Iberdrola","Energía","España","Energía renovable","factory"],["Chevron","Energía","Estados Unidos","Energía","factory"],["TotalEnergies","Energía","Francia","Energía","factory"],["BP","Energía","Reino Unido","Energía","factory"],["Cerrejón","Minería","Colombia","Carbón","factory"],["Drummond","Minería","Colombia","Minería","factory"],["Mineros","Minería","Colombia","Minería","factory"],["BHP","Minería","Australia","Minería","factory"],["Rio Tinto","Minería","Global","Minería","factory"],["Glencore","Minería","Suiza","Minería","factory"],["Anglo American","Minería","Reino Unido","Minería","factory"],["SURA","Seguros","Colombia","Seguros","building"],["Allianz","Seguros","Alemania","Seguros","building"],["AXA","Seguros","Francia","Seguros","building"],["Mapfre","Seguros","España","Seguros","building"],["Zurich","Seguros","Suiza","Seguros","building"],["Liberty","Seguros","Estados Unidos","Seguros","building"],["Hermès","Lujo","Francia","Moda y lujo","luxury"],["Chanel","Lujo","Francia","Moda y lujo","luxury"],["Gucci","Lujo","Italia","Moda y lujo","luxury"],["Prada","Lujo","Italia","Moda y lujo","luxury"],["Cartier","Lujo","Francia","Joyería","luxury"],["Rolex","Lujo","Suiza","Relojería","luxury"],["Patek Philippe","Lujo","Suiza","Relojería","luxury"],["Richard Mille","Lujo","Suiza","Relojería","luxury"],["Ferrari","Lujo","Italia","Automóviles","car"],["Lamborghini","Lujo","Italia","Automóviles","car"],["Porsche","Lujo","Alemania","Automóviles","car"],["McLaren","Lujo","Reino Unido","Automóviles","car"],["Juan Valdez","Restaurante","Colombia","Café","restaurant"],["Crepes & Waffles","Restaurante","Colombia","Restaurantes","restaurant"],["El Corral","Restaurante","Colombia","Hamburguesas","restaurant"],["Frisby","Restaurante","Colombia","Comida rápida","restaurant"],["Kokoriko","Restaurante","Colombia","Comida rápida","restaurant"],["McDonald's","Restaurante","Global","Comida rápida","restaurant"],["KFC","Restaurante","Global","Comida rápida","restaurant"],["Starbucks","Restaurante","Global","Café","restaurant"],["Subway","Restaurante","Global","Comida rápida","restaurant"],["Domino's","Restaurante","Global","Pizza","restaurant"],["Disney","Medios","Estados Unidos","Entretenimiento","city"],["Warner Bros. Discovery","Medios","Estados Unidos","Entretenimiento","city"],["Netflix","Medios","Estados Unidos","Streaming","technology"],["Spotify","Medios","Suecia","Música","technology"],["Universal Music","Medios","Global","Música","city"],["Sony Pictures","Medios","Estados Unidos","Cine","city"],["Nintendo","Gaming","Japón","Videojuegos","technology"],["PlayStation","Gaming","Japón","Videojuegos","technology"],["Xbox","Gaming","Estados Unidos","Videojuegos","technology"],["Electronic Arts","Gaming","Estados Unidos","Videojuegos","technology"],["Ubisoft","Gaming","Francia","Videojuegos","technology"],["Epic Games","Gaming","Estados Unidos","Videojuegos","technology"],["Valve","Gaming","Estados Unidos","Videojuegos","technology"],["Tencent Games","Gaming","China","Videojuegos","technology"],["Universidad de los Andes","Educación","Colombia","Universidad","building"],["Universidad Nacional de Colombia","Educación","Colombia","Universidad","building"],["Universidad Javeriana","Educación","Colombia","Universidad","building"],["EAFIT","Educación","Colombia","Universidad","building"],["Harvard","Educación","Estados Unidos","Universidad","building"],["MIT","Educación","Estados Unidos","Universidad","technology"],["Stanford","Educación","Estados Unidos","Universidad","technology"],["FIFA","Deportes","Global","Fútbol","sports"],["Formula 1","Deportes","Global","Automovilismo","car"],["MotoGP","Deportes","Global","Motociclismo","car"],["UEFA","Deportes","Europa","Fútbol","sports"],["NBA","Deportes","Estados Unidos","Baloncesto","sports"],["NFL","Deportes","Estados Unidos","Fútbol americano","sports"],["Juegos Olímpicos","Deportes","Global","Deporte internacional","sports"],["LATAM Airlines","Transporte","Latinoamérica","Aviación","plane"],["Copa Airlines","Transporte","Panamá","Aviación","plane"],["Emirates","Transporte","Emiratos Árabes Unidos","Aviación","plane"],["Qatar Airways","Transporte","Qatar","Aviación","plane"],["Delta Air Lines","Transporte","Estados Unidos","Aviación","plane"],["United Airlines","Transporte","Estados Unidos","Aviación","plane"],["American Airlines","Transporte","Estados Unidos","Aviación","plane"],["FedEx","Transporte","Estados Unidos","Logística","plane"],["DHL","Transporte","Global","Logística","building"],["Maersk","Transporte","Dinamarca","Transporte marítimo","ship"],["MSC","Transporte","Suiza","Transporte marítimo","ship"],["Odinsa","Infraestructura","Colombia","Infraestructura vial","building"],["Vinci","Infraestructura","Francia","Construcción","building"],["ACS","Infraestructura","España","Construcción","building"],["Bechtel","Infraestructura","Estados Unidos","Construcción","building"],["RENFE","Trenes","España","Ferrocarriles","train"],["Deutsche Bahn","Trenes","Alemania","Ferrocarriles","train"],["JR East","Trenes","Japón","Ferrocarriles","train"],["Eurostar","Trenes","Europa","Alta velocidad","train"],["Royal Caribbean","Barcos","Global","Cruceros","ship"],["Carnival","Barcos","Global","Cruceros","ship"],["MSC Cruises","Barcos","Global","Cruceros","ship"],["Marriott","Hoteles","Global","Hoteles","hotel"],["Hilton","Hoteles","Global","Hoteles","hotel"],["Hyatt","Hoteles","Global","Hoteles","hotel"],["Four Seasons","Hoteles","Global","Lujo","hotel"],["Mandarin Oriental","Hoteles","Global","Lujo","hotel"],["OpenAI","Tecnología","Estados Unidos","Inteligencia artificial","technology"],["IBM","Tecnología","Estados Unidos","Computación","technology"],["Oracle","Tecnología","Estados Unidos","Software","technology"],["Adobe","Tecnología","Estados Unidos","Software","technology"],["SAP","Tecnología","Alemania","Software empresarial","technology"],["Nueva York","Ciudad","Estados Unidos","Megaciudad global","city"],["Londres","Ciudad","Reino Unido","Capital global","city"],["París","Ciudad","Francia","Capital global","city"],["Tokio","Ciudad","Japón","Megaciudad","city"],["Seúl","Ciudad","Corea del Sur","Megaciudad tecnológica","city"],["Dubái","Ciudad","Emiratos Árabes Unidos","Centro global","city"],["Singapur","Ciudad","Singapur","Ciudad-estado","city"],["Bogotá","Ciudad","Colombia","Capital","city"],["Medellín","Ciudad","Colombia","Ciudad","city"],["Pereira","Ciudad","Colombia","Ciudad","city"],["Burj Khalifa","Propiedad","Dubái","Rascacielos","building"],["One World Trade Center","Propiedad","Nueva York","Rascacielos","building"],["Palacio de Versalles","Propiedad","Francia","Patrimonio arquitectónico","mansion"],["Palm Jumeirah","Isla","Dubái","Isla artificial","island"],["Isla de San Andrés","Isla","Colombia","Isla","island"],["Ferrari SF90","Auto","Italia","Superdeportivo","car"],["Lamborghini Revuelto","Auto","Italia","Superdeportivo","car"],["Porsche 911","Auto","Alemania","Deportivo","car"],["Tesla Model S","Auto","Estados Unidos","Eléctrico","car"],["Bugatti Chiron","Auto","Francia","Hiperdeportivo","car"],["Koenigsegg Jesko","Auto","Suecia","Hiperdeportivo","car"],["McLaren P1","Auto","Reino Unido","Superdeportivo","car"],["Aston Martin DB12","Auto","Reino Unido","Gran turismo","car"],["Mercedes-Benz S-Class","Auto","Alemania","Sedán de lujo","car"],["BMW M5","Auto","Alemania","Sedán deportivo","car"],["Audi R8","Auto","Alemania","Deportivo","car"],["Rolls-Royce Phantom","Auto","Reino Unido","Lujo","car"],["Ducati Panigale V4","Moto","Italia","Superbike","car"],["BMW S 1000 RR","Moto","Alemania","Superbike","car"],["Yamaha YZF-R1","Moto","Japón","Superbike","car"],["Kawasaki Ninja H2","Moto","Japón","Superbike","car"],["Honda CBR1000RR-R","Moto","Japón","Superbike","car"],["Suzuki Hayabusa","Moto","Japón","Motocicleta deportiva","car"],["Harley-Davidson CVO","Moto","Estados Unidos","Motocicleta de lujo","car"],["KTM 1290 Super Duke","Moto","Austria","Naked deportiva","car"],["Sunseeker 131 Yacht","Yate","Reino Unido","Megayate de lujo","ship"],["Azimut Grande 27 Metri","Yate","Italia","Yate de lujo","ship"],["Feadship Yacht","Yate","Países Bajos","Superyate","ship"],["Benetti Yacht","Yate","Italia","Superyate","ship"],["Lürssen Yacht","Yate","Alemania","Megayate","ship"],["Oceanco Yacht","Yate","Países Bajos","Megayate","ship"],["Airbus H160","Helicóptero","Europa","Helicóptero ejecutivo","plane"],["Sikorsky S-76","Helicóptero","Estados Unidos","Helicóptero ejecutivo","plane"],["Bell 429","Helicóptero","Canadá","Helicóptero ejecutivo","plane"],["Leonardo AW139","Helicóptero","Italia","Helicóptero multipropósito","plane"],["Boeing CH-47 Chinook","Helicóptero","Estados Unidos","Helicóptero pesado","plane"],["Airbus A350","Avión","Europa","Aviación comercial","plane"],["Airbus A380","Avión","Europa","Avión comercial de gran capacidad","plane"],["Boeing 787","Avión","Estados Unidos","Aviación comercial","plane"],["Boeing 777","Avión","Estados Unidos","Aviación comercial","plane"],["Boeing 747","Avión","Estados Unidos","Aviación comercial","plane"],["Gulfstream G700","Avión","Estados Unidos","Aviación ejecutiva","plane"],["Bombardier Global 7500","Avión","Canadá","Aviación ejecutiva","plane"],["Dassault Falcon 10X","Avión","Francia","Aviación ejecutiva","plane"],["Queen Mary 2","Barcos","Reino Unido","Transatlántico","ship"],["Titanic","Barcos","Reino Unido","Transatlántico histórico","ship"],["Ever Given","Barcos","Panamá","Portacontenedores","ship"],["Symphony of the Seas","Barcos","Global","Crucero","ship"],["Burj Al Arab","Hoteles","Dubái","Hotel de lujo","hotel"],["Marina Bay Sands","Hoteles","Singapur","Hotel y resort","hotel"],["The Ritz-Carlton","Hoteles","Global","Hotel de lujo","hotel"],["The Plaza Hotel","Hoteles","Nueva York","Hotel histórico","hotel"],["Atlantis The Palm","Hoteles","Dubái","Resort de lujo","hotel"],["OpenAI","Tecnología","Estados Unidos","Inteligencia artificial","technology"],["IBM","Tecnología","Estados Unidos","Computación","technology"],["Oracle","Tecnología","Estados Unidos","Software","technology"],["Adobe","Tecnología","Estados Unidos","Software","technology"],["SAP","Tecnología","Alemania","Software empresarial","technology"],["Qualcomm","Tecnología","Estados Unidos","Semiconductores","technology"],["AMD","Tecnología","Estados Unidos","Semiconductores","technology"],["Hubble","Satélite","Órbita terrestre","Observatorio espacial","satellite"],["James Webb","Satélite","Espacio","Observatorio espacial","space"],["Starlink","Satélite","Órbita terrestre","Constelación de satélites","satellite"],["Voyager 1","Satélite","Espacio interestelar","Sonda espacial","space"],["Voyager 2","Satélite","Espacio interestelar","Sonda espacial","space"],["International Space Station","Espacio","Órbita terrestre","Estación espacial","space"]];
const IMPERIO_IMAGENES = {"space":"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=85","city":"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=85","building":"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85","mansion":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85","house":"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85","island":"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85","car":"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85","plane":"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85","earth":"https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1200&q=85","mars":"https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=85","food":"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85","technology":"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85","factory":"https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85","luxury":"https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85","sports":"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85","restaurant":"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85","train":"https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=85","ship":"https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1200&q=85","hotel":"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85","satellite":"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85"};
const IMPERIO_CAPITAL_ORIGINAL = "$1.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000.000";
const IMPERIO_FICTION_PREFIXES = ["REN","AURON","NEXA","ORBITALIS","VANTEX","ASTRA","IMPERIUM","NOVA","ZENITH","QUANTUM","COSMOS","NEBULA","ECLIPSE","TITAN","OMEGA","GALAXIS","INFINITY","AETHER","SOLARIS","LUMEN"];
const IMPERIO_FICTION_SUFFIXES = ["Global","Industries","Holdings","Group","Systems","Corporation","International","Dynamics","Labs","Technologies","Capital","Enterprises","Networks","Alliance","United","Prime","Advanced","Future","Universal","One"];
const IMPERIO_COUNTRIES = ["Colombia","Estados Unidos","Canadá","México","Brasil","Argentina","Chile","España","Francia","Alemania","Italia","Reino Unido","Japón","China","Corea del Sur","India","Australia","Emiratos Árabes Unidos","Singapur","Suiza","Suecia","Noruega","Países Bajos","Mundo"];
const IMPERIO_CITIES = ["Pereira","Bogotá","Medellín","Cali","Cartagena","Barranquilla","Madrid","París","Londres","Nueva York","Tokio","Seúl","Dubái","Singapur","Shanghái","Los Ángeles","Toronto","Sídney","Berlín","Roma"];

function createEmpireMenu(existingId=null){
  const old=(data.empire.menus||[]).find(m=>m.id===existingId);
  const name=prompt(old?"Nombre del menú:":"Nombre del nuevo menú:",old?.name||"");if(!name?.trim())return;
  const description=prompt("Descripción del menú:",old?.description||"")||"";
  const icon=prompt("Icono del menú:",old?.icon||"📁")||"📁";
  data.empire.menus=data.empire.menus||[];
  if(old){old.name=name.trim();old.description=description;old.icon=icon;}
  else data.empire.menus.push({id:crypto.randomUUID(),name:name.trim(),description,icon,parentId:window.currentEmpireSubmenuId||"",createdAt:Date.now()});
  save();renderEmpire();
}
function editEmpireMenu(id){createEmpireMenu(id);}
function deleteEmpireMenu(id){const m=(data.empire.menus||[]).find(x=>x.id===id);if(!m)return;if((data.empire.menus||[]).some(x=>x.parentId===id)||(data.empire.items||[]).some(x=>x.menuId===id)){alert("Este menú contiene submenús o elementos. Mueve o elimina primero esos elementos a Papelería.");return;}if(!confirm(`¿Mover el menú “${m.name}” a Papelería?`))return;const i=data.empire.menus.findIndex(x=>x.id===id);sendToPapeleria("empire-menu",m,{index:i,label:`Imperio / ${m.name}`});data.empire.menus.splice(i,1);save();if(window.currentEmpireSubmenuId===id)window.currentEmpireSubmenuId=m.parentId||null;renderEmpire();}
function showEmpireDetail(id){
  const x=window.empireRuntimeItems[id];if(!x)return;
  document.querySelector("#empireDetailOverlay")?.remove();
  const wrap=document.createElement("div");wrap.id="empireDetailOverlay";wrap.className="empire-detail-overlay";
  wrap.innerHTML=`<div class="empire-detail-card"><button class="close" data-action="empire-detail-close" aria-label="Cerrar">×</button>${x.image?`<img class="empire-detail-image" src="${escapeHtml(x.image)}" alt="${escapeHtml(x.title)}">`:`<div class="empire-detail-image empire-detail-no-image">${escapeHtml(x.icon||"👑")}</div>`}<div class="empire-detail-copy"><span class="badge">${escapeHtml(x.type||"Imperio")}</span><h2>${escapeHtml(x.title||"")}</h2><p>${escapeHtml(x.description||"")}</p><p><strong>Valor:</strong> ${escapeHtml(x.value||"No especificado")}</p><div class="card-actions"><button class="primary-btn" data-action="empire-detail-edit" data-item-id="${escapeHtml(id)}">Editar</button><button class="small-btn danger" data-action="empire-detail-delete" data-item-id="${escapeHtml(id)}">Eliminar</button></div></div></div>`;
  document.body.appendChild(wrap);
}
function renderEmpire(){
  data.empire=data.empire||{};data.empire.items=Array.isArray(data.empire.items)?data.empire.items:[];data.empire.menus=Array.isArray(data.empire.menus)?data.empire.menus:[];data.empire.overrides=data.empire.overrides||{};data.empire.hiddenStaticIds=data.empire.hiddenStaticIds||[];
  const chosen=window.currentEmpireSubmenuId||null;
  const customItems=data.empire.items;
  const fixedSpecial=[{id:"herencias-sucesiones",title:"HERENCIAS / SUCESIONES",icon:"📜",desc:"Herencias y sucesiones registradas en el Imperio.",sourceType:"__inheritance"},{id:"fortunas-capital",title:"FORTUNAS / CAPITAL",icon:"💰",desc:"Capital y fortunas mostrados en el archivo original del Imperio.",sourceType:"__fortune"},{id:"otros-registros",title:"OTROS REGISTROS",icon:"🗂️",desc:"Otros datos guardados en el módulo Imperio.",sourceType:"__other"}];
  const cats=[...IMPERIO_CATEGORIAS.map(c=>({id:c.id,title:c.title,icon:c.icon,desc:c.desc,sourceType:c.sourceType})),...fixedSpecial];
  const category=cats.find(c=>c.id===chosen)||null;
  const customMenu=data.empire.menus.find(m=>m.id===chosen)||null;
  const active=category||customMenu;
  const esc=escapeHtml;
  const imageFor=key=>IMPERIO_IMAGENES[key]||LOCAL_IMAGE_FALLBACK;
  const customBucket=x=>{const text=[x.type,x.title,x.description].join(" ").toLocaleLowerCase("es");if(/herencia|sucesi[oó]n|legado/.test(text))return "herencias-sucesiones";if(/fortuna|patrimonio|capital/.test(text))return "fortunas-capital";if(/hotel/.test(text))return "hoteles";if(/isla/.test(text))return "islas";if(/mansi[oó]n/.test(text))return "mansiones";if(/propiedad|residencia/.test(text))return "propiedades";if(/edificio|rascacielos/.test(text))return "edificios";if(/carro|veh[ií]culo|auto|coche/.test(text))return "autos";if(/moto|motocicleta/.test(text))return "motos";const exact=IMPERIO_CATEGORIAS.find(c=>String(x.type||"").toLowerCase()===String(c.sourceType||"").toLowerCase()||String(x.type||"").toLowerCase()===String(c.title||"").toLowerCase());return exact?.id||"otros-registros";};
  const parentId=active?.id||"";
  const childMenus=data.empire.menus.filter(m=>(m.parentId||"")===parentId);
  const menuCards=childMenus.map(m=>`<div class="history-menu-card"><button class="history-menu-open" data-empire-submenu="${esc(m.id)}"><div class="icon">${esc(m.icon||"📁")}</div><h3>${esc(m.name)}</h3><p>${esc(m.description||"")}</p><small>Abrir submenú</small></button><div class="history-menu-actions"><button class="small-btn" data-empire-menu-edit="${esc(m.id)}">Editar menú</button><button class="small-btn danger" data-empire-menu-delete="${esc(m.id)}">Eliminar</button></div></div>`).join("");
  if(!active){
    const rootCards=[...cats.map(c=>`<div class="history-menu-card"><button class="history-menu-open" data-empire-submenu="${esc(c.id)}"><div class="icon">${esc(c.icon||"📁")}</div><h3>${esc(c.title)}</h3><p>${esc(c.desc||"")}</p><small>Abrir categoría</small></button></div>`),...childMenus.map(m=>`<div class="history-menu-card"><button class="history-menu-open" data-empire-submenu="${esc(m.id)}"><div class="icon">${esc(m.icon||"📁")}</div><h3>${esc(m.name)}</h3><p>${esc(m.description||"")}</p><small>Abrir submenú</small></button><div class="history-menu-actions"><button class="small-btn" data-empire-menu-edit="${esc(m.id)}">Editar menú</button><button class="small-btn danger" data-empire-menu-delete="${esc(m.id)}">Eliminar</button></div></div>`)].join("");
    $("#content").innerHTML=`<div class="special-hero empire-hero"><div><span class="special-kicker">IMPERIO AKIRA REN</span><h2>Imperio Akira Ren</h2><p>${esc(data.empire.intro||"Todos los datos del Imperio organizados en submenús independientes.")}</p></div><div class="special-actions"><button class="primary-btn" data-action="add-empire-menu">Agregar nuevo menú</button><button class="small-btn" data-action="add-empire">＋ Agregar registro</button></div></div><div class="category-grid history-menu-grid">${rootCards}</div><div class="special-toolbar"><span>${IMPERIO_REFERENCIAS.length} referencias originales · ${customItems.length} registro(s) guardado(s)</span></div>`;return;
  }
  let records=[];
  if(category){
    if(category.sourceType==="__fortune") records=[{title:"CAPITAL DEL SISTEMA",description:IMPERIO_CAPITAL_ORIGINAL,type:"Fortuna",location:"Imperio Akira Ren",image:IMPERIO_IMAGENES.space,value:data.empire.overrides["static:fortune"]?.value||"No especificado",id:"static:fortune",menuId:category.id}];
    else if(category.sourceType==="__inheritance") records=customItems.filter(x=>/herencia|sucesi[oó]n|legado|fortuna|patrimonio/i.test([x.type,x.title,x.description].join(" "))).map(x=>({...x,menuId:x.menuId||category.id}));
    else if(category.sourceType==="__other") records=customItems.filter(x=>!cats.some(c=>c.sourceType!=="__other"&&c.sourceType!=="__fortune"&&c.sourceType!=="__inheritance"&&String(x.type||"").toLowerCase().includes(String(c.sourceType||"").toLowerCase()))&&!/herencia|sucesi[oó]n|legado|fortuna|patrimonio/i.test([x.type,x.title,x.description].join(" "))).map(x=>({...x,menuId:x.menuId||category.id}));
    else{
      let base=IMPERIO_REFERENCIAS.filter(r=>String(r[1]).toLocaleLowerCase("es")===String(category.sourceType).toLocaleLowerCase("es")).map((r,i)=>({id:`static:${category.id}:ref:${i}`,title:r[0],type:r[1],location:r[2],description:r[3],image:imageFor(r[4]),value:"No especificado",menuId:category.id}));
      const original=IMPERIO_CATEGORIAS.find(c=>c.id===category.id);
      if(original){const realCount=Math.min(base.length,10);for(let i=realCount;i<20;i++){const prefix=IMPERIO_FICTION_PREFIXES[i%IMPERIO_FICTION_PREFIXES.length],suffix=IMPERIO_FICTION_SUFFIXES[Math.floor(i/IMPERIO_FICTION_PREFIXES.length)%IMPERIO_FICTION_SUFFIXES.length],number=String(i+1).padStart(7,"0"),location=IMPERIO_COUNTRIES[i%IMPERIO_COUNTRIES.length],city=IMPERIO_CITIES[i%IMPERIO_CITIES.length];let description=`Activo ficticio generado por el Sistema de Akira Ren. Registro ${number}.`;if(original.id==="mundos")description=`Mundo ficticio ${i+1}, catalogado por el Sistema para expansión y desarrollo del Imperio.`;if(original.id==="ciudades")description=`Megaciudad ficticia ubicada en ${location}, sector ${city}.`;if(original.id==="propiedades")description=`Propiedad ficticia registrada por el Sistema en ${city}, ${location}.`;if(original.id==="tecnologias")description="Tecnología ficticia desarrollada dentro del ecosistema REN.";base.push({id:`static:${category.id}:gen:${i}`,title:`${prefix} ${original.title} ${suffix} ${number}`,type:original.title,location,description,image:imageFor(original.img),value:"No especificado",menuId:category.id});}}
      records=base.concat(customItems.filter(x=>(x.menuId||customBucket(x))===category.id));
    }
    records=records.map(r=>{const ov=data.empire.overrides[r.id]||{};return {...r,...ov,id:r.id,menuName:category.title,icon:category.icon};});
  }else{
    records=customItems.filter(x=>x.menuId===customMenu.id).map(x=>({...x,menuName:customMenu.name,icon:customMenu.icon}));
  }
  records=records.filter(r=>!(data.empire.hiddenStaticIds||[]).includes(r.id));
  window.empireRuntimeItems={};
  const cards=records.map(r=>{
    window.empireRuntimeItems[r.id]=r;
    return `<article class="card special-card">${r.image?`<div class="card-cover" style="background-image:url('${esc(r.image)}'),url('${LOCAL_IMAGE_FALLBACK}');background-size:cover;background-position:center"></div>`:`<div class="special-placeholder">${esc(active.icon||"👑")}</div>`}<div class="card-body"><span class="badge">${esc(r.type||active.title||active.name)}</span><h3>${esc(r.title)}</h3><p>${esc(r.description||"")}</p><p><strong>Valor:</strong> ${esc(r.value||"No especificado")}</p><div class="card-actions"><button class="small-btn" data-empire-view="${esc(r.id)}">Ver</button><button class="small-btn" data-empire-edit="${esc(r.id)}">Editar</button><button class="small-btn danger" data-empire-delete="${esc(r.id)}">Eliminar</button></div></div></article>`;
  }).join("");
  $("#content").innerHTML=`<div class="special-hero empire-hero"><div><span class="special-kicker">IMPERIO AKIRA REN</span><h2>${esc(active.icon||"📁")} ${esc(active.title||active.name)}</h2><p>${esc(active.desc||active.description||"")}</p></div><div class="special-actions"><button class="primary-btn" data-action="add-empire-menu">Agregar nuevo menú</button><button class="small-btn" data-action="add-empire">＋ Agregar registro</button><button class="small-btn" data-action="back-empire-submenus">← Menús del Imperio</button></div></div>${menuCards?`<div class="category-grid history-menu-grid">${menuCards}</div>`:""}<div class="special-toolbar"><span>${records.length} elemento(s) en este menú</span></div><div class="cards special-grid">${cards||emptyState("No hay registros en este menú.","Puedes agregar elementos o crear submenús dentro de este menú.")}</div>`;
}

function editHistoryIntro(){
  const value=prompt("Descripción inicial de la historia de Akira Ren:",data.history?.intro||"");
  if(value===null)return; data.history.intro=value.trim()||defaultData.history.intro; save(); renderHistory();
}
function editEmpireIntro(){
  const value=prompt("Descripción inicial del sistema y del Imperio:",data.empire?.intro||"");
  if(value===null)return; data.empire.intro=value.trim()||defaultData.empire.intro; save(); renderEmpire();
}
function openHistoryModal(id=null){
  const x=(data.history?.items||[]).find(a=>a.id===id);
  $("#historyModal").classList.remove("hidden"); $("#historyModalTitle").textContent=id?"Editar elemento de la historia":"Agregar elemento de la historia";
  $("#historyEditId").value=id||""; $("#historyType").value=x?.type||"Capítulo"; $("#historyTitle").value=x?.title||""; $("#historyDescription").value=x?.description||"";
  pendingHistoryImage=x?.image||""; $("#historyImageFile").value=""; setPreview("#historyImagePreview",pendingHistoryImage);
}
function openEmpireModal(id=null){
  const x=(data.empire?.items||[]).find(a=>a.id===id)||window.empireRuntimeItems?.[id]||null;
  $("#empireModal").classList.remove("hidden"); $("#empireModalTitle").textContent=id?"Editar elemento del Imperio":"Agregar elemento del Imperio";
  $("#empireEditId").value=id||""; $("#empireType").value=x?.type||"Empresa"; $("#empireTitle").value=x?.title||""; $("#empireDescription").value=x?.description||""; $("#empireValue").value=x?.value||"";
  pendingEmpireImage=x?.image||""; $("#empireImageFile").value=""; setPreview("#empireImagePreview",pendingEmpireImage);
}
function setPreview(selector,src){const el=$(selector); if(src){el.src=src;el.classList.remove("hidden");}else{el.removeAttribute("src");el.classList.add("hidden");}}
function deleteHistoryItem(id){const i=(data.history.items||[]).findIndex(x=>x.id===id);if(i<0||!confirm("¿Mover este elemento a Papelería?"))return;const x=data.history.items[i];sendToPapeleria("history-item",x,{index:i,label:`Historia / ${x.menuId||"Sin menú"}`});data.history.items.splice(i,1);save();renderHistory();}
function deleteEmpireItem(id){
  if(String(id).startsWith("static:")){const r=window.empireRuntimeItems[id];if(!r||!confirm("¿Mover este elemento a Papelería?"))return;sendToPapeleria("empire-static",r,{staticId:id,label:`Imperio / ${r.menuName||"Catálogo"}`});data.empire.hiddenStaticIds=data.empire.hiddenStaticIds||[];if(!data.empire.hiddenStaticIds.includes(id))data.empire.hiddenStaticIds.push(id);save();renderEmpire();return;}
  const i=(data.empire.items||[]).findIndex(x=>x.id===id);if(i<0||!confirm("¿Mover este elemento a Papelería?"))return;const x=data.empire.items[i];sendToPapeleria("empire-item",x,{index:i,label:`Imperio / ${x.menuId||x.type||"Registro"}`});data.empire.items.splice(i,1);save();renderEmpire();
}

function closeModals(){ $$(".modal").forEach(m=>m.classList.add("hidden")); }


function fileToDataUrl(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error||new Error("No se pudo leer el archivo"));r.readAsDataURL(file);});}
function compressImage(file, maxSize=1400, quality=0.82){
  return new Promise((resolve,reject)=>{
    if(!file || !file.type.startsWith("image/")) return reject(new Error("Archivo no válido"));
    const reader=new FileReader();
    reader.onload=()=>{
      const img=new Image();
      img.onload=()=>{
        let w=img.width, h=img.height;
        const scale=Math.min(1,maxSize/Math.max(w,h));
        w=Math.round(w*scale); h=Math.round(h*scale);
        const canvas=document.createElement("canvas");
        canvas.width=w; canvas.height=h;
        const ctx=canvas.getContext("2d");
        ctx.drawImage(img,0,0,w,h);
        resolve(canvas.toDataURL("image/jpeg",quality));
      };
      img.onerror=()=>reject(new Error("No se pudo leer la imagen"));
      img.src=reader.result;
    };
    reader.onerror=()=>reject(new Error("No se pudo leer el archivo"));
    reader.readAsDataURL(file);
  });
}

$("#linkImageFile").addEventListener("change", async e=>{
  const file=e.target.files[0];
  if(!file) return;
  try{
    pendingLinkImage=await compressImage(file);
    $("#linkImagePreview").src=pendingLinkImage;
    $("#linkImagePreview").classList.remove("hidden");
  }catch(err){ alert("No se pudo cargar esa imagen."); }
});

$("#imageFile").addEventListener("change", async e=>{
  const file=e.target.files[0];
  if(!file) return;
  try{
    pendingGalleryImage=await compressImage(file);
    $("#imagePreview").src=pendingGalleryImage;
    $("#imagePreview").classList.remove("hidden");
  }catch(err){ alert("No se pudo cargar esa imagen."); }
});

$("#historyImageFile").addEventListener("change", async e=>{const file=e.target.files[0];if(!file)return;try{pendingHistoryImage=await compressImage(file);setPreview("#historyImagePreview",pendingHistoryImage);}catch{alert("No se pudo cargar esa imagen.");}});
$("#empireImageFile").addEventListener("change", async e=>{const file=e.target.files[0];if(!file)return;try{pendingEmpireImage=await compressImage(file);setPreview("#empireImagePreview",pendingEmpireImage);}catch{alert("No se pudo cargar esa imagen.");}});

// Enlaces directos de la portada: además de la delegación global, cada zona
// queda conectada al cargar la página. Esto evita que una capa visual o un
// cambio dinámico impida responder a los botones transparentes.
function bindHomeHotspots(){
  document.querySelectorAll(".exact-hotspots .hotspot").forEach(btn=>{
    if(btn.dataset.homeBound === "1") return;
    btn.dataset.homeBound = "1";
    btn.addEventListener("click", function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      const view=this.dataset.view;
      const filter=this.dataset.filter;
      const action=this.dataset.action;
      if(view){ showWorkspace(view); return; }
      if(filter){ showWorkspace("category", filter); return; }
      if(action === "open-profile"){ openProfile(); return; }
    });
  });
}

bindHomeHotspots();

document.addEventListener("click", e=>{
  const target = e.target instanceof Element ? e.target : null;
  if(!target) return;

  // Todos los controles de la biblioteca usan delegación para que también
  // funcionen los botones creados dinámicamente después de cada render.
  const view = target.closest("[data-view]")?.dataset.view;
  if(view){
    e.preventDefault();
    showWorkspace(view);
    return;
  }

  const filter = target.closest("[data-filter]")?.dataset.filter;
  if(filter){
    e.preventDefault();
    showWorkspace("category", filter);
    return;
  }

  const category = target.closest("[data-category]")?.dataset.category;
  if(category){
    e.preventDefault();
    showWorkspace("category", category);
    return;
  }

  const platform = target.closest("[data-platform]")?.dataset.platform;
  if(platform){
    e.preventDefault();
    showWorkspace("recents");
    $("#platformFilter").value=platform;
    renderView();
    return;
  }

  const action = target.closest("[data-action]")?.dataset.action;
  if(action){
    e.preventDefault();
    switch(action){
      case "papeleria-restore-selected": { const ids=[...document.querySelectorAll("[data-papeleria-select]:checked")].map(x=>x.value); if(!ids.length){alert("Selecciona al menos un archivo para restaurar.");return;} restorePapeleria(ids); return; }
      case "papeleria-restore-all": restorePapeleria((data.papeleria||[]).map(x=>x.id)); return;
      case "papeleria-empty": if(confirm("¿Eliminar permanentemente todo lo que está en Papelería? Esta acción no se puede deshacer.")){(data.papeleria||[]).forEach(entry=>{if(entry.kind==="empire-static"&&entry.location?.staticId&&data.empire.overrides)delete data.empire.overrides[entry.location.staticId];});data.papeleria=[];save();renderPapeleria();} return;
      case "add-empire-menu": createEmpireMenu(); return;
      case "back-empire-submenus": window.currentEmpireSubmenuId=null; renderEmpire(); return;
      case "empire-detail-close": document.querySelector("#empireDetailOverlay")?.remove(); return;
      case "empire-detail-edit": { const id=target.closest("[data-action]")?.dataset.itemId; if(id)openEmpireModal(id); document.querySelector("#empireDetailOverlay")?.remove(); return; }
      case "empire-detail-delete": { const id=target.closest("[data-action]")?.dataset.itemId; if(id)deleteEmpireItem(id); document.querySelector("#empireDetailOverlay")?.remove(); return; }
      case "add-link": openLinkModal(); return;
      case "add-image": openImageModal(); return;
      case "add-music": openMusicModal(); return;
      case "new-music-menu": openMusicCollectionModal(); return;
      case "back-music-menus": currentMusicCollectionId=null; renderMusicLibrary(); return;
      case "new-image-collection": createImageCollection(); return;
      case "new-history-menu": openHistoryMenuModal(); return;
      case "back-history-menu": currentHistoryMenuId=null; currentHistoryTrashView=false; renderHistory(); return;
       case "open-history-trash": currentHistoryTrashView=true; currentHistoryMenuId=null; renderHistory(); return;
       case "history-trash-restore-selected": { const ids=[...document.querySelectorAll("[data-trash-select]:checked")].map(x=>x.value); if(!ids.length){alert("Selecciona al menos un archivo para restaurar.");return;} restoreHistoryTrash(ids); return; }
       case "history-trash-restore-all": restoreHistoryTrash((data.history.trash||[]).map(x=>x.id)); return;
       case "history-trash-empty": if(confirm("¿Eliminar permanentemente todos los archivos de Papelería? Esta acción no se puede deshacer.")){data.history.trash=[];save();renderHistory();} return;
       case "add-history-page": { const pages=data.history.documents?.[currentHistoryMenuId]||[]; pages.push({id:crypto.randomUUID(),content:"",title:(data.history.menus||[]).find(m=>m.id===currentHistoryMenuId)?.name||"Hoja de Historia"}); data.history.documents={...(data.history.documents||{}),[currentHistoryMenuId]:pages}; save(); renderHistory(); return; }
      case "add-history": openHistoryModal(); return;
      case "add-empire": openEmpireModal(); return;
      case "edit-history-intro": editHistoryIntro(); return;
      case "edit-empire-intro": editEmpireIntro(); return;
      case "back-image-menus": currentImageCollectionId=null; renderImagesGallery(); return;
      case "close-modal": closeModals(); return;
      case "focus-search":
        showWorkspace("recents");
        setTimeout(()=>$("#globalSearch")?.focus(),50);
        return;
      case "import": $("#importFile")?.click(); return;
      case "export": exportData(); return;
      case "new-category": newCategory(); return;
      case "reset": resetData(); return;
      case "open-profile": openProfile(); return;
      case "edit-profile": openProfileEditor(); return;
      case "add-profile-photo": openProfilePhotoModal(); return;
      case "restore-backup": restoreBackup(); return;
      case "vscode-help": showVSCodeHelp(); return;
    }
  }

  const musicCollection = target.closest("[data-music-collection]")?.dataset.musicCollection;
  if(musicCollection){ e.preventDefault(); currentMusicCollectionId=musicCollection; renderMusicLibrary(); return; }

  const musicMenuEdit = target.closest("[data-music-menu-edit]")?.dataset.musicMenuEdit;
  if(musicMenuEdit){ e.preventDefault(); openMusicCollectionModal(musicMenuEdit); return; }

  const musicMenuDelete = target.closest("[data-music-menu-delete]")?.dataset.musicMenuDelete;
  if(musicMenuDelete){ e.preventDefault(); deleteMusicCollection(musicMenuDelete); return; }

  const musicEdit = target.closest("[data-music-edit]")?.dataset.musicEdit;
  if(musicEdit){ e.preventDefault(); openMusicModal(musicEdit); return; }

  const musicDelete = target.closest("[data-music-delete]")?.dataset.musicDelete;
  if(musicDelete){ e.preventDefault(); deleteMusic(musicDelete); return; }

  const imageCollection = target.closest("[data-image-collection]")?.dataset.imageCollection;
  if(imageCollection){ e.preventDefault(); currentImageCollectionId=imageCollection; renderImagesGallery(); return; }

  const imageCollectionEdit = target.closest("[data-image-collection-edit]")?.dataset.imageCollectionEdit;
  if(imageCollectionEdit){ e.preventDefault(); openImageCollectionModal(imageCollectionEdit); return; }

  const imageCollectionDelete = target.closest("[data-image-collection-delete]")?.dataset.imageCollectionDelete;
  if(imageCollectionDelete){ e.preventDefault(); deleteImageCollection(imageCollectionDelete); return; }

  const historyPageButton = target.closest("[data-history-page-action]");
  if(historyPageButton){ e.preventDefault(); historyPageAction(historyPageButton.dataset.historyPageAction,historyPageButton.dataset.pageId); return; }

  const empireSubmenu = target.closest("[data-empire-submenu]")?.dataset.empireSubmenu;
  if(empireSubmenu){ e.preventDefault(); window.currentEmpireSubmenuId=empireSubmenu; renderEmpire(); return; }
  const empireView=target.closest("[data-empire-view]")?.dataset.empireView;
  if(empireView){e.preventDefault();showEmpireDetail(empireView);return;}
  const empireMenuDelete=target.closest("[data-empire-menu-delete]")?.dataset.empireMenuDelete;
  if(empireMenuDelete){e.preventDefault();deleteEmpireMenu(empireMenuDelete);return;}
  const empireMenuEdit=target.closest("[data-empire-menu-edit]")?.dataset.empireMenuEdit;
  if(empireMenuEdit){e.preventDefault();editEmpireMenu(empireMenuEdit);return;}
  const historyMenu = target.closest("[data-history-menu]")?.dataset.historyMenu;
  if(historyMenu){ e.preventDefault(); openHistoryMenu(historyMenu); return; }

  const historyMenuEdit = target.closest("[data-history-menu-edit]")?.dataset.historyMenuEdit;
  if(historyMenuEdit){ e.preventDefault(); openHistoryMenuModal(historyMenuEdit); return; }

  const historyMenuDelete = target.closest("[data-history-menu-delete]")?.dataset.historyMenuDelete;
  if(historyMenuDelete){ e.preventDefault(); deleteHistoryMenu(historyMenuDelete); return; }

  const historyEdit = target.closest("[data-history-edit]")?.dataset.historyEdit;
  if(historyEdit){ e.preventDefault(); openHistoryModal(historyEdit); return; }

  const historyDelete = target.closest("[data-history-delete]")?.dataset.historyDelete;
  if(historyDelete){ e.preventDefault(); deleteHistoryItem(historyDelete); return; }

  const empireEdit = target.closest("[data-empire-edit]")?.dataset.empireEdit;
  if(empireEdit){ e.preventDefault(); openEmpireModal(empireEdit); return; }

  const empireDelete = target.closest("[data-empire-delete]")?.dataset.empireDelete;
  if(empireDelete){ e.preventDefault(); deleteEmpireItem(empireDelete); return; }

  const imageView = target.closest("[data-image-view]")?.dataset.imageView;
  if(imageView){ e.preventDefault(); openImageView(imageView); return; }

  const imageEdit = target.closest("[data-image-edit]")?.dataset.imageEdit;
  if(imageEdit){ e.preventDefault(); openImageModal(imageEdit); return; }

  const imageDelete = target.closest("[data-image-delete]")?.dataset.imageDelete;
  if(imageDelete){ e.preventDefault(); deleteImage(imageDelete); return; }

  const open = target.closest("[data-open]")?.dataset.open;
  if(open){ e.preventDefault(); openLink(open); return; }

  const edit = target.closest("[data-edit]")?.dataset.edit;
  if(edit){ e.preventDefault(); openLinkModal(edit); return; }

  const fav = target.closest("[data-fav]")?.dataset.fav;
  if(fav){ e.preventDefault(); toggleFavorite(fav); return; }

  const del = target.closest("[data-delete]")?.dataset.delete;
  if(del){ e.preventDefault(); deleteLink(del); return; }

  const pedit = target.closest("[data-profile-photo-edit]")?.dataset.profilePhotoEdit;
  if(pedit){ e.preventDefault(); openProfilePhotoModal(pedit); return; }

  const pdel = target.closest("[data-profile-photo-delete]")?.dataset.profilePhotoDelete;
  if(pdel){ e.preventDefault(); deleteProfilePhoto(pdel); return; }
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModals()});
$("#globalSearch").addEventListener("input",renderView);
$("#typeFilter").addEventListener("change",renderView);
$("#platformFilter").addEventListener("change",renderView);

$("#linkForm").addEventListener("submit",e=>{
  e.preventDefault();
  const id=$("#editId").value || crypto.randomUUID();
  const old=data.links.find(x=>x.id===id);
  const selectedMenu=["YouTube","Anime","Películas"].includes(currentCategory)?currentCategory:"";
  const item={id,title:$("#linkTitle").value.trim(),description:$("#linkDescription").value.trim(),
    platform:$("#linkPlatform").value,category:selectedMenu||$("#linkCategory").value,url:$("#linkUrl").value.trim(),
    image:pendingLinkImage || "",tags:$("#linkTags").value.split(",").map(x=>x.trim()).filter(Boolean),
    favorite:$("#linkFavorite").checked,createdAt:old?.createdAt||Date.now(),lastOpened:old?.lastOpened||Date.now()};
  if(old) Object.assign(old,item); else data.links.unshift(item);
  save(); closeModals(); showWorkspace("category", item.category);
});
$("#imageForm").addEventListener("submit",e=>{
  e.preventDefault();
  const id=$("#imageEditId").value;
  const old=(data.images||[]).find(x=>x.id===id);
  if(!pendingGalleryImage){ alert("Selecciona una imagen desde tu computador."); return; }
  const item={
    id:id||crypto.randomUUID(),
    title:$("#imageTitle").value.trim(),
    description:$("#imageDescription").value.trim(),
    collectionId:$("#imageCollection").value || currentImageCollectionId || "",
    collectionName:(data.imageCollections||[]).find(c=>c.id===($("#imageCollection").value || currentImageCollectionId))?.name || "",
    category:$("#imageCategory").value,
    url:pendingGalleryImage,
    createdAt:old?.createdAt||Date.now()
  };
  if(old) Object.assign(old,item); else data.images.unshift(item);
  currentImageCollectionId=item.collectionId||null;
  save(); closeModals(); showWorkspace("category","Imágenes");
});

$("#imageCollectionForm").addEventListener("submit",e=>{
  e.preventDefault(); const id=$("#imageCollectionEditId").value||crypto.randomUUID(); const old=(data.imageCollections||[]).find(x=>x.id===id);
  const name=$("#imageCollectionTitle").value.trim(); if(!name)return;
  if((data.imageCollections||[]).some(x=>x.id!==id&&x.name.toLowerCase()===name.toLowerCase())){alert("Ya existe un menú con ese nombre.");return;}
  const item={id,name,icon:$("#imageCollectionIcon").value.trim()||"👤",description:$("#imageCollectionDescription").value.trim()||`Solo muestra las imágenes de ${name}.`};
  if(old)Object.assign(old,item);else{data.imageCollections=data.imageCollections||[];data.imageCollections.push(item);} save();closeModals();currentImageCollectionId=id;renderImagesGallery();
});
$("#musicFile").addEventListener("change",async e=>{const file=e.target.files[0];if(!file)return;try{pendingMusicFile=await fileToDataUrl(file);const a=$("#musicPreview");a.src=pendingMusicFile;a.classList.remove("hidden");$("#musicUrl").value="";}catch{alert("No se pudo cargar el archivo multimedia.");}});
$("#musicSource").addEventListener("change",()=>{const source=$("#musicSource").value;$("#musicUrlWrap").classList.toggle("hidden",source!=="url");$("#musicFileWrap").classList.toggle("hidden",source!=="file");});
$("#musicForm").addEventListener("submit",e=>{
  e.preventDefault(); const id=$("#musicEditId").value||crypto.randomUUID(); const old=(data.music.items||[]).find(x=>x.id===id); const cid=$("#musicCollection").value||""; const col=(data.music.collections||[]).find(c=>c.id===cid);
  const source=$("#musicSource").value; const url=source==="url"?$("#musicUrl").value.trim():(pendingMusicFile||"");
  const item={id,title:$("#musicTitle").value.trim(),artist:$("#musicArtist").value.trim(),url,source,collectionId:cid,collectionName:col?.name||"",createdAt:old?.createdAt||Date.now()};
  if(!item.title||!item.url){alert(source==="url"?"Indica un nombre y pega el enlace del video musical o canción.":"Indica un nombre y selecciona un archivo multimedia.");return;}
  if(old)Object.assign(old,item);else data.music.items.unshift(item);save();closeModals();currentMusicCollectionId=cid||null;renderMusicLibrary();
});
$("#musicCollectionForm").addEventListener("submit",e=>{
  e.preventDefault(); const id=$("#musicCollectionEditId").value||crypto.randomUUID(); const old=(data.music.collections||[]).find(x=>x.id===id); const name=$("#musicCollectionTitle").value.trim(); if(!name)return;
  const item={id,name,icon:$("#musicCollectionIcon").value.trim()||"♫",description:$("#musicCollectionDescription").value.trim()||"Menú musical."};
  if(old)Object.assign(old,item);else data.music.collections.push(item);save();closeModals();currentMusicCollectionId=id;renderMusicLibrary();
});

$("#historyMenuForm").addEventListener("submit",e=>{
  e.preventDefault(); const id=$("#historyMenuEditId").value||crypto.randomUUID(); const old=(data.history.menus||[]).find(x=>x.id===id);
  const name=$("#historyMenuTitle").value.trim(); if(!name)return;
  if((data.history.menus||[]).some(x=>x.id!==id&&x.name.toLowerCase()===name.toLowerCase())){alert("Ya existe un menú de historia con ese nombre.");return;}
  const item={id,name,icon:$("#historyMenuIcon").value.trim()||"📁",description:$("#historyMenuDescription").value.trim()||"Menú de historia.",parentId:old?.parentId||currentHistoryMenuId||""};
  if(old)Object.assign(old,item); else data.history.menus.push(item); save(); closeModals(); currentHistoryMenuId=id; renderHistory();
});
$("#historyForm").addEventListener("submit",e=>{
  e.preventDefault();const id=$("#historyEditId").value||crypto.randomUUID();const old=(data.history.items||[]).find(x=>x.id===id);
  const item={id,type:$("#historyType").value,title:$("#historyTitle").value.trim(),description:$("#historyDescription").value.trim(),image:pendingHistoryImage||"",menuId:$("#historyMenuSelect").value||"",createdAt:old?.createdAt||Date.now()};
  if(old)Object.assign(old,item);else data.history.items.unshift(item);save();closeModals();showWorkspace("category","Historia");
});
$("#empireForm").addEventListener("submit",e=>{
  e.preventDefault();const rawId=$("#empireEditId").value;const id=rawId||crypto.randomUUID();const old=(data.empire.items||[]).find(x=>x.id===id);
  const item={id,type:$("#empireType").value,title:$("#empireTitle").value.trim(),description:$("#empireDescription").value.trim(),value:$("#empireValue").value.trim()||"No especificado",image:pendingEmpireImage||"",menuId:old?.menuId||window.currentEmpireSubmenuId||"",createdAt:old?.createdAt||Date.now()};
  if(rawId&&rawId.startsWith("static:")){data.empire.overrides=data.empire.overrides||{};data.empire.overrides[rawId]={...item,id:rawId};}
  else if(old)Object.assign(old,item);else data.empire.items.unshift(item);save();closeModals();renderEmpire();
});


function emptyState(title,description){return `<div class="empty"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(description)}</span></div>`;}
function linkCard(x){return `<article class="card"><div class="card-cover" style="${x.image?`background-image:url('${escapeHtml(x.image)}'),url('${LOCAL_IMAGE_FALLBACK}');background-size:cover;background-position:center`:''}">${x.image?'':'🔗'}</div><div class="card-body"><span class="badge">${escapeHtml(x.category||'Otros')}</span><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.description||'Sin descripción.')}</p><div class="meta"><span class="tag">${escapeHtml(x.platform||'Otros')}</span></div><div class="card-actions"><button class="small-btn" data-open="${escapeHtml(x.id)}">Abrir</button><button class="small-btn" data-edit="${escapeHtml(x.id)}">Editar</button><button class="small-btn" data-fav="${escapeHtml(x.id)}">${x.favorite?'★':'☆'}</button><button class="small-btn danger" data-delete="${escapeHtml(x.id)}">Eliminar</button></div></div></article>`;}
function imageCard(x){return `<article class="card image-card"><div class="card-cover" style="background-image:url('${escapeHtml(x.url||x.image||LOCAL_IMAGE_FALLBACK)}'),url('${LOCAL_IMAGE_FALLBACK}');background-size:cover;background-position:center"></div><div class="card-body"><span class="badge">${escapeHtml(x.collectionName||'Sin menú')}</span><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.description||'')}</p><div class="meta"><span class="tag">${escapeHtml(x.category||'Otros')}</span></div><div class="card-actions"><button class="small-btn" data-image-view="${escapeHtml(x.id)}">Ver</button><button class="small-btn" data-image-edit="${escapeHtml(x.id)}">Editar</button><button class="small-btn danger" data-image-delete="${escapeHtml(x.id)}">Eliminar</button></div></div></article>`;}
function renderMusicLibrary(){
  const m=data.music||defaultData.music; m.collections=m.collections||[]; m.items=m.items||[];
  const active=m.collections.find(c=>c.id===currentMusicCollectionId)||null;
  const items=active?m.items.filter(x=>x.collectionId===active.id):m.items;
  const menus=m.collections.map(c=>`<div class="music-menu-card"><button class="music-menu-open" data-music-collection="${escapeHtml(c.id)}"><span>${escapeHtml(c.icon||"♫")}</span><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.description||"")}</p><small>${m.items.filter(x=>x.collectionId===c.id).length} canción(es)</small></button><div class="music-menu-actions"><button class="small-btn" data-music-menu-edit="${escapeHtml(c.id)}">Editar</button><button class="small-btn danger" data-music-menu-delete="${escapeHtml(c.id)}">Eliminar</button></div></div>`).join("");
  const cards=items.map(x=>`<article class="card music-card"><div class="music-art">♫</div><div class="card-body"><span class="badge">${escapeHtml(active?.name||x.collectionName||"Música")}</span><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.artist||"Sin artista")}</p>${x.url?`<audio controls preload="metadata" src="${escapeHtml(x.url)}"></audio>`:""}<div class="card-actions"><button class="small-btn" data-music-edit="${escapeHtml(x.id)}">Editar</button><button class="small-btn danger" data-music-delete="${escapeHtml(x.id)}">Eliminar</button></div></div></article>`).join("");
  if(!active){
    $("#content").innerHTML=`<div class="special-hero music-hero"><div><span class="special-kicker">♫ ARCHIVO MUSICAL</span><h2>Música</h2><p>${escapeHtml(m.intro||"")}</p></div><div class="special-actions"><button class="primary-btn" data-action="new-music-menu">＋ Nuevo menú</button><button class="small-btn" data-action="add-music">＋ Canción</button></div></div><div class="category-grid music-menu-grid">${menus||emptyState("No hay menús de música.","Crea un menú para empezar.")}</div><div class="cards special-grid">${cards||""}</div>`;
    return;
  }
  $("#content").innerHTML=`<div class="section-head"><div><button class="small-btn" data-action="back-music-menus">← Menús</button><h2>${escapeHtml(active.icon||"♫")} ${escapeHtml(active.name)}</h2><p>${items.length} canción(es).</p></div><button class="primary-btn" data-action="add-music">＋ Agregar canción</button></div><div class="cards special-grid">${cards||emptyState("No hay canciones aquí.","Sube un archivo de audio desde tu dispositivo.")}</div>`;
}

function openMusicModal(id=null){
  const x=(data.music?.items||[]).find(a=>a.id===id);
  $("#musicModal").classList.remove("hidden"); $("#musicModalTitle").textContent=id?"Editar canción":"Agregar canción";
  $("#musicEditId").value=id||""; $("#musicTitle").value=x?.title||""; $("#musicArtist").value=x?.artist||"";
  $("#musicCollection").innerHTML=`<option value="">Sin menú</option>`+(data.music.collections||[]).map(c=>`<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)}</option>`).join("");
  $("#musicCollection").value=x?.collectionId||currentMusicCollectionId||""; $("#musicFile").value="";
  const source=x?.source||"file"; $("#musicSource").value=source; $("#musicUrl").value=source==="url"?(x?.url||""):""; pendingMusicFile=source==="file"?(x?.url||""):"";
  $("#musicUrlWrap").classList.toggle("hidden",source!=="url"); $("#musicFileWrap").classList.toggle("hidden",source!=="file");
  const a=$("#musicPreview"); if(pendingMusicFile){a.src=pendingMusicFile;a.classList.remove("hidden");}else{a.removeAttribute("src");a.classList.add("hidden");}
}
function openMusicCollectionModal(id=null){const c=(data.music.collections||[]).find(x=>x.id===id);$("#musicCollectionModal").classList.remove("hidden");$("#musicCollectionEditId").value=id||"";$("#musicCollectionTitle").value=c?.name||"";$("#musicCollectionIcon").value=c?.icon||"♫";$("#musicCollectionDescription").value=c?.description||"";}
function deleteMusicCollection(id){const i=(data.music.collections||[]).findIndex(x=>x.id===id);if(i<0)return;const c=data.music.collections[i];if(!confirm(`¿Mover el menú “${c.name}” a Papelería?`))return;sendToPapeleria("music-collection",c,{index:i,label:`Música / ${c.name}`});data.music.collections.splice(i,1);currentMusicCollectionId=null;save();renderMusicLibrary();}
function deleteMusic(id){const i=(data.music.items||[]).findIndex(x=>x.id===id);if(i<0||!confirm("¿Mover esta canción a Papelería?"))return;const x=data.music.items[i];sendToPapeleria("music",x,{index:i,label:`Música / ${x.title||"Canción"}`});data.music.items.splice(i,1);save();renderMusicLibrary();}

function renderCategories(){
  const fixed=[['Historia','📜','Capítulos, sagas, temporadas y etapas'],['Imperio','👑','Empresas, hoteles, islas y propiedades'],['Menús','▦','Tus menús personalizados'],['YouTube','▶','Videos de YouTube'],['Anime','◈','Videos y colecciones de anime'],['Películas','◉','Películas y series'],['Imágenes','🖼️','Menús independientes de fotografías'],['Música','♫','Música subida desde tu dispositivo'],['Papelería','🗑️','Archivo general para restaurar elementos eliminados'],['Recursos','◆','Herramientas, sitios y utilidades'],['Redes Sociales','◎','Redes y perfiles'],['Otros','◈','Otros enlaces']];
  const custom=data.customCategories||[];
  $("#content").innerHTML=`<div class="section-head"><div><h2>📚 Menús</h2><p>Accede a cada módulo desde su propio menú.</p></div><button class="primary-btn" data-action="new-category">＋ Nuevo menú</button></div><div class="category-grid">${fixed.map(([name,icon,desc])=>name==='Menús'?`<button class="category" data-view="categories"><span class="category-icon">${icon}</span><h3>${escapeHtml(name)}</h3><p>${escapeHtml(desc)}</p></button>`:`<button class="category" data-category="${escapeHtml(name)}"><span class="category-icon">${icon}</span><h3>${escapeHtml(name)}</h3><p>${escapeHtml(desc)}</p></button>`).join('')}${custom.map(c=>`<div class="category custom-category"><button data-category="${escapeHtml(c.name)}"><span class="category-icon">✦</span><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.description||'Categoría personalizada')}</p></button></div>`).join('')}</div>`;
}
function renderSettings(){
  $("#content").innerHTML=`<div class="special-hero"><div><span class="special-kicker">⚙️ CONFIGURACIÓN</span><h2>Configuración de WEB LIBRARY</h2><p>Gestiona copias, importación y herramientas de la biblioteca.</p></div></div><div class="cards special-grid"><article class="card special-card"><div class="card-body"><h3>💾 Copia de seguridad</h3><p>Exporta toda la información de la biblioteca a un archivo JSON.</p><button class="primary-btn" data-action="export">Exportar</button></div></article><article class="card special-card"><div class="card-body"><h3>📥 Importar</h3><p>Restaura una copia JSON previamente exportada.</p><button class="primary-btn" data-action="import">Importar</button></div></article><article class="card special-card"><div class="card-body"><h3>↩️ Copia anterior</h3><p>Recupera la última copia automática disponible.</p><button class="small-btn" data-action="restore-backup">Restaurar</button></div></article><article class="card special-card"><div class="card-body"><h3>💻 Visual Studio Code</h3><p>Abre el proyecto local para editar sus archivos.</p><button class="small-btn" data-action="vscode-help">Ayuda</button></div></article><article class="card special-card"><div class="card-body"><h3>⚠️ Restablecer</h3><p>Elimina los datos guardados en este navegador.</p><button class="small-btn danger" data-action="reset">Restablecer</button></div></article></div>`;
}
function openLinkModal(id=null){const x=data.links.find(a=>a.id===id);const menuForNew=!id&&["YouTube","Anime","Películas"].includes(currentCategory)?currentCategory:"";$("#linkModal").classList.remove('hidden');$("#linkModalTitle").textContent=id?'Editar página':'Agregar página';$("#editId").value=id||'';$("#linkTitle").value=x?.title||'';$("#linkDescription").value=x?.description||'';$("#linkPlatform").value=x?.platform||'Otros';$("#linkCategory").value=x?.category||menuForNew||'Otros';$("#linkUrl").value=x?.url||'';$("#linkTags").value=(x?.tags||[]).join(', ');$("#linkFavorite").checked=!!x?.favorite;pendingLinkImage=x?.image||'';$("#linkImageFile").value='';setPreview('#linkImagePreview',pendingLinkImage);}
function openImageModal(id=null){const x=(data.images||[]).find(a=>a.id===id);$("#imageModal").classList.remove('hidden');$("#imageModalTitle").textContent=id?'Editar imagen':'Agregar imagen';$("#imageEditId").value=id||'';$("#imageTitle").value=x?.title||'';$("#imageDescription").value=x?.description||'';$("#imageCategory").value=x?.category||'Otros';$("#imageCollection").innerHTML=`<option value="">Sin menú</option>`+(data.imageCollections||[]).map(c=>`<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)}</option>`).join('');$("#imageCollection").value=x?.collectionId||currentImageCollectionId||'';pendingGalleryImage=x?.url||x?.image||'';$("#imageFile").value='';setPreview('#imagePreview',pendingGalleryImage);}
function openImageView(id){const x=(data.images||[]).find(a=>a.id===id);if(!x)return;$("#imageViewModal").classList.remove('hidden');$("#imageViewFull").src=x.url||x.image||'';$("#imageViewTitle").textContent=x.title||'';$("#imageViewDescription").textContent=x.description||'';$("#imageViewCollection").textContent=x.collectionName||'Sin menú';$("#imageViewCategory").textContent=x.category||'Otros';}
function openImageCollectionModal(id=null){const c=(data.imageCollections||[]).find(x=>x.id===id);$("#imageCollectionModal").classList.remove('hidden');$("#imageCollectionModalTitle").textContent=id?'Editar menú de imágenes':'Nuevo menú de imágenes';$("#imageCollectionEditId").value=id||'';$("#imageCollectionTitle").value=c?.name||'';$("#imageCollectionIcon").value=c?.icon||'👤';$("#imageCollectionDescription").value=c?.description||'';}
function createImageCollection(){openImageCollectionModal();}
function deleteImageCollection(id){const i=(data.imageCollections||[]).findIndex(x=>x.id===id);if(i<0)return;const c=data.imageCollections[i];if(!confirm(`¿Mover el menú “${c.name}” a Papelería?`))return;sendToPapeleria("image-collection",c,{index:i,label:`Imágenes / ${c.name}`});data.imageCollections.splice(i,1);if(currentImageCollectionId===id)currentImageCollectionId=null;save();renderImagesGallery();}
function openLink(id){const x=data.links.find(a=>a.id===id);if(!x)return;x.lastOpened=Date.now();save();window.open(safeUrl(x.url),'_blank','noopener');}
function showProfileFromHome(){openProfile();}

function linesToArray(value){
  return String(value||"").split(/\n+/).map(x=>x.trim()).filter(Boolean);
}
function arrayToLines(arr){ return (arr||[]).join("\n"); }
function renderStatsEditor(){
  const stats=(data.profile?.stats||[]);
  $("#profileStatsEditor").innerHTML=stats.map((st,i)=>`<div class="stat-editor-row"><input data-stat-name="${i}" value="${escapeHtml(st.name||"")}" placeholder="Nombre"><input data-stat-value="${i}" type="number" min="0" max="999999" value="${Number(st.value)||0}" placeholder="Valor"><button type="button" class="small-btn danger" data-stat-delete="${i}">Eliminar</button></div>`).join("")+`<button type="button" class="small-btn" id="addStatBtn">＋ Agregar atributo</button>`;
  $$("[data-stat-delete]").forEach(btn=>btn.addEventListener("click",()=>{const i=Number(btn.dataset.statDelete);const item=data.profile.stats[i];if(item){sendToPapeleria("profile-stat",item,{index:i,label:"Perfil / Atributos"});data.profile.stats.splice(i,1);save();}renderStatsEditor();}));
  $("#addStatBtn")?.addEventListener("click",()=>{data.profile.stats.push({name:"Nuevo atributo",value:0});renderStatsEditor();});
}
function renderCustomSectionsEditor(){
  const list=data.profile?.customSections||[];
  $("#customSectionsEditor").innerHTML=list.map((sec,i)=>`<div class="custom-editor-item"><div class="two-col"><label>Título<input data-custom-title="${i}" value="${escapeHtml(sec.title||"")}"></label><label>Icono<input data-custom-icon="${i}" value="${escapeHtml(sec.icon||"✦")}"></label></div><label>Contenido<textarea data-custom-content="${i}" rows="4">${escapeHtml(sec.content||"")}</textarea></label><button type="button" class="small-btn danger" data-custom-delete="${i}">🗑️ Eliminar sección</button></div>`).join("");
  $$("[data-custom-delete]").forEach(btn=>btn.addEventListener("click",()=>{const i=Number(btn.dataset.customDelete);const item=data.profile.customSections[i];if(item){sendToPapeleria("profile-section",item,{index:i,label:"Perfil / Secciones personalizadas"});data.profile.customSections.splice(i,1);save();}renderCustomSectionsEditor();}));
}
function readStatsEditor(){
  return $$(".stat-editor-row").map(row=>({name:row.querySelector("[data-stat-name]")?.value.trim()||"Atributo",value:Number(row.querySelector("[data-stat-value]")?.value)||0}));
}
$("#profileEditForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const p=data.profile||structuredClone(defaultData.profile);
  p.name=$("#profileEditName").value.trim()||"Akira Ren";
  p.subtitle=$("#profileEditSubtitle").value.trim();
  p.biography=$("#profileEditBiography").value.trim();
  p.title=$("#profileEditTitle").value.trim();
  p.titleDescription=$("#profileEditTitleDescription").value.trim();
  p.libraryDescription=$("#profileEditLibraryDescription").value.trim();
  p.identity={level:$("#profileEditLevel").value.trim(),className:$("#profileEditClass").value.trim(),age:$("#profileEditAge").value.trim(),species:$("#profileEditSpecies").value.trim(),alignment:$("#profileEditAlignment").value.trim()};
  p.stats=readStatsEditor();
  p.powers=linesToArray($("#profileEditPowers").value);
  p.skills=linesToArray($("#profileEditSkills").value);
  p.characteristics=linesToArray($("#profileEditCharacteristics").value);
  p.life=linesToArray($("#profileEditLife").value);
  p.equipment=linesToArray($("#profileEditEquipment").value);
  p.achievements=linesToArray($("#profileEditAchievements").value);
  p.customSections=$$(".custom-editor-item").map((el,i)=>({id:p.customSections?.[i]?.id||crypto.randomUUID(),title:el.querySelector("[data-custom-title]")?.value.trim()||"Nueva sección",icon:el.querySelector("[data-custom-icon]")?.value.trim()||"✦",content:el.querySelector("[data-custom-content]")?.value.trim()||""}));
  const file=$("#profileCharacterImageFile").files[0];
  if(file){ try{p.characterImage=await compressImage(file,1600,.84);}catch{alert("No se pudo cargar la imagen principal.");return;} }
  data.profile=p;
  save(); closeModals(); openProfile();
});

$("#addCustomSectionBtn").addEventListener("click",()=>{data.profile=data.profile||structuredClone(defaultData.profile);data.profile.customSections=data.profile.customSections||[];data.profile.customSections.push({id:crypto.randomUUID(),title:"Nueva sección",icon:"✦",content:"Escribe aquí la información del personaje."});renderCustomSectionsEditor();});

$("#profileCharacterImageFile").addEventListener("change",async e=>{
  const file=e.target.files[0]; if(!file)return;
  try{const preview=await compressImage(file,1600,.84);$("#profileCharacterImagePreview").src=preview;}catch{alert("No se pudo previsualizar la imagen.");}
});

$("#profilePhotoFile").addEventListener("change",async e=>{
  const file=e.target.files[0]; if(!file)return;
  try{pendingProfilePhoto=await compressImage(file);$("#profilePhotoPreview").src=pendingProfilePhoto;$("#profilePhotoPreview").classList.remove("hidden");}
  catch(err){alert("No se pudo cargar esa foto.");}
});
$("#profilePhotoForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(!pendingProfilePhoto){alert("Selecciona una foto.");return;}
  data.profile=data.profile||structuredClone(defaultData.profile); data.profile.photos=data.profile.photos||[];
  const id=$("#profilePhotoEditId").value; const old=data.profile.photos.find(x=>x.id===id);
  const item={id:id||crypto.randomUUID(),title:$("#profilePhotoTitle").value.trim()||"Foto de Akira Ren",description:$("#profilePhotoDescription").value.trim(),image:pendingProfilePhoto,createdAt:old?.createdAt||Date.now()};
  if(old) Object.assign(old,item); else data.profile.photos.unshift(item);
  save(); closeModals(); openProfile();
});

$("#importFile").addEventListener("change",e=>{
  const file=e.target.files[0]; if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{try{const x=JSON.parse(reader.result);const imported=x.data||x;if(!imported.links)throw Error();data={...structuredClone(defaultData),...imported};save();showWorkspace("settings");alert("Biblioteca importada correctamente.");}catch{alert("El archivo no tiene un formato válido.");}};
  reader.readAsText(file); e.target.value="";
});

function renderProfileStats(){
  const stats=data.profile?.stats||[];
  $("#profileStats").innerHTML=stats.map(st=>`<div class="stat-bar"><div class="stat-label"><span>${escapeHtml(st.name)}</span><b>${escapeHtml(st.value)}</b></div><div class="bar"><i style="width:${Math.min(100,Math.max(0,Number(st.value)||0))}%"></i></div></div>`).join("");
}
function renderChipList(selector,items,icon="◆"){
  $(selector).innerHTML=(items||[]).map(x=>`<span class="profile-chip">${icon} ${escapeHtml(x)}</span>`).join("")||`<span class="muted">Sin registros.</span>`;
}
function renderProfileTimeline(){
  $("#profileLife").innerHTML=(data.profile?.life||[]).map((x,i)=>`<div class="timeline-item"><span>${String(i+1).padStart(2,"0")}</span><p>${escapeHtml(x)}</p></div>`).join("")||`<span class="muted">Sin etapas registradas.</span>`;
}
function renderProfileAchievements(){
  $("#profileAchievements").innerHTML=(data.profile?.achievements||[]).map((x,i)=>`<article class="achievement-card"><strong>🏆 ${String(i+1).padStart(2,"0")}</strong><p>${escapeHtml(x)}</p></article>`).join("")||`<span class="muted">Sin logros registrados.</span>`;
}
function renderProfileCustomSections(){
  const list=data.profile?.customSections||[];
  $("#profileCustomSections").innerHTML=list.length?list.map((x,i)=>`<article class="custom-profile-section"><div class="custom-section-head"><span>${escapeHtml(x.icon||"✦")}</span><h4>${escapeHtml(x.title||"Sección")}</h4></div><div>${escapeHtml(x.content||"").split(/\n+/).filter(Boolean).map(p=>`<p>${p}</p>`).join("")}</div></article>`).join(""):`<div class="empty"><strong>Archivo preparado.</strong><span>Usa “Agregar nueva sección” en Editar ficha para ampliar el personaje sin límite.</span></div>`;
}
function renderProfileIdentity(){
  const id=data.profile?.identity||{};
  const items=[['NIVEL',id.level],['CLASE',id.className],['EDAD',id.age],['ESPECIE',id.species],['ALINEACIÓN',id.alignment]];
  $("#profileIdentity").innerHTML=items.map(([a,b])=>`<div class="identity-item"><small>${a}</small><strong>${escapeHtml(b||"—")}</strong></div>`).join("");
}
function openProfile(){
  const p=data.profile||defaultData.profile;
  $("#profileModal").classList.remove("hidden");
  $("#profileCharacterImage").src=p.characterImage||"Akira Ren - Ficha del Personaje.png";
  $("#profileName").textContent=p.name||"Akira Ren";
  $("#profileSubtitle").textContent=p.subtitle||"Soberano de tu mundo digital 👑";
  $("#profileBiography").innerHTML=(p.biography||"").split(/\n+/).filter(Boolean).map(x=>`<p>${escapeHtml(x)}</p>`).join("");
  $("#profileTitle").textContent=p.title||"Guardián Nocturno";
  $("#profileTitleDescription").textContent=p.titleDescription||"";
  $("#profileLibraryDescription").textContent=p.libraryDescription||"";
  $("#profileLinks").textContent=data.links.length;
  $("#profileFavorites").textContent=data.links.filter(x=>x.favorite).length;
  $("#profileImages").textContent=data.images.length+(p.photos||[]).length;
  renderProfileIdentity(); renderProfileStats();
  renderChipList("#profilePowers",p.powers,"⚡");
  renderChipList("#profileSkills",p.skills,"◈");
  renderChipList("#profileCharacteristics",p.characteristics,"✦");
  renderChipList("#profileEquipment",p.equipment,"♜");
  renderProfileTimeline(); renderProfileAchievements(); renderProfileCustomSections(); renderProfilePhotos();
}
function openProfileEditor(){
  const p=data.profile||defaultData.profile;
  $("#profileEditModal").classList.remove("hidden");
  $("#profileEditName").value=p.name||"";
  $("#profileEditSubtitle").value=p.subtitle||"";
  $("#profileEditLevel").value=p.identity?.level||"";
  $("#profileEditClass").value=p.identity?.className||"";
  $("#profileEditAge").value=p.identity?.age||"";
  $("#profileEditSpecies").value=p.identity?.species||"";
  $("#profileEditAlignment").value=p.identity?.alignment||"";
  $("#profileEditBiography").value=p.biography||"";
  $("#profileEditTitle").value=p.title||"";
  $("#profileEditTitleDescription").value=p.titleDescription||"";
  $("#profileEditLibraryDescription").value=p.libraryDescription||"";
  $("#profileEditPowers").value=arrayToLines(p.powers);
  $("#profileEditSkills").value=arrayToLines(p.skills);
  $("#profileEditCharacteristics").value=arrayToLines(p.characteristics);
  $("#profileEditLife").value=arrayToLines(p.life);
  $("#profileEditEquipment").value=arrayToLines(p.equipment);
  $("#profileEditAchievements").value=arrayToLines(p.achievements);
  $("#profileCharacterImageFile").value="";
  $("#profileCharacterImagePreview").src=p.characterImage||"Akira Ren - Ficha del Personaje.png";
  renderStatsEditor(); renderCustomSectionsEditor();
}
function renderProfilePhotos(){
  const photos=data.profile?.photos||[];
  $("#profilePhotos").innerHTML=photos.length ? photos.map((x,i)=>`<article class="profile-photo"><img src="${escapeHtml(x.image)}" alt="${escapeHtml(x.title)}"><div class="profile-photo-body"><h4>${escapeHtml(x.title)}</h4><p>${escapeHtml(x.description||"")}</p><div class="card-actions"><button class="small-btn" data-profile-photo-edit="${x.id}">Editar</button><button class="small-btn danger" data-profile-photo-delete="${x.id}">Eliminar</button></div></div></article>`).join("") : `<div class="empty"><strong>No hay fotos en la biografía.</strong><span>Agrega la primera foto de Akira Ren.</span></div>`;
}
function openProfilePhotoModal(id=null){
  const x=(data.profile?.photos||[]).find(a=>a.id===id);
  $("#profilePhotoModal").classList.remove("hidden");
  $("#profilePhotoEditId").value=id||"";
  $("#profilePhotoTitle").value=x?.title||"";
  $("#profilePhotoDescription").value=x?.description||"";
  $("#profilePhotoFile").value="";
  pendingProfilePhoto=x?.image||"";
  const preview=$("#profilePhotoPreview");
  if(pendingProfilePhoto){preview.src=pendingProfilePhoto;preview.classList.remove("hidden");}else{preview.removeAttribute("src");preview.classList.add("hidden");}
}
function deleteProfilePhoto(id){
  const i=(data.profile.photos||[]).findIndex(x=>x.id===id);if(i<0||!confirm("¿Mover esta foto de la biografía a Papelería?"))return;const item=data.profile.photos[i];sendToPapeleria("profile-photo",item,{index:i,label:"Perfil / Fotografías"});data.profile.photos.splice(i,1);save();openProfile();
}
function restoreBackup(){
  const old=localStorage.getItem(STORAGE_KEY+"_previous");
  if(!old){alert("No hay una copia automática anterior disponible.");return;}
  if(confirm("¿Restaurar la última copia automática? Los cambios actuales serán reemplazados.")){
    try{data=JSON.parse(old);hydrateStoredImages(data).then(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(createStorageSafeData(data)));showWorkspace("settings");alert("Copia restaurada correctamente.");});}catch{alert("La copia automática está dañada.");}
  }
}
function showVSCodeHelp(){
  alert(`PARA ABRIR LA PÁGINA EN VISUAL STUDIO CODE:

1. Descomprime el ZIP.
2. Abre Visual Studio Code.
3. Ve a Archivo > Abrir carpeta.
4. Selecciona la carpeta Web_Library_Akira_Ren.
5. Abre index.html para editarla.

También encontrarás un archivo .code-workspace y un .bat para facilitar la apertura en Windows.`);
}
function toggleFavorite(id){const x=data.links.find(a=>a.id===id);if(x){x.favorite=!x.favorite;save();renderView()}}
function deleteLink(id){const i=data.links.findIndex(x=>x.id===id);if(i<0||!confirm("¿Mover esta página a Papelería?"))return;const x=data.links[i];sendToPapeleria("link",x,{index:i,label:`${x.category||"Biblioteca"} / ${x.title}`});data.links.splice(i,1);save();renderView()}
function deleteImage(id){
  const i=(data.images||[]).findIndex(x=>x.id===id); if(i<0||!confirm("¿Mover esta imagen a Papelería?"))return;
  const x=data.images[i];sendToPapeleria("image",x,{index:i,label:`Imágenes / ${x.title||"Imagen"}`});data.images.splice(i,1);save();renderView();
}
function newCategory(){
  const name=prompt("Nombre de la nueva categoría:");
  if(!name?.trim())return;
  const description=prompt("Descripción de la categoría:")||"Categoría personalizada";
  data.customCategories.push({name:name.trim(),description});save();renderCategories();
}
function exportData(){
  const backup={version:"3.0",project:"WEB LIBRARY — Akira Ren",exportedAt:new Date().toISOString(),data};
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="web-library-akira-ren-backup.json";a.click();URL.revokeObjectURL(a.href);
}
function resetData(){
  if(confirm("Esto eliminará los datos guardados en este navegador. ¿Continuar?")){data=structuredClone(defaultData);save();showWorkspace("settings")}
}


// Sincronización inicial: la página primero funciona localmente y después
// sustituye los datos por la copia compartida de Supabase cuando está configurada.
hydrateStoredImages(data).then(()=>renderView());
initializeCloud();

// Si una imagen remota falla, intentamos recuperar una copia local cuando exista.
document.addEventListener("error", async (event)=>{
  const el=event.target;
  if(!(el instanceof HTMLImageElement)) return;
  const ref=el.dataset.idbFallback;
  if(!ref || el.dataset.fallbackTried) return;
  el.dataset.fallbackTried="1";
  const local=await getStoredImage(ref);
  if(local) el.src=local;
}, true);
