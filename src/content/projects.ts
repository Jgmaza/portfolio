export type ProjectCategory =
  | "producto"
  | "ai-agents"
  | "laboral"
  | "hackathon";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  category: ProjectCategory;
  featured: boolean;
  year: string;
  role: string;
  stack: string[];
  problem: string;
  decisions: string[];
  outcome: string;
  demoUrl?: string;
  repoUrl?: string;
  disclaimer?: string;
  accent: string;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  producto: "Producto",
  "ai-agents": "AI / Agents",
  laboral: "Laboral sanitizado",
  hackathon: "Hackathon",
};

export const projects: Project[] = [
  {
    slug: "stakeholder-matrix",
    title: "Stakeholder Matrix",
    tagline: "Matriz interés-poder con catálogos y CRUD de actores",
    summary:
      "Demo sanitizada de una app fullstack de gestión de stakeholders: arquitectura limpia, matriz interactiva y datos ficticios vía mocks — sin backend ni datos reales.",
    category: "laboral",
    featured: true,
    year: "2025",
    role: "Fullstack — frontend React + API FastAPI (case study)",
    stack: [
      "React",
      "TypeScript",
      "Clean Architecture",
      "MSW",
      "FastAPI",
      "MySQL",
    ],
    problem:
      "Equipos de relacionamiento necesitan mapear actores clave por poder e interés, con catálogos jerárquicos y sin perder trazabilidad.",
    decisions: [
      "Separación domain/application/infrastructure/presentation",
      "Matriz visual con cuadrantes accionables",
      "Demo pública 100% mock (MSW) para no exponer datos laborales",
    ],
    outcome:
      "Case study + demo interactiva desplegada en Vercel con seed ficticio.",
    demoUrl: "https://stakeholder-matrix-demo.vercel.app",
    repoUrl: "https://github.com/Jgmaza/stakeholder-matrix-demo",
    disclaimer:
      "Portfolio demo inspired by professional work. Not affiliated with any employer or government entity.",
    accent: "#0d7377",
  },
  {
    slug: "mussistant",
    title: "Mussistant",
    tagline: "De setlist a playlist de Spotify en minutos",
    summary:
      "Asistente de música con OCR, matching inteligente al catálogo de Spotify y creación de playlists con auth PKCE.",
    category: "producto",
    featured: true,
    year: "2026",
    role: "Product engineer — frontend + integraciones",
    stack: ["React", "Vite", "Supabase Auth", "Spotify API", "OCR", "Tailwind"],
    problem:
      "DJs y productores pierden tiempo pasando setlists impresos o escritos a playlists manualmente.",
    decisions: [
      "Dual input: texto e imagen con OCR",
      "Scoring de confianza + corrección manual",
      "Spotify PKCE sin exponer secrets en el cliente",
    ],
    outcome: "Producto demoable end-to-end con auth y flujo de playlist.",
    demoUrl: "https://mussistant.vercel.app",
    repoUrl: "https://github.com/Jgmaza/Mussistant",
    accent: "#1db954",
  },
  {
    slug: "splitia",
    title: "Splitia",
    tagline: "Reparto de gastos compartidos sin fricción",
    summary:
      "App Next.js + Supabase para dividir gastos entre grupos, con flujos claros de balances y liquidación.",
    category: "producto",
    featured: true,
    year: "2026",
    role: "Fullstack",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    problem:
      "Calcular quién debe a quién en viajes o roommates es confuso y genera discusiones.",
    decisions: [
      "App Router + componentes enfocados en claridad de balances",
      "Supabase como BaaS para auth y persistencia",
    ],
    outcome: "Producto propio desplegable listo para mostrar en selección.",
    demoUrl: "https://splitia-xi.vercel.app",
    repoUrl: "https://github.com/Jgmaza/splitia",
    accent: "#e85d04",
  },
  {
    slug: "verificacol",
    title: "VerificaCol",
    tagline: "Validador de información electoral",
    summary:
      "Portal demo que analiza URLs, resume propuestas y permite conversar sobre el contenido para combatir desinformación.",
    category: "ai-agents",
    featured: true,
    year: "2026",
    role: "Fullstack — Next/Python + LLM",
    stack: ["TypeScript", "Python", "FastAPI", "OpenAI", "Vercel"],
    problem:
      "En campañas electorales circular contenido engañoso es rápido; verificarlo a mano no escala.",
    decisions: [
      "Pipeline de transcripción + scoring de credibilidad",
      "Chat sobre el contenido analizado",
      "Demo pública separada de datos sensibles",
    ],
    outcome: "Demo en vivo en Vercel usada como referencia de producto AI.",
    demoUrl: "https://verificacol.vercel.app",
    repoUrl: "https://github.com/Jgmaza/verificacol",
    accent: "#1d3557",
  },
  {
    slug: "bioalert",
    title: "BioAlert+",
    tagline: "WhatsApp agent sobre data de cafeterías escolares",
    summary:
      "Hackathon Caribe Tech: agente serverless que activa transacciones de cafetería en alertas, reportes e insights para padres y operadores.",
    category: "hackathon",
    featured: true,
    year: "2026",
    role: "Colaborador — arquitectura / demos web",
    stack: [
      "AWS Lambda",
      "TypeScript",
      "PostgreSQL",
      "DynamoDB",
      "Claude",
      "Serverless",
    ],
    problem:
      "Millones de transacciones de cafeterías escolares no llegan al padre ni informan a la operación.",
    decisions: [
      "Agente conversacional en WhatsApp",
      "Dashboard e insights cruzados padre↔cafetería",
      "Mocks de POS y checkout para demo",
    ],
    outcome: "Demos públicas en S3 + API demo del hackathon.",
    demoUrl:
      "https://bioalert-web-hackathon-642722971137.s3.us-east-1.amazonaws.com/feature-catalog/index.html",
    repoUrl: "https://github.com/miguelnietoa/bioalert-caribetech-hackathon",
    accent: "#c1121f",
  },
  {
    slug: "rhythm-elegance",
    title: "Rhythm Elegance",
    tagline: "Landing craft para marca de ritmo y estilo",
    summary:
      "Landing visual con tipografía expresiva, motion y composición de una sola idea — referencia de frontend craft.",
    category: "producto",
    featured: false,
    year: "2025",
    role: "Frontend",
    stack: ["React", "Vite", "Tailwind", "shadcn/ui"],
    problem: "Necesidad de una superficie promocional con presencia, no un template genérico.",
    decisions: [
      "Hero full-bleed con jerarquía tipográfica clara",
      "Motion intencional en lugar de ruido decorativo",
    ],
    outcome: "Pieza de portfolio orientada a calidad visual.",
    demoUrl: "https://rhythm-elegance.vercel.app",
    repoUrl: "https://github.com/Jgmaza/rhythm-elegance-landing",
    accent: "#9b2226",
  },
  {
    slug: "mediagent",
    title: "MediAgent",
    tagline: "Voice agent para dispensarios de medicamentos",
    summary:
      "Hackathon Barranqui-IA: agente de voz que conecta inventario, fórmula y paciente para reducir esperas en entrega de medicamentos.",
    category: "hackathon",
    featured: false,
    year: "2026",
    role: "Product / fullstack en equipo",
    stack: ["Next.js", "Vapi", "Supabase", "Deepgram", "ElevenLabs"],
    problem:
      "Inventario y fórmulas existen, pero el paciente espera horas porque los sistemas no se hablan.",
    decisions: [
      "Pipeline STT → LLM → TTS con voz colombiana",
      "Auth ligera por últimos dígitos de cédula (demo)",
    ],
    outcome: "Pitch + scope consolidado y app de demo del hackathon.",
    repoUrl: "https://github.com/hackaton-barranquiia/turnos-agent",
    accent: "#2a9d8f",
  },
  {
    slug: "hermes",
    title: "Hermes",
    tagline: "Chat / operación para equipos (freelance)",
    summary:
      "Frontend React + tablas y flujos operativos desplegado en Vercel. Case study narrativo pendiente de permiso ampliado del cliente.",
    category: "laboral",
    featured: false,
    year: "2025",
    role: "Frontend freelance",
    stack: ["React", "Vite", "TanStack Table", "Redux", "Vercel"],
    problem: "Equipos necesitan una superficie operativa clara para conversaciones y seguimiento.",
    decisions: [
      "UI densa con tablas y formularios tipados",
      "Deploy continuo en Vercel",
    ],
    outcome: "App en producción del cliente; portfolio con link demo cuando el acceso lo permite.",
    demoUrl: "https://hermes-liard.vercel.app",
    disclaimer:
      "Proyecto freelance para cliente. Detalles de negocio omitidos a propósito.",
    accent: "#457b9d",
  },
  {
    slug: "miobox",
    title: "MIOBOX Bridge",
    tagline: "Puente NestJS entre ERP, órdenes y cierre operativo",
    summary:
      "Integración laboral: SOAP/ERP ↔ órdenes ↔ cierre OP/consumo/entrega. Solo narrativa — sin código de cliente.",
    category: "laboral",
    featured: false,
    year: "2026",
    role: "Backend / integraciones",
    stack: ["NestJS", "TypeScript", "SOAP", "REST"],
    problem:
      "Sistemas de planta y ERP no hablan el mismo idioma; el cierre operativo se rompe en el medio.",
    decisions: [
      "API puente con contratos claros por etapa del flujo",
      "Manejo de fallos y reintentos en integraciones frágiles",
    ],
    outcome:
      "Case study de integraciones industriales sin exponer IP del cliente.",
    disclaimer: "Narrativa profesional. Código y datos del cliente no se publican.",
    accent: "#264653",
  },
  {
    slug: "interledger-agent",
    title: "Agent Marketplace (Interledger)",
    tagline: "API e ideas de marketplace para agentes de pago",
    summary:
      "Exploración fullstack alrededor de Open Payments / Interledger: APIs TypeScript y prototipos de marketplace de agentes.",
    category: "ai-agents",
    featured: false,
    year: "2026",
    role: "Fullstack explorer",
    stack: ["TypeScript", "Nest/Node", "Open Payments"],
    problem:
      "Cómo descubrir y orquestar agentes de pago en un ecosistema interoperable.",
    decisions: [
      "Prototipo de API bridge",
      "Documentación de flujos de pago abiertos",
    ],
    outcome: "Base técnica para demos y conversaciones de producto.",
    accent: "#6a4c93",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
