#!/usr/bin/env python3
"""
Discharge Summary Builder - Offline PDF Generator & Server
==========================================================
Generates pixel-perfect A4 PDF discharge summaries from JSON drafts or HTML.
Supports Windows, macOS, and Linux with ZERO pip dependencies.
Uses installed Chromium browsers (Edge, Chrome, Brave, Chromium) in headless mode.

Usage:
------
1. Generate PDF from an exported draft JSON:
   python export_pdf.py my_patient_draft.json
   python export_pdf.py my_patient_draft.json -o "MyPatient_Summary.pdf"

2. Generate PDF from current index.html:
   python export_pdf.py

3. Run offline local server for phone/tablet/PC access:
   python export_pdf.py --serve
   (Connect your Android phone to the same Wi-Fi and open the shown LAN URL)

4. Test with sample patient data:
   python export_pdf.py --test
"""

import sys
import os
import json
import shutil
import tempfile
import argparse
import subprocess
import threading
import http.server
import socketserver
import webbrowser
from pathlib import Path

BROWSER_CANDIDATES = [
    # Windows Edge & Chrome
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
    os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Edge\Application\msedge.exe"),
    r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe",
    # macOS
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    # Linux
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/microsoft-edge",
    "/usr/bin/microsoft-edge-stable",
    "/usr/bin/brave-browser",
]

def find_browser(custom_path=None):
    """Finds an installed Chromium-compatible browser executable."""
    if custom_path:
        if os.path.exists(custom_path) and os.path.isfile(custom_path):
            return custom_path
        which_path = shutil.which(custom_path)
        if which_path:
            return which_path
        print(f"[!] Specified browser not found: {custom_path}")

    for candidate in BROWSER_CANDIDATES:
        if os.path.exists(candidate) and os.path.isfile(candidate):
            return candidate

    for name in ["msedge", "google-chrome", "chrome", "chromium", "chromium-browser", "brave"]:
        found = shutil.which(name)
        if found:
            return found

    return None

def sanitize_filename(name):
    """Sanitizes patient name for clean filename."""
    clean = "".join(c if c.isalnum() else "_" for c in str(name))
    clean = clean.strip("_")
    return clean or "patient"

def share_pdf(pdf_path):
    """Opens Android share sheet (Termux / intent) or system handler for the generated PDF."""
    pdf_path = os.path.abspath(pdf_path)
    if not os.path.exists(pdf_path):
        print(f"[X] PDF file not found for sharing: {pdf_path}")
        return False

    print(f"[*] Triggering share menu for: {pdf_path}")

    # 1. Android Termux share (opens native Android app picker: WhatsApp, Gmail, etc.)
    if shutil.which("termux-share"):
        try:
            subprocess.run(["termux-share", "-a", "send", "-t", "application/pdf", pdf_path], check=True)
            print("[OK] Android native share menu opened via Termux ✓")
            return True
        except Exception as e:
            print(f"[!] termux-share failed: {e}")

    # 2. Android activity manager intent (am)
    if shutil.which("am"):
        try:
            cmd = ["am", "start", "-a", "android.intent.action.SEND", "-t", "application/pdf", "--eu", "android.intent.extra.STREAM", f"file://{pdf_path}"]
            subprocess.run(cmd, check=True)
            print("[OK] Android share intent launched ✓")
            return True
        except Exception:
            pass

    # 3. Desktop / OS default open (Windows, macOS, Linux)
    try:
        if sys.platform == "win32":
            os.startfile(pdf_path)
        elif sys.platform == "darwin":
            subprocess.run(["open", pdf_path], check=True)
        else:
            subprocess.run(["xdg-open", pdf_path], check=True)
        print("[OK] PDF opened in system viewer / share dialog ✓")
        return True
    except Exception as e:
        print(f"[!] Could not open PDF automatically: {e}")
        return False

def render_and_print_pdf(url_or_html_path, output_pdf, browser_path=None, timeout=30):
    """Renders URL or HTML file into a high-quality A4 PDF using headless Chromium."""
    browser = find_browser(browser_path)
    if not browser:
        print("\n[X] Error: No Chromium-based browser (Edge, Chrome, Brave, Chromium) was found.")
        print("    Please ensure Google Chrome or Microsoft Edge is installed, or pass --browser.")
        return False

    output_pdf = os.path.abspath(output_pdf)
    os.makedirs(os.path.dirname(output_pdf) or ".", exist_ok=True)
    temp_dir = tempfile.mkdtemp(prefix="ds_pdf_")

    cmd = [
        browser,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--no-pdf-header-footer",
        "--virtual-time-budget=4000",
        f"--user-data-dir={temp_dir}",
        f"--print-to-pdf={output_pdf}",
        url_or_html_path,
    ]

    try:
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        if os.path.exists(output_pdf) and os.path.getsize(output_pdf) > 2000:
            size_kb = os.path.getsize(output_pdf) / 1024
            print(f"[OK] PDF generated successfully ({size_kb:.1f} KB):")
            print(f"     -> {output_pdf}")
            return True
        else:
            print(f"[X] PDF generation failed or produced empty file (exit code {res.returncode}):")
            if res.stderr:
                print(res.stderr.strip()[:600])
            return False
    except subprocess.TimeoutExpired:
        print(f"[X] PDF generation timed out after {timeout} seconds.")
        return False
    except Exception as e:
        print(f"[X] Error running browser: {e}")
        return False
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

class QuietServer(socketserver.TCPServer):
    allow_reuse_address = True

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def generate_pdf_from_draft(draft_json_path, output_pdf=None, root_dir=None, browser_path=None):
    """Serves index.html with draft data injected, then calls headless Chromium to print PDF."""
    root_dir = root_dir or os.path.dirname(os.path.abspath(__file__))
    index_html = os.path.join(root_dir, "index.html")
    if not os.path.exists(index_html):
        print(f"[X] Could not find index.html in: {root_dir}")
        return False

    with open(draft_json_path, "r", encoding="utf-8") as f:
        draft_data = json.load(f)

    patient_name = "patient"
    if isinstance(draft_data, dict):
        if "f" in draft_data and isinstance(draft_data["f"], dict):
            patient_name = draft_data["f"].get("name", "patient") or "patient"
        elif "name" in draft_data:
            patient_name = draft_data.get("name", "patient") or "patient"

    if not output_pdf:
        clean = sanitize_filename(patient_name)
        output_pdf = os.path.join(os.getcwd(), f"DS_{clean}.pdf")

    # Read base index.html
    with open(index_html, "r", encoding="utf-8") as f:
        html_content = f.read()

    draft_json_escaped = json.dumps(draft_data).replace("</script>", "<\\/script>")

    # Inject BEFORE </head> so it is defined before app.js runs
    inject_script = f"""
  <script>
    window.__CLI_AUTO_DRAFT__ = {draft_json_escaped};
  </script>
"""

    if "</head>" in html_content:
        rendered_html = html_content.replace("</head>", f"{inject_script}\n</head>")
    else:
        rendered_html = inject_script + html_content

    temp_render_file = os.path.join(root_dir, "_cli_temp_render.html")
    with open(temp_render_file, "w", encoding="utf-8") as f:
        f.write(rendered_html)

    # Start ephemeral local HTTP server
    prev_cwd = os.getcwd()
    os.chdir(root_dir)
    httpd = QuietServer(("127.0.0.1", 0), QuietHandler)
    port = httpd.server_address[1]
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    try:
        target_url = f"http://127.0.0.1:{port}/_cli_temp_render.html"
        success = render_and_print_pdf(target_url, output_pdf, browser_path=browser_path)
        return success
    finally:
        httpd.shutdown()
        os.chdir(prev_cwd)
        try:
            if os.path.exists(temp_render_file):
                os.remove(temp_render_file)
        except Exception:
            pass

def generate_pdf_from_current(output_pdf=None, root_dir=None, browser_path=None):
    """Generates PDF directly from current index.html served over local HTTP."""
    root_dir = root_dir or os.path.dirname(os.path.abspath(__file__))
    output_pdf = output_pdf or os.path.join(os.getcwd(), "Discharge_Summary.pdf")

    index_html = os.path.join(root_dir, "index.html")
    with open(index_html, "r", encoding="utf-8") as f:
        html_content = f.read()

    auto_view_script = """
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        if (typeof showTab === 'function') showTab('summary');
        if (typeof render === 'function') render();
        if (typeof autoOptimizeSpacing === 'function') autoOptimizeSpacing();
      }, 50);
    });
  </script>
"""

    temp_render_file = os.path.join(root_dir, "_cli_temp_render.html")
    with open(temp_render_file, "w", encoding="utf-8") as f:
        f.write(html_content.replace("</head>", f"{auto_view_script}\n</head>"))

    prev_cwd = os.getcwd()
    os.chdir(root_dir)
    httpd = QuietServer(("127.0.0.1", 0), QuietHandler)
    port = httpd.server_address[1]
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    try:
        target_url = f"http://127.0.0.1:{port}/_cli_temp_render.html"
        success = render_and_print_pdf(target_url, output_pdf, browser_path=browser_path)
        return success
    finally:
        httpd.shutdown()
        os.chdir(prev_cwd)
        try:
            if os.path.exists(temp_render_file):
                os.remove(temp_render_file)
        except Exception:
            pass

def run_server(port=8080, root_dir=None):
    """Starts a local offline web server so phones/laptops can access the app."""
    root_dir = root_dir or os.path.dirname(os.path.abspath(__file__))
    os.chdir(root_dir)

    class CustomHandler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self):
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
            super().end_headers()

    import socket
    local_ip = "127.0.0.1"
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
    except Exception:
        pass

    try:
        with socketserver.TCPServer(("", port), CustomHandler) as httpd:
            url_local = f"http://localhost:{port}"
            url_lan = f"http://{local_ip}:{port}"
            print("=" * 64)
            print("  Discharge Summary Builder - Offline Local Web Server")
            print("=" * 64)
            print(f"  * This Computer : {url_local}")
            print(f"  * Android Phone : {url_lan}")
            print("    (Connect phone to same Wi-Fi & open the Android Phone URL)")
            print("\n  Press Ctrl+C to stop the server.")
            print("=" * 64)
            webbrowser.open(url_local)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[i] Server stopped.")

def main():
    parser = argparse.ArgumentParser(
        description="Offline A4 PDF Generator & Local Server for Discharge Summary Builder"
    )
    parser.add_argument("input", nargs="?", help="Draft JSON file or HTML file to convert to PDF (optional)")
    parser.add_argument("-o", "--output", help="Output PDF file path")
    parser.add_argument("-b", "--browser", help="Path to Chrome or Edge executable")
    parser.add_argument("-s", "--serve", action="store_true", help="Start local offline HTTP server")
    parser.add_argument("-p", "--port", type=int, default=8080, help="Port for local server (default: 8080)")
    parser.add_argument("--share", action="store_true", help="Automatically trigger share / open menu for the generated PDF")
    parser.add_argument("--test", action="store_true", help="Generate a test PDF from sample patient data")

    args = parser.parse_args()
    root_dir = os.path.dirname(os.path.abspath(__file__))

    if args.serve:
        run_server(args.port, root_dir)
        return

    if args.test:
        sample_draft = {
            "f": {
                "college": "Government Medical College Hospital",
                "dept": "Department of General Medicine",
                "summaryType": "Discharge Summary",
                "name": "Ramasamy M.",
                "age": "52",
                "sex": "Male",
                "ipno": "48201/26",
                "doa": "2026-10-25",
                "dod": "2026-11-04",
                "unitRoman": "III",
                "modeOfDischarge": "Discharged Stable",
                "diagnosis": "Type 2 Diabetes Mellitus with Poor Glycemic Control\nEssential Hypertension\nCommunity Acquired Pneumonia (Resolved)",
                "hopi": "Patient presented with fever, productive cough, and fatigue for 5 days. Blood sugars were elevated on admission.",
                "course": "Started on IV antibiotics and insulin titration. Fever subsided on Day 3. Cough improved. Blood sugars stabilized on subcutaneous insulin regimen.",
                "condition": "Hemodynamically stable, afebrile, tolerating normal diabetic diet.",
                "preparedBy": "Kavitha S.",
                "chief": "V. Senthilkumar",
                "signDateTime": "04.11.2026, 05:00 PM",
                "advice": "1. Strict diabetic diet (low salt, low carbohydrate).\n2. Regular walking 30 mins daily.\n3. Monitor fasting and post-prandial blood glucose twice weekly.",
                "review": "Review in Medicine OPD after 1 week with fasting and PP blood sugar reports.",
                "warning": "High grade fever, breathlessness, altered sensorium, or severe hypoglycemic symptoms (sweating, tremors)."
            },
            "complaints": [
                "Fever with chills — 5 days",
                "Cough with expectoration — 5 days",
                "Generalized weakness — 1 week"
            ],
            "treatment": [
                "Inj. Ceftriaxone 1g IV BD x 5 days",
                "Inj. Regular Insulin sliding scale",
                "Tab. Paracetamol 650mg SOS",
                "Nebulization with Salbutamol TDS"
            ],
            "rxMeds": [
                "Tab. Metformin 500 mg 1-0-1 After food (1 month)",
                "Tab. Telmisartan 40 mg 1-0-0 After food (1 month)",
                "Tab. Azithromycin 500 mg 1-0-0 After food (2 days)"
            ],
            "invDates": [{"id": 1, "date": "2026-10-25"}, {"id": 2, "date": "2026-10-28"}],
            "invParams": [
                {"id": 1, "name": "Hb (g/dL)", "values": {"1": "12.8", "2": "13.0"}},
                {"id": 2, "name": "Total WBC", "values": {"1": "14,200", "2": "8,600"}},
                {"id": 3, "name": "Platelets", "values": {"1": "2.4L", "2": "2.6L"}},
                {"id": 4, "name": "Urea / Creat", "values": {"1": "28 / 0.9", "2": "24 / 0.8"}},
                {"id": 5, "name": "RBS (mg/dL)", "values": {"1": "342", "2": "146"}}
            ],
            "signaturePinned": True
        }
        test_json = os.path.join(tempfile.gettempdir(), "test_patient_draft.json")
        with open(test_json, "w", encoding="utf-8") as f:
            json.dump(sample_draft, f)
        out_pdf = args.output or os.path.join(root_dir, "DS_Ramasamy_M_Sample.pdf")
        print("[*] Generating test PDF from sample patient data...")
        success = generate_pdf_from_draft(test_json, out_pdf, root_dir, browser_path=args.browser)
        try:
            os.remove(test_json)
        except Exception:
            pass
        if success:
            print(f"[OK] Test PDF created: {out_pdf}")
            if args.share:
                share_pdf(out_pdf)
        sys.exit(0 if success else 1)

    if args.input:
        in_path = os.path.abspath(args.input)
        if not os.path.exists(in_path):
            print(f"[X] Input file does not exist: {in_path}")
            sys.exit(1)

        target_out = args.output
        if in_path.lower().endswith(".json"):
            if not target_out:
                try:
                    with open(in_path, "r", encoding="utf-8") as f:
                        d = json.load(f)
                    p_name = "patient"
                    if isinstance(d, dict):
                        if "f" in d and isinstance(d["f"], dict):
                            p_name = d["f"].get("name", "patient") or "patient"
                        elif "name" in d:
                            p_name = d.get("name", "patient") or "patient"
                    clean = sanitize_filename(p_name)
                    target_out = os.path.join(os.getcwd(), f"DS_{clean}.pdf")
                except Exception:
                    target_out = os.path.join(os.getcwd(), "Discharge_Summary.pdf")
            success = generate_pdf_from_draft(in_path, target_out, root_dir, browser_path=args.browser)
        elif in_path.lower().endswith(".html"):
            target_out = target_out or os.path.splitext(in_path)[0] + ".pdf"
            success = render_and_print_pdf(in_path, target_out, browser_path=args.browser)
        else:
            try:
                with open(in_path, "r", encoding="utf-8") as f:
                    json.load(f)
                target_out = target_out or os.path.join(os.getcwd(), "Discharge_Summary.pdf")
                success = generate_pdf_from_draft(in_path, target_out, root_dir, browser_path=args.browser)
            except Exception:
                print("[X] Unrecognized input format. Please pass a .json draft or .html file.")
                sys.exit(1)

        if success and args.share:
            share_pdf(target_out)
        sys.exit(0 if success else 1)

    # No input: convert current index.html
    out_pdf = args.output or os.path.join(root_dir, "Discharge_Summary.pdf")
    print("[*] Generating PDF from current discharge summary...")
    success = generate_pdf_from_current(out_pdf, root_dir, browser_path=args.browser)
    if success and args.share:
        share_pdf(out_pdf)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
