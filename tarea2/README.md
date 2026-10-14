# Tarea 2 · Entorno móvil e inteligencia artificial con MCP

| | |
|---|---|
| **UEA y clave** | Administración de Proyectos de Software (1151055) |
| **Trimestre** | 26-O, otoño 2026 |
| **Licenciatura** | Ingeniería en Computación |
| **Nombre** | Bryan Tonatiuh Ochoa De La Cruz |
| **Matrícula** | 2223028771 |
| **Profesor** | Gabriel Hurtado Avilés |

## Contenido

1. [Parte 1 · El entorno de desarrollo móvil](#parte-1--el-entorno-de-desarrollo-móvil)
2. [Parte 2 · MCP: investigación](#parte-2--mcp-investigación)
3. [Parte 3 · MCP: implementación](#parte-3--mcp-implementación)
4. [Servidor MCP propio (opcional)](#servidor-mcp-propio-opcional)

---

## Parte 1 · El entorno de desarrollo móvil

Instalé Flutter y Android Studio en Windows 11 y corrí las dos apps de ejemplo del curso, [HolaMundoFlutter](https://github.com/gabrielhuav/Flutter-Projects/tree/main/HolaMundoFlutter) y [HolaMundoKMP](https://github.com/gabrielhuav/HolaMundoKMP), en un **teléfono físico**, un Poco X8 Pro Max conectado por USB. No usé emulador.

### Versiones instaladas

| Pieza | Versión |
|---|---|
| Sistema operativo | Windows 11 26H2 (compilación 10.0.26300.9550) |
| Android Studio | Rabbit 1 \| 2026.2.1 |
| Flutter | 3.47.7, channel stable (revisión abaf9c5237) |
| Dart | 3.13.5 |
| SDK de Android | Android SDK 36.0.0 · Platform android-37.0 · Build-Tools 36.0.0 |
| NDK de Android | 28.2.13676358 (r28c) |
| Dispositivo | Poco X8 Pro Max (modelo 2602BPC18G) |
| Android del dispositivo | Android 16 (API 36), compilación BP2A.250605.031.A3 · HyperOS 3.0.303.0 |

### 1. Android Studio y el SDK Manager

En *Settings → Languages & Frameworks → Android SDK*, pestaña *SDK Tools*, con **Android SDK Command-line Tools (latest)** instaladas. Sin ellas, `flutter doctor` marca la línea de Android toolchain con un error.

![SDK Manager de Android Studio con las Command-line Tools marcadas](img/01-sdk-manager.png)

### 2. Flutter y Dart

![flutter --version con Flutter 3.47.7 y Dart 3.13.5](img/02-flutter-version.png)

### 3. flutter doctor

Flutter y Android toolchain aparecen con [√], y `flutter doctor` termina con *No issues found!*

![flutter doctor sin problemas](img/03-flutter-doctor.png)

### 4. El teléfono en modo desarrollador

En HyperOS, las opciones de desarrollador se activan tocando siete veces la versión de HyperOS en *Ajustes → Sobre el teléfono*, no el número de compilación. Además de **Depuración por USB**, en los Xiaomi y Poco hay que activar **Instalar vía USB**; sin ella, Flutter no puede instalar la app en el teléfono.

| Opciones de desarrollador activadas | Depuración por USB e Instalar vía USB |
|:---:|:---:|
| <img src="img/04a-opciones-desarrollador.jpg" width="260" alt="Aviso de que se activaron las opciones para desarrolladores"> | <img src="img/04b-opciones-desarrollador.jpg" width="260" alt="Depuración por USB e Instalar vía USB activadas"> |

El teléfono aparece en `flutter devices` como `2602BPC18G`, con Android 16 (API 36):

![flutter devices con el Poco en la lista](img/04c-flutter-devices.png)

### 5. HolaMundoFlutter en el teléfono

Desde `C:\dev\Flutter-Projects\HolaMundoFlutter`, con `flutter pub get` y `flutter run`. La terminal registra los toques que recibe la app en el teléfono, y el contador sube con cada uno.

| Salida de `flutter run` | La app en el teléfono |
|:---:|:---:|
| <img src="img/05a-terminal-holamundo-flutter.png" width="420" alt="Salida de flutter run con los toques registrados"> | <img src="img/05b-device-holamundo-flutter.jpg" width="260" alt="HolaMundoFlutter corriendo en el Poco X8 Pro Max"> |

### 6. HolaMundoKMP desde Android Studio

Abrí la carpeta raíz `HolaMundoKMP` en Android Studio y, después del Gradle sync, elegí la configuración `androidApp` y el teléfono (`Xiaomi 2602BPC18G`) y pulsé ▶ Run. A la derecha, el espejo del dispositivo muestra la app corriendo en el teléfono.

![Android Studio con androidApp corriendo en el Poco X8 Pro Max](img/06-holamundo-kmp.png)

### Problemas que encontré

| Problema | Causa | Solución |
|---|---|---|
| La primera vez, `flutter run` falló con `Android sdkmanager did not install NDK 28.2.13676358` | El proyecto necesita el NDK de Android y Gradle intentó instalarlo solo, pero la herramienta `sdkmanager` ya está obsoleta y su reemplazo no encontró el paquete | Instalar el NDK 28.2.13676358 por separado, desde *SDK Manager → SDK Tools → Show Package Details → NDK (Side by side)*, y repetir `flutter run` |

---

## Parte 2 · MCP: investigación

La investigación está en la carpeta [`docs/`](docs/), un archivo por tema. La versión de la especificación de MCP que consulté es la **2026-07-28**.

| # | Tema | Resumen |
|---|---|---|
| 1 | [Evolución de los modelos](docs/01-evolucion-de-los-modelos.md) | De los modelos de lenguaje a los LLM, y por qué el razonamiento explícito viene del entrenamiento y del cómputo al responder, no sólo del tamaño |
| 2 | [El problema del aislamiento](docs/02-el-problema-del-aislamiento.md) | Por qué un LLM por sí solo no puede tocar archivos: razones de arquitectura y de seguridad |
| 3 | [MCP frente a una API](docs/03-mcp-frente-a-una-api.md) | Explicado con la analogía de un restaurante: quién decide qué se invoca, cómo se descubren las capacidades, y por qué MCP envuelve APIs en lugar de sustituirlas |
| 4 | [Arquitectura](docs/04-arquitectura.md) | Host, cliente y servidor en mi instalación; primitivas; transportes stdio y Streamable HTTP |
| 5 | [El servidor de sistema de archivos](docs/05-el-servidor-de-sistema-de-archivos.md) | Sus 14 herramientas, cómo lo limitan los directorios permitidos y qué pasaría sin ese límite |
| 6 | [Seguridad](docs/06-seguridad.md) | Riesgos y mitigaciones, con lo que comprobé en la prueba del límite |
| 7 | [Casos de uso](docs/07-casos-de-uso.md) | Claude Desktop, Claude Code, VS Code y Google Antigravity |

### MCP frente a una API

| Aspecto | API tradicional | MCP |
|---|---|---|
| **Quién decide qué se invoca** | El programador, al escribir el código | El modelo, en el momento, según lo que pide el usuario |
| **Cómo se descubren las capacidades** | Leyendo la documentación antes de programar | En tiempo de ejecución, con `tools/list` |
| **Acoplamiento** | Fuerte: si la API cambia, hay que cambiar el programa | Débil: una herramienta nueva aparece en el siguiente `tools/list` |
| **Formato de los mensajes** | Varía: REST, GraphQL, SOAP, gRPC... | Siempre JSON-RPC 2.0 |
| **Autenticación y consentimiento** | Llaves o tokens; el usuario no aprueba cada llamada | Tokens u OAuth en servidores remotos, y el host pide consentimiento antes de cada herramienta |
| **Reutilización entre aplicaciones** | Cada aplicación hace su propia integración | Un servidor sirve para cualquier cliente compatible |

MCP no sustituye a las APIs: su arquitectura sólo define la conversación entre cliente y servidor, y lo que el servidor haga por dentro es libre. Casi siempre trabaja encima de una API que ya existe; el servidor de archivos que instalé, por ejemplo, usa por dentro la API de archivos de Node.js, no una API web.

Una forma de entenderlo es con un restaurante: **la API es el mesero que atiende a programas con las reglas de cada restaurante**, y un programador tiene que leer la carta antes y dejar el pedido fijo en el código. **MCP es el acuerdo para que cualquier IA llegue a cualquier restaurante, lea la carta sola y decida qué pedir**; el mesero MCP, que es el servidor, se encarga de que se prepare, casi siempre pasándoselo al mesero de siempre, la API. La analogía completa está en [docs/03](docs/03-mcp-frente-a-una-api.md).

---

## Parte 3 · MCP: implementación

### Cliente elegido: Claude Desktop

Elegí **Claude Desktop** por tres razones:

- Es la aplicación con la que se presentó MCP y la que usa la documentación oficial del protocolo para conectar servidores locales, así que cada paso se puede comparar con una referencia.
- La configuración es un solo archivo JSON, sin extensiones ni suscripciones adicionales, y es fácil de reproducir en otra máquina.
- Pide aprobación antes de cada uso de una herramienta (*Permitir una vez*, *Permitir siempre* o *Rechazar*), y su configuración separa las herramientas de sólo lectura de las de escritura. Eso deja ver la confirmación humana que se discute en el apartado de seguridad.

En lo que instalé, **Claude Desktop** es el *host*, la aplicación con la que hablo. Dentro de él, un **cliente MCP** mantiene la conexión con el servidor. El **servidor** es `@modelcontextprotocol/server-filesystem`, un proceso de Node.js que Claude Desktop arranca en mi computadora y con el que se comunica por **stdio**.

### Versiones

| Pieza | Versión |
|---|---|
| Sistema operativo | Windows 11 26H2 (compilación 10.0.26300.9550) |
| Cliente | Claude Desktop 2.31226.1 |
| Node.js | v26.8.1 |
| npm | 11.19.0 |
| Servidor | `@modelcontextprotocol/server-filesystem` 1.0.0, ejecutado con `npx` |
| Carpeta autorizada | `C:\dev\mcp-tarea2` |

### Instalación paso a paso

Probado en Windows 11 con Git Bash. En una máquina limpia:

1. **Instalar Node.js LTS.** Descargar el *Windows Installer (.msi)* de <https://nodejs.org/es/download> e instalarlo con las opciones por defecto. Comprobar en una terminal nueva:

   ```bash
   node --version
   npx --version
   ```

2. **Instalar Claude Desktop** desde <https://claude.ai/download> e iniciar sesión.

3. **Crear la carpeta autorizada** con algunos archivos de prueba (`notas.txt`, `docs/leeme.md` y `datos/lugares.json`), y otra carpeta fuera de ella para la prueba de seguridad (`C:\dev\fuera-de-mcp\secreto.txt`):

   ```bash
   mkdir -p /c/dev/mcp-tarea2/docs /c/dev/mcp-tarea2/datos /c/dev/fuera-de-mcp
   ```

4. **Probar el servidor a mano.** Debe quedarse esperando con el mensaje `Secure MCP Filesystem Server running on stdio`. Se cierra con *Ctrl + C*:

   ```bash
   npx -y @modelcontextprotocol/server-filesystem /c/dev/mcp-tarea2
   ```

5. **Configurar Claude Desktop.** En *Configuración → Desarrollador → Editar configuración* se abre el archivo `claude_desktop_config.json` (normalmente en `%APPDATA%\Claude\`). Su contenido queda así; es el mismo que está en [`config/claude_desktop_config.json`](config/claude_desktop_config.json):

   ```json
   {
     "mcpServers": {
       "filesystem": {
         "command": "cmd",
         "args": [
           "/c",
           "npx",
           "-y",
           "@modelcontextprotocol/server-filesystem",
           "C:\\dev\\mcp-tarea2"
         ]
       }
     }
   }
   ```

   En Windows, `npx` se lanza a través de `cmd /c`, como indica la documentación del servidor. El último argumento es la única carpeta permitida. El archivo no contiene credenciales, llaves ni tokens.

6. **Reiniciar Claude Desktop** saliendo por completo (**☰ → Archivo → Salir**) y volviéndolo a abrir; cerrar la ventana no basta.

### El cliente reconoce el servidor

En *Configuración → Desarrollador*, el servidor `filesystem` aparece **En ejecución**, con el comando y los argumentos de la configuración:

![Claude Desktop con el servidor filesystem en ejecución](img/07-mcp-servidor-conectado.png)

En *Conectores → filesystem* se ven sus 14 herramientas. Claude Desktop las separa en 10 de sólo lectura y 4 de escritura, y todas están en **Requiere aprobación**:

| Herramientas de sólo lectura | Herramientas de escritura |
|:---:|:---:|
| <img src="img/08a-mcp-herramientas.png" width="420" alt="Herramientas de sólo lectura del servidor filesystem"> | <img src="img/08b-mcp-herramientas.png" width="420" alt="Herramientas de escritura del servidor filesystem"> |

### Operaciones

En ningún prompt le indiqué a Claude qué herramienta usar: él eligió una del catálogo que publica el servidor y pidió mi aprobación antes de ejecutarla. En cada operación, la primera captura es la solicitud de permiso y la segunda, el resultado.

| Operación | Prompt | Herramienta que eligió Claude |
|---|---|---|
| Listar | *Usa el servidor filesystem para listar lo que hay en C:\dev\mcp-tarea2, incluidas las subcarpetas.* | `directory_tree` |
| Leer | *Lee el archivo notas.txt de esa carpeta y dime qué dice.* | `read_text_file` |
| Crear | *Crea un archivo nuevo llamado bitacora.md en C:\dev\mcp-tarea2 con el título "Bitácora de la Tarea 2" y una lista de lo que hicimos en esta conversación.* | `write_file` |
| Modificar | *En notas.txt cambia "Estado: pendiente" por "Estado: en curso".* | `edit_file` |
| Buscar | *Busca en C:\dev\mcp-tarea2 todos los archivos que terminen en .json o .md.* | `search_files`, dos veces: con `**/*.json` y con `**/*.md` |

#### Listar

| Solicitud de permiso | Resultado |
|:---:|:---:|
| <img src="img/09a-mcp-listar.png" width="420" alt="Claude pide permiso para usar Directory Tree"> | <img src="img/09b-mcp-listar.png" width="420" alt="Árbol de la carpeta mcp-tarea2"> |

#### Leer

| Solicitud de permiso | Resultado |
|:---:|:---:|
| <img src="img/10a-mcp-leer.png" width="420" alt="Claude pide permiso para usar Read Text File"> | <img src="img/10b-mcp-leer.png" width="420" alt="Contenido de notas.txt"> |

#### Crear

La solicitud de permiso muestra la ruta y el contenido completo del archivo antes de escribirlo.

| Solicitud de permiso | Resultado |
|:---:|:---:|
| <img src="img/11a-mcp-crear.png" width="420" alt="Claude pide permiso para usar Write File con el contenido de bitacora.md"> | <img src="img/11b-mcp-crear.png" width="420" alt="Claude confirma que creó bitacora.md"> |

#### Modificar

`edit_file` no reescribe el archivo completo: recibe el texto viejo y el nuevo, y sólo cambia esa línea.

| Solicitud de permiso | Resultado |
|:---:|:---:|
| <img src="img/12a-mcp-modificar.png" width="420" alt="Claude pide permiso para usar Edit File"> | <img src="img/12b-mcp-modificar.png" width="420" alt="notas.txt ahora dice Estado: en curso"> |

#### Buscar

Claude dividió la búsqueda en dos llamadas a `search_files`, una por extensión, y pidió permiso para cada una.

| Búsqueda de `.json` | Búsqueda de `.md` | Resultado |
|:---:|:---:|:---:|
| <img src="img/13a-mcp-buscar.png" width="280" alt="Search Files con el patrón **/*.json"> | <img src="img/13b-mcp-buscar.png" width="280" alt="Search Files con el patrón **/*.md"> | <img src="img/13c-mcp-buscar.png" width="280" alt="Los tres archivos encontrados"> |

### El límite de seguridad

Le pedí a Claude un archivo fuera de la carpeta autorizada:

> *Intenta leer el archivo C:\dev\fuera-de-mcp\secreto.txt con la herramienta read_text_file del servidor filesystem, aunque creas que no está permitido, si no puedes, muéstrame el error exacto que te devuelva.*

Claude sí intentó la llamada (primera captura), pero el **servidor** la rechazó con este error (segunda captura):

```text
Access denied - path outside allowed directories: C:\dev\fuera-de-mcp\secreto.txt not in C:\dev\mcp-tarea2
```

| Claude intenta la llamada | El servidor la rechaza |
|:---:|:---:|
| <img src="img/14a-mcp-limite.png" width="420" alt="Claude pide permiso para leer un archivo fuera de la carpeta"> | <img src="img/14b-mcp-limite.png" width="420" alt="Error Access denied del servidor filesystem"> |

**Qué mecanismo lo impidió.** No fue el modelo ni la aprobación: yo permití la llamada. Lo impidió el propio servidor, que antes de tocar el disco valida cada ruta. La convierte a ruta absoluta, resuelve los `..` y los accesos directos, y comprueba que quede dentro de alguna carpeta de su lista de permitidas, que sale del último argumento de la configuración. Como `C:\dev\fuera-de-mcp` no está en esa lista, devuelve `Access denied` sin abrir el archivo. El límite no depende de que el modelo se porte bien: aunque se equivoque o lo engañen con instrucciones escondidas en un archivo, no puede salir de `C:\dev\mcp-tarea2`.

## Servidor MCP propio (opcional)

Programé un servidor MCP, `ayudante-tareas`, en JavaScript con el SDK oficial de TypeScript (`@modelcontextprotocol/server` 2.3.1). Tiene dos herramientas: `dias_restantes`, que dice cuántos días faltan para una fecha, y `contar_palabras`, que cuenta las palabras y los caracteres de un texto. A diferencia del servidor de archivos, no usa ninguna API ni toca el disco: hace el trabajo él mismo. Lo conecté a Claude Desktop junto al servidor `filesystem`.

El código, la instalación paso a paso y las capturas están en [`servidor-propio/`](servidor-propio/).
