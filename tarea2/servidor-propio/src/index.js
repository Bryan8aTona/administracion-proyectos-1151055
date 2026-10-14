// Servidor MCP propio "ayudante-tareas" (Tarea 2, Administración de Proyectos de Software).
// Tiene dos herramientas: dias_restantes y contar_palabras.
// El SDK oficial se encarga del protocolo MCP; aquí sólo se define qué hace cada herramienta.

import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod';

function crearServidor() {
  const server = new McpServer({ name: 'ayudante-tareas', version: '1.0.0' });

  // Herramienta 1: cuántos días faltan para una fecha.
  // El modelo no tiene reloj; el servidor lee la fecha de la computadora.
  server.registerTool(
    'dias_restantes',
    {
      description:
        'Dice qué fecha es hoy y cuántos días faltan para una fecha límite. ' +
        'La fecha se da en formato AAAA-MM-DD, por ejemplo 2026-10-17.',
      inputSchema: z.object({
        fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe('Fecha límite en formato AAAA-MM-DD.'),
      }),
    },
    async ({ fecha }) => {
      const [anio, mes, dia] = fecha.split('-').map(Number);
      const limite = new Date(anio, mes - 1, dia);
      if (limite.getMonth() !== mes - 1 || limite.getDate() !== dia) {
        return { content: [{ type: 'text', text: `La fecha ${fecha} no existe.` }], isError: true };
      }

      const ahora = new Date();
      const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
      const dias = Math.round((limite - hoy) / (24 * 60 * 60 * 1000));

      const textoHoy = hoy.toLocaleDateString('es-MX', { dateStyle: 'full' });
      let texto;
      if (dias > 0) texto = `Hoy es ${textoHoy}. Días que faltan para el ${fecha}: ${dias}.`;
      else if (dias === 0) texto = `Hoy es ${textoHoy}. La fecha límite es hoy.`;
      else texto = `Hoy es ${textoHoy}. La fecha ${fecha} ya pasó; días desde entonces: ${-dias}.`;

      return { content: [{ type: 'text', text: texto }] };
    },
  );

  // Herramienta 2: cuántas palabras y caracteres tiene un texto.
  server.registerTool(
    'contar_palabras',
    {
      description:
        'Cuenta las palabras y los caracteres de un texto. ' +
        'Sirve para revisar si un texto cumple un límite de extensión.',
      inputSchema: z.object({
        texto: z.string().describe('El texto que se va a contar.'),
      }),
    },
    async ({ texto }) => {
      const palabras = texto.split(/\s+/).filter((p) => p !== '').length;
      const caracteres = texto.length;
      return {
        content: [{ type: 'text', text: `El texto tiene ${palabras} palabras y ${caracteres} caracteres.` }],
      };
    },
  );

  return server;
}

// Arranca el servidor y lo deja escuchando por stdio (entrada y salida estándar),
// que es por donde Claude Desktop le manda los mensajes.
serveStdio(crearServidor);
