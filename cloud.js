(function(){
  const cfg = window.AKIRA_SUPABASE_CONFIG || {};
  const enabled = !!(window.supabase && cfg.url && cfg.anonKey && !cfg.url.includes("PEGA_AQUI"));
  let client = null;
  if(enabled) client = window.supabase.createClient(cfg.url, cfg.anonKey);
  const bucket = cfg.bucket || "akira-ren-media";
  const documentId = cfg.documentId || "akira-ren-main-library";

  function extForMime(mime){
    const m=(mime||"").toLowerCase();
    const map={
      "image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/gif":"gif","image/bmp":"bmp","image/svg+xml":"svg",
      "audio/mpeg":"mp3","audio/mp3":"mp3","audio/wav":"wav","audio/x-wav":"wav","audio/ogg":"ogg","audio/webm":"webm","audio/mp4":"m4a",
      "video/mp4":"mp4","video/webm":"webm"
    };
    return map[m]||"bin";
  }

  async function idbRead(key){
    try{
      if(!window.indexedDB) return "";
      const db=await new Promise((resolve,reject)=>{
        const req=indexedDB.open("AkiraRenImageDB",1);
        req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("images"))req.result.createObjectStore("images");};
        req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);
      });
      return await new Promise((resolve,reject)=>{
        const tx=db.transaction("images","readonly"), req=tx.objectStore("images").get(key);
        req.onsuccess=()=>{db.close();resolve(req.result||"")};
        req.onerror=()=>{db.close();reject(req.error)};
      });
    }catch{return "";}
  }

  async function resolveMediaValue(value){
    if(typeof value!=="string") return value;
    if(value.startsWith("idb-image:")) return await idbRead(value.slice("idb-image:"));
    return value;
  }

  async function uploadDataUrl(dataUrl,pathHint){
    if(!client || typeof dataUrl!=="string" || !dataUrl.startsWith("data:")) return dataUrl;
    const blob=await fetch(dataUrl).then(r=>r.blob());
    if(!blob.size) throw new Error("El archivo multimedia está vacío.");
    const ext=extForMime(blob.type);
    const path=`${pathHint}.${ext}`;
    const {error}=await client.storage.from(bucket).upload(path,blob,{upsert:true,contentType:blob.type||undefined,cacheControl:"31536000"});
    if(error) throw error;
    const {data,error:urlError}=client.storage.from(bucket).getPublicUrl(path);
    if(urlError) throw urlError;
    if(!data?.publicUrl) throw new Error("Supabase no devolvió una URL pública para el archivo.");
    return data.publicUrl;
  }

  async function preparePayload(payload){
    if(!client) return payload;
    const copy=structuredClone(payload);
    const tasks=[];
    const uploadField=async(obj,field,folder,id)=>{
      if(!obj || typeof obj[field]!=="string") return;
      const resolved=await resolveMediaValue(obj[field]);
      if(typeof resolved!=="string" || !resolved.startsWith("data:")){
        if(resolved && resolved!==obj[field]) obj[field]=resolved;
        return;
      }
      const safeId=String(id||crypto.randomUUID()).replace(/[^a-zA-Z0-9_-]/g,"_");
      obj[field]=await uploadDataUrl(resolved,`${folder}/${safeId}`);
    };
    const queue=(obj,field,folder,id)=>tasks.push(uploadField(obj,field,folder,id));

    (copy.links||[]).forEach(x=>queue(x,"image","links",x.id));
    (copy.images||[]).forEach(x=>{queue(x,"url","images",x.id); if(x.image) queue(x,"image","images",`${x.id}-image`);});
    (copy.history?.items||[]).forEach(x=>queue(x,"image","history",x.id));
    (copy.empire?.items||[]).forEach(x=>queue(x,"image","empire",x.id));
    Object.entries(copy.empire?.overrides||{}).forEach(([id,x])=>queue(x,"image","empire-overrides",id));
    (copy.papeleria||[]).forEach(x=>{if(x.item){queue(x.item,"image","papeleria",x.id);queue(x.item,"url","papeleria",`${x.id}-url`);}});
    (copy.profile?.photos||[]).forEach(x=>queue(x,"image","profile/photos",x.id));
    queue(copy.profile,"characterImage","profile","character");
    (copy.music?.items||[]).forEach(x=>queue(x,"url","music",x.id));

    await Promise.all(tasks);
    return copy;
  }

  window.WLCloud={
    enabled,bucket,documentId,
    async load(){
      if(!client) return null;
      const {data,error}=await client.from("akira_ren_library").select("data,updated_at").eq("id",documentId).maybeSingle();
      if(error) throw error;
      if(!data || !data.data || typeof data.data!=="object") return null;
      return data.data;
    },
    async save(payload){
      if(!client) return false;
      const cloudPayload=await preparePayload(payload);
      const {error}=await client.from("akira_ren_library").upsert({id:documentId,data:cloudPayload,updated_at:new Date().toISOString()},{onConflict:"id"});
      if(error) throw error;
      return true;
    },
    preparePayload
  };
})();
