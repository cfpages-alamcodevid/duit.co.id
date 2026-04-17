# Gemini CLI Subagent Creation Guide

This document outlines the structure and requirements for creating custom subagents in Gemini CLI, serving as a reference for future agent generation.

## 1. File Location
- **Project-specific:** `.gemini/agents/<agent-name>.md` (Recommended for team-shared agents).
- **Personal/Global:** `~/.gemini/agents/<agent-name>.md`.

## 2. File Structure
A subagent is a Markdown file containing a YAML frontmatter block followed by a System Prompt.

```markdown
---
name: your-agent-name
description: Clear description of when the main agent should use this specialist.
tools:
  - "*"       # Grant access to all tools
  - "read_file" # Or specify individual tools
model: gemini-2.0-flash # Optional: Override the default model
max_turns: 20 # Optional: Limit turns (default is 30)
---

# System Prompt
This section contains the instructions, persona, and rules for the subagent.
Explain how it should behave, what its goals are, and any specific constraints.
```

## 3. Key Manifest Fields
| Field | Required | Description |
| :--- | :--- | :--- |
| `name` | Yes | Unique slug (lowercase, numbers, hyphens, underscores). |
| `description` | Yes | High-signal description for the main agent's tool selector. |
| `tools` | No | List of tools or wildcards. Inherits all if omitted. |
| `kind` | No | `local` (default) or `remote`. |
| `mcpServers` | No | Inline MCP server configurations isolated to this agent. |

## 4. Best Practices
- **Isolation:** Subagents have their own context; use them for deep-dive tasks to keep the main chat history lean.
- **Specific Descriptions:** The `description` is crucial—it's how the main agent decides to delegate work.
- **Clear Persona:** Define the expert role in the system prompt (e.g., "You are a specialized security auditor...").
- **Recursion:** Subagents cannot call other subagents.
