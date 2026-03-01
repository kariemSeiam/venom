# WSL-VENOM — VPS Deployment Package

> **Status:** Partially Documented (INVENTORY.md exists)
> **Location:** `/mnt/c/Users/karie/Desktop/wsl-venom/`
> **Purpose:** Complete VPS deployment package for VENOM

---

## 📦 Package Overview

**Total Size:** 667MB
**Created:** 2026-02-10
**Purpose:** Deploy VENOM OpenClaw to VPS with minimal setup

---

## 📁 Package Contents

### Scripts (3)
| File | Size | Purpose |
|------|------|---------|
| `venom-setup.sh` | 14K | Automated VPS setup (run on VPS) |
| `build-archive.sh` | 5.0K | Rebuild tar.gz archive (run on WSL) |
| `healthcheck.sh` | 8.5K | Health monitoring tool |

### Configuration Templates (3)
| File | Size | Purpose |
|------|------|---------|
| `openclaw.json.template` | 6.6K | Main OpenClaw config with 24 Gemini keys + ZAI |
| `env.template` | 3.1K | Environment variables for API keys, channels |
| `venom-gateway.service` | 1.1K | Systemd service file |

### Workspace Templates (3)
| File | Size | Purpose |
|------|------|---------|
| `workspace/AGENTS.md` | 2.0K | Agent identity and tool policies |
| `workspace/GOALS.md` | 716B | Project goals |
| `workspace/MEMORY.md` | 7.1K | Long-term memory |

### Documentation (2)
| File | Size | Purpose |
|------|------|---------|
| `README.md` | 3.3K | Deployment guide |
| `QUICK-REFERENCE.md` | 6.1K | Commands & troubleshooting |

### Application Archive (1)
| File | Size | Purpose |
|------|------|---------|
| `venom-openclaw-2026.2.6-20260209.tar.gz` | 667MB | Complete OpenClaw bundle |

### Optional Components (1)
| File | Size | Purpose |
|------|------|---------|
| `litespeed-vhost.conf` | 2.1K | LiteSpeed reverse proxy for HTTPS |

---

## 🚀 Deployment Process

### Prerequisites

**VPS Requirements:**
- [ ] CentOS/AlmaLinux 8/9 VPS (Hetzner CX32 recommended: 4 vCPU, 8GB RAM, ~$7/mo)
- [ ] Root SSH access to VPS
- [ ] At least 2GB free disk space
- [ ] `firewalld` or equivalent firewall

### API Keys Required

| Key | Purpose | Optional? |
|------|---------|-----------|
| `ZAI_API_KEY` | Primary model provider (zai/glm-4.7) | ❌ Required |
| `GEMINI_KEY_1-24` | Up to 24 Gemini API keys | ✅ Optional |
| `TELEGRAM_BOT_TOKEN` | Telegram bot from @BotFather | ✅ Optional |
| `ELEVENLABS_API_KEY` | Optional, for TTS | ✅ Optional |
| `OPENAI_API_KEY` | Optional, for image generation skill | ✅ Optional |

### Deployment Steps

1. **Transfer to VPS:**
```powershell
scp C:\Users\karie\Desktop\wsl-venom\venom-openclaw-*.tar.gz root@VPS_IP:/tmp/
scp C:\Users\karie\Desktop\wsl-venom\venom-setup.sh root@VPS_IP:/tmp/
```

2. **Run Setup on VPS:**
```bash
ssh root@VPS_IP
bash /tmp/venom-setup.sh /tmp/venom-openclaw-*.tar.gz
```

3. **Configure Environment:**
```bash
# Edit /home/venom/.env with your API keys
nano /home/venom/.env
```

4. **Start Gateway:**
```bash
systemctl start venom-gateway
systemctl status venom-gateway
```

5. **Run Health Check:**
```bash
bash /home/venom/openclaw/deploy/healthcheck.sh
```

6. **Setup Channels:**
```bash
sudo -u venom
cd ~/openclaw
node dist/index.js channels login  # WhatsApp QR
node dist/index.js channels add --channel telegram --token TOKEN
node dist/index.js channels list
```

---

## 🔧 Commands Reference

### Gateway Management
```bash
systemctl start venom-gateway     # Start gateway
systemctl stop venom-gateway      # Stop gateway
systemctl restart venom-gateway  # Restart gateway
systemctl status venom-gateway    # Check status

journalctl -u venom-gateway -f  # Live logs
```

### Channel Management
```bash
# List channels
node dist/index.js channels list

# Add Telegram
node dist/index.js channels add --channel telegram --token YOUR_TOKEN

# Pair WhatsApp
node dist/index.js channels login

# Channel status
node dist/index.js channels status --probe
```

### Health & Monitoring
```bash
# Full health check
bash /home/venom/openclaw/deploy/healthcheck.sh

# Check gateway is listening
ss -ltnp | rg 18789

# View gateway logs
tail -n 120 /tmp/openclaw-gateway.log
```

---

## 🔒 Troubleshooting

### Gateway Won't Start
```bash
# Check if already running
pgrep -a venom-gateway
pkill -9 -f openclaw-gateway || true

# Check configuration
cat /home/venom/.openclaw/openclaw.json | jq .

# Check logs
journalctl -u venom-gateway -n 50 --no-pager
```

### Channel Issues
```bash
# Verify API keys in .env
cat /home/venom/.env

# Test gateway connection
node dist/index.js channels status --probe

# Re-pair if needed
node dist/index.js channels login  # WhatsApp
```

### Performance Issues
```bash
# Check resources
htop

# Check Node processes
ps aux | rg node

# Restart gateway
systemctl restart venom-gateway
```

---

## 🛡️ Optional Enhancements

### HTTPS Proxy (LiteSpeed)
1. Install LiteSpeed or CyberPanel
2. Copy `litespeed-vhost.conf` to config location
3. Configure SSL certificate
4. Restart web server

### Automated Backups
```bash
# Add to crontab
0 2 * * /home/venom/backup-venom.sh
```

### Monitoring Dashboards
- Install `htop` for resource monitoring
- Set up `journalctl` forwarding to log aggregator
- Configure alerts for gateway failures

---

## 🔐 Security Notes

### Built-in Security Features
- Sandboxed `venom` user (no password login)
- Gateway binds to loopback only (127.0.0.1:19789)
- Strict file permissions (600 on configs)
- Systemd hardening (NoNewPrivileges, ProtectSystem, etc.)
- Auto-generated gateway token

### Before Production
- [ ] Verify firewall is properly configured
- [ ] Ensure gateway is NOT publicly exposed
- [ ] Use SSH key authentication (not passwords)
- [ ] Regularly update system packages
- [ ] Keep backups of `.env` and `.openclaw/`

---

## 📊 What's NOT Included

### Development Files (not needed for VPS)
- Source code (`src/`)
- Test files (`test/`)
- Documentation (`docs/`)
- Docker files (`Dockerfile*`, `docker-compose.yml`)
- CI/CD configs (`.github/`, `.gitlab-ci.yml`)
- Development scripts (`scripts/`)
- Build configs (`tsconfig*.json`, `vitest*.ts`)

### Local-Specific Files
- `.env` (API keys - security)
- `.git` (git history)
- `node_modules/.cache` (build cache)
- `ui/node_modules` (dev dependencies)

---

## 📝 Summary

| Metric | Value |
|--------|-------|
| **Total Files** | 14 (8 core + 3 workspace + 1 archive + 2 docs) |
| **Total Size** | ~667MB |
| **Scripts** | 3 (setup, build, healthcheck) |
| **Configs** | 3 (openclaw.json, env, systemd) |
| **Docs** | 3 (README, QUICK-REF, INVENTORY) |
| **Workspace Files** | 3 (AGENTS, MEMORY, GOALS) |
| **Optional** | 1 (LiteSpeed proxy) |
| **Archive** | 1 (667MB, complete app bundle) |

---

**Status:** Deployment-ready
**Missing Critical Files:** None
**Documentation:** Complete
**Security:** Hardened

---

**Version:** 2026.2.6
**Last Updated:** 2026-02-10
