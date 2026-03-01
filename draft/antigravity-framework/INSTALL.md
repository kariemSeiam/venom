# 🚀 Quick Installation Guide

**تنصب VENOM مرة واحدة، ويشتغل في كل مشاريعك!**

---

## ✅ سهل جداً (3 خطوات)

### 1. حمل الملفات

```bash
# الملفات اللي عندك كده
draft/antigravity-framework/
├── .agent/ (workflows + rules)
├── GEMINI.md
├── mcp_config.json
├── install-venom-once.sh (Linux/Mac)
└── install-venom-once.ps1 (Windows)
```

### 2. شغل السكريبت (مرة واحدة)

**Windows (أنت):**
```powershell
# افتح PowerShell في مجلد antigravity-framework
cd C:\Users\karie\Desktop\venom-mine\draft\antigravity-framework

# شغل السكريبت
.\install-venom-once.ps1
```

**لو طلع error:**
```powershell
# سمح بتشغيل السكريبتات
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# وبعدين شغل تاني
.\install-venom-once.ps1
```

### 3. افتح Antigravity

```
1. افتح Antigravity
2. افتح أي مشروع
3. اكتب في الشات: /venom-orchestrate

✅ شغال غالي!
```

---

## 🎯 إيه اللي بيحصل بالظبط؟

السكريبت بيحط الملفات في الأماكن الصح:

```yaml
global_workflows:
  to: C:\Users\karie\AppData\Roaming\.gemini\antigravity\global_workflows\
  contains: All /venom-* workflows
  effect: يشتغل في كل مشاريعك

global_rules:
  to: C:\Users\karie\AppData\Roaming\.gemini\GEMINI.md
  contains: All VENOM rules
  effect: يشتغل في كل مشاريعك

mcp_config:
  to: C:\Users\karie\AppData\Roaming\.gemini\antigravity\mcp_config.json
  contains: MCP servers
  effect: مشارك بين كل مشاريعك

global_skills:
  to: C:\Users\karie\AppData\Roaming\.gemini\antigravity\global_skills\
  contains: VENOM skills
  effect: Auto-detect complex tasks
```

---

## 🔥 بعد التركيب

### في أي Project جديد

```bash
# مش محتاج تحط حاجة في المشروع

cd my-new-project
# مفيش .agent/ مطلوب
# مفيش GEMINI.md مطلوب

# بس افتح Antigravity واكتب /venom-orchestrate
```

### لو محتاج Project-Specific Rules

```bash
# بس لو محتاج rules خاصة بالمروع

cd my-special-project

# انسخ بس GEMINI.md عدل عليه
cp venom-antigravity/GEMINI.md .

# افتح الملف وعدل عليه
notepad GEMINI.md
```

---

## 📋 Verification

**تأكد إن كل حاجة شغالة:**

```powershell
# افتح PowerShell وشوف الملفات موجودة

# Workflows
dir "$env:APPDATA\.gemini\antigravity\global_workflows\"

# Rules
cat "$env:APPDATA\.gemini\GEMINI.md"

# MCP
cat "$env:APPDATA\.gemini\antigravity\mcp_config.json"

# Skills
dir "$env:APPDATA\.gemini\antigravity\global_skills\"
```

---

## 🎯 الاستخدام

### أول مرة

```
1. افتح Antigravity
2. File → Open Folder
3. اختار أي مشروع
4. افتح Chat (Ctrl+L)
5. اكتب: /venom-orchestrate

أول مرة هيسألك تفعله، اضغط Enable
```

### بعدين

```
في أي مشروع، اكتب بس:
/venom-orchestrate

أو أي workflow آخر:
/venom-research
/venom-build
/venom-review
```

---

## ⚡ Troubleshooting

### "Workflows not found"

```powershell
# تأكد إن الملفات اتنسخت
dir "$env:APPDATA\.gemini\antigravity\global_workflows\"

# لو فاضي، شغل السكريبت تاني
.\install-venom-once.ps1
```

### "Rules not loading"

```powershell
# شوف GEMINI.md موجود
cat "$env:APPDATA\.gemini\GEMINI.md"

# لو موجود بس شغالش، أعد تشغيل Antigravity
```

### "MCP not working"

```powershell
# شوف الـ config
cat "$env:APPDATA\.gemini\antigravity\mcp_config.json"

# تأقت إن مسار المشروع صح
# استخدم ${workspaceFolder} أو absolute paths
```

---

## ✨ Done!

**كده تنصب مرة واحدة، ويشتغل في كل مشاريعك!**

```yaml
installation: مرة واحدة
effect: شامل لكل مشاريعك
activation: بس اكتب /venom-orchestrate
language: عربي إنجليزي حسبك
```

---

**محتاج مساعدة؟**

قولي وهاكبلك في أي حاجة! 🐙
