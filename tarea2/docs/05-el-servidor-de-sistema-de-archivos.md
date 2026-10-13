# 5. El servidor de sistema de archivos

## No es parte del protocolo

El servidor de sistema de archivos **no es parte de MCP**. MCP sólo define cómo se habla (los mensajes, las primitivas y los transportes). El servidor de archivos es uno de los **servidores de referencia** que publica el propio proyecto de MCP para mostrar cómo se implementa uno (Model Context Protocol, 2026b). Se distribuye en npm como `@modelcontextprotocol/server-filesystem`; yo usé la versión 1.0.0.

Es como la diferencia entre HTTP y un sitio web: HTTP es el protocolo; un sitio es una de muchas cosas que se pueden construir con él.

## Qué herramientas expone

Expone 14 herramientas (Model Context Protocol, s.f.). Claude Desktop las mostró en dos grupos, que coinciden con las marcas de sólo lectura que el servidor pone a cada una:

| Tipo | Herramientas | Qué hacen |
|---|---|---|
| Lectura | `read_text_file`, `read_media_file`, `read_multiple_files` | Leer archivos de texto, imágenes o varios a la vez |
| Lectura | `list_directory`, `list_directory_with_sizes`, `directory_tree` | Listar carpetas, con tamaños o como árbol |
| Lectura | `search_files`, `get_file_info`, `list_allowed_directories` | Buscar por patrón, ver metadatos y consultar qué carpetas están permitidas |
| Escritura | `write_file`, `edit_file` | Crear o sobrescribir un archivo, o cambiar sólo una parte |
| Escritura | `create_directory`, `move_file` | Crear carpetas y mover o renombrar archivos |

Además aparece `read_file`, una versión anterior de `read_text_file` que se conserva por compatibilidad. Ninguna herramienta borra archivos, aunque `write_file` puede sobrescribir uno y `move_file` puede quitarlo de su lugar.

## Cómo lo limitan los directorios permitidos

El servidor sólo trabaja dentro de las carpetas que se le indican al arrancar. En mi configuración es una sola, el último argumento de `claude_desktop_config.json`: `C:\dev\mcp-tarea2`.

Antes de cada operación, el servidor convierte la ruta pedida a su forma absoluta y real, resolviendo los `..` y los accesos directos, y comprueba que quede dentro de alguna carpeta permitida. Si no, devuelve un error sin tocar el disco. Lo comprobé en la Parte 3: al pedir `C:\dev\fuera-de-mcp\secreto.txt`, respondió `Access denied - path outside allowed directories`.

Lo importante es **dónde** está el límite: en el código del servidor, no en el modelo. Aunque el modelo intente salir de la carpeta, por error o porque lo engañaron, el servidor no lo deja.

Con la analogía del restaurante, la carpeta permitida es **la despensa** de la cocina. La cocina sólo cocina con lo que hay en su despensa: si el comensal pide algo que no está ahí, la cocina dice que no, aunque el mesero haya llevado el pedido. Eso me pasó con `secreto.txt`: Claude pidió el archivo, yo aprobé el pedido y aun así la cocina lo rechazó.

## Qué pasaría sin ese límite

El servidor corre con los permisos de mi usuario de Windows, así que sin carpetas permitidas podría hacer cualquier cosa que yo puedo hacer con mis archivos:

- **Leer información privada:** documentos personales, las llaves SSH de `C:\Users\Bryan\.ssh`, archivos `.env` con contraseñas o tokens de otros proyectos.
- **Escribir o sobrescribir donde no debe:** cambiar archivos de configuración, código de otros proyectos o archivos del sistema a los que tenga acceso.
- **Amplificar un ataque:** si el modelo lee un archivo con instrucciones escondidas, el daño ya no se limitaría a una carpeta de prueba, sino a todo lo que mi usuario puede tocar.

Por eso el PDF pide una carpeta creada para la tarea y nunca la raíz del disco ni la carpeta de usuario completa: el límite sólo protege si la carpeta permitida contiene únicamente lo que el modelo necesita.

## Referencias

Model Context Protocol. (s.f.). *Filesystem MCP server* (versión 1.0.0) [Software]. GitHub. https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem

Model Context Protocol. (2026b). *Architecture overview*. https://modelcontextprotocol.io/docs/learn/architecture
