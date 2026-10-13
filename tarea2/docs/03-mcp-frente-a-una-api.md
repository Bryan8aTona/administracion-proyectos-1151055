# 3. MCP frente a una API

## Qué es una API

Una **API** (*Application Programming Interface*) es un contrato entre programas: define qué funciones ofrece un sistema, qué datos reciben y qué devuelven. Lo importante es que **quien programa decide de antemano qué se llama y cuándo**. Si escribo una app que consulta el clima, yo escribo en el código «cuando el usuario abra la pantalla, llama a `GET /clima?ciudad=...`». El programa nunca va a llamar algo que yo no haya escrito.

## Qué es MCP

**MCP** (*Model Context Protocol*) es un protocolo abierto que estandariza cómo una aplicación de IA se conecta con fuentes de datos y herramientas externas (Model Context Protocol, 2026a). Sus mensajes usan **JSON-RPC 2.0**, un formato estándar de llamadas remotas en JSON donde cada petición lleva un `method`, unos `params` y un `id` para emparejarla con su respuesta (JSON-RPC Working Group, 2013).

La diferencia de fondo es quién decide. En MCP, el servidor **publica un catálogo de herramientas**, cada una con nombre, descripción y el esquema de sus parámetros. El cliente lo pide con `tools/list`, la aplicación se lo pasa al modelo y **el modelo decide en el momento** cuál usar y con qué argumentos; luego se ejecuta con `tools/call` (Model Context Protocol, 2026b).

Lo comprobé en la Parte 3: nunca le dije a Claude qué herramienta usar. Para «lista lo que hay en la carpeta» eligió `directory_tree`; para «busca los `.json` y los `.md`» decidió por su cuenta hacer dos búsquedas con `search_files`. Con una API, esas decisiones las habría tenido que programar yo.

## Visto como un restaurante

Una forma de verlo es con un restaurante.

**La API es el mesero.** El **comensal** es un programa que necesita algo, por ejemplo una app del clima. **La cocina** es el sistema que tiene los datos, como los servidores de un servicio meteorológico. **La carta** es la documentación de la API: qué se puede pedir y cómo. El comensal no puede entrar a la cocina y servirse; tiene que pedirle al mesero, sólo lo que está en la carta y con el formato correcto («unos chilaquiles verdes, sin crema»). El mesero lleva el pedido, la cocina lo prepara y el mesero trae el plato: la respuesta. Así la cocina decide qué se puede pedir, todos los pedidos llegan en un formato que entiende, y puede reorganizarse por dentro sin afectar al comensal mientras la carta no cambie.

El detalle clave es que **cada restaurante tiene su propia carta y sus propias reglas**. Y quien lee esas cartas es un programador, que escribe el pedido exacto en el código antes de que la app funcione. La app siempre pide lo mismo.

**MCP es un acuerdo entre restaurantes.** Ahora el comensal es una IA como Claude, que quiere pedir en muchos restaurantes: mi calendario, mi correo, mis archivos. Si cada uno tuviera su carta en un formato distinto, alguien tendría que programar a mano cada conexión. Con MCP, cada restaurante pone en la entrada un **mesero MCP**, que es el servidor MCP, y que hace dos cosas:

1. Le entrega a la IA **una carta en un formato que cualquier IA entiende**, donde cada platillo trae su descripción: qué hace y qué datos necesita.
2. Recibe los pedidos de la IA y se encarga de que se preparen. Cómo lo hace por dentro es cosa de cada restaurante: muchas veces se los pasa **al mesero de siempre, la API**, y la cocina no cambia nada; otras veces entra directo a la cocina, o él mismo prepara el platillo.

La diferencia más importante está en **quién lee la carta y cuándo**. Con una API, el programador la lee antes y deja todo conectado. Con MCP, la IA la lee en el momento. Si le pido a Claude «revisa mi agenda de mañana y mándale un correo a Ana con la hora de la junta», Claude le pregunta al servidor del calendario qué puede hacer y ve «ver agenda»; le pregunta al del correo y ve «enviar correo»; y decide qué pedir, en qué orden y con qué datos, sin que nadie haya programado ese flujo. Y si conecto un servicio nuevo que tenga servidor MCP, basta con agregarlo a la configuración: la IA ya sabe leer ese tipo de carta.

Pero falta un personaje: **yo**. La IA no pide por su cuenta; yo le encargo lo que quiero, y antes de que el mesero lleve el pedido a la cocina, me pregunta «¿pido esto?». Eso fue el *Permitir una vez* que me apareció en cada operación de la Parte 3.

| En el restaurante | Con una API | Con MCP |
|---|---|---|
| El comensal | Una app, por ejemplo la del clima | La IA (Claude) |
| Quien encarga la comida | El programador, que deja el pedido fijo en el código | Yo, en lenguaje natural; la IA decide qué pedir |
| La carta | La documentación, que el programador lee antes | El catálogo de herramientas (`tools/list`), que la IA lee en el momento |
| El mesero | La API, con las reglas de cada restaurante | El mesero MCP (el servidor), que habla un idioma estándar. Por dentro puede pasarle el pedido a una API, o resolverlo él mismo |
| La cocina | El sistema que hace el trabajo | El mismo sistema, sin cambios: un servicio en internet, una base de datos o mi propio disco |
| «¿Pido esto?» | No hace falta: el pedido lo decidió el programador y siempre es el mismo | La IA me pregunta antes de **cada** pedido, porque ella decide qué pedir en el momento |

En una frase: **la API es el mesero que atiende a programas con las reglas de cada restaurante; MCP es el estándar para que cualquier IA llegue a cualquier restaurante, lea la carta sola y haga su pedido.**

## Tabla comparativa

| Aspecto | API tradicional | MCP |
|---|---|---|
| **Quién decide qué se invoca** | El programador, al escribir el código | El modelo, en el momento, según lo que le pide el usuario |
| **Cómo se descubren las capacidades** | Leyendo la documentación antes de programar | En tiempo de ejecución: el cliente pide el catálogo con `tools/list` y el servidor responde con nombres, descripciones y esquemas |
| **Acoplamiento** | Fuerte: el código depende de las rutas y los parámetros exactos; si la API cambia, hay que cambiar el programa | Débil: si el servidor agrega una herramienta, el modelo la ve en el siguiente `tools/list` sin cambiar el cliente |
| **Formato de los mensajes** | Varía: REST con JSON, GraphQL, SOAP con XML, gRPC... | Siempre JSON-RPC 2.0, con métodos estándar (`tools/list`, `tools/call`, `resources/read`...) |
| **Autenticación y consentimiento** | Llaves o tokens que el programa envía; el usuario normalmente no aprueba cada llamada | Tokens u OAuth en servidores remotos, y además el host debe pedir el consentimiento del usuario antes de invocar una herramienta (Model Context Protocol, 2026a) |
| **Reutilización entre aplicaciones** | Cada aplicación escribe su propia integración con cada API | Un servidor MCP sirve para cualquier cliente compatible: el mismo servidor de archivos funciona en Claude Desktop, VS Code o Google Antigravity |

## MCP no sustituye a las APIs

MCP tiene su propia arquitectura, pero esa arquitectura **sólo define la conversación entre el cliente y el servidor**: los mensajes JSON-RPC, las primitivas y los transportes. Lo que el servidor haga por dentro para cumplir un pedido no lo define MCP; puede ser cualquier cosa.

En la práctica, lo más común es que **envuelva una API que ya existe**, y por eso MCP no la reemplaza. En el restaurante, el mesero MCP no despide al mesero de siempre: le pasa los pedidos. Un servidor MCP de GitHub, por dentro, llama a la API REST de GitHub.

Pero no siempre es así, y depende de qué se entienda por «API»:

| Lo que hace el servidor por dentro | Ejemplo | ¿Envuelve una API? |
|---|---|---|
| Llama a un servicio web | Un servidor de GitHub que usa su API REST | Sí, una API web |
| Usa las funciones del sistema o de una biblioteca | El servidor de archivos que instalé, que usa el módulo `fs` de Node.js para leer y escribir en mi disco | No una API web, pero sí la API de archivos de Node.js |
| Calcula o resuelve todo él mismo | Un servidor que calcula la distancia entre dos puntos a partir de un archivo local | No: el mesero prepara el platillo él mismo |

Es por eso que **MCP no sustituye a las APIs, y casi siempre trabaja encima de una; lo que agrega es una capa estándar para que el modelo pueda descubrir esas funciones y decidir cuándo usarlas.** MCP no sabe nada de archivos ni de GitHub; sólo define cómo se anuncian y se llaman las herramientas.

Anthropic (2024) resume el problema que esto resuelve: antes, cada nueva fuente de datos requería su propia integración a la medida, y MCP reemplaza esas integraciones fragmentadas por un solo protocolo. Sin MCP, si hay *M* aplicaciones de IA y *N* fuentes de datos, se necesitan hasta *M × N* integraciones; con MCP basta con que cada aplicación hable MCP y cada fuente tenga su servidor.

## Referencias

Anthropic. (2024, 25 de noviembre). *Introducing the Model Context Protocol*. https://www.anthropic.com/news/model-context-protocol

JSON-RPC Working Group. (2013). *JSON-RPC 2.0 specification*. https://www.jsonrpc.org/specification

Model Context Protocol. (2026a). *Specification* (versión 2026-07-28). https://modelcontextprotocol.io/specification/2026-07-28

Model Context Protocol. (2026b). *Architecture overview*. https://modelcontextprotocol.io/docs/learn/architecture
