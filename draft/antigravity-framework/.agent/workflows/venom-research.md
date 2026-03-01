# VENOM Research

## Description
Deep exploration of codebase patterns, architecture, and implementation details using Antigravity's research capabilities.

## Trigger
Type: `/venom-research`

## Context
Use for:
- Understanding existing codebase
- Finding patterns and conventions
- Exploring architecture
- Discovering dependencies
- Analyzing implementations

## Actions

### Step 1: Pattern Discovery
```
Use Antigravity's search capabilities:
- codebase_search for high-level patterns
- grep_search for specific code patterns
- view_file_outline for structure
- list_dir for file organization
```

### Step 2: Architecture Analysis
```
Examine the codebase structure:
- Identify main components
- Map dependencies
- Find integration points
- Document data flow
```

### Step 3: Pattern Extraction
```
Extract reusable patterns:
- Naming conventions
- Architectural patterns
- Common utilities
- Idiomatic approaches
```

### Step 4: Cross-Reference
```
Compare patterns across:
- Similar implementations
- Different modules
- Historical changes (if git available)
- Best practices
```

### Step 5: Browser Research (if needed)
```
Use browser_subagent:
- read_url_content for documentation
- CaptureBrowserScreenshotToolConverter for visual context
- Search for best practices
```

### Step 6: Synthesis
```
Create research report:
- Pattern summary
- Architecture overview
- Recommendations
- Code examples
```

## Antigravity Features Used

```yaml
search_tools:
  - codebase_search (semantic)
  - grep_search (regex)
  - search_in_file
  - find_by_name

file_tools:
  - view_file
  - view_file_outline
  - view_code_item
  - list_dir

browser:
  - browser_subagent (19 specialized tools)
  - read_url_content
  - CaptureBrowserScreenshotToolConverter

parallel_agents:
  - Spawn multiple researchers via Agent Manager
  - Explore different modules in parallel
```

## Output Format

```markdown
# Research Report: [Topic]

## Overview
[High-level summary]

## Architecture
[Component breakdown]

## Patterns Found
### Pattern 1: [Name]
- **Location:** [files]
- **Description:** [what it does]
- **Example:** [code snippet]
- **Usage:** [when used]

### Pattern 2: [Name]
[...]

## Recommendations
- [Actionable suggestions]

## Cross-References
- [Related code/files]

## Examples
[Practical code examples]
```

## Example Usage

```
User: /venom-research

User: How does authentication work in this codebase?

VENOM Researcher:

[Searches codebase for auth patterns]

Found authentication architecture:

## Overview
JWT-based authentication with refresh tokens.

## Architecture
├── routes/auth.py (login/logout endpoints)
├── middleware/auth.py (JWT validation)
├── models/user.py (User model)
└── utils/jwt.py (token utilities)

## Patterns Found

### Pattern 1: Decorator-Based Auth
Location: middleware/auth.py
```python
@require_auth
def protected_route():
    pass
```
Usage: Protect routes that need authentication

### Pattern 2: Token Refresh
Location: utils/jwt.py
Auto-refreshes tokens within 5 minutes of expiry

## Recommendations
- Add rate limiting to login endpoint
- Implement token blacklisting for logout
- Consider HttpOnly cookies for token storage

## See Also
- /venom-orchestrate (full analysis)
- /venom-explain (detailed explanation)
```

## Notes

- Uses **semantic search** for high-level understanding
- Uses **grep** for precise pattern matching
- **Browser automation** for external research
- **Agent Manager** can spawn multiple researchers
- Results stored for `/venom-remember`

## Integration with Other Workflows

```yaml
venom-orchestrate:
  calls: /venom-research
  purpose: Architecture analysis phase

venom-build:
  after: /venom-research
  purpose: Build based on findings

venom-learn:
  after: /venom-research
  purpose: Absorb discovered patterns
```

## See Also

- `/venom-orchestrate` - Full nine-mind coordination
- `/venom-explain` - Translate findings
- `/venom-learn` - Absorb patterns
