#!/bin/bash

set -e

echo "=== Starting Clinical AI Server ==="

if ! command -v tailscale &> /dev/null; then
    echo "Error: Tailscale is not installed"
    echo "Install from: https://tailscale.com/download"
    exit 1
fi

echo "Logging in to Tailscale..."
tailscale login

echo "Waiting for Tailscale to connect..."
sleep 2

TAILSCALE_IP=$(tailscale ip -4)
if [ -z "$TAILSCALE_IP" ]; then
    echo "Error: Could not get Tailscale IP"
    exit 1
fi

echo "Tailscale IP: $TAILSCALE_IP"

export OLLAMA_HOST="0.0.0.0:11434"

echo "Starting Ollama on 0.0.0.0:11434..."
echo "Clients should connect to: http://$TAILSCALE_IP:11434"

ollama serve &
OLLAMA_PID=$!

sleep 2

if ps -p $OLLAMA_PID > /dev/null 2>&1; then
    echo "Ollama started successfully (PID: $OLLAMA_PID)"
else
    echo "Error: Ollama failed to start"
    exit 1
fi

echo ""
echo "=== Server Ready ==="
echo "Ollama API: http://$TAILSCALE_IP:11434"
echo ""
echo "To pull models, run:"
echo "  OLLAMA_HOST=http://$TAILSCALE_IP:11434 ollama pull medllama2"
echo "  OLLAMA_HOST=http://$TAILSCALE_IP:11434 ollama pull llama3.1"
echo ""
echo "To stop: kill $OLLAMA_PID"