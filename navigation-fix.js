/* WEB LIBRARY — Navegación independiente de seguridad.
   No depende de Supabase ni de ningún módulo externo. */
(function(){
  'use strict';

  function qs(s){ return document.querySelector(s); }
  function qsa(s){ return Array.prototype.slice.call(document.querySelectorAll(s)); }

  function go(view, category){
    var home=qs('#home'), workspace=qs('#workspace');
    if(!home || !workspace) return;

    home.classList.toggle('hidden', view !== 'home');
    workspace.classList.toggle('hidden', view === 'home');

    if(view === 'home') return;

    var title=qs('#workspaceTitle');
    if(title){
      var titles={categories:'Categorías',favorites:'Favoritos',recents:'Páginas recientes',settings:'Configuración'};
      title.textContent=category ? 'Categoría: '+category : (titles[view] || 'Biblioteca');
    }

    // Si app.js está cargado, dejamos que use sus renderizadores reales.
    if(typeof window.showWorkspace === 'function'){
      try { window.showWorkspace(view, category || null); return; } catch(err) { console.warn('Navegación: showWorkspace falló',err); }
    }

    // Respaldo visual mínimo si otro script tuvo un error.
    var content=qs('#content');
    if(!content) return;
    var label=category || ({categories:'Categorías',favorites:'Favoritos',recents:'Páginas recientes',settings:'Configuración'}[view] || 'Biblioteca');
    content.innerHTML='<div class="section-head"><div><h2>'+escapeHtml(label)+'</h2><p>Sección abierta correctamente.</p></div></div>';
  }

  function escapeHtml(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];});
  }

  function profile(){
    if(typeof window.openProfile === 'function'){
      try { window.openProfile(); return; } catch(err) { console.warn('Perfil:',err); }
    }
    var home=qs('#home'), workspace=qs('#workspace');
    if(home) home.classList.add('hidden');
    if(workspace) workspace.classList.remove('hidden');
    var title=qs('#workspaceTitle'); if(title) title.textContent='Perfil de Akira Ren';
  }

  function handle(btn,e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var view=btn.getAttribute('data-view');
    var filter=btn.getAttribute('data-filter');
    var action=btn.getAttribute('data-action');
    if(action === 'open-profile'){ profile(); return; }
    if(filter){ go('category',filter); return; }
    if(view){ go(view,null); return; }
  }

  function bind(){
    qsa('.exact-hotspots .hotspot').forEach(function(btn){
      if(btn.dataset.navFixBound==='1') return;
      btn.dataset.navFixBound='1';
      btn.addEventListener('click',function(e){handle(btn,e)},true);
      btn.addEventListener('pointerup',function(e){
        // Evita que un elemento superpuesto se quede con el clic.
        if(e.pointerType !== 'mouse') handle(btn,e);
      },true);
    });

    // Delegación adicional para los controles del resto de la aplicación.
    document.addEventListener('click',function(e){
      var el=e.target && e.target.closest ? e.target.closest('[data-view],[data-filter],[data-action="open-profile"]') : null;
      if(!el || el.closest('.exact-hotspots')) return;
      var view=el.getAttribute('data-view'), filter=el.getAttribute('data-filter'), action=el.getAttribute('data-action');
      if(action==='open-profile'){ e.preventDefault(); profile(); return; }
      if(filter){ e.preventDefault(); go('category',filter); return; }
      if(view){ e.preventDefault(); go(view,null); }
    },true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind);
  else bind();
  window.WLNavigationFix={go:go,profile:profile,bind:bind};
})();
