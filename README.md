# NodeMind AI Agent Builder Platform

NodeMind is a visual AI workflow builder built with Next.js, Convex, Clerk, Google Gemini, and the Google Agent Development Kit. Users can create agent graphs on a drag-and-drop canvas, convert those flows into runnable tool/agent configuration, preview the workflow, and chat with the published result.

## What This Project Does

- Provides a landing page and authenticated dashboard for managing AI agents.
- Lets users create agent workflows visually with React Flow.
- Supports node-based logic using:
  - `Start`
  - `End`
  - `Agent`
  - `API`
  - `If/Else`
  - `While`
  - `User Approval`
- Stores users, agents, graph state, and conversations in Convex.
- Uses Gemini to transform saved workflow graphs into executable agent/tool JSON.
- Uses Google ADK to run streamed multi-agent/tool chat sessions.
- Uses Clerk for authentication, user profile, and pricing/subscription UI.
- Includes Arcjet configuration for request protection/token-bucket rate limiting.

## Tech Stack

- `Next.js 15` with App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `shadcn/ui` and Radix UI components
- `@xyflow/react` for the workflow builder canvas
- `Convex` for backend data and mutations/queries
- `Clerk` for auth and billing UI
- `@google/genai` for Gemini content generation
- `@google/adk` for agent orchestration and streaming responses
- `Arcjet` for API protection

## Product Flow

1. A signed-in user creates an agent from the dashboard.
2. Convex creates a new agent record with a default `StartNode`.
3. The user edits the workflow in `/nodemind-agent/[agentId]`.
4. Nodes and edges are saved back to Convex.
5. In preview mode, the graph is converted into a simplified workflow config.
6. `/api/generate-api-tool-config` sends that config to Gemini and asks for structured JSON describing:
   - the primary system prompt
   - sub-agents
   - tools
7. The generated config is saved into `agentToolConfig` in Convex.
8. Chat requests stream through `/api/agent-chat` or `/api/agent-sdk`.
9. Google ADK instantiates tools and agents dynamically and streams text back to the UI.

## App Structure

```text
app/
  page.tsx                         Landing page
  layout.tsx                       Root layout with Clerk, Convex, and app providers
  provider.tsx                     Global user/workflow providers
  (auth)/                          Clerk sign-in and sign-up routes
  Dashboard/                       Authenticated dashboard area
  nodemind-agent/[agentId]/        Visual workflow editor
  nodemind-agent/[agentId]/preview Agent preview + chat UI
  api/
    agent-chat/                    Generic streamed agent chat endpoint
    agent-sdk/                     Agent chat endpoint backed by saved Convex config
    generate-api-tool-config/      Gemini-powered workflow-to-config generation
    arcjet/                        Arcjet protection test endpoint

components/
  ui/                              Shared UI primitives
  ai/code-block.tsx                Code snippet display used in publish dialog

convex/
  schema.ts                        Database schema
  agent.ts                         Agent queries and mutations
  conversation.ts                  Conversation lookup
  user.ts                          User creation and token management

config/
  geminiai.ts                      Gemini client setup
  arcjet.ts                        Arcjet setup

context/
  UserDetailContext.tsx
  WorkflowContext.tsx
```

## Key Routes

- `/` - marketing/landing page
- `/sign-in` - Clerk sign-in
- `/sign-up` - Clerk sign-up
- `/Dashboard` - dashboard home
- `/Dashboard/My-Agents` - agent listing
- `/Dashboard/Pricing` - Clerk pricing table
- `/Dashboard/Profile` - Clerk profile management
- `/nodemind-agent/[agentId]` - visual builder
- `/nodemind-agent/[agentId]/preview` - preview, reboot, publish, and chat

## Data Model

### `UserTable`

- `name`
- `email`
- `subscription`
- `token`
- `lastReset`

### `AgentTable`

- `agentId`
- `name`
- `config`
- `nodes`
- `edges`
- `published`
- `userId`
- `agentToolConfig`

### `ConversationTable`

- `conversationId`
- `agentId`
- `userId`

## Environment Variables

Create a `.env.local` file with values for:

```bash
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/Dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/Dashboard

ARCJET_KEY=
GEMINI_API_KEY=
```

Notes:

- `NEXT_PUBLIC_CONVEX_URL` is required by `app/ConvexClientProvider.tsx`.
- `GEMINI_API_KEY` is required by `config/geminiai.ts`.
- `ARCJET_KEY` is required by `config/arcjet.ts`.
- Clerk plan checks in `app/provider.tsx` and `app/Dashboard/_components/AppSidebar.tsx` expect plans like `pro_plan` and `ultimate_plan`.

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Add the required keys to `.env.local`.

### 3. Run Convex in development

```bash
npx convex dev
```

### 4. Start the Next.js app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start the Next.js dev server
- `npm run build` - production build
- `npm run start` - start the production server

## How Agent Execution Works

### Workflow builder

The editor at `app/nodemind-agent/[agentId]/page.tsx` loads nodes and edges from Convex and renders them with React Flow. Users can add nodes from the tool panel, connect them, and save the graph.

### Workflow compilation

The preview page translates the saved graph into a simplified flow object:

- each node becomes a workflow step
- edge connections become `next` references
- `IfElseNode` stores separate `if` and `else` branches
- `StartNode` identifies the workflow entry point

### Tool/agent config generation

`/api/generate-api-tool-config` sends the simplified flow to Gemini and asks for strict JSON output containing:

- `systemPrompt`
- `primaryAgentName`
- `agents`
- `tools`

That JSON is stored on the agent as `agentToolConfig`.

### Chat runtime

`/api/agent-chat` and `/api/agent-sdk`:

- create `FunctionTool` instances dynamically from saved tool definitions
- create sub-agents dynamically from saved config
- create a top-level `LlmAgent`
- run the agent with `Runner.runAsync(...)`
- stream text responses back to the frontend

The session layer currently uses `InMemorySessionService`, which means memory is process-local rather than durable across deployments/restarts.

## Authentication And Access Control

- Clerk wraps the full app in `app/layout.tsx`.
- `middleware.ts` protects all non-public routes.
- Public routes currently include `/`, `/sign-in`, `/sign-up`, and `/api/agent-sdk`.

## Token And Plan Logic

The app stores token balances in Convex:

- `free` users start with `100`
- `pro` users start with `500`
- `ultimate` users start with `5000`

`ResetMonthlyTokens` in `convex/user.ts` refills tokens every 30 days or when a user upgrades to a higher plan.

## API Endpoints

### `POST /api/generate-api-tool-config`

Accepts a workflow graph summary and returns generated JSON for agents/tools/system instructions.

### `POST /api/agent-chat`

Runs a chat session using request-provided tool and agent config and streams text output.

### `GET /api/agent-chat`

Returns a new generated conversation ID.

### `POST /api/agent-sdk`

Loads an agent by `agentId` from Convex, reconstructs its tools/agents, and streams the response.

### `GET /api/arcjet`

Sample protected route that demonstrates Arcjet decision handling.

## Current Implementation Notes

- The dashboard and editor are implemented and wired to Convex.
- The publish dialog currently shows example integration code rather than generating per-agent SDK code.
- Conversation memory is in-memory via Google ADK, so it is not durable.
- The repo includes a populated `.env.local`; for safety, use your own keys and avoid committing secrets.
- There are no lint/test scripts defined in `package.json` yet.

## Suggested Next Improvements

- Add linting and automated tests.
- Persist conversations instead of relying on in-memory sessions.
- Generate real publish/embed code from the saved agent configuration.
- Add stronger validation around generated tool schemas and API methods.
- Connect Arcjet protection to authenticated user identity instead of placeholder values.

## Repository Summary

This project is already beyond a starter app: it has a complete authentication flow, dashboard shell, visual workflow builder, Convex-backed persistence layer, Gemini-based workflow compilation step, and ADK-powered streaming chat runtime. The main README goal is to help future contributors understand that the system is a visual AI-agent orchestration product, not just a generic Next.js frontend.
