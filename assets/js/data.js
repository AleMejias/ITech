const DATA = [
    {
        nombre:"iPhone 12 Pro",
        precio: 999,
        ruta:"../img/home/iphone12pro-1.jpg",
        categoria:"Celulares",
        detalle:["128 GB,256 GB,512 GB","17,67cm | 7,15cm | 0,74cm","Pantalla Super Retina XDR. Pantalla OLED de 6,1 pulgadas (en diagonal). Resolución de 2.532 por 1.170 píxeles a 460 p/p","Chip A14 Bionic. Neural Engine de última generación","Sistema de cámaras Pro de 12 Mpx con gran angular, ultra gran angular y teleobjetivo. Ultra gran angular: apertura de ƒ/2,4 y campo de visión de 120°. Gran angular: apertura de ƒ/1,6. Teleobjetivo: apertura de ƒ/2 (iPhone 12 Pro) y apertura de ƒ/2,2 (iPhone 12 Pro Max). Captura de imagen en formato HEIF y JPEG","Batería recargable integrada de iones de litio","iOS 14"]
    },
    {
        nombre:"iPad Mini",
        precio: 599,
        ruta:"../img/home/ipadmini-1.jpg",
        categoria:"Tablets",
        detalle:["64 GB, 256 GB","20,32 cm | 13,48 cm | 0,61 cm","Pantalla Retina. Pantalla Multi-Touch de 7,9 pulgadas (en diagonal) retroiluminada por LED. Resolución de 2.048 por 1.536 píxeles a 326 p/p. Cubierta oleófuga antihuellas. Compatible con el Apple Pencil","Chip A12 Bionic con arquitectura de 64 bits. Neural Engine. Coprocesador M12 integrado","Cámara de 8 Mpx. Apertura de ƒ/2,4. Lente de cinco elementos. Filtro de infrarrojos híbrido. Live Photos. Gama cromática amplia para fotos y Live Photos. Enfoque automático. Fotos panorámicas (hasta 43 Mpx). HDR para fotos. Modo ráfaga. Enfoque por toque. Temporizador. Estabilización automática de imagen","Batería recargable integrada de polímeros de litio de 19,1 vatios/hora","iPadOS"]
    },
    {
        nombre:"iPhone SE",
        precio: 400,
        ruta:"../img/home/iphonese-1.jpg",
        categoria:"Celulares",
        detalle:["64 GB,128 GB,256 GB","13,84 cm | 6,73 cm | 0,73cm","Pantalla Retina HD. Pantalla panorámica LCD Multi‑Touch de 4,7 pulgadas (en diagonal) con tecnología IPS. Resolución de 1.334 por 750 píxeles a 326 p/p","Chip A13 Bionic. Neural Engine de tercera generación","Cámara de 12 Mpx con gran angular. Iluminación de Retratos con seis efectos (Luz Natural, Luz de Estudio, Luz de Contorno, Luz de Escenario, Luz de Escenario Mono y Luz en Cla. Alta Mono). Estabilización óptica de imagen. Lente de seis elementos. Flash True Tone con LED y sincronización lenta. Fotos panorámicas (hasta 63 Mpx). Corrección avanzada de ojos rojos. Estabilización automática de imagen. Captura de imagen en formato HEIF y JPEG","Batería recargable integrada de iones de litio","iOS 14"]
    },
    {
        nombre:"iPhone 11",
        precio: 699,
        ruta:"../img/home/iphone11-1.jpg",
        categoria:"Celulares",
        detalle:["64 GB,128 GB,256 GB","15,09 cm | 7,57 cm | 0,83 cm","Pantalla Liquid Retina HD. Pantalla LCD de 6,1 pulgadas (en diagonal) con tecnología IPS1 Resolución de 1.792 por 828 píxeles a 326 p/p","Chip A13 Bionic. Neural Engine de tercera generación","Sistema de cámara dual de 12 Mpx con gran angular y ultra gran angular. Ultra gran angular: apertura de ƒ/2,4 Gran angular: apertura de ƒ/1,8. Estabilización óptica de imagen. Modo Retrato con efecto bokeh avanzado y Control de Profundidad. Iluminación de Retratos con seis efectos (Luz Natural, Luz de Estudio, Luz de Contorno, Luz de Escenario, Luz de Escenario Mono y Luz en Clave Alta Mono). HDR Inteligente de última generación para fotos","Batería recargable integrada de iones de litio","iOS 13 (Actualizable a iOS 14)"]
    },
    {
        nombre:"Apple Watch SE",
        precio: 399,
        ruta:"../img/home/watch-1.jpg",
        categoria:"Apple Watch",
        detalle:["Tiene el mismo tamaño de pantalla que el Series 6, detección de caídas, brújula integrada y altímetro siempre activo. Construido en Aluminio","Caja de 40 o 44 mm","Pantalla Retina 30 % más grande que la del Series 3","Conexión móvil en modelos GPS + Celular. Compatible con Configuración Familiar","Sensor óptico de frecuencia cardiaca. Digital Crown con respuesta háptica. GPS y Brújula. Altímetro siempre activo. Micrófono y altavoz de 2.ª generación","Chip S5 SiP de doble núcleo"]
    },
    {
        nombre:"iPhone XR",
        precio: 599,
        ruta:"../img/home/iphonexr-1.jpg",
        categoria:"Celulares",
        detalle:["64 GB,128 GB","15,09 cm | 7,57 cm | 0,83 cm","Pantalla Liquid Retina HD. Pantalla LCD de 6,1 pulgadas (en diagonal) con tecnología IPS1 Resolución de 1.792 por 828 píxeles a 326 p/p","Chip A12 Bionic. Neural Engine de segunda generación","Cámara de 12 Mpx con gran angular. Gran angular: apertura de ƒ/1,8. Estabilización óptica de imagen. Modo Retrato con efecto bokeh avanzado y Control de Profundidad. Iluminación de Retratos con tres efectos (Luz Natural, Luz de Estudio y Luz de Contorno). HDR Inteligente para fotos","Batería recargable integrada de iones de litio","iOS 14"]
    },
    {
        nombre:"iPad Pro",
        precio: 799,
        ruta:"../img/home/ipadpro-1.jpg",
        categoria:"Tablets",
        detalle: ["128 GB,256 GB,512 GB,1 TB,2 TB","24,76cm | 17,85cm | 0,59cm","Pantalla Liquid Retina. Pantalla Multi‑Touch de 11 pulgadas (27,96 cm) en diagonal retroiluminada por LED con tecnología IPS. Resolución de 2.388 por 1.668 píxeles a 264 p/p","Chip M1 de Apple. CPU de ocho núcleos con cuatro núcleos de rendimiento y cuatro de eficiencia. GPU de ocho núcleos. Neural Engine de 16 núcleos. 8 GB de RAM en los modelos con 128, 256 o 512 GB de capacidad 16 GB de RAM en los modelos con 1 o 2 TB de capacidad","Sistema de cámaras Pro: gran angular y ultra gran angular. Gran angular de 12 Mpx y apertura de ƒ/1,8. Ultra gran angular de 10 Mpx,pertura de ƒ/2,4 y campo de visión de 125°. Modo ráfaga. Captura de imagen en formato HEIF y JPEG","Batería recargable integrada de polímeros de litio de 28,65 vatios hora","iPadOS 14"]
    },
    {
        nombre:"iPhone 12",
        precio:799,
        ruta:"../img/home/iphone12-1.jpg",
        categoria:"Celulares",
        detalle:["64 GB,128 GB,256 GB","14,67 cm | 7,15 cm | 0,74 cm","Pantalla Super Retina XDR. Pantalla OLED de 6,1 pulgadas (en diagonal). Resolución de 2.532 por 1.170 píxeles a 460 p/p","Chip A14 Bionic. Neural Engine de última generación","Sistema de cámara dual de 12 Mpx con gran angular y ultra gran angular. Ultra gran angular: apertura de ƒ/2,4 y campo de visión de 120°. Gran angular: apertura de ƒ/1,6. Modo Retrato con efecto bokeh avanzado y Control de Profundidad. Iluminación de Retratos con seis efectos (Luz Natural, Luz de Estudio, Luz de Contorno, Luz de Escenario, Luz de Escenario Mono y Luz en Cla. Alta Mono). Estabilización óptica de imagen (gran angular). Lente de cinco elementos (ultra gran angular) y lente de siete elementos (gran angular). Fotos panorámicas (hasta 63 Mpx). Cubierta de la lente de cristal de zafiro. 100 % Focus Pixels (gran angular). Modo Noche (gran angular y ultra gran angular). Deep Fusion (gran angular y ultra gran angular). HDR Inteligente 3 con Detección de Escenas. Corrección del objetivo (ultra gran angular). Corrección de ojos rojos avanzada. Estabilización automática de imagen. Modo ráfaga. Captura de imagen en formato HEIF y JPEG","Batería recargable integrada de iones de litio","iOS 14"]
    },
    {
        nombre:"iPad Air",
        precio: 699,
        ruta:"../img/home/ipadair-1.jpg",
        categoria:"Tablets",
        detalle:["64 GB, 256 GB","24,76 cm | 17,85 cm | 0,61 cm","Pantalla Liquid Retina. Pantalla Multi-Touch de 10,9 pulgadas (en diagonal) retroiluminada por LED con tecnología IPS. Resolución de 2.360 por 1.640 píxeles a 264 p/p","Chip A14 Bionic con arquitectura de 64 bits. Neural Engine","Cámara de 12 Mpx con gran angular. Apertura de ƒ/1,8. Lente de cinco elementos. Filtro de infrarrojos híbrido. Sensor de iluminación posterior. Live Photos con estabili­zación. Gama cromática amplia para fotos y Live Photos. Fotos panorámicas (hasta 63 Mpx). Temporizador. Captura de imagen en formato HEIF y JPEG","Batería recargable integrada de polímeros de litio de 28,6 vatios hora","iPadOS 14"]
    },
    {
        nombre:"Apple Watch Series 6",
        precio: 499,
        ruta:"../img/home/watchseries6-1.jpg",
        categoria:"Apple Watch",
        detalle:["Es el Apple Watch más avanzado, con una app y un sensor para medir tu oxígeno en sangre, la app ECG y pantalla Retina siempre activa. Construido en Aluminio, Acero inoxidable, Titanio.","Caja de 40 o 44 mm","Pantalla Retina siempre activa 30 % más grande que la del Series 3","Conexión móvil en modelos GPS + Celular. Compatible con Configuración Familiar","Sensor de oxígeno en sangre. Sensor eléctrico de frecuencia cardiaca. Sensor óptico de frecuencia cardiaca. Digital Crown con respuesta háptica. GPS y Brújula. Altímetro siempre activo. Micrófono y altavoz de 2.ª generación","Chip S6 SiP de doble núcleo"]
    },
];