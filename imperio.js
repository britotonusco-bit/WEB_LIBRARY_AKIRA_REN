

/* =========================================================
   IMÁGENES DE RESPALDO
========================================================= */

const LOCAL_IMAGE_FALLBACK = "imagen-respaldo-biblioteca.png";

const IMG = {

    space:
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=85",

    city:
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=85",

    building:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",

    mansion:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",

    house:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",

    island:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",

    car:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",

    plane:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",

    earth:
    "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1200&q=85",

    mars:
    "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=85",

    food:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85",

    technology:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",

    factory:
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85",

    luxury:
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",

    sports:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85",

    restaurant:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",

    train:
    "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=85",

    ship:
    "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1200&q=85",

    hotel:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",

    satellite:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85"
};


/* =========================================================
   REFERENCIAS REALES
========================================================= */

const realReferences = [

/* EMPRESAS */

["Nvidia","Empresa","Estados Unidos","Tecnología y semiconductores",IMG.technology],
["Apple","Empresa","Estados Unidos","Tecnología y electrónica",IMG.technology],
["Microsoft","Empresa","Estados Unidos","Software y tecnología",IMG.technology],
["Alphabet / Google","Empresa","Estados Unidos","Internet y tecnología",IMG.technology],
["Amazon","Empresa","Estados Unidos","Comercio y tecnología",IMG.building],
["Meta","Empresa","Estados Unidos","Tecnología y plataformas digitales",IMG.technology],
["Tesla","Empresa","Estados Unidos","Automóviles y energía",IMG.car],
["Samsung","Empresa","Corea del Sur","Electrónica y tecnología",IMG.technology],
["Toyota","Empresa","Japón","Automóviles",IMG.car],
["Sony","Empresa","Japón","Electrónica y entretenimiento",IMG.technology],
["Intel","Empresa","Estados Unidos","Semiconductores",IMG.technology],
["IBM","Empresa","Estados Unidos","Tecnología",IMG.technology],
["Oracle","Empresa","Estados Unidos","Software",IMG.technology],
["Cisco","Empresa","Estados Unidos","Redes",IMG.technology],
["ASML","Empresa","Países Bajos","Equipos para semiconductores",IMG.technology],
["TSMC","Empresa","Taiwán","Semiconductores",IMG.technology],
["SpaceX","Empresa","Estados Unidos","Espacio",IMG.space],
["Saudi Aramco","Empresa","Arabia Saudita","Energía",IMG.factory],
["Shell","Empresa","Global","Energía",IMG.factory],
["ExxonMobil","Empresa","Estados Unidos","Energía",IMG.factory],
["Coca-Cola","Empresa","Global","Bebidas",IMG.food],
["PepsiCo","Empresa","Global","Alimentos y bebidas",IMG.food],
["Nestlé","Empresa","Suiza","Alimentos",IMG.food],
["LVMH","Empresa","Francia","Lujo",IMG.luxury],
["Walmart","Empresa","Estados Unidos","Comercio",IMG.building],
["Berkshire Hathaway","Empresa","Estados Unidos","Inversiones",IMG.building],
["BlackRock","Empresa","Estados Unidos","Inversiones",IMG.building],
["JPMorgan Chase","Empresa","Estados Unidos","Finanzas",IMG.building],
["Johnson & Johnson","Empresa","Estados Unidos","Salud",IMG.building],
["UnitedHealth Group","Empresa","Estados Unidos","Salud",IMG.building],
["Siemens","Empresa","Alemania","Industria",IMG.factory],
["General Electric","Empresa","Estados Unidos","Industria",IMG.factory],
["Mitsubishi","Empresa","Japón","Industria",IMG.factory],
["Novo Nordisk","Empresa","Dinamarca","Biotecnología y salud",IMG.technology],

/* COLOMBIA */

["Ecopetrol","Empresa","Colombia","Energía",IMG.factory],
["Bancolombia","Empresa","Colombia","Finanzas",IMG.building],
["Grupo Aval","Empresa","Colombia","Finanzas",IMG.building],
["Grupo Sura","Empresa","Colombia","Finanzas y seguros",IMG.building],
["Grupo Nutresa","Empresa","Colombia","Alimentos",IMG.food],
["Grupo Argos","Empresa","Colombia","Infraestructura",IMG.building],
["Cementos Argos","Empresa","Colombia","Construcción",IMG.factory],
["ISA","Empresa","Colombia","Infraestructura energética",IMG.factory],
["Terpel","Empresa","Colombia","Energía y combustibles",IMG.factory],
["Alpina","Empresa","Colombia","Alimentos",IMG.food],
["Postobón","Empresa","Colombia","Bebidas",IMG.food],
["Rappi","Empresa","Colombia","Tecnología y comercio",IMG.technology],
["Avianca","Empresa","Colombia","Transporte aéreo",IMG.plane],
["Banco de Bogotá","Banco","Colombia","Banca",IMG.building],
["Banco de Occidente","Banco","Colombia","Banca",IMG.building],
["Davivienda","Banco","Colombia","Banca",IMG.building],

/* BANCOS */

["JPMorgan Chase","Banco","Estados Unidos","Banca internacional",IMG.building],
["Bank of America","Banco","Estados Unidos","Banca",IMG.building],
["ICBC","Banco","China","Banca",IMG.building],
["Wells Fargo","Banco","Estados Unidos","Banca",IMG.building],
["Citigroup","Banco","Estados Unidos","Banca",IMG.building],
["HSBC","Banco","Reino Unido","Banca internacional",IMG.building],
["UBS","Banco","Suiza","Banca",IMG.building],
["BNP Paribas","Banco","Francia","Banca",IMG.building],
["Santander","Banco","España","Banca",IMG.building],
["BBVA","Banco","España","Banca",IMG.building],
["Bancolombia","Banco","Colombia","Banca",IMG.building],
["Davivienda","Banco","Colombia","Banca",IMG.building],

/* COMERCIO */

["Éxito","Comercio","Colombia","Supermercados",IMG.building],
["Carulla","Comercio","Colombia","Supermercados",IMG.building],
["Olímpica","Comercio","Colombia","Supermercados",IMG.building],
["D1","Comercio","Colombia","Retail",IMG.building],
["Ara","Comercio","Colombia","Retail",IMG.building],
["Alkosto","Comercio","Colombia","Electrónica y retail",IMG.technology],
["Ktronix","Comercio","Colombia","Electrónica",IMG.technology],
["Falabella","Comercio","Colombia","Retail",IMG.building],
["Homecenter","Comercio","Colombia","Hogar y construcción",IMG.building],
["Jumbo","Comercio","Colombia","Supermercados",IMG.building],
["Costco","Comercio","Estados Unidos","Retail",IMG.building],
["Carrefour","Comercio","Francia","Retail",IMG.building],
["IKEA","Comercio","Suecia","Hogar",IMG.building],
["Zara","Comercio","España","Moda",IMG.luxury],

/* TELECOMUNICACIONES */

["Claro","Telecomunicaciones","Colombia","Telecomunicaciones",IMG.technology],
["Movistar","Telecomunicaciones","España/Global","Telecomunicaciones",IMG.technology],
["Tigo","Telecomunicaciones","Colombia","Telecomunicaciones",IMG.technology],
["ETB","Telecomunicaciones","Colombia","Telecomunicaciones",IMG.technology],
["WOM","Telecomunicaciones","Colombia","Telecomunicaciones",IMG.technology],
["Verizon","Telecomunicaciones","Estados Unidos","Telecomunicaciones",IMG.technology],
["AT&T","Telecomunicaciones","Estados Unidos","Telecomunicaciones",IMG.technology],
["Vodafone","Telecomunicaciones","Reino Unido","Telecomunicaciones",IMG.technology],
["Deutsche Telekom","Telecomunicaciones","Alemania","Telecomunicaciones",IMG.technology],

/* ENERGÍA */

["EPM","Energía","Colombia","Energía y servicios públicos",IMG.factory],
["Celsia","Energía","Colombia","Energía",IMG.factory],
["Promigas","Energía","Colombia","Gas e infraestructura",IMG.factory],
["Enel","Energía","Italia/Global","Energía",IMG.factory],
["Engie","Energía","Francia","Energía",IMG.factory],
["Iberdrola","Energía","España","Energía renovable",IMG.factory],
["Chevron","Energía","Estados Unidos","Energía",IMG.factory],
["TotalEnergies","Energía","Francia","Energía",IMG.factory],
["BP","Energía","Reino Unido","Energía",IMG.factory],

/* MINERÍA */

["Cerrejón","Minería","Colombia","Carbón",IMG.factory],
["Drummond","Minería","Colombia","Minería",IMG.factory],
["Mineros","Minería","Colombia","Minería",IMG.factory],
["BHP","Minería","Australia","Minería",IMG.factory],
["Rio Tinto","Minería","Global","Minería",IMG.factory],
["Glencore","Minería","Suiza","Minería",IMG.factory],
["Anglo American","Minería","Reino Unido","Minería",IMG.factory],

/* SEGUROS */

["SURA","Seguros","Colombia","Seguros",IMG.building],
["Allianz","Seguros","Alemania","Seguros",IMG.building],
["AXA","Seguros","Francia","Seguros",IMG.building],
["Mapfre","Seguros","España","Seguros",IMG.building],
["Zurich","Seguros","Suiza","Seguros",IMG.building],
["Liberty","Seguros","Estados Unidos","Seguros",IMG.building],

/* LUJO */

["Hermès","Lujo","Francia","Moda y lujo",IMG.luxury],
["Chanel","Lujo","Francia","Moda y lujo",IMG.luxury],
["Gucci","Lujo","Italia","Moda y lujo",IMG.luxury],
["Prada","Lujo","Italia","Moda y lujo",IMG.luxury],
["Cartier","Lujo","Francia","Joyería",IMG.luxury],
["Rolex","Lujo","Suiza","Relojería",IMG.luxury],
["Patek Philippe","Lujo","Suiza","Relojería",IMG.luxury],
["Richard Mille","Lujo","Suiza","Relojería",IMG.luxury],
["Ferrari","Lujo","Italia","Automóviles",IMG.car],
["Lamborghini","Lujo","Italia","Automóviles",IMG.car],
["Porsche","Lujo","Alemania","Automóviles",IMG.car],
["McLaren","Lujo","Reino Unido","Automóviles",IMG.car],

/* RESTAURANTES */

["Juan Valdez","Restaurante","Colombia","Café",IMG.restaurant],
["Crepes & Waffles","Restaurante","Colombia","Restaurantes",IMG.restaurant],
["El Corral","Restaurante","Colombia","Hamburguesas",IMG.restaurant],
["Frisby","Restaurante","Colombia","Comida rápida",IMG.restaurant],
["Kokoriko","Restaurante","Colombia","Comida rápida",IMG.restaurant],
["McDonald's","Restaurante","Global","Comida rápida",IMG.restaurant],
["KFC","Restaurante","Global","Comida rápida",IMG.restaurant],
["Starbucks","Restaurante","Global","Café",IMG.restaurant],
["Subway","Restaurante","Global","Comida rápida",IMG.restaurant],
["Domino's","Restaurante","Global","Pizza",IMG.restaurant],

/* MEDIOS */

["Disney","Medios","Estados Unidos","Entretenimiento",IMG.city],
["Warner Bros. Discovery","Medios","Estados Unidos","Entretenimiento",IMG.city],
["Netflix","Medios","Estados Unidos","Streaming",IMG.technology],
["Spotify","Medios","Suecia","Música",IMG.technology],
["Universal Music","Medios","Global","Música",IMG.city],
["Sony Pictures","Medios","Estados Unidos","Cine",IMG.city],

/* GAMING */

["Nintendo","Gaming","Japón","Videojuegos",IMG.technology],
["PlayStation","Gaming","Japón","Videojuegos",IMG.technology],
["Xbox","Gaming","Estados Unidos","Videojuegos",IMG.technology],
["Electronic Arts","Gaming","Estados Unidos","Videojuegos",IMG.technology],
["Ubisoft","Gaming","Francia","Videojuegos",IMG.technology],
["Epic Games","Gaming","Estados Unidos","Videojuegos",IMG.technology],
["Valve","Gaming","Estados Unidos","Videojuegos",IMG.technology],
["Tencent Games","Gaming","China","Videojuegos",IMG.technology],

/* EDUCACIÓN */

["Universidad de los Andes","Educación","Colombia","Universidad",IMG.building],
["Universidad Nacional de Colombia","Educación","Colombia","Universidad",IMG.building],
["Universidad Javeriana","Educación","Colombia","Universidad",IMG.building],
["EAFIT","Educación","Colombia","Universidad",IMG.building],
["Harvard","Educación","Estados Unidos","Universidad",IMG.building],
["MIT","Educación","Estados Unidos","Universidad",IMG.technology],
["Stanford","Educación","Estados Unidos","Universidad",IMG.technology],

/* DEPORTES */

["FIFA","Deportes","Global","Fútbol",IMG.sports],
["Formula 1","Deportes","Global","Automovilismo",IMG.car],
["MotoGP","Deportes","Global","Motociclismo",IMG.car],
["UEFA","Deportes","Europa","Fútbol",IMG.sports],
["NBA","Deportes","Estados Unidos","Baloncesto",IMG.sports],
["NFL","Deportes","Estados Unidos","Fútbol americano",IMG.sports],
["Juegos Olímpicos","Deportes","Global","Deporte internacional",IMG.sports],

/* TRANSPORTE */

["LATAM Airlines","Transporte","Latinoamérica","Aviación",IMG.plane],
["Copa Airlines","Transporte","Panamá","Aviación",IMG.plane],
["Emirates","Transporte","Emiratos Árabes Unidos","Aviación",IMG.plane],
["Qatar Airways","Transporte","Qatar","Aviación",IMG.plane],
["Delta Air Lines","Transporte","Estados Unidos","Aviación",IMG.plane],
["United Airlines","Transporte","Estados Unidos","Aviación",IMG.plane],
["American Airlines","Transporte","Estados Unidos","Aviación",IMG.plane],
["FedEx","Transporte","Estados Unidos","Logística",IMG.plane],
["DHL","Transporte","Global","Logística",IMG.building],
["Maersk","Transporte","Dinamarca","Transporte marítimo",IMG.ship],
["MSC","Transporte","Suiza","Transporte marítimo",IMG.ship],

/* INFRAESTRUCTURA */

["Odinsa","Infraestructura","Colombia","Infraestructura vial",IMG.building],
["Vinci","Infraestructura","Francia","Construcción",IMG.building],
["ACS","Infraestructura","España","Construcción",IMG.building],
["Bechtel","Infraestructura","Estados Unidos","Construcción",IMG.building],

/* TRENES */

["RENFE","Trenes","España","Ferrocarriles",IMG.train],
["Deutsche Bahn","Trenes","Alemania","Ferrocarriles",IMG.train],
["JR East","Trenes","Japón","Ferrocarriles",IMG.train],
["Eurostar","Trenes","Europa","Alta velocidad",IMG.train],

/* BARCOS */

["Royal Caribbean","Barcos","Global","Cruceros",IMG.ship],
["Carnival","Barcos","Global","Cruceros",IMG.ship],
["MSC Cruises","Barcos","Global","Cruceros",IMG.ship],

/* HOTELES */

["Marriott","Hoteles","Global","Hoteles",IMG.hotel],
["Hilton","Hoteles","Global","Hoteles",IMG.hotel],
["Hyatt","Hoteles","Global","Hoteles",IMG.hotel],
["Four Seasons","Hoteles","Global","Lujo",IMG.hotel],
["Mandarin Oriental","Hoteles","Global","Lujo",IMG.hotel],

/* TECNOLOGÍA */

["OpenAI","Tecnología","Estados Unidos","Inteligencia artificial",IMG.technology],
["IBM","Tecnología","Estados Unidos","Computación",IMG.technology],
["Oracle","Tecnología","Estados Unidos","Software",IMG.technology],
["Adobe","Tecnología","Estados Unidos","Software",IMG.technology],
["SAP","Tecnología","Alemania","Software empresarial",IMG.technology],

/* CIUDADES */

["Nueva York","Ciudad","Estados Unidos","Megaciudad global",IMG.city],
["Londres","Ciudad","Reino Unido","Capital global",IMG.city],
["París","Ciudad","Francia","Capital global",IMG.city],
["Tokio","Ciudad","Japón","Megaciudad",IMG.city],
["Seúl","Ciudad","Corea del Sur","Megaciudad tecnológica",IMG.city],
["Dubái","Ciudad","Emiratos Árabes Unidos","Centro global",IMG.city],
["Singapur","Ciudad","Singapur","Ciudad-estado",IMG.city],
["Bogotá","Ciudad","Colombia","Capital",IMG.city],
["Medellín","Ciudad","Colombia","Ciudad",IMG.city],
["Pereira","Ciudad","Colombia","Ciudad",IMG.city],

/* PROPIEDADES */

["Burj Khalifa","Propiedad","Dubái","Rascacielos",IMG.building],
["One World Trade Center","Propiedad","Nueva York","Rascacielos",IMG.building],
["Palacio de Versalles","Propiedad","Francia","Patrimonio arquitectónico",IMG.mansion],

/* ISLAS */

["Palm Jumeirah","Isla","Dubái","Isla artificial",IMG.island],
["Isla de San Andrés","Isla","Colombia","Isla",IMG.island],

/* AUTOS */

["Ferrari SF90","Auto","Italia","Superdeportivo",IMG.car],
["Lamborghini Revuelto","Auto","Italia","Superdeportivo",IMG.car],
["Porsche 911","Auto","Alemania","Deportivo",IMG.car],
["Tesla Model S","Auto","Estados Unidos","Eléctrico",IMG.car],
["Bugatti Chiron","Auto","Francia","Hiperdeportivo",IMG.car],
["Koenigsegg Jesko","Auto","Suecia","Hiperdeportivo",IMG.car],
["McLaren P1","Auto","Reino Unido","Superdeportivo",IMG.car],
["Aston Martin DB12","Auto","Reino Unido","Gran turismo",IMG.car],
["Mercedes-Benz S-Class","Auto","Alemania","Sedán de lujo",IMG.car],
["BMW M5","Auto","Alemania","Sedán deportivo",IMG.car],
["Audi R8","Auto","Alemania","Deportivo",IMG.car],
["Rolls-Royce Phantom","Auto","Reino Unido","Lujo",IMG.car],

/* MOTOS */

["Ducati Panigale V4","Moto","Italia","Superbike",IMG.car],
["BMW S 1000 RR","Moto","Alemania","Superbike",IMG.car],
["Yamaha YZF-R1","Moto","Japón","Superbike",IMG.car],
["Kawasaki Ninja H2","Moto","Japón","Superbike",IMG.car],
["Honda CBR1000RR-R","Moto","Japón","Superbike",IMG.car],
["Suzuki Hayabusa","Moto","Japón","Motocicleta deportiva",IMG.car],
["Harley-Davidson CVO","Moto","Estados Unidos","Motocicleta de lujo",IMG.car],
["KTM 1290 Super Duke","Moto","Austria","Naked deportiva",IMG.car],

/* YATES */

["Sunseeker 131 Yacht","Yate","Reino Unido","Megayate de lujo",IMG.ship],
["Azimut Grande 27 Metri","Yate","Italia","Yate de lujo",IMG.ship],
["Feadship Yacht","Yate","Países Bajos","Superyate",IMG.ship],
["Benetti Yacht","Yate","Italia","Superyate",IMG.ship],
["Lürssen Yacht","Yate","Alemania","Megayate",IMG.ship],
["Oceanco Yacht","Yate","Países Bajos","Megayate",IMG.ship],

/* HELICÓPTEROS */

["Airbus H160","Helicóptero","Europa","Helicóptero ejecutivo",IMG.plane],
["Sikorsky S-76","Helicóptero","Estados Unidos","Helicóptero ejecutivo",IMG.plane],
["Bell 429","Helicóptero","Canadá","Helicóptero ejecutivo",IMG.plane],
["Leonardo AW139","Helicóptero","Italia","Helicóptero multipropósito",IMG.plane],
["Boeing CH-47 Chinook","Helicóptero","Estados Unidos","Helicóptero pesado",IMG.plane],

/* AVIONES */

["Airbus A350","Avión","Europa","Aviación comercial",IMG.plane],
["Airbus A380","Avión","Europa","Avión comercial de gran capacidad",IMG.plane],
["Boeing 787","Avión","Estados Unidos","Aviación comercial",IMG.plane],
["Boeing 777","Avión","Estados Unidos","Aviación comercial",IMG.plane],
["Boeing 747","Avión","Estados Unidos","Aviación comercial",IMG.plane],
["Gulfstream G700","Avión","Estados Unidos","Aviación ejecutiva",IMG.plane],
["Bombardier Global 7500","Avión","Canadá","Aviación ejecutiva",IMG.plane],
["Dassault Falcon 10X","Avión","Francia","Aviación ejecutiva",IMG.plane],

/* BARCOS REALES */

["Queen Mary 2","Barcos","Reino Unido","Transatlántico",IMG.ship],
["Titanic","Barcos","Reino Unido","Transatlántico histórico",IMG.ship],
["Ever Given","Barcos","Panamá","Portacontenedores",IMG.ship],
["Symphony of the Seas","Barcos","Global","Crucero",IMG.ship],

/* HOTELES REALES */

["Burj Al Arab","Hoteles","Dubái","Hotel de lujo",IMG.hotel],
["Marina Bay Sands","Hoteles","Singapur","Hotel y resort",IMG.hotel],
["The Ritz-Carlton","Hoteles","Global","Hotel de lujo",IMG.hotel],
["The Plaza Hotel","Hoteles","Nueva York","Hotel histórico",IMG.hotel],
["Atlantis The Palm","Hoteles","Dubái","Resort de lujo",IMG.hotel],

/* TECNOLOGÍA */

["OpenAI","Tecnología","Estados Unidos","Inteligencia artificial",IMG.technology],
["IBM","Tecnología","Estados Unidos","Computación",IMG.technology],
["Oracle","Tecnología","Estados Unidos","Software",IMG.technology],
["Adobe","Tecnología","Estados Unidos","Software",IMG.technology],
["SAP","Tecnología","Alemania","Software empresarial",IMG.technology],
["Qualcomm","Tecnología","Estados Unidos","Semiconductores",IMG.technology],
["AMD","Tecnología","Estados Unidos","Semiconductores",IMG.technology],

/* SATÉLITES Y ESPACIO */

["Hubble","Satélite","Órbita terrestre","Observatorio espacial",IMG.satellite],
["James Webb","Satélite","Espacio","Observatorio espacial",IMG.space],
["Starlink","Satélite","Órbita terrestre","Constelación de satélites",IMG.satellite],
["Voyager 1","Satélite","Espacio interestelar","Sonda espacial",IMG.space],
["Voyager 2","Satélite","Espacio interestelar","Sonda espacial",IMG.space],
["International Space Station","Espacio","Órbita terrestre","Estación espacial",IMG.space]

];


/* =========================================================
   CATEGORÍAS
========================================================= */

const categories = [

{
id:"empresas",
title:"EMPRESAS",
count:1000000,
icon:"🏢",
desc:"Empresas reales incorporadas como referencias narrativas y empresas ficticias generadas por el Sistema.",
img:IMG.building
},

{
id:"bancos",
title:"BANCOS",
count:100000,
icon:"🏦",
desc:"Sistema bancario mundial y bancos ficticios del Imperio.",
img:IMG.building
},

{
id:"comercio",
title:"COMERCIOS",
count:1000000,
icon:"🛍️",
desc:"Supermercados, tiendas, centros comerciales y comercios digitales.",
img:IMG.building
},

{
id:"telecom",
title:"TELECOMUNICACIONES",
count:100000,
icon:"📡",
desc:"Redes móviles, internet, fibra, comunicaciones orbitales y telecomunicaciones.",
img:IMG.technology
},

{
id:"energia",
title:"ENERGÍA",
count:100000,
icon:"⚡",
desc:"Energía eléctrica, petróleo, gas, solar, eólica, nuclear y fusión ficticia.",
img:IMG.factory
},

{
id:"mineria",
title:"MINERÍA",
count:100000,
icon:"⛏️",
desc:"Minería terrestre, recursos minerales y minería espacial ficticia.",
img:IMG.factory
},

{
id:"seguros",
title:"SEGUROS",
count:100000,
icon:"🛡️",
desc:"Seguros financieros, propiedades, vehículos, empresas y activos ficticios.",
img:IMG.building
},

{
id:"lujo",
title:"LUJO",
count:100000,
icon:"💎",
desc:"Alta relojería, joyería, moda, vehículos y experiencias de lujo.",
img:IMG.luxury
},

{
id:"restaurantes",
title:"RESTAURANTES",
count:1000000,
icon:"🍽️",
desc:"Restaurantes, cafeterías, cadenas gastronómicas y restaurantes del Sistema.",
img:IMG.restaurant
},

{
id:"medios",
title:"MEDIOS",
count:100000,
icon:"📺",
desc:"Televisión, cine, música, streaming y medios digitales.",
img:IMG.city
},

{
id:"gaming",
title:"GAMING",
count:100000,
icon:"🎮",
desc:"Videojuegos, plataformas, estudios y entretenimiento interactivo.",
img:IMG.technology
},

{
id:"educacion",
title:"EDUCACIÓN",
count:100000,
icon:"🎓",
desc:"Universidades, academias, centros de investigación y campus futuristas.",
img:IMG.building
},

{
id:"salud",
title:"SALUD",
count:100000,
icon:"🏥",
desc:"Hospitales, clínicas, investigación y biotecnología ficticia.",
img:IMG.building
},

{
id:"deportes",
title:"DEPORTES",
count:100000,
icon:"🏆",
desc:"Equipos, estadios, competiciones, ligas e infraestructura deportiva.",
img:IMG.sports
},

{
id:"propiedades",
title:"PROPIEDADES",
count:1000000,
icon:"🏠",
desc:"Residencias, terrenos, complejos, oficinas y propiedades del Imperio.",
img:IMG.house
},

{
id:"mansiones",
title:"MANSIONES",
count:100000,
icon:"🏰",
desc:"Residencias imperiales, palacios y mansiones de ultra lujo.",
img:IMG.mansion
},

{
id:"islas",
title:"ISLAS",
count:100000,
icon:"🏝️",
desc:"Islas reales referenciadas y territorios ficticios del Sistema.",
img:IMG.island
},

{
id:"edificios",
title:"EDIFICIOS",
count:1000000,
icon:"🏙️",
desc:"Rascacielos, torres, oficinas, complejos residenciales y megaestructuras.",
img:IMG.building
},

{
id:"autos",
title:"AUTOS",
count:1000000,
icon:"🚗",
desc:"Vehículos deportivos, eléctricos, clásicos y modelos ficticios.",
img:IMG.car
},

{
id:"motos",
title:"MOTOS",
count:1000000,
icon:"🏍️",
desc:"Motocicletas, superbikes y motos futuristas.",
img:IMG.car
},

{
id:"yates",
title:"YATES",
count:100000,
icon:"🛥️",
desc:"Yates privados, megayates y embarcaciones de lujo.",
img:IMG.ship
},

{
id:"helicopteros",
title:"HELICÓPTEROS",
count:100000,
icon:"🚁",
desc:"Helicópteros civiles, ejecutivos, de rescate y modelos futuristas ficticios.",
img:IMG.plane
},

{
id:"aviones",
title:"AVIONES",
count:100000,
icon:"✈️",
desc:"Aviación privada, comercial, ejecutiva y aeronaves futuristas.",
img:IMG.plane
},

{
id:"trenes",
title:"TRENES",
count:100000,
icon:"🚆",
desc:"Trenes de alta velocidad, metro, carga y ferrocarriles futuristas.",
img:IMG.train
},

{
id:"transporte",
title:"TRANSPORTE",
count:100000,
icon:"🚚",
desc:"Aviación, transporte terrestre, marítimo y logística global.",
img:IMG.ship
},

{
id:"infraestructura",
title:"INFRAESTRUCTURA",
count:1000000,
icon:"🌉",
desc:"Carreteras, puentes, túneles, aeropuertos, puertos, metros y megaobras.",
img:IMG.building
},

{
id:"ciudades",
title:"CIUDADES",
count:100000,
icon:"🌆",
desc:"Ciudades reales como referencias y megaciudades ficticias del Imperio.",
img:IMG.city
},

{
id:"fabricas",
title:"FÁBRICAS",
count:1000000,
icon:"🏭",
desc:"Fábricas de automóviles, chips, baterías, robots, alimentos y tecnología.",
img:IMG.factory
},

{
id:"tecnologias",
title:"TECNOLOGÍAS",
count:1000000,
icon:"🤖",
desc:"IA, robótica, computación cuántica, energía, biotecnología y tecnología espacial.",
img:IMG.technology
},

{
id:"hoteles",
title:"HOTELES",
count:1000000,
icon:"🏨",
desc:"Hoteles urbanos, resorts, hoteles orbitales y complejos de lujo.",
img:IMG.hotel
},

{
id:"barcos",
title:"BARCOS",
count:100000,
icon:"🚢",
desc:"Cruceros, cargueros, megayates, buques y naves marítimas ficticias.",
img:IMG.ship
},

{
id:"satelites",
title:"SATÉLITES",
count:100000,
icon:"🛰️",
desc:"Satélites de comunicación, navegación, ciencia y defensa ficticia.",
img:IMG.satellite
},

{
id:"espacio",
title:"FLOTA ESPACIAL",
count:100000,
icon:"🚀",
desc:"Naves, estaciones orbitales, cargueros y exploradores espaciales ficticios.",
img:IMG.space
},

{
id:"mundos",
title:"MUNDOS",
count:100000,
icon:"🌌",
desc:"Planetas, lunas, colonias y mundos ficticios creados por el Sistema.",
img:IMG.mars
}

];


/* =========================================================
   ALIAS PARA BÚSQUEDA DE IMÁGENES REALES
========================================================= */

const wikipediaAliases = {

    "Nvidia":"Nvidia",

    "Apple":"Apple Inc.",

    "Microsoft":"Microsoft",

    "Alphabet / Google":"Google",

    "Amazon":"Amazon (company)",

    "Meta":"Meta Platforms",

    "Tesla":"Tesla, Inc.",

    "Samsung":"Samsung Electronics",

    "Toyota":"Toyota",

    "Sony":"Sony",

    "Intel":"Intel",

    "IBM":"IBM",

    "Oracle":"Oracle Corporation",

    "Cisco":"Cisco",

    "ASML":"ASML Holding",

    "TSMC":"TSMC",

    "SpaceX":"SpaceX",

    "Coca-Cola":"The Coca-Cola Company",

    "PepsiCo":"PepsiCo",

    "Nestlé":"Nestlé",

    "LVMH":"LVMH",

    "Walmart":"Walmart",

    "BlackRock":"BlackRock",

    "JPMorgan Chase":"JPMorgan Chase",

    "Johnson & Johnson":"Johnson & Johnson",

    "Ecopetrol":"Ecopetrol",

    "Bancolombia":"Bancolombia",

    "Grupo Sura":"Grupo SURA",

    "Grupo Nutresa":"Grupo Nutresa",

    "Grupo Argos":"Grupo Argos",

    "Cementos Argos":"Cementos Argos",

    "ISA":"ISA Interconexión Eléctrica",

    "Avianca":"Avianca",

    "Davivienda":"Davivienda",

    "Éxito":"Grupo Éxito",

    "D1":"Tiendas D1",

    "Ara":"Tiendas Ara",

    "IKEA":"IKEA",

    "Claro":"Claro Americas",

    "Movistar":"Telefónica",

    "Tigo":"Tigo",

    "EPM":"Empresas Públicas de Medellín",

    "Enel":"Enel",

    "Iberdrola":"Iberdrola",

    "Ferrari":"Ferrari",

    "Lamborghini":"Lamborghini",

    "Porsche":"Porsche",

    "McLaren":"McLaren Automotive",

    "Hermès":"Hermès",

    "Chanel":"Chanel",

    "Gucci":"Gucci",

    "Rolex":"Rolex",

    "McDonald's":"McDonald's",

    "KFC":"KFC",

    "Starbucks":"Starbucks",

    "Subway":"Subway",

    "Domino's":"Domino's",

    "Disney":"The Walt Disney Company",

    "Netflix":"Netflix",

    "Spotify":"Spotify",

    "Nintendo":"Nintendo",

    "PlayStation":"PlayStation",

    "Xbox":"Xbox",

    "Harvard":"Harvard University",

    "MIT":"Massachusetts Institute of Technology",

    "Stanford":"Stanford University",

    "FIFA":"FIFA",

    "Formula 1":"Formula One",

    "MotoGP":"Grand Prix motorcycle racing",

    "UEFA":"UEFA",

    "NBA":"National Basketball Association",

    "NFL":"National Football League",

    "Emirates":"Emirates (airline)",

    "Qatar Airways":"Qatar Airways",

    "DHL":"DHL",

    "Maersk":"Maersk",

    "RENFE":"Renfe",

    "Deutsche Bahn":"Deutsche Bahn",

    "Marriott":"Marriott International",

    "Hilton":"Hilton Worldwide",

    "Hyatt":"Hyatt",

    "Four Seasons":"Four Seasons Hotels and Resorts",

    "OpenAI":"OpenAI",

    "Adobe":"Adobe Inc.",

    "SAP":"SAP",

    "Qualcomm":"Qualcomm",

    "AMD":"Advanced Micro Devices",

    "Nueva York":"New York City",

    "Londres":"London",

    "París":"Paris",

    "Tokio":"Tokyo",

    "Seúl":"Seoul",

    "Dubái":"Dubai",

    "Singapur":"Singapore",

    "Bogotá":"Bogotá",

    "Medellín":"Medellín",

    "Pereira":"Pereira",

    "Burj Khalifa":"Burj Khalifa",

    "One World Trade Center":"One World Trade Center",

    "Palacio de Versalles":"Palace of Versailles",

    "Palm Jumeirah":"Palm Jumeirah",

    "Isla de San Andrés":"San Andres Island",

    "Ferrari SF90":"Ferrari SF90 Stradale",

    "Lamborghini Revuelto":"Lamborghini Revuelto",

    "Porsche 911":"Porsche 911",

    "Tesla Model S":"Tesla Model S",

    "Bugatti Chiron":"Bugatti Chiron",

    "Koenigsegg Jesko":"Koenigsegg Jesko",

    "McLaren P1":"McLaren P1",

    "Aston Martin DB12":"Aston Martin DB12",

    "Mercedes-Benz S-Class":"Mercedes-Benz S-Class",

    "BMW M5":"BMW M5",

    "Audi R8":"Audi R8",

    "Rolls-Royce Phantom":"Rolls-Royce Phantom",

    "Ducati Panigale V4":"Ducati Panigale V4",

    "BMW S 1000 RR":"BMW S1000RR",

    "Yamaha YZF-R1":"Yamaha YZF-R1",

    "Kawasaki Ninja H2":"Kawasaki Ninja H2",

    "Honda CBR1000RR-R":"Honda CBR1000RR",

    "Suzuki Hayabusa":"Suzuki Hayabusa",

    "Harley-Davidson CVO":"Harley-Davidson CVO",

    "KTM 1290 Super Duke":"KTM 1290 Super Duke R",

    "Airbus A350":"Airbus A350",

    "Airbus A380":"Airbus A380",

    "Boeing 787":"Boeing 787 Dreamliner",

    "Boeing 777":"Boeing 777",

    "Boeing 747":"Boeing 747",

    "Gulfstream G700":"Gulfstream G700",

    "Bombardier Global 7500":"Bombardier Global 7500",

    "Dassault Falcon 10X":"Dassault Falcon 10X",

    "Airbus H160":"Airbus Helicopters H160",

    "Sikorsky S-76":"Sikorsky S-76",

    "Bell 429":"Bell 429",

    "Leonardo AW139":"AgustaWestland AW139",

    "Boeing CH-47 Chinook":"Boeing CH-47 Chinook",

    "Queen Mary 2":"Queen Mary 2",

    "Titanic":"Titanic",

    "Ever Given":"Ever Given",

    "Symphony of the Seas":"Symphony of the Seas",

    "Burj Al Arab":"Burj Al Arab",

    "Marina Bay Sands":"Marina Bay Sands",

    "The Ritz-Carlton":"Ritz-Carlton",

    "The Plaza Hotel":"Plaza Hotel",

    "Atlantis The Palm":"Atlantis The Palm",

    "Hubble":"Hubble Space Telescope",

    "James Webb":"James Webb Space Telescope",

    "Starlink":"Starlink",

    "Voyager 1":"Voyager 1",

    "Voyager 2":"Voyager 2",

    "International Space Station":"International Space Station"

};


/* =========================================================
   SISTEMA DE IMÁGENES REALES
========================================================= */

const realImageCache = new Map();

const failedImageCache = new Set();


function getWikipediaTitle(name){

    return wikipediaAliases[name] || name;

}


async function getRealImage(item){

    const name =
        item[0];

    if(realImageCache.has(name)){
        return realImageCache.get(name);
    }

    if(failedImageCache.has(name)){
        return null;
    }

    const title =
        getWikipediaTitle(name);


    /*
       Primero intentamos obtener la página exacta.
    */

    try{

        const exactURL =
            "https://en.wikipedia.org/w/api.php" +
            "?action=query" +
            "&titles=" +
            encodeURIComponent(title) +
            "&prop=pageimages" +
            "&piprop=thumbnail" +
            "&pithumbsize=1200" +
            "&format=json" +
            "&origin=*";

        const response =
            await fetch(exactURL);

        if(response.ok){

            const data =
                await response.json();

            if(
                data.query &&
                data.query.pages
            ){

                const pages =
                    Object.values(
                        data.query.pages
                    );

                for(const page of pages){

                    if(
                        page.thumbnail &&
                        page.thumbnail.source
                    ){

                        const image =
                            page.thumbnail.source;

                        realImageCache.set(
                            name,
                            image
                        );

                        return image;
                    }
                }
            }
        }

    }catch(error){

        console.warn(
            "No se pudo obtener imagen exacta:",
            name
        );

    }


    /*
       Si la página exacta no tiene imagen,
       hacemos una búsqueda secundaria.
    */

    try{

        const searchText =
            `${name} ${item[1]} ${item[3]}`;

        const searchURL =
            "https://en.wikipedia.org/w/api.php" +
            "?action=query" +
            "&generator=search" +
            "&gsrsearch=" +
            encodeURIComponent(searchText) +
            "&gsrnamespace=0" +
            "&gsrlimit=5" +
            "&prop=pageimages" +
            "&piprop=thumbnail" +
            "&pithumbsize=1200" +
            "&format=json" +
            "&origin=*";

        const response =
            await fetch(searchURL);

        if(response.ok){

            const data =
                await response.json();

            if(
                data.query &&
                data.query.pages
            ){

                const pages =
                    Object.values(
                        data.query.pages
                    );

                for(const page of pages){

                    if(
                        page.thumbnail &&
                        page.thumbnail.source
                    ){

                        const image =
                            page.thumbnail.source;

                        realImageCache.set(
                            name,
                            image
                        );

                        return image;
                    }
                }
            }
        }

    }catch(error){

        console.warn(
            "Búsqueda secundaria falló:",
            name
        );

    }


    failedImageCache.add(name);

    return null;
}


/* =========================================================
   GENERACIÓN DE TARJETAS
========================================================= */

function createRealCard(item){

    const [
        name,
        category,
        location,
        description,
        fallbackImage
    ] = item;

    const value =
        valueFor(
            category.toUpperCase(),
            name.length
        );

    const base = {

        name,

        category,

        location,

        description,

        image:fallbackImage,

        fallbackImage,

        real:true,

        originalData:item,

        value,

        status:"REFERENCIA REAL"

    };
    return applyEmpirePersistence(base) || base;
}


function createFictionCard(category,index){

    const name =
        fictionalName(
            category.title,
            index
        );

    const location =
        countries[
            index % countries.length
        ];

    const city =
        cities[
            index % cities.length
        ];

    let description =
        `Activo ficticio generado por el Sistema de Akira Ren. Registro ${String(index+1).padStart(7,"0")}.`;

    if(category.id === "mundos"){

        description =
            `Mundo ficticio ${index+1}, catalogado por el Sistema para expansión y desarrollo del Imperio.`;

    }

    if(category.id === "ciudades"){

        description =
            `Megaciudad ficticia ubicada en ${location}, sector ${city}.`;

    }

    if(category.id === "propiedades"){

        description =
            `Propiedad ficticia registrada por el Sistema en ${city}, ${location}.`;

    }

    if(category.id === "tecnologias"){

        description =
            `Tecnología ficticia desarrollada dentro del ecosistema REN.`;

    }

    const base = {

        name,

        category:category.title,

        location,

        description,

        image:category.img,

        value:valueFor(
            category.title,
            index
        ),

        status:"CREADO POR EL SISTEMA",

        real:false

    };
    return applyEmpirePersistence(base) || base;
}


/* =========================================================
   BUSCADOR
========================================================= */

let currentSearchMode = "real";

let currentQuery = "";

let currentPage = 1;

const ITEMS_PER_PAGE = 20;


function cambiarBusqueda(mode){

    currentSearchMode =
        mode;

    currentPage =
        1;

    document
        .getElementById("realBtn")
        .classList
        .toggle(
            "active",
            mode === "real"
        );

    document
        .getElementById("fictionBtn")
        .classList
        .toggle(
            "active",
            mode === "fiction"
        );

    document
        .getElementById("searchInfo")
        .textContent =
        mode === "real"
        ? "Mostrando referencias reales incorporadas al universo."
        : "Mostrando registros ficticios generados por el Sistema.";

    buscar();

}


function buscar(){

    currentQuery =
        document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    currentPage =
        1;

    renderSearchResults();

}


function getRealResults(){

    let data =
        realReferences.map(createRealCard).filter(Boolean);

    if(!currentQuery)
        return data;

    return data.filter(item =>

        `${item.name}
        ${item.category}
        ${item.location}
        ${item.description}`
        .toLowerCase()
        .includes(currentQuery)

    );

}


function getFictionResults(){

    let results = [];

    for(
        const category
        of categories
    ){

        const amount =
            Math.min(
                category.count,
                500
            );

        for(
            let i=0;
            i<amount;
            i++
        ){

            const item =
                createFictionCard(
                    category,
                    i
                );

            if(

                !currentQuery ||

                `${item.name}
                ${item.category}
                ${item.location}
                ${item.description}`
                .toLowerCase()
                .includes(currentQuery)

            ){

                if(item) results.push(item);

            }

            if(
                results.length >= 1000
            ){

                return results;

            }

        }

    }

    return results;

}


/* =========================================================
   CARGA DE IMÁGENES REALES
========================================================= */

async function loadRealImages(
    container,
    data
){

    const realItems =
        data.filter(
            item => item.real
        );

    /*
       Cargamos una imagen a la vez
       para no saturar el navegador.
    */

    for(
        const item
        of realItems
    ){

        const image =
            await getRealImage(
                item.originalData
            );

        if(!image)
            continue;


        const images =
            container.querySelectorAll(
                ".card-img"
            );


        images.forEach(img => {

            if(
                img.dataset.name ===
                item.name
            ){

                img.src =
                    image;

                img.dataset.realLoaded =
                    "yes";

            }

        });

    }

}


/* =========================================================
   RESULTADOS DEL BUSCADOR
========================================================= */

function renderSearchResults(){

    const container =
        document.getElementById(
            "searchResults"
        );

    if(!container)
        return;

    const data =
        currentSearchMode === "real"
        ? getRealResults()
        : getFictionResults();

    container.dataset.active =
        "yes";

    renderCards(
        container,
        data,
        "search-pagination",
        data.length
    );

    document
        .getElementById(
            "searchInfo"
        )
        .textContent =

        currentSearchMode === "real"

        ? `${data.length.toLocaleString("es-CO")} referencias reales encontradas.`

        : `Resultados ficticios generados por el Sistema. El catálogo completo supera millones de registros.`;

}


/* =========================================================
   TARJETAS
========================================================= */

function empireStorage(){
    try{return JSON.parse(localStorage.getItem("akiraRenEmpireEdits")||"{}");}catch(e){return {};}
}
function empireDeleted(){
    try{return JSON.parse(localStorage.getItem("akiraRenEmpireDeleted")||"[]");}catch(e){return [];}
}
function cardId(item){
    return btoa(unescape(encodeURIComponent(`${item.category}|${item.name}|${item.location}`))).replace(/[^a-zA-Z0-9]/g,"").slice(0,80);
}
function safeJs(value){
    return String(value||"").replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\n/g," ");
}
function applyEmpirePersistence(item){
    const id=cardId(item);
    if(empireDeleted().includes(id)) return null;
    const edits=empireStorage()[id];
    return edits ? {...item,...edits} : item;
}
function persistEdit(item, fields){
    const edits=empireStorage();
    const id=cardId(item);
    edits[id]={...(edits[id]||{}),...fields};
    localStorage.setItem("akiraRenEmpireEdits",JSON.stringify(edits));
}
function deleteEmpireItem(item){
    if(!confirm(`¿Eliminar "${item.name}" del catálogo de este dispositivo?`)) return;
    const deleted=empireDeleted();
    const id=cardId(item);
    if(!deleted.includes(id)) deleted.push(id);
    localStorage.setItem("akiraRenEmpireDeleted",JSON.stringify(deleted));
    renderAllEmpire();
}
function editEmpireItem(item){
    const content=document.getElementById("modalContent");
    content.innerHTML=`
      <span class="badge">EDITOR DEL IMPERIO</span>
      <h2 style="margin:12px 0 16px">Editar ${escapeHtml(item.name)}</h2>
      <form class="edit-form" id="empireEditForm">
        <label>Nombre<input id="editName" value="${escapeAttr(item.name)}" required></label>
        <label>Categoría<input id="editCategory" value="${escapeAttr(item.category)}"></label>
        <label>Ubicación<input id="editLocation" value="${escapeAttr(item.location)}"></label>
        <label>Descripción<textarea id="editDescription">${escapeHtml(item.description)}</textarea></label>
        <label>URL de imagen<input id="editImage" value="${escapeAttr(item.image||item.fallbackImage||"")}" placeholder="https://..."></label>
        <label>Valor<input id="editValue" type="number" value="${Number(item.value)||0}"></label>
        <label>Estado<input id="editStatus" value="${escapeAttr(item.status||"")}"></label>
        <button class="edit-save" type="submit">💾 GUARDAR CAMBIOS</button>
      </form>`;
    document.getElementById("empireEditForm").onsubmit=(e)=>{
      e.preventDefault();
      persistEdit(item,{name:document.getElementById("editName").value.trim(),category:document.getElementById("editCategory").value.trim(),location:document.getElementById("editLocation").value.trim(),description:document.getElementById("editDescription").value.trim(),image:document.getElementById("editImage").value.trim(),value:Number(document.getElementById("editValue").value)||0,status:document.getElementById("editStatus").value.trim()});
      cerrarModal();
      renderAllEmpire();
    };
    document.getElementById("modal").classList.add("show");
}
function escapeHtml(value){return String(value??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");}
function escapeAttr(value){return escapeHtml(value).replace(/`/g,"&#096;");}
function openFullImage(src,name){
    const w=window.open("","_blank");
    if(!w){alert("El navegador bloqueó la ventana de imagen. Permite ventanas emergentes para este sitio.");return;}
    w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${escapeHtml(name)}</title><style>body{margin:0;background:#02040a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:Arial}img{max-width:100%;max-height:96vh;object-fit:contain;box-shadow:0 0 70px rgba(67,217,255,.18)}p{position:fixed;top:12px;left:18px;background:rgba(0,0,0,.6);padding:8px 12px;border-radius:8px}</style></head><body><p>${escapeHtml(name)}</p><img src="${String(src).replace(/"/g,"&quot;")}" alt="${escapeHtml(name)}"></body></html>`);
    w.document.close();
}
function renderAllEmpire(){
    categories.forEach(category=>renderCategory(category));
    if(document.getElementById("searchResults")?.dataset.active==="yes") renderSearchResults();
}

function renderCards(
    container,
    data,
    paginationId,
    totalCount
){

    container.innerHTML =
        "";

    const start =
        (currentPage - 1)
        * ITEMS_PER_PAGE;

    const end =
        start + ITEMS_PER_PAGE;

    const pageItems =
        data.slice(
            start,
            end
        );


    if(
        pageItems.length === 0
    ){

        container.innerHTML = `

            <div class="story-box">

                <h3>
                    NO HAY RESULTADOS
                </h3>

                <p>
                    No se encontraron registros
                    con esa búsqueda.
                    Prueba con otro nombre
                    o categoría.
                </p>

            </div>

        `;

        return;

    }


    pageItems.forEach(
        (item,index) => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "card";


        const safeName =
            String(item.name)
            .replace(
                /\\/g,
                "\\\\"
            )
            .replace(
                /"/g,
                "&quot;"
            );


        card.innerHTML = `

            <img

                class="card-img"

                src="${item.image || item.fallbackImage || LOCAL_IMAGE_FALLBACK}"

                loading="lazy"

                alt="${safeName}"

                data-name="${safeName}"

                data-real="${item.real ? "yes" : "no"}"

                onerror="
                    if(!this.dataset.fallbackUsed){
                        this.dataset.fallbackUsed='yes';
                        this.src='${item.fallbackImage || LOCAL_IMAGE_FALLBACK}';
                    }
                "

            >

            <div class="card-body">

                <div class="category">
                    ${item.category}
                </div>

                <h3>
                    ${item.name}
                </h3>

                <p>

                    <strong>
                        ${item.location}
                    </strong>

                    <br>

                    ${item.description}

                </p>

                <div class="card-info">

                    <span class="value">
                        ${money(item.value)}
                    </span>

                    <span class="status">
                        ${item.status}
                    </span>

                </div>

                <div class="card-actions">
                    <button class="view-action" data-action="view" data-index="${index}">👁️ VER</button>
                    <button class="edit-action" data-action="edit" data-index="${index}">✏️ EDITAR</button>
                    <button class="delete-action" data-action="delete" data-index="${index}">🗑️ ELIMINAR</button>
                </div>

            </div>

        `;


        card.querySelector('[data-action="view"]').addEventListener("click",()=>openDetails(item));
        card.querySelector('[data-action="edit"]').addEventListener("click",()=>editEmpireItem(item));
        card.querySelector('[data-action="delete"]').addEventListener("click",()=>deleteEmpireItem(item));


        container.appendChild(
            card
        );

    });


    createPagination(
        paginationId,
        Math.ceil(
            data.length /
            ITEMS_PER_PAGE
        ),
        totalCount
    );


    /*
       Buscar imágenes reales después
       de pintar las tarjetas.
    */

    loadRealImages(
        container,
        pageItems
    );

}


/* =========================================================
   PAGINACIÓN
========================================================= */

function createPagination(
    id,
    totalPages,
    totalCount
){

    let pagination =
        document.getElementById(id);


    if(!pagination){

        pagination =
            document.createElement(
                "div"
            );

        pagination.id =
            id;

        pagination.className =
            "pagination";


        if(
            id ===
            "search-pagination"
        ){

            const searchResults =
                document.getElementById(
                    "searchResults"
                );

            if(searchResults){

                searchResults.after(
                    pagination
                );

            }

        }else{

            const parent =
                document.getElementById(
                    "sectionsContainer"
                );

            if(parent){

                parent.appendChild(
                    pagination
                );

            }

        }

    }


    pagination.innerHTML =
        "";


    if(
        totalPages <= 1
    ){

        return;

    }


    const previous =
        document.createElement(
            "button"
        );

    previous.textContent =
        "←";

    previous.disabled =
        currentPage === 1;


    previous.onclick =
        () => {

            currentPage--;

            renderCurrentSection();

        };


    pagination.appendChild(
        previous
    );


    let start =
        Math.max(
            1,
            currentPage - 2
        );

    let end =
        Math.min(
            totalPages,
            currentPage + 2
        );


    for(
        let i=start;
        i<=end;
        i++
    ){

        const btn =
            document.createElement(
                "button"
            );

        btn.textContent =
            i;

        btn.className =
            i === currentPage
            ? "active"
            : "";


        btn.onclick =
            () => {

                currentPage =
                    i;

                if(
                    document
                    .getElementById(
                        "searchResults"
                    )
                    ?.dataset.active
                    === "yes"
                ){

                    renderSearchResults();

                }else{

                    renderCurrentSection();

                }

            };


        pagination.appendChild(
            btn
        );

    }


    const next =
        document.createElement(
            "button"
        );

    next.textContent =
        "→";

    next.disabled =
        currentPage ===
        totalPages;


    next.onclick =
        () => {

            currentPage++;

            if(
                document
                .getElementById(
                    "searchResults"
                )
                ?.dataset.active
                === "yes"
            ){

                renderSearchResults();

            }else{

                renderCurrentSection();

            }

        };


    pagination.appendChild(
        next
    );

}


/* =========================================================
   SECCIÓN ACTUAL
========================================================= */

let currentCategoryId =
    null;


function renderCurrentSection(){

    if(
        document
        .getElementById(
            "searchResults"
        )
        ?.dataset.active
        === "yes"
    ){

        renderSearchResults();

        return;

    }


    if(
        currentCategoryId
    ){

        const category =
            categories.find(
                item =>
                item.id ===
                currentCategoryId
            );

        if(category){

            renderCategory(
                category
            );

        }

    }

}


/* =========================================================
   SECCIONES
========================================================= */

function renderSections(){

    const nav =
        document.getElementById(
            "nav"
        );

    const container =
        document.getElementById(
            "sectionsContainer"
        );


    nav.innerHTML =
        "";

    container.innerHTML =
        "";


    categories.forEach(
        category => {

        const button =
            document.createElement(
                "button"
            );


        button.textContent =
            `${category.icon} ${category.title}`;


        button.onclick =
            () => {

                currentCategoryId =
                    category.id;

                currentPage =
                    1;

                document
                    .getElementById(
                        category.id
                    )
                    .scrollIntoView({
                        behavior:"smooth"
                    });

            };


        nav.appendChild(
            button
        );


        const section =
            document.createElement(
                "section"
            );


        section.id =
            category.id;


        section.innerHTML = `

            <div class="section-title">

                <div>

                    <h2>
                        ${category.icon}
                        ${category.title}
                    </h2>

                    <p>
                        ${category.desc}
                    </p>

                </div>

                <div class="catalog-count">

                    ${category.count.toLocaleString("es-CO")}+
                    REGISTROS

                </div>

            </div>


            <div
                class="grid"
                id="${category.id}-grid"
            ></div>


            <div
                class="pagination"
                id="${category.id}-pagination"
            ></div>

        `;


        container.appendChild(
            section
        );

    });


    /*
       Resultados del buscador
    */

    const searchResults =
        document.createElement(
            "div"
        );


    searchResults.id =
        "searchResults";


    searchResults.className =
        "grid";


    searchResults.dataset.active =
        "yes";


    searchResults.style.marginTop =
        "20px";


    document
        .getElementById(
            "searchInfo"
        )
        .after(
            searchResults
        );


    categories.forEach(
        category => {

            renderCategory(
                category
            );

        }
    );

}


/* =========================================================
   MAPEO DE CATEGORÍAS
========================================================= */

function normalizeCategory(
    title
){

    const map = {

        "COMERCIOS":
        "Comercio",

        "TELECOMUNICACIONES":
        "Telecomunicaciones",

        "ENERGÍA":
        "Energía",

        "MINERÍA":
        "Minería",

        "SEGUROS":
        "Seguros",

        "LUJO":
        "Lujo",

        "RESTAURANTES":
        "Restaurante",

        "MEDIOS":
        "Medios",

        "GAMING":
        "Gaming",

        "EDUCACIÓN":
        "Educación",

        "SALUD":
        "Salud",

        "DEPORTES":
        "Deportes",

        "PROPIEDADES":
        "Propiedad",

        "MANSIONES":
        "Mansión",

        "ISLAS":
        "Isla",

        "EDIFICIOS":
        "Edificio",

        "AUTOS":
        "Auto",

        "MOTOS":
        "Moto",

        "YATES":
        "Yate",

        "HELICÓPTEROS":
        "Helicóptero",

        "AVIONES":
        "Avión",

        "TRENES":
        "Trenes",

        "TRANSPORTE":
        "Transporte",

        "INFRAESTRUCTURA":
        "Infraestructura",

        "CIUDADES":
        "Ciudad",

        "FÁBRICAS":
        "Fábrica",

        "TECNOLOGÍAS":
        "Tecnología",

        "HOTELES":
        "Hoteles",

        "BARCOS":
        "Barcos",

        "SATÉLITES":
        "Satélite",

        "FLOTA ESPACIAL":
        "Espacio",

        "MUNDOS":
        "Mundo"

    };


    return (
        map[title] ||
        title
    );

}


/* =========================================================
   RENDER DE CATEGORÍA
========================================================= */

function renderCategory(
    category
){

    const grid =
        document.getElementById(
            `${category.id}-grid`
        );


    if(!grid)
        return;


    let data =
        [];


    const targetCategory =
        normalizeCategory(
            category.title
        );


    /*
       Referencias reales de esa categoría.
    */

    realReferences

        .filter(
            item =>
            item[1].toLowerCase()
            ===
            targetCategory.toLowerCase()
        )

        .slice(
            0,
            10
        )

        .forEach(
            item => {

                data.push(
                    createRealCard(
                        item
                    )
                );

            }
        );


    /*
       Completamos con ficticios.
    */

    for(
        let i=data.length;
        i<20;
        i++
    ){

        data.push(
            createFictionCard(
                category,
                i
            )
        );

    }


    data = data.filter(Boolean);
    renderCards(
        grid,
        data,
        `${category.id}-pagination`,
        category.count
    );

}


/* =========================================================
   DETALLE / MODAL
========================================================= */

async function openDetails(item){

    document
        .getElementById(
            "modalContent"
        )
        .innerHTML = `

            <img
                id="modalImage"
                class="modal-image-view"
                src="${item.image || item.fallbackImage || LOCAL_IMAGE_FALLBACK}"
                alt="${item.name}"
                onerror="
                    this.src='${item.fallbackImage || LOCAL_IMAGE_FALLBACK}'
                "
            >

            <button class="image-full-btn" onclick="openFullImage(document.getElementById('modalImage').src, '${escapeAttr(item.name)}')">🖼️ VER IMAGEN COMPLETA</button>

            <span class="badge">
                ${item.status}
            </span>

            <h2
                style="margin:15px 0 5px"
            >
                ${item.name}
            </h2>

            <p
                style="
                    color:#9ca8bd;
                    line-height:1.7
                "
            >

                <strong>
                    Categoría:
                </strong>

                ${item.category}

                <br>

                <strong>
                    Ubicación:
                </strong>

                ${item.location}

                <br>

                <strong>
                    Valor ficticio dentro del Sistema:
                </strong>

                ${money(item.value)}

                <br><br>

                ${item.description}

            </p>

            <button
                class="enter-btn"
                style="margin-top:20px"
                id="integrateButton"
            >
                INTEGRAR AL IMPERIO
            </button>

        `;


    document
        .getElementById(
            "integrateButton"
        )
        .onclick =
        () => {

            adquirir(
                item.name
            );

        };


    document
        .getElementById(
            "modal"
        )
        .classList.add(
            "show"
        );


    /*
       Si es una referencia real,
       también buscamos su imagen
       para el modal.
    */

    if(
        item.real &&
        item.originalData
    ){

        const image =
            await getRealImage(
                item.originalData
            );


        if(image){

            const modalImage =
                document.getElementById(
                    "modalImage"
                );


            if(modalImage){

                modalImage.src =
                    image;

            }

        }

    }

}


function cerrarModal(){

    document
        .getElementById(
            "modal"
        )
        .classList.remove(
            "show"
        );

}


function adquirir(name){

    alert(
        `El Sistema ha registrado "${name}" como activo disponible para integración dentro del universo ficticio de Akira Ren.`
    );

}


/* =========================================================
   CAPITAL
========================================================= */

let capital =
    Number(
        localStorage.getItem(
            "akiraCapital"
        )
    ) ||
    1000000000000000;


function updateCapital(){

    capital +=
        777777777;


    localStorage.setItem(
        "akiraCapital",
        capital
    );


    document
        .getElementById(
            "capital"
        )
        .textContent =
        "$" +
        capital.toLocaleString(
            "es-CO"
        );

}


/* =========================================================
   VALORES
========================================================= */

const fictionalPrefixes = [

    "REN",
    "AURON",
    "NEXA",
    "ORBITALIS",
    "VANTEX",
    "ASTRA",
    "IMPERIUM",
    "NOVA",
    "ZENITH",
    "QUANTUM",
    "COSMOS",
    "NEBULA",
    "ECLIPSE",
    "TITAN",
    "OMEGA",
    "GALAXIS",
    "INFINITY",
    "AETHER",
    "SOLARIS",
    "LUMEN"

];


const fictionalSuffixes = [

    "Global",
    "Industries",
    "Holdings",
    "Group",
    "Systems",
    "Corporation",
    "International",
    "Dynamics",
    "Labs",
    "Technologies",
    "Capital",
    "Enterprises",
    "Networks",
    "Alliance",
    "United",
    "Prime",
    "Advanced",
    "Future",
    "Universal",
    "One"

];


const countries = [

    "Colombia",
    "Estados Unidos",
    "Canadá",
    "México",
    "Brasil",
    "Argentina",
    "Chile",
    "España",
    "Francia",
    "Alemania",
    "Italia",
    "Reino Unido",
    "Japón",
    "China",
    "Corea del Sur",
    "India",
    "Australia",
    "Emiratos Árabes Unidos",
    "Singapur",
    "Suiza",
    "Suecia",
    "Noruega",
    "Países Bajos",
    "Mundo"

];


const cities = [

    "Pereira",
    "Bogotá",
    "Medellín",
    "Cali",
    "Cartagena",
    "Barranquilla",
    "Madrid",
    "París",
    "Londres",
    "Nueva York",
    "Tokio",
    "Seúl",
    "Dubái",
    "Singapur",
    "Shanghái",
    "Los Ángeles",
    "Toronto",
    "Sídney",
    "Berlín",
    "Roma"

];


function fictionalName(
    category,
    index
){

    const prefix =
        fictionalPrefixes[
            index %
            fictionalPrefixes.length
        ];


    const suffix =
        fictionalSuffixes[
            Math.floor(
                index /
                fictionalPrefixes.length
            )
            %
            fictionalSuffixes.length
        ];


    const number =
        String(
            index + 1
        ).padStart(
            7,
            "0"
        );


    return `${prefix} ${category} ${suffix} ${number}`;

}


function valueFor(
    category,
    index
){

    const multipliers = {

        "EMPRESAS":1000000,
        "BANCOS":50000000,
        "COMERCIOS":50000,
        "TELECOMUNICACIONES":10000000,
        "ENERGÍA":20000000,
        "MINERÍA":15000000,
        "SEGUROS":5000000,
        "LUJO":1000000,
        "RESTAURANTES":50000,
        "MEDIOS":5000000,
        "GAMING":2000000,
        "EDUCACIÓN":500000,
        "SALUD":10000000,
        "DEPORTES":3000000,
        "PROPIEDADES":2000000,
        "MANSIONES":20000000,
        "ISLAS":100000000,
        "EDIFICIOS":30000000,
        "AUTOS":100000,
        "MOTOS":30000,
        "YATES":50000000,
        "HELICÓPTEROS":10000000,
        "AVIONES":100000000,
        "TRENES":50000000,
        "TRANSPORTE":10000000,
        "INFRAESTRUCTURA":50000000,
        "CIUDADES":1000000000,
        "FÁBRICAS":30000000,
        "TECNOLOGÍAS":5000000,
        "HOTELES":20000000,
        "BARCOS":80000000,
        "SATÉLITES":100000000,
        "FLOTA ESPACIAL":1000000000,
        "MUNDOS":1000000000000

    };


    const base =
        multipliers[
            category
        ] ||
        1000000;


    const variation =
        1 +
        (
            (index % 1000)
            / 1000
        )
        * 99;


    return (
        base *
        variation
    );

}


function money(value){

    if(
        value >= 1e15
    ){

        return "$" +
            (
                value /
                1e15
            ).toFixed(2) +
            "Q";

    }


    if(
        value >= 1e12
    ){

        return "$" +
            (
                value /
                1e12
            ).toFixed(2) +
            "T";

    }


    if(
        value >= 1e9
    ){

        return "$" +
            (
                value /
                1e9
            ).toFixed(2) +
            "B";

    }


    if(
        value >= 1e6
    ){

        return "$" +
            (
                value /
                1e6
            ).toFixed(2) +
            "M";

    }


    if(
        value >= 1e3
    ){

        return "$" +
            (
                value /
                1e3
            ).toFixed(2) +
            "K";

    }


    return "$" +
        Math.round(
            value
        );

}


/* =========================================================
   TOTAL
========================================================= */

function calculateTotal(){

    const total =
        categories.reduce(
            (
                sum,
                item
            ) =>
                sum +
                item.count,
            0
        );


    document
        .getElementById(
            "totalRegistros"
        )
        .textContent =
        total.toLocaleString(
            "es-CO"
        ) +
        "+";

}


/* =========================================================
   ENTRADA
========================================================= */

function entrar(){

    const intro =
        document.getElementById(
            "intro"
        );


    intro.style.opacity =
        "0";


    setTimeout(
        () => {

            intro.style.display =
                "none";

        },
        800
    );

}


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if(
            event.key ===
            "Escape"
        ){

            cerrarModal();

        }

    }
);


/* =========================================================
   CLIC FUERA DEL MODAL
========================================================= */

document
    .getElementById(
        "modal"
    )
    .addEventListener(
        "click",
        event => {

            if(
                event.target.id ===
                "modal"
            ){

                cerrarModal();

            }

        }
    );


/* =========================================================
   INICIALIZACIÓN
========================================================= */

renderSections();

calculateTotal();

updateCapital();


currentSearchMode =
    "real";


document
    .getElementById(
        "searchResults"
    )
    .dataset.active =
    "yes";


renderSearchResults();


setInterval(
    updateCapital,
    5000
);

