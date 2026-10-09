WEB LIBRARY — AKIRA REN v4

1. Descomprime el ZIP y abre index.html o usa ABRIR_EN_VISUAL_STUDIO_CODE.bat.
2. La portada usa una imagen cinematográfica animada tipo video (zoom, movimiento y partículas) basada en Akira Ren como emperador.
3. Los menús principales son: Historia, Imperio, Menús, Videos de YouTube, Anime, Películas, Imágenes y Música.
4. Imágenes: puedes crear múltiples menús independientes (Akira Ren, Amelie, etc.) y subir las fotos directamente desde el dispositivo, sin URL.
5. Música: puedes crear múltiples menús y subir archivos de audio directamente desde el dispositivo, sin URL.
6. Historia conserva la estructura de menús y submenús para sagas, temporadas, capítulos y etapas.
7. Imperio permanece dentro del módulo Imperio.
8. Supabase: ejecuta supabase.sql completo en SQL Editor. El archivo configura la tabla compartida y el bucket público akira-ren-media.
9. supabase-config.js ya contiene la URL, la clave pública y el documentId del proyecto configurado en esta versión.
10. Las imágenes y audios nuevos se suben a Supabase Storage; los enlaces e información se guardan en la tabla akira_ren_library. Así, al abrir la biblioteca en otro dispositivo, se recuperan los mismos datos y archivos.

NOTA DE SEGURIDAD:
Esta versión permite lectura y escritura pública para que funcione sin inicio de sesión, tal como el proyecto actual. Si la biblioteca se publica en internet, conviene agregar Supabase Auth y restringir las políticas de escritura.
