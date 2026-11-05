"""Gera imagens grátis nos Spaces do Hugging Face, pelo servidor MCP oficial.

O token (variável HF_TOKEN) vai só para huggingface.co; quem roda o Space é o
próprio Hugging Face, em nome da conta, usando a cota grátis de GPU (ZeroGPU).
O Space é escolhido pela variável HF_MCP_URL, com ?gradio=<dono>/<space>.

Uso (a partir de reels/, com httpx instalado):
  HF_MCP_URL="https://huggingface.co/mcp?gradio=mcp-tools/Z-Image-Turbo" \
    python3 scripts/gerar-imagem-hf.py tools
  HF_MCP_URL="https://huggingface.co/mcp?gradio=akhaliq/Qwen-Image-Edit-2511-LoRAs-Fast" \
    python3 scripts/gerar-imagem-hf.py gerar gr1_qwen_image_edit_2511_loras_fast_infer args.json saida

O arquivo args.json traz os parâmetros do Space. A imagem sai como saida-1.png (ou .webp)."""
import ast, base64, json, os, sys, httpx

URL = os.environ.get("HF_MCP_URL", "https://huggingface.co/mcp")
H = {"Authorization": f"Bearer {os.environ['HF_TOKEN']}", "Accept": "application/json, text/event-stream",
     "Content-Type": "application/json"}

def ler(r):
    ct = r.headers.get("content-type", "")
    if "text/event-stream" in ct:
        msgs = [json.loads(l[5:]) for l in r.text.splitlines() if l.startswith("data:") and l[5:].strip()]
        return msgs[-1] if msgs else {}
    return r.json() if r.text.strip() else {}

with httpx.Client(timeout=300) as c:
    r = c.post(URL, headers=H, json={"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {
        "protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "clt-caotica", "version": "1"}}})
    r.raise_for_status()
    sid = r.headers.get("mcp-session-id")
    if sid: H["mcp-session-id"] = sid
    c.post(URL, headers=H, json={"jsonrpc": "2.0", "method": "notifications/initialized"})
    if sys.argv[1] == "tools":
        d = ler(c.post(URL, headers=H, json={"jsonrpc": "2.0", "id": 2, "method": "tools/list"}))
        print([t["name"] for t in d.get("result", {}).get("tools", [])])
    else:
        # gerar <ferramenta> <args.json> <saida_prefixo>
        ferramenta, args = sys.argv[2], json.load(open(sys.argv[3]))
        sys.argv = sys.argv[:2] + sys.argv[3:]
        d = ler(c.post(URL, headers=H, json={"jsonrpc": "2.0", "id": 3, "method": "tools/call",
                                              "params": {"name": ferramenta, "arguments": args}}))
        if "error" in d: print("ERRO", d["error"]); sys.exit(1)
        n = 0
        for item in d.get("result", {}).get("content", []):
            if item.get("type") == "image":
                n += 1; ext = item.get("mimeType", "image/png").split("/")[-1]
                open(f"{sys.argv[3]}-{n}.{ext}", "wb").write(base64.b64decode(item["data"]))
                print("imagem salva:", f"{sys.argv[3]}-{n}.{ext}")
            elif item.get("type") == "text":
                t = item["text"]
                open(f"{sys.argv[3]}-resposta.txt", "w").write(t)
                j = None
                for conv in (json.loads, ast.literal_eval):
                    try:
                        j = conv(t); break
                    except Exception:
                        pass
                if isinstance(j, dict) and str(j.get("image", "")).startswith("data:image"):
                    n += 1; cab, dados = j["image"].split(",", 1); ext = cab.split("/")[1].split(";")[0]
                    open(f"{sys.argv[3]}-{n}.{ext}", "wb").write(base64.b64decode(dados))
                    print("imagem salva:", f"{sys.argv[3]}-{n}.{ext}", "| semente:", j.get("seed"))
                else:
                    print("texto:", t[:300])
            else:
                print("outro:", item.get("type"), str(item)[:200])
        print("isError:", d.get("result", {}).get("isError"))
