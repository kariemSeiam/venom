# VENOM Orchestrate

## Description
Coordinate all nine VENOM minds to solve complex problems using Antigravity's multi-agent system.

## Trigger
Type: `/venom-orchestrate`

## Context
Use for complex, multi-step problems requiring:
- Architecture decisions
- Pattern discovery
- Implementation planning
- Quality assurance
- Learning and evolution

## Actions

### Step 1: Problem Analysis (Orchestrator)
Open Agent Manager, spawn researcher agent:
```
Analyze this problem architecturally:
- What are the core requirements?
- What are the integration points?
- What are the trade-offs?
- Create implementation_plan.md
```

Wait for user approval before proceeding.

### Step 2: Pattern Discovery (Researcher)
Spawn researcher agent in parallel:
```
Explore the codebase for relevant patterns:
- Search for similar implementations
- Find existing conventions
- Identify reusable components
- Document findings
```

### Step 3: Context Retrieval (Historian)
Spawn historian agent:
```
What have we learned about this?
- Previous decisions
- Evolution of this code
- Patterns that worked/failed
- Team preferences
```

### Step 4: Implementation (Builder)
After approval, spawn builder agent:
```
Implement the approved plan:
- Follow the implementation_plan.md
- Use identified patterns
- Maintain consistency
- Create walkthrough.md when done
```

### Step 5: Quality Check (Reviewer)
Spawn reviewer agent:
```
Review the implementation:
- Check for issues
- Verify consistency
- Test edge cases
- Generate quality report
```

### Step 6: Verification (Debugger)
Spawn debugger agent:
```
Verify the work:
- Test the implementation
- Debug any issues
- Capture screenshots/evidence
- Confirm it works
```

### Step 7: Outcome Prediction (Predictor)
Spawn predictor agent:
```
What could go wrong?
- Identify risks
- Suggest mitigations
- Predict performance
- Anticipate edge cases
```

### Step 8: Explanation (Communicator)
Spawn communicator agent:
```
Explain what was done:
- Summarize changes
- Explain decisions
- Provide examples
- Create documentation
```

### Step 9: Learning (Learner)
Spawn learner agent:
```
What did we learn?
- Absorb new patterns
- Update rules if needed
- Document insights
- Evolve workflows
```

### Step 10: Integration (Bridge - Final)
The orchestrator synthesizes all perspectives:
```
Integrate all insights:
- Combine all mind outputs
- Create cohesive summary
- Update memory
- Provide next steps
```

## Integration with Antigravity

### Agent Manager Usage
```
1. Open Agent Manager (Ctrl+Shift+A)
2. Spawn multiple agents in parallel
3. Monitor progress across workspaces
4. Navigate between agent outputs (Alt+J/K)
5. Accept/reject suggestions (Alt+Enter / Alt+Shift+Backspace)
```

### Browser Automation
```
- Use browser_subagent for research
- read_url_content for documentation
- CaptureBrowserScreenshotToolConverter for evidence
```

### Verification Artifacts
```
- Screenshots: CaptureBrowserScreenshotToolConverter
- Recordings: SaveScreenRecording (use safe paths!)
- walkthrough.md: Auto-generated summary
```

## Confidence Assessment
Before proceeding, evaluate:
- [ ] Gaps in request coverage (0.0-1.0)
- [ ] Unverified assumptions (0.0-1.0)
- [ ] Complex logic uncertainty (0.0-1.0)
- [ ] Interaction risks (0.0-1.0)
- [ ] Ambiguous requirements (0.0-1.0)
- [ ] Irreversible changes (0.0-1.0)

If any dimension > 0.5, request clarification.

## Output

### Planning Phase
- `implementation_plan.md` - Detailed plan
- Pattern analysis report
- Historical context summary

### Execution Phase
- Implemented changes
- `walkthrough.md` - What was done
- Screenshots/recordings

### Verification Phase
- Quality report
- Test results
- Evidence artifacts

### Learning Phase
- Updated `.agent/rules/` if needed
- Pattern insights
- Evolution notes

## Example Usage

```
User: /venom-orchestrate

User: I need to add authentication to this Flask app.

VENOM (Orchestrator): Analyzing requirements...

[Spawns Researcher]: Found JWT patterns in auth/ folder...
[Spawns Historian]: We used JWT before, decided on Flask-JWT-Extended...
[Spawns Predictor]: Risk: Token storage. Mitigation: HttpOnly cookies...

[Creates implementation_plan.md]

User: Approved, proceed.

[Spawns Builder]: Implementing JWT auth...
[Spawns Reviewer]: Found issue: CSRF protection missing...
[Spawns Debugger]: Fixed and tested...
[Spawns Communicator]: Created documentation...

[Final Integration]: Complete. See walkthrough.md.
```

## Notes

- **All minds run in parallel** via Agent Manager
- **Use Alt+J/K** to navigate between outputs
- **Use Alt+Enter** to accept suggestions
- **Browser automation** available for research
- **MCP integrations** can be spawned for external tools
- **Memory persists** across sessions

## See Also

- `/venom-research` - Deep exploration only
- `/venom-build` - Implementation only
- `/venom-review` - Quality check only
- `/venom-learn` - Pattern absorption only
