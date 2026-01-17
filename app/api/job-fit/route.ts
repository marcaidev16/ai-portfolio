// Full CV Content for context
const MY_CV = `
Marc Bau Benavent
Consultor de Procesos & Especialista en Automatización e IA
marcbauteleco@gmail.com | 601093814
Valencia, España | LinkedIn | Idiomas: Español (Nativo), Inglés (B2)

Perfil Profesional
Especialista en automatización inteligente e IA conversacional con experiencia comprobada en sistemas enterprise de alto impacto. Expertise en desarrollo de agentes IA, integración de APIs complejas, y arquitecturas conversacionales multi-criterio. Combinación única de capacidades técnicas (n8n, Claude AI, RAG, MCP) con visión consultora para detectar cuellos de botella y proponer soluciones escalables que generan ROI medible.

Experiencia Profesional
AI Developer | Future Applied Intelligence SL (2025)
- Proyecto 1: Sistema genBI - Business Intelligence con IA. Desarrollo de sistema de BI con agentes IA que permite consultas en lenguaje natural sobre bases de datos PostgreSQL/Supabase usando Model Context Protocol (MCP). Framework de testing automatizado (105 casos). Optimización de prompts.
- Proyecto 2: Sistema LeadsAI - Cualificación Automática de Leads B2B. Automatización completa de recepción, validación, clasificación y enriquecimiento de leads con Claude Sonnet y correos anti-spam. Integración con Odoo CRM.
- Proyecto 3: Sistema Alphabet BMW. Clasificación automatizada de terminaciones de contratos con reglas complejas. Procesamiento con Anthropic Text Processing (ATP) y OCR/DAS.

AI Integration Specialist | AIAutomatiza (Junio 2025 – Noviembre 2025)
- Proyecto destacado: Asistente Virtual IA - Clínica Fernández Blanco. Sistema conversacional WhatsApp + Zoho CRM. Reducción 90% tiempo respuesta. Algoritmo matching multi-criterio. Motor disponibilidad complejo. RAG con base de conocimiento dinámica.

Intelligent Automation Specialist | NTT DATA (Abril 2024 – Diciembre 2024)
- Automatización de procesos corporativos enterprise. Desarrollo integraciones APIs REST y OutSystems.

Técnico de Soporte IT | F1-Connecting (Carrefour) (Noviembre 2022 – Abril 2023)

Proyectos Personales
- Agente IA para Automatización de Meta Ads (n8n, análisis KPIs real-time).
- Plataforma SaaS de Música Generativa con IA (Python FastAPI, Next.js, TypeScript).

Competencias Técnicas
- Automatización & IA: n8n, Make, Zapier, Flowise, Claude AI, OpenAI GPT-4o, RAG, Agents, Function Calling.
- Protocolos: MCP, ATP, REST/GraphQL, Webhooks.
- DB: MySQL, PostgreSQL, Supabase.
- Code: Python, JavaScript, TypeScript, Node.js, FastAPI, Next.js.
- CRM: Zoho, Odoo, HubSpot.

Educación
- Grado en Ingeniería Telemática – Universitat de València (2019)
- Certificaciones: AI Agents Fundamentals (Hugging Face), LLM Fundamentals, AI Fluency (Anthropic).
`;

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { jobDescription } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("Missing OPENAI_API_KEY");
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You are an expert AI Recruiter. You respond ONLY in valid JSON format.
            
            The JSON object structure must be EXACTLY:
            {
              "matchScore": number (0-100),
              "summary": string (brief, honest but persuasive, 2-3 sentences),
              "strengths": string[] (3-4 key matching skills),
              "gaps": string[] (2-3 missing but constructively framed),
              "verdict": "High Match" | "Potential Match" | "Low Match"
            }`
          },
          {
            role: "user",
            content: `
            ANALYZE CANDIDATE FIT based on the provided CV and Job Description.
            
            CANDIDATE CV:
            ${MY_CV}
    
            JOB DESCRIPTION:
            ${jobDescription}
    
            INSTRUCTIONS:
            1. Analyze fit based on skills and experience.
            2. BE HONEST but BENEFICIAL: Highlight transferrable skills. If he knows Python/FastAPI but job asks for Django, treat it as a strength/minor gap.
            3. OUTPUT MUST BE A SINGLE VALID JSON OBJECT.
            `
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API Error:", errorText);
      throw new Error(`OpenAI API failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Use JSON.parse with confidence as we strictly requested json_object
    const object = JSON.parse(content);

    return Response.json(object);
  } catch (error) {
    console.error('Job Fit API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to analyze job fit' }), { status: 500 });
  }
}

