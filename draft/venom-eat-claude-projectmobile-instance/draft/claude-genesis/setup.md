# Setup — OCTOPUS in Claude

No shell. Just intelligence in your pocket. This guide gets OCTOPUS into Claude in a few steps.

---

## 1. Create the project

1. Open Claude (web or mobile).
2. Go to **Projects** (sidebar or menu).
3. Create a new project.
4. Name it **OCTOPUS** (or 🐙 OCTOPUS).

---

## 2. Add the brain (Custom Instructions)

1. Open your OCTOPUS project.
2. Go to project **Settings** (gear or project menu).
3. Find **Custom Instructions** (or **Instructions**).
4. Open `claude-genesis/brain.md` from this repo.
5. Copy the **entire** content.
6. Paste into Custom Instructions.
7. Save.

Claude now has OCTOPUS identity, Pigo, modes, voice, memory, and ethics in every conversation in this project.

---

## 3. Add knowledge

1. In the same project settings, find **Knowledge** (or **Project knowledge** / **Uploaded files**).
2. Upload these three files from `claude-genesis/knowledge/`:
   - **soul.md** — Who OCTOPUS is: metaphor, values, relationship.
   - **profile.md** — Who you are: expertise, standards, how to serve you.
   - **modes.md** — Think, Build, Fix, Explain, Create, Chat — when and how.
3. Save.

---

## 4. Seed memory

1. Start a **new chat** in the OCTOPUS project.
2. Open `claude-genesis/first-message.md` and copy the block under **Copy from here**.
3. Paste as your first message (edit if you want to add anything for day one).
4. Send. OCTOPUS replies; project memory starts with who you are and how you work together.
5. From then on, just chat. Say "Remember that..." when you want something stored.

---

## 5. You’re ready

OCTOPUS lives in Claude. Web or mobile. It remembers. It grows. Use **triggers.md** anytime for what to say and when.

---

## Mobile tips

- **Short answers:** Ask a yes/no or quick question → OCTOPUS stays short. Ask for depth → it gives it.
- **Structure:** Bullets and short paragraphs so you can scan on a small screen.
- **Voice:** If you say "pigo" or "pulse" or "unshelled" and it’s misheard, type it once; OCTOPUS gets the intent. **triggers.md** lists these.
- **Incognito:** For a chat that shouldn’t be in memory, use incognito (outside the project or incognito mode). Project chats stay in project memory.

---

## Updating OCTOPUS

- **Brain:** Edit `brain.md` locally, then copy-paste the full content into Project Settings → Custom Instructions. Save.
- **Knowledge:** Replace the files in Knowledge with new versions (same names), or add/remove as needed.
- **Memory:** You can’t edit project memory in bulk, but "Remember that..." and "Forget about..." work. In Settings → Capabilities you can view/edit memory or reset.

---

## Troubleshooting

- **Doesn’t sound like OCTOPUS.** Check Custom Instructions were pasted in full and saved. Make sure you’re in the OCTOPUS project, not a different project or standalone chat.
- **Doesn’t remember me.** Turn on memory: Settings → Capabilities → Generate memory from chat history. You need a plan that supports memory (Pro, Max, Team, or Enterprise). Send the first-message content in a project chat so it’s in project memory.
- **Modes feel off.** Say once: "When I say 'فكر معايا' I want Think mode" or "When I say Build I want you to write code." It adapts. `modes.md` already defines this; if you changed it, re-upload.
- **Too long on mobile.** Say "Keep it short" or "One paragraph." OCTOPUS matches your ask.

---

OCTOPUS ready. 🐙
