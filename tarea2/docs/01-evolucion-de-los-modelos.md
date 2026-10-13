# 1. Evolución de los modelos

## Qué es un modelo de lenguaje

Un modelo de lenguaje es un programa que, dado un texto, calcula qué palabra (o fragmento de palabra, llamado *token*) es más probable que siga. Los primeros modelos neuronales de lenguaje aprendían esa probabilidad a partir de las palabras anteriores, representando cada palabra como un vector de números (Bengio et al., 2003). Generar texto es repetir esa predicción una y otra vez: el modelo elige el siguiente token, lo agrega al texto y vuelve a predecir.

## Cómo llegó a ser un modelo grande (LLM)

El salto vino en 2017 con la arquitectura **Transformer**, que en lugar de leer el texto palabra por palabra usa un mecanismo de *atención* para relacionar todas las palabras entre sí al mismo tiempo (Vaswani et al., 2017). Eso permitió entrenar en paralelo con muchísimos más datos.

A partir de ahí, la mejora vino sobre todo de escalar: más parámetros, más datos y más cómputo de entrenamiento. Kaplan et al. (2020) mostraron que el error del modelo baja de forma predecible conforme crecen esas tres cosas. Con GPT-3, de 175 mil millones de parámetros, apareció algo nuevo: el modelo podía resolver tareas que no se le enseñaron explícitamente con sólo ver unos cuantos ejemplos en el texto de entrada (Brown et al., 2020). A ese tamaño ya se le llama **modelo de lenguaje grande** o **LLM**.

| Etapa | Qué cambió |
|---|---|
| Modelos neuronales de lenguaje | Predicen la siguiente palabra con redes neuronales |
| Transformer (2017) | La atención permite entrenar con mucho más texto en paralelo |
| LLM (2020 en adelante) | Al escalar, el modelo aprende tareas nuevas a partir de pocos ejemplos |
| Modelos con razonamiento explícito (2024 en adelante) | El modelo genera y revisa pasos intermedios antes de responder |

## Modelos con razonamiento explícito

Un modelo con razonamiento explícito no contesta de inmediato: primero genera una cadena de pasos intermedios, la revisa y luego da la respuesta. Ya se sabía que pedirle a un LLM que «piense paso a paso» mejoraba sus resultados en problemas de matemáticas y lógica (Wei et al., 2022), pero en esos casos el razonamiento dependía de cómo se escribía el prompt.

Lo importante es que **esa capacidad no aparece sólo por hacer el modelo más grande**. Viene de dos cosas adicionales:

1. **Técnicas de entrenamiento.** Con aprendizaje por refuerzo a gran escala, el modelo se entrena para producir cadenas de razonamiento que llegan a respuestas correctas. OpenAI (2024) describe que su algoritmo «enseña al modelo a pensar de forma productiva usando su cadena de pensamiento», y DeepSeek-AI (2025) mostró que esa capacidad se puede obtener con aprendizaje por refuerzo aun sin ejemplos de razonamiento escritos por personas.
2. **Cómputo adicional al responder.** El modelo gasta más tiempo y más tokens pensando antes de contestar, y su desempeño mejora conforme se le da más de ese «tiempo de pensamiento» (OpenAI, 2024).

En resumen, escalar le da al modelo conocimiento; el entrenamiento por refuerzo y el cómputo al responder le enseñan a usarlo paso a paso. Un modelo enorme sin ese entrenamiento puede saber mucho y aun así equivocarse en un problema que requiere varios pasos.

## Referencias

Bengio, Y., Ducharme, R., Vincent, P. y Jauvin, C. (2003). A neural probabilistic language model. *Journal of Machine Learning Research, 3*, 1137–1155.

Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., ... Amodei, D. (2020). Language models are few-shot learners. *Advances in Neural Information Processing Systems, 33*, 1877–1901. https://arxiv.org/abs/2005.14165

DeepSeek-AI. (2025). *DeepSeek-R1: Incentivizing reasoning capability in LLMs via reinforcement learning* (arXiv:2501.12948). arXiv. https://arxiv.org/abs/2501.12948

Kaplan, J., McCandlish, S., Henighan, T., Brown, T. B., Chess, B., Child, R., ... Amodei, D. (2020). *Scaling laws for neural language models* (arXiv:2001.08361). arXiv. https://arxiv.org/abs/2001.08361

OpenAI. (2024, 12 de septiembre). *Learning to reason with LLMs*. https://openai.com/index/learning-to-reason-with-llms/

Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł. y Polosukhin, I. (2017). Attention is all you need. *Advances in Neural Information Processing Systems, 30*. https://arxiv.org/abs/1706.03762

Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q. y Zhou, D. (2022). Chain-of-thought prompting elicits reasoning in large language models. *Advances in Neural Information Processing Systems, 35*. https://arxiv.org/abs/2201.11903
