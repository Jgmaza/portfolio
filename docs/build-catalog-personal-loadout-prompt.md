# Build Catalog — Personal Loadout Prompt

## Contexto

Estoy construyendo un portfolio web llamado **Build Catalog**. No quiero que se sienta como un CV tradicional, sino como un catálogo de builds con estética de videojuego/HUD.

La identidad profesional principal es:

- **Nombre:** José Maza
- **Clase:** Fullstack / Product Engineer
- **Enfoque:** Cierro el ciclo completo: problema → UI → API → deploy.
- **Estilo general:** Directo, técnico, visual, jugable y profesional.
- **Tono:** Minimalista y sutil para la parte personal.
- **Idioma:** Español de Colombia, conservando algunos labels en inglés cuando aporten a la estética HUD.

## Objetivo

Crear una sección llamada **PERSONAL LOADOUT** que muestre aspectos cotidianos de mi identidad sin convertirlos en una lista genérica de hobbies ni quitar protagonismo a mi experiencia como ingeniero.

La sección debe transmitir que el código es parte de mi identidad, pero no la totalidad de quién soy.

### Idea central

> Code is part of the build. Not the whole player.

También puede utilizarse esta frase:

> Always part of the build.

## Intereses que deben aparecer

### 1. MUSIC

La música es una parte central de mi vida. Debe presentarse como algo más profundo que un hobby ocasional.

Conceptos asociados:

- Sound
- Creation
- Exploration
- Tocar instrumentos
- Escuchar música
- Explorar sonidos
- Crear y estudiar música

Microcopy sugerido:

> Always part of the build.

La sección no debe inventar una biografía musical ni atribuirme logros que no he mencionado. La representación debe ser sutil y auténtica.

### 2. GYM

El gym debe aparecer como un aspecto cotidiano relacionado con el entrenamiento y la progresión personal, sin convertirlo en un discurso de productividad o disciplina exagerada.

Conceptos asociados:

- Training
- Progression
- Consistency

Microcopy sugerido:

> Keep showing up.

### 3. CHESS

El ajedrez debe mostrarse como un interés personal relacionado con el juego, la estrategia y el tiempo para pensar, sin forzar analogías con la programación.

Conceptos asociados:

- Strategy
- Patience
- Play

Microcopy sugerido:

> One more move.

## Dirección visual

Diseñar tres tarjetas o módulos minimalistas:

- MUSIC
- GYM
- CHESS

La estética debe ser:

- HUD discreto
- Espaciado generoso
- Tipografía clara
- Bordes y separadores sutiles
- Pocos colores y sin saturación visual excesiva
- Iconografía limpia
- Microinteracciones suaves, si encajan con el diseño
- Sin emojis obligatorios
- Sin barras de nivel, porcentajes o estadísticas inventadas
- Sin sobrecargar la sección con texto

La sección debe integrarse naturalmente con el resto del portfolio y no parecer una página separada de hobbies.

## Estructura sugerida

```text
BUILD CATALOG
│
├── PLAYER PROFILE
│   ├── Avatar
│   ├── Name / Class
│   └── Personal loadout
│
├── MAIN QUEST
│   └── Selected builds / Products
│
├── SIDE QUESTS
│   └── Work experience + personal projects
│
├── PERSONAL LOADOUT
│   ├── Music
│   ├── Gym
│   └── Chess
│
├── INVENTORY
│   └── Stack / Tools / Skills
│
└── GITHUB / CONTACT
```

## Copy de referencia

### PERSONAL LOADOUT

#### MUSIC

Sound · Creation · Exploration

> Always part of the build.

#### GYM

Training · Progression

> Keep showing up.

#### CHESS

Strategy · Patience · Play

> One more move.

## Reglas de contenido

1. No inventar experiencias, logros, hábitos, títulos, años ni datos personales.
2. No usar frases genéricas como:
   - “Apasionado por...”
   - “Me considero una persona...”
   - “Siempre buscando mejorar...”
   - “Sinergias”
   - “Resultados medibles”
3. No convertir cada interés personal en una justificación profesional.
4. No afirmar que el ajedrez me hace mejor programador.
5. No presentar el gym como una prueba de productividad o superioridad personal.
6. Tratar la música como el interés con mayor peso emocional, pero sin escribir un manifiesto exagerado.
7. Mantener los textos cortos y fáciles de escanear.
8. Conservar el balance entre identidad personal, estética gamer y credibilidad profesional.
9. El portfolio debe seguir teniendo como centro los proyectos, las demos públicas y el código.
10. La sección personal debe sentirse como una capa de identidad del jugador, no como un apartado de CV.

## Implementación esperada

Antes de modificar código:

1. Revisar la estructura actual del proyecto.
2. Identificar el framework, sistema de estilos y componentes existentes.
3. Reutilizar componentes, tokens, tipografías y patrones visuales ya presentes.
4. Evitar introducir dependencias innecesarias.
5. Mantener la responsividad para desktop y móvil.
6. Garantizar buen contraste y legibilidad.
7. Mantener la sección accesible mediante HTML semántico y etiquetas apropiadas.

Implementar:

- Un bloque `PERSONAL LOADOUT`.
- Tres tarjetas para `MUSIC`, `GYM` y `CHESS`.
- Una jerarquía visual clara entre label HUD, título, metadatos y microcopy.
- Un estado hover/focus sutil, si es coherente con el sistema visual.
- Diseño responsive.
- Código limpio y fácil de mantener.

## Resultado deseado

La sección debe comunicar:

> Hay un ingeniero detrás de los proyectos, pero también hay una persona con intereses, rutinas y espacios propios.

La experiencia debe sentirse como un catálogo de builds personal y profesional, no como un CV con una sección de hobbies pegada al final.
