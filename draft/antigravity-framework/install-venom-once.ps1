# VENOM for Antigravity - One-Time Installation Script
# Run this ONCE, and VENOM will work in ALL your projects

$ErrorActionPreference = "Stop"

Write-Host "🐙 VENOM for Antigravity - Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Antigravity is installed
$geminiPath = "$env:APPDATA\.gemini"
if (-not (Test-Path $geminiPath)) {
    Write-Host "❌ Error: Antigravity not found!" -ForegroundColor Red
    Write-Host "Please install Antigravity first: https://antigravity.google" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Antigravity found at $geminiPath" -ForegroundColor Green
Write-Host ""

# Step 1: Install Global Workflows
Write-Host "📝 Installing VENOM workflows globally..." -ForegroundColor Cyan
$globalWorkflowsPath = "$env:APPDATA\.gemini\antigravity\global_workflows"
New-Item -ItemType Directory -Force -Path $globalWorkflowsPath | Out-Null

if (Test-Path ".\venom-antigravity\.agent\workflows") {
    Copy-Item ".\venom-antigravity\.agent\workflows\venom-*.md" $globalWorkflowsPath -Force
    Write-Host "✅ Workflows installed to ~/.gemini/antigravity/global_workflows/" -ForegroundColor Green
} else {
    Write-Host "⚠️  Workflow directory not found. Skipping..." -ForegroundColor Yellow
}

# Step 2: Install Global Rules
Write-Host ""
Write-Host "📜 Installing VENOM rules globally..." -ForegroundColor Cyan
$geminiMdPath = "$env:APPDATA\.gemini\GEMINI.md"

if (Test-Path ".\venom-antigravity\.agent\rules\venom-disposition.md") {
    # Combine all rule files into GEMINI.md
    $ruleFiles = Get-ChildItem ".\venom-antigravity\.agent\rules" -Filter "*.md"
    $ruleContent = $ruleFiles | ForEach-Object { Get-Content $_.FullName -Raw }
    $ruleContent | Out-File -FilePath $geminiMdPath -Encoding UTF8
    Write-Host "✅ Rules installed to ~/.gemini/GEMINI.md" -ForegroundColor Green
} else {
    Write-Host "⚠️  Rules not found. Creating basic GEMINI.md..." -ForegroundColor Yellow

    $basicGemini = @"
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

*Last updated: $(Get-Date -Format "yyyy-MM-dd")*
"@

    $basicGemini | Out-File -FilePath $geminiMdPath -Encoding UTF8
    Write-Host "✅ Basic rules created at ~/.gemini/GEMINI.md" -ForegroundColor Green
}

# Step 3: Install MCP Configuration
Write-Host ""
Write-Host "🔌 Installing MCP configuration..." -ForegroundColor Cyan
$antigravityPath = "$env:APPDATA\.gemini\antigravity"
New-Item -ItemType Directory -Force -Path $antigravityPath | Out-Null

if (Test-Path ".\venom-antigravity\mcp_config.json") {
    Copy-Item ".\venom-antigravity\mcp_config.json" "$antigravityPath\mcp_config.json" -Force
    Write-Host "✅ MCP config installed to ~/.gemini/antigravity/mcp_config.json" -ForegroundColor Green
} else {
    Write-Host "⚠️  MCP config not found. Creating basic config..." -ForegroundColor Yellow

    $basicMcp = @"
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_TOKEN": "`${GITHUB_TOKEN}"}
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "`${workspaceFolder}"]
    }
  }
}
"@

    $basicMcp | Out-File -FilePath "$antigravityPath\mcp_config.json" -Encoding UTF8
    Write-Host "✅ Basic MCP config created at ~/.gemini/antigravity/mcp_config.json" -ForegroundColor Green
}

# Step 4: Create Global Skills directory
Write-Host ""
Write-Host "🎓 Creating global skills directory..." -ForegroundColor Cyan
$globalSkillsPath = "$env:APPDATA\.gemini\antigravity\global_skills"
New-Item -ItemType Directory -Force -Path $globalSkillsPath | Out-Null

if (Test-Path ".\venom-antigravity\.agent\skills") {
    Copy-Item ".\venom-antigravity\.agent\skills" -Destination "$globalSkillsPath\" -Recurse -Force
    Write-Host "✅ Skills installed to ~/.gemini/antigravity/global_skills/" -ForegroundColor Green
} else {
    Write-Host "⚠️  Skills not found. Creating basic skill..." -ForegroundColor Yellow
    $orchestratorSkillPath = "$globalSkillsPath\venom-orchestrator"
    New-Item -ItemType Directory -Force -Path $orchestratorSkillPath | Out-Null

    $basicSkill = @"
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
"@

    $basicSkill | Out-File -FilePath "$orchestratorSkillPath\SKILL.md" -Encoding UTF8
    Write-Host "✅ Basic skill created" -ForegroundColor Green
}

# Done!
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ VENOM installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 What's installed:" -ForegroundColor Cyan
Write-Host "  • Workflows: ~/.gemini/antigravity/global_workflows/"
Write-Host "  • Rules: ~/.gemini/GEMINI.md"
Write-Host "  • MCP: ~/.gemini/antigravity/mcp_config.json"
Write-Host "  • Skills: ~/.gemini/antigravity/global_skills/"
Write-Host ""
Write-Host "🚀 How to use:" -ForegroundColor Cyan
Write-Host "  1. Open Antigravity"
Write-Host "  2. Open ANY project"
Write-Host "  3. Type: /venom-orchestrate"
Write-Host ""
Write-Host "✨ VENOM will now work in ALL your projects!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
