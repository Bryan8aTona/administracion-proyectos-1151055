# 4. Arquitectura

> **Versión consultada:** especificación de MCP **2026-07-28**, la vigente al 12 de octubre de 2026 (Model Context Protocol, 2026a). La especificación cambia seguido: en esta versión, por ejemplo, *roots* y *sampling* pasaron a estar en desuso.

## Host, cliente y servidor

MCP sigue una arquitectura cliente-servidor con tres participantes (Model Context Protocol, 2026b):

| Participante | Qué es | En lo que yo instalé |
|---|---|---|
| **Host** | La aplicación de IA con la que habla el usuario. Coordina uno o varios clientes | **Claude Desktop** |
| **Cliente** | Un componente dentro del host que mantiene la conexión con **un** servidor. El host crea un cliente por cada servidor | El cliente MCP que Claude Desktop crea al arrancar para hablar con `filesystem` |
| **Servidor** | Un programa que ofrece contexto y herramientas | `@modelcontextprotocol/server-filesystem`, un proceso de Node.js que corre en mi computadora |

Si agregara otro servidor, por ejemplo el propio, Claude Desktop crearía un segundo cliente para él. Cada conexión es independiente.

## Las primitivas

Las primitivas son lo que cada lado puede ofrecerle al otro.

**Del servidor:**

| Primitiva | Qué es | Quién la controla |
|---|---|---|
| **Tools** (herramientas) | Funciones que el modelo puede ejecutar: leer un archivo, consultar una base de datos, llamar a una API | El modelo decide cuándo usarlas |
| **Resources** (recursos) | Datos de contexto que la aplicación puede leer: el contenido de un archivo, un registro, el esquema de una base de datos | La aplicación |
| **Prompts** | Plantillas de mensajes reutilizables que el usuario puede elegir | El usuario |

El servidor de archivos que instalé sólo expone *tools*: catorce, de las que diez son de sólo lectura y cuatro escriben.

**Del cliente:**

| Primitiva | Qué es | Estado en la versión 2026-07-28 |
|---|---|---|
| **Roots** (raíces) | El cliente le dice al servidor qué carpetas o archivos puede tocar | En desuso: se recomienda pasar las carpetas en la configuración del servidor o como parámetros (Model Context Protocol, 2026c) |
| **Elicitation** | El servidor le pide al usuario, a través del cliente, información adicional o una confirmación | Vigente |

El caso de *roots* se ve en mi instalación: el servidor de archivos todavía acepta *roots*, pero yo le pasé la carpeta permitida como argumento en `claude_desktop_config.json`, que es justo lo que ahora recomienda la especificación.

## Cómo se comunican

Todos los mensajes son **JSON-RPC 2.0**. El cliente pregunta qué ofrece el servidor (`tools/list`) y después pide ejecutar una herramienta (`tools/call`) con los argumentos que eligió el modelo. Por ejemplo, cuando le pedí leer `notas.txt`, el cliente mandó algo equivalente a esto:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "read_text_file",
    "arguments": { "path": "C:\\dev\\mcp-tarea2\\notas.txt" }
  }
}
```

## Los dos transportes

El transporte es el canal por el que viajan esos mensajes (Model Context Protocol, 2026b):

| Transporte | Cómo funciona | Cuándo se usa |
|---|---|---|
| **stdio** | El host arranca el servidor como un proceso en la misma computadora y le escribe por la entrada estándar; el servidor contesta por la salida estándar | Servidores locales, como el mío: Claude Desktop ejecuta `npx ... server-filesystem` y habla con él por stdio |
| **Streamable HTTP** | El cliente manda peticiones HTTP POST a un servidor remoto, que puede responder en *streaming* | Servidores en internet que atienden a muchos clientes; aquí sí se usa autenticación, normalmente con OAuth |

Por eso, cuando probé el servidor a mano en Git Bash, se quedaba esperando con el mensaje `running on stdio`: estaba escuchando su entrada estándar, que es por donde Claude Desktop le habla.

## Referencias

Model Context Protocol. (2026a). *Specification* (versión 2026-07-28). https://modelcontextprotocol.io/specification/2026-07-28

Model Context Protocol. (2026b). *Architecture overview*. https://modelcontextprotocol.io/docs/learn/architecture

Model Context Protocol. (2026c). *Deprecated features* (versión 2026-07-28). https://modelcontextprotocol.io/specification/2026-07-28/deprecated
