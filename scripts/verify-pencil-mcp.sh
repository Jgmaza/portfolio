#!/usr/bin/env bash
# Quick local checks for Pencil extension MCP (extension-pencil) on macOS.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MCPS_DIR="${HOME}/.cursor/projects"
SOCKET="${HOME}/.pencil/socket/pencil-cursor.sock"
BINARY="${HOME}/.pencil/mcp/cursor/out/mcp-server-darwin-arm64"
LOG_DIR="${HOME}/Library/Application Support/Cursor/logs"

echo "=== Pencil MCP verification ==="
echo "Project: ${ROOT}"
echo

ok=true

if [[ -S "${SOCKET}" ]]; then
  echo "[OK] Socket: ${SOCKET}"
else
  echo "[FAIL] Socket missing — open portfolio-game.pen in pen.dev canvas and reload Cursor"
  ok=false
fi

if [[ -x "${BINARY}" ]]; then
  echo "[OK] MCP binary: ${BINARY}"
else
  echo "[FAIL] MCP binary missing — enable pen.dev extension or reinstall highagency.pencildev"
  ok=false
fi

if pgrep -f "mcp-server-darwin-arm64.*--app cursor" >/dev/null 2>&1; then
  echo "[OK] MCP process running (cursor + cursorIDE)"
else
  echo "[WARN] No MCP process — toggle extension-pencil in Customize → MCPs"
fi

project_slug="$(echo "${ROOT}" | sed 's/^\///' | tr '/ ' '-')"
cache_glob="${MCPS_DIR}/*${project_slug##*portfolio}*/mcps/user-highagency.pencildev-extension-pencil/tools"
tool_dir=""
for d in ${MCPS_DIR}/*/mcps/user-highagency.pencildev-extension-pencil/tools; do
  if [[ -d "$d" ]]; then
    tool_dir="$d"
    break
  fi
done

if [[ -n "${tool_dir}" && "$(ls -1 "${tool_dir}" 2>/dev/null | wc -l | tr -d ' ')" -gt 0 ]]; then
  echo "[OK] Cached tools in Cursor:"
  ls -1 "${tool_dir}" | sed 's/^/       /'
else
  echo "[WARN] No cached Pencil tools — MCP never listed tools successfully"
  ok=false
fi

latest_log="$(ls -td "${LOG_DIR}"/* 2>/dev/null | head -1 || true)"
if [[ -n "${latest_log}" ]]; then
  pencil_log="${latest_log}/mcp-server-user-highagency.pencildev-extension-pencil.log"
  if [[ -f "${pencil_log}" ]]; then
    if tail -5 "${pencil_log}" | grep -q "Successfully connected to stdio server"; then
      echo "[OK] Recent stdio connection in log"
    elif tail -20 "${pencil_log}" | grep -q "Client closed\|connection closed"; then
      echo "[WARN] Log shows Client closed / connection closed — see mcp-setup.md (race / reload order)"
      ok=false
    fi
  fi
fi

echo
if $ok; then
  echo "Local stack looks healthy. Open a NEW Agent chat and confirm extension-pencil tools appear."
else
  echo "Fix local issues above, then: one Cursor window → .pen open → Reload Window → new Agent chat."
fi
