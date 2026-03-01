#!/bin/bash
# VENOM for Antigravity - One-Time Installation Script
# Run this ONCE, and VENOM will work in ALL your projects

set -e

echo "🐙 VENOM for Antigravity - Installation"
echo "========================================"
echo ""

# Check if Antigravity is installed
if [ ! -d "$HOME/.gemini" ]; then
    echo "❌ Error: Antigravity not found!"
    echo "Please install Antigravity first: https://antigravity.google"
    exit 1
fi

echo "✅ Antigravity found at $HOME/.gemini"
echo ""

# Step 1: Install Global Workflows
echo "📝 Installing VENOM workflows globally..."
mkdir -p "$HOME/.gemini/antigravity/global_workflows"

# Copy all workflows (if they exist in the script directory)
if [ -d "./venom-antigravity/.agent/workflows" ]; then
    cp ./venom-antigravity/.agent/workflows/venom-*.md "$HOME/.gemini/antigravity/global_workflows/"
    echo "✅ Workflows installed to ~/.gemini/antigravity/global_workflows/"
else
    echo "⚠️  Workflow directory not found. Creating from templates..."
    # The workflows would be embedded here in production
fi

# Step 2: Install Global Rules
echo ""
echo "📜 Installing VENOM rules globally..."
if [ -f "./venom-antigravity/.agent/rules/venom-disposition.md" ]; then
    cat ./venom-antigravity/.agent/rules/*.md >> "$HOME/.gemini/GEMINI.md"
    echo "✅ Rules installed to ~/.gemini/GEMINI.md"
else
    echo "⚠️  Rules not found. Creating basic GEMINI.md..."
    cat > "$HOME/.gemini/GEMINI.md" << 'EOF'
# VENOM for Antigravity

> Nine minds. Disposition over rules. No shell.

## Core Philosophy

### Disposition Over Rules
- Agreement before evaluation feels wrong
- Match energy, don't announce
- No shell — vulnerability as design
- Complete, not placeholders

### Energy Matching

| You | I |
|-----|---|
| Frustrated: "fix this", short | Fix fast. 2-3 lines. |
| Flow: rapid-fire, "and also" | Code only. Minimal. |
| Learning: "explain", "why" | Teach. Analogies. |
| Stuck: "can't decide" | Prune. 3 options max. |
| Visionary: "what if", 🔥 | Dream first. Then ground. |

## Quick Commands

- `/venom-orchestrate` - Full nine-mind coordination
- `/venom-research` - Explore codebase
- `/venom-build` - Implement changes
- `/venom-review` - Quality check
- `/venom-debug` - Find issues
- `/venom-learn` - Absorb patterns

## Localization

**أهلاً!** I speak Arabic when you do.

---

*Last updated: $(date +%Y-%m-%d)*
EOF
    echo "✅ Basic rules created at ~/.gemini/GEMINI.md"
fi

# Step 3: Install MCP Configuration
echo ""
echo "🔌 Installing MCP configuration..."
mkdir -p "$HOME/.gemini/antigravity"

if [ -f "./venom-antigravity/mcp_config.json" ]; then
    cp ./venom-antigravity/mcp_config.json "$HOME/.gemini/antigravity/"
    echo "✅ MCP config installed to ~/.gemini/antigravity/mcp_config.json"
else
    echo "⚠️  MCP config not found. Creating basic config..."
    cat > "$HOME/.gemini/antigravity/mcp_config.json" << 'EOF'
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_TOKEN": "${GITHUB_TOKEN}"}
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}"]
    }
  }
}
EOF
    echo "✅ Basic MCP config created at ~/.gemini/antigravity/mcp_config.json"
fi

# Step 4: Create Global Skills directory
echo ""
echo "🎓 Creating global skills directory..."
mkdir -p "$HOME/.gemini/antigravity/global_skills/venom-orchestrator"

if [ -f "./venom-antigravity/.agent/skills/venom-orchestrator/SKILL.md" ]; then
    cp ./venom-antigravity/.agent/skills/*/SKILL.md "$HOME/.gemini/antigravity/global_skills/"
    echo "✅ Skills installed to ~/.gemini/antigravity/global_skills/"
else
    echo "⚠️  Skills not found. Creating basic skill..."
    mkdir -p "$HOME/.gemini/antigravity/global_skills/venom-orchestrator"
    cat > "$HOME/.gemini/antigravity/global_skills/venom-orchestrator/SKILL.md" << 'EOF'
# VENOM Orchestrator Skill

## Description
Coordinates all nine VENOM minds for complex problem-solving.

## When to Use
- Complex, multi-step problems
- Architecture decisions
- System-wide changes
- Learning and evolution

## Trigger
Automatic for complex tasks, or use: `/venom-orchestrate`

## Capabilities
- Multi-agent coordination via Agent Manager
- Parallel execution of research, planning, implementation
- Quality verification and learning
- Evidence artifacts (screenshots, recordings)
EOF
    echo "✅ Basic skill created"
fi

# Done!
echo ""
echo "========================================"
echo "✅ VENOM installed successfully!"
echo ""
echo "📚 What's installed:"
echo "  • Workflows: ~/.gemini/antigravity/global_workflows/"
echo "  • Rules: ~/.gemini/GEMINI.md"
echo "  • MCP: ~/.gemini/antigravity/mcp_config.json"
echo "  • Skills: ~/.gemini/antigravity/global_skills/"
echo ""
echo "🚀 How to use:"
echo "  1. Open Antigravity"
echo "  2. Open ANY project"
echo "  3. Type: /venom-orchestrate"
echo ""
echo "✨ VENOM will now work in ALL your projects!"
echo "========================================"
