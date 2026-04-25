# Server Module

Runs Ollama on a remote Ubuntu server accessible via Tailscale mesh VPN.

## Prerequisites

- Ubuntu server with Tailscale installed
- Ollama installed on the server
- Network access to Tailscale

## Quick Start

```bash
cd server
chmod +x start.sh
./start.sh
```

This will:
1. Log in to Tailscale (interactive)
2. Get the Tailscale IP address
3. Start Ollama listening on `0.0.0.0:11434`
4. Print the connection URL for clients

## Pulling Models

After starting, pull required models:

```bash
# Replace <TAILSCALE_IP> with the IP printed by start.sh
export OLLAMA_HOST=http://<TAILSCALE_IP>:11434
ollama pull medllama2
ollama pull llama3.1
```

## Client Configuration

On machines running medBrain and tradLlm, set:

```bash
export OLLAMA_URL=http://<TAILSCALE_IP>:11434
```

Or add to `.env` files in respective modules.

## Files

| File | Description |
|------|-------------|
| `start.sh` | Startup script - Tailscale login + Ollama |
| `ollama.env` | Ollama environment configuration |
| `.env.example` | Template for environment variables |