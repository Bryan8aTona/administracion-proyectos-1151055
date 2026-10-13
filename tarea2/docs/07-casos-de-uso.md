# 7. Casos de uso

Hoy varias herramientas de desarrollo usan MCP para que un agente de IA trabaje directamente sobre un proyecto. En todas, el agente **lee y edita los archivos en su lugar**, en la carpeta del repositorio: no hay que subir archivos a un chat ni copiar y pegar el código de vuelta.

| Herramienta | Qué es | Cómo usa MCP | Cómo edita el repositorio |
|---|---|---|---|
| **Claude Desktop** (Anthropic) | Aplicación de escritorio para conversar con Claude | Lee los servidores de `claude_desktop_config.json` y los arranca por stdio | Con un servidor como el de archivos, Claude lee y modifica los archivos de las carpetas autorizadas. Es lo que hice en la Parte 3 |
| **Claude Code** (Anthropic) | Agente de programación que trabaja desde la terminal, en la carpeta del proyecto | Se agregan servidores con `claude mcp add`, y un archivo `.mcp.json` en la raíz del proyecto los comparte con el equipo (Anthropic, s.f.) | Trabaja dentro del repositorio: lee los archivos, propone cambios y los aplica sobre los archivos reales |
| **Visual Studio Code** con GitHub Copilot (Microsoft) | Editor de código con un modo agente | Los servidores se configuran en `.vscode/mcp.json` o `.mcp.json`, y VS Code puede pedir confirmación antes de cada herramienta (Microsoft, s.f.) | El agente edita los archivos abiertos en el espacio de trabajo, y los cambios se ven y se revisan en el propio editor |
| **Google Antigravity** (Google) | Entorno de desarrollo de Google centrado en agentes, con versión de escritorio, IDE y CLI | Tiene una tienda de servidores MCP, y se configuran en `mcp_config.json`; las herramientas no configuradas piden aprobación (Google, s.f.) | Los agentes trabajan sobre el espacio de trabajo y, con MCP, consultan servicios externos, como bases de datos o GitHub, sin salir del entorno |

## Por qué ya no hace falta subir archivos a mano

Antes, para que la IA revisara un proyecto, había que copiar cada archivo al chat y después copiar la respuesta de vuelta. Con estas herramientas, el agente tiene acceso a la carpeta del repositorio, ya sea con herramientas propias o con un servidor como el de archivos. Puede listar la estructura, leer los archivos que necesita, editarlos y, si tiene un servidor de Git o de GitHub, también hacer commits o abrir *pull requests*.

Lo que comparten todas es que MCP les permite usar los **mismos servidores**: el servidor de archivos que configuré para Claude Desktop funcionaría igual en VS Code o en Antigravity, sólo cambiando el archivo de configuración de cada cliente.

## Referencias

Anthropic. (s.f.). *Connect Claude Code to tools via MCP*. Claude Code Docs. Recuperado el 12 de octubre de 2026, de https://code.claude.com/docs/en/mcp

Google. (s.f.). *Model Context Protocol (MCP)*. Google Antigravity Docs. Recuperado el 12 de octubre de 2026, de https://antigravity.google/docs/mcp

Microsoft. (s.f.). *Add and manage MCP servers in VS Code*. Visual Studio Code Docs. Recuperado el 12 de octubre de 2026, de https://code.visualstudio.com/docs/copilot/customization/mcp-servers
