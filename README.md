# 🧠 Nodemind — AI Agent Builder Platform

<div align="center">

![Nodemind Banner](https://via.placeholder.com/800x200/1a1a2e/ffffff?text=Nodemind+%E2%80%94+Build+AI+Workflows+Visually)

**Build, configure, and deploy intelligent AI agents through a visual drag-and-drop interface — no coding required.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Google Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-orange?style=for-the-badge&logo=google)](https://ai.google.dev)
[![Convex](https://img.shields.io/badge/Convex-Database-red?style=for-the-badge)](https://convex.dev)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=for-the-badge)](https://clerk.com)

[Live Demo](https://nodemind.ai) · [Report Bug](https://github.com/yourusername/nodemind/issues) · [Request Feature](https://github.com/yourusername/nodemind/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Node Types](#-node-types)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Use Cases](#-use-cases)
- [API Reference](#-api-reference)
- [Subscription Plans](#-subscription-plans)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 About

Nodemind is a full-stack AI Agent Builder Platform that enables users to visually design, configure, and deploy intelligent AI agents through a node-based drag-and-drop interface.

The platform abstracts the complexity of large language model (LLM) integration by providing a **dynamic workflow execution engine** that processes a sequence of interconnected nodes — each node's output becomes the next node's enriched input, enabling sophisticated multi-step AI pipelines.

> Built as part of a Specialized Studies course at **Troy University** by Kashyap Vaghani (Student ID: 1699018)

---

## ✨ Features

### 🎨 Visual Workflow Builder
- Drag-and-drop canvas powered by React Flow
- 6 distinct node types for complete workflow control
- Real-time node connection with animated edges
- Context-sensitive settings panel for each node

### 🤖 AI Agent Engine
- Google Gemini 2.5 Flash integration
- Custom instructions per agent node
- JSON and Text output format support
- Knowledge base (Add Context) for domain-specific agents
- Chat history support for conversational agents

### 🔌 API Integration
- External API calls within workflows
- Dynamic URL parameter substitution with `{{message}}` placeholder
- Automatic API key injection
- GET and POST method support

### 🔀 Conditional Logic
- If/Else branching with AI-evaluated conditions
- Natural language condition expressions
- While loop support for iterative workflows

### 💬 Real-Time Chat Interface
- Streaming responses via Server-Sent Events (SSE)
- Markdown rendering with table support
- Conversation history management
- Preview mode for testing before publishing

### 🚀 Publish & Deploy
- One-click agent publishing
- Production-ready API endpoint generation
- Copy-paste code snippets for external integration
- API key management

### 🔐 Security & Auth
- Clerk authentication (Google OAuth + Email/Password)
- Token-based credit system
- Arcjet rate limiting
- Subscription tier management

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS |
| **UI Components** | Shadcn UI, React Flow, Lucide Icons |
| **AI/LLM** | Google Gemini 2.5 Flash (via @google/genai) |
| **Database** | Convex (Real-time, serverless) |
| **Authentication** | Clerk |
| **Rate Limiting** | Arcjet |
| **Styling** | Tailwind CSS |
| **Markdown** | react-markdown + remark-gfm |
| **HTTP Client** | Axios |
| **ID Generation** | uuid |

---

## 🔷 Node Types

### 1. 🟢 Start Node
Entry point of every workflow. Every agent must begin with a Start node.

### 2. 🟠 Agent Node
Executes an LLM call with configurable:
- **Name** — Display name for the agent
- **Instructions** — Custom system prompt
- **Add Context** — Paste knowledge base for domain-specific answers
- **Include Chat History** — Maintain conversation context
- **AI Model** — Select Gemini model variant
- **Output Format** — Text or JSON with custom schema

### 3. 🩷 API Node
Makes HTTP requests to external APIs:
- **Name** — Display name
- **Method** — GET or POST
- **URL** — Supports `{{message}}` placeholder for dynamic values
- **API Key** — Securely stored, auto-appended at runtime
- **Body Parameters** — JSON body for POST requests

> **Placeholder:** Use `{{message}}` in your URL — it will be automatically replaced with the current pipeline value at runtime.
> 
> Example: `https://finnhub.io/api/v1/quote?symbol={{message}}&token=YOUR_KEY`

### 4. 🔵 If/Else Node
Conditional branching based on pipeline context:
- **If Condition** — Natural language or JSON field condition
- Routes to **if** branch when condition is true
- Routes to **else** branch when condition is false

### 5. 🔷 While Node
Loop execution while a condition remains true.

### 6. 👍 User Approval Node
Pause workflow execution for human approval before proceeding.

### 7. 🔴 End Node
Terminates workflow and formats final output:
- **Output Format** — Text or JSON

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Convex account
- Clerk account
- Google AI Studio account (Gemini API key)
- Arcjet account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nodemind.git
cd nodemind
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Convex**
```bash
npx convex dev
```

4. **Configure environment variables**
```bash
cp .env.example .env.local
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Convex
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Arcjet Rate Limiting
ARCJET_KEY=your_arcjet_key
```

---

## 📁 Project Structure

```
nodemind/
├── app/
│   ├── api/
│   │   ├── agent-chat/
│   │   │   └── route.ts          # Main workflow execution engine
│   │   └── generate-api-tool-config/
│   │       └── route.ts          # Gemini config generator
│   ├── Dashboard/
│   │   ├── My-Agents/            # Agent listing page
│   │   └── page.tsx              # Main dashboard
│   └── nodemind-agent/
│       └── [agentId]/
│           ├── page.tsx          # Agent builder canvas
│           └── preview/
│               └── page.tsx      # Preview & publish page
├── components/
│   └── ui/                       # Shadcn UI components
├── context/
│   └── WorkflowContext.tsx       # Global workflow state
├── convex/
│   ├── schema.ts                 # Database schema
│   ├── agent.ts                  # Agent mutations/queries
│   └── conversation.ts          # Conversation queries
├── _customNodes/
│   ├── AgentNode.tsx
│   ├── ApiNode.tsx
│   ├── EndNode.tsx
│   ├── IfElseNode.tsx
│   ├── StartNode.tsx
│   ├── UserApprovalNode.tsx
│   └── WhileNode.tsx
├── _components/
│   ├── AgentsToolPanel.tsx       # Left sidebar node panel
│   ├── NodeSettings.tsx          # Right sidebar settings
│   └── Header.tsx                # Top navigation
├── _nodeSettings/
│   ├── AgentSettings.tsx
│   ├── ApiSettings.tsx
│   ├── EndSettings.tsx
│   ├── IfElseSettings.tsx
│   ├── WhileSettings.tsx
│   └── UserApprovalSettings.tsx
├── config/
│   └── geminiai.ts               # Gemini client config
├── types/
│   └── AgentType.ts              # TypeScript type definitions
└── public/                       # Static assets
```

---

## ⚙️ How It Works

### Workflow Execution Engine

When a user sends a message, the backend:

1. **Fetches** the agent's node and edge configuration from Convex
2. **Reconstructs** the workflow graph
3. **Traverses** the graph from the Start node
4. **Executes** each node sequentially:
   - **Agent Node** → Calls Gemini with instruction + context
   - **API Node** → Fetches external data, appends to context
   - **If/Else Node** → Evaluates condition using Gemini, routes accordingly
5. **Passes** each node's output as enriched input to the next node
6. **Returns** the final output from the End node

```
User Input
    ↓
Start Node
    ↓
Agent Node (Gemini LLM call)
    ↓
If/Else Node (condition evaluation)
    ↓              ↓
IF branch      ELSE branch
    ↓              ↓
API Node      Agent Node
    ↓
Agent Node (analysis)
    ↓
End Node → Response to User
```

### Context Propagation

Each node's output is passed to the next node as enriched context:

```typescript
// After API Node execution:
currentInput = `Previous output: ${currentInput}
API Response: ${JSON.stringify(apiData)}`

// Agent Node receives full context:
// - User's original message
// - Previous agent outputs  
// - API response data
```

---

## 💡 Use Cases

### 📈 Stock Market Analysis Agent

**Workflow:** `Start → Chat Agent → If/Else → Conversation Agent → End`
                                          `→ Symbol Extractor → API → Analyzer → End`

**Features:**
- Intent classification (conversation vs. data request)
- Company name to ticker symbol conversion
- Real-time stock data via Finnhub API
- Formatted analysis with trend insights and future predictions

**Setup:**
1. Create new agent
2. Add nodes as shown above
3. Configure API node with Finnhub URL: `https://finnhub.io/api/v1/quote?symbol={{message}}&token=YOUR_KEY`
4. Set agent instructions for each node
5. Reboot Agent → Test

### 🎓 University Information Assistant

**Workflow:** `Start → Assistant Agent (with knowledge base) → End`

**Features:**
- Custom knowledge base with university data
- Accurate answers without hallucination
- Scope enforcement (declines off-topic questions)

**Setup:**
1. Create new agent
2. Add single Agent node
3. Paste knowledge base in **Add Context** field
4. Set instruction to answer from knowledge base only

---

## 📡 API Reference

### Chat Endpoint

```http
POST /api/agent-chat
Content-Type: application/json

{
  "userId": "user_xxx",
  "agentId": "agent-uuid",
  "userInput": "Your message here"
}
```

**Response:** Streaming text response

### Get Conversation ID

```http
GET /api/agent-chat
```

**Response:**
```json
{
  "id": "uuid-conversation-id"
}
```

### Integration Example

```javascript
const res = await fetch('https://nodemind.ai/api/agent-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    agentId: '<your-agent-id>',
    userId: '<user-id>',
    userInput: userMessage
  })
});

const reader = res.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value, { stream: true });
  console.log(chunk); // Process streaming response
}
```

---

## 💳 Subscription Plans

| Feature | Starter | Pro | Enterprise |
|---------|---------|-----|------------|
| Price | $0/mo | $29/mo | Custom |
| Agents | 3 | Unlimited | Unlimited |
| API Calls/day | 50 | 1,000 | Unlimited |
| Custom Knowledge Base | ❌ | ✅ | ✅ |
| API Export | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ✅ | ✅ |
| Dedicated Infrastructure | ❌ | ❌ | ✅ |

---

## 🗺 Roadmap

- [ ] While loop full implementation
- [ ] User Approval node real-time gates
- [ ] Vector database RAG integration (Pinecone/Weaviate)
- [ ] OpenAI GPT-4 and Anthropic Claude support
- [ ] Agent templates marketplace
- [ ] Analytics dashboard per agent
- [ ] Multi-language support
- [ ] Mobile-responsive builder
- [ ] Webhook triggers for agents
- [ ] Agent versioning and rollback

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Kashyap Vaghani**
- Student ID: 1699018
- Course: Specialized Studies
- University: Troy University
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Kashyap Vaghani](https://linkedin.com/in/yourprofile)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev) for the visual canvas
- [Google Gemini](https://ai.google.dev) for the LLM backbone
- [Convex](https://convex.dev) for real-time database
- [Clerk](https://clerk.com) for authentication
- [Arcjet](https://arcjet.com) for rate limiting
- [Shadcn UI](https://ui.shadcn.com) for UI components
- Troy University — Specialized Studies Program

---

<div align="center">
  <p>Built with ❤️ at Troy University</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
