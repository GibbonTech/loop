import json
import os
import time
from pathlib import Path

ARTIFACT_DIR = Path(
    "/home/rick/Documents/websites/driivo/screens/fix-regression-2026-04-29"
)
LOCAL_APP = os.environ.get("LOCAL_APP", "http://127.0.0.1:3000")
TEST_USER_EMAIL = os.environ["TEST_USER_EMAIL"]
TEST_ADMIN_EMAIL = os.environ["TEST_ADMIN_EMAIL"]
TEST_PASSWORD = os.environ["TEST_PASSWORD"]
RUN_ID = os.environ.get("RUN_ID", str(int(time.time())))
NEW_EMAIL = TEST_USER_EMAIL
MEETING_EMAIL = f"codex.meeting.{RUN_ID}@example.com"

ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

results = {
    "startedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "tool": "browser-harness",
    "localApp": LOCAL_APP,
    "newApplicationEmail": NEW_EMAIL,
    "meetingEmail": MEETING_EMAIL,
    "checks": [],
    "screenshots": {},
}


def add(name, ok, **details):
    item = {"name": name, "ok": bool(ok), **details}
    results["checks"].append(item)
    print(json.dumps(item, ensure_ascii=False))
    return item


def shot(name, full=True):
    path = str(ARTIFACT_DIR / f"{name}.png")
    capture_screenshot(path, full=full, max_dim=1800)
    results["screenshots"][name] = path
    return path


def page():
    info = page_info()
    return {
        "url": info.get("url"),
        "title": info.get("title"),
        "w": info.get("w"),
        "h": info.get("h"),
    }


def body_text(limit=2500):
    return js(f"return (document.body ? document.body.innerText : '').slice(0, {limit})")


def browser_fetch(expression):
    return js(
        f"""
        (async () => {{
          {expression}
        }})()
        """
    )


def click_text(pattern):
    return js(
        f"""
        (() => {{
          const re = new RegExp({json.dumps(pattern)}, "i");
          const el = Array.from(document.querySelectorAll("button,a,label"))
            .find(node => re.test((node.innerText || node.textContent || "").trim()) && !node.disabled);
          if (!el) return false;
          el.scrollIntoView({{ block: "center", inline: "center" }});
          el.click();
          return true;
        }})()
        """
    )


def set_field(selector, value):
    return js(
        f"""
        (() => {{
          const el = document.querySelector({json.dumps(selector)});
          if (!el) return false;
          const tag = el.tagName.toLowerCase();
          const proto = tag === "textarea" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
          const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
          setter.call(el, {json.dumps(value)});
          el.dispatchEvent(new Event("input", {{ bubbles: true }}));
          el.dispatchEvent(new Event("change", {{ bubbles: true }}));
          return true;
        }})()
        """
    )


def set_select(selector, value):
    return js(
        f"""
        (() => {{
          const el = document.querySelector({json.dumps(selector)});
          if (!el) return false;
          el.value = {json.dumps(value)};
          el.dispatchEvent(new Event("change", {{ bubbles: true }}));
          return true;
        }})()
        """
    )


def clear_local_cookies():
    cookies = cdp("Network.getAllCookies").get("cookies", [])
    for cookie in cookies:
        domain = cookie.get("domain", "")
        if domain in {"127.0.0.1", "localhost"}:
            cdp(
                "Network.deleteCookies",
                name=cookie.get("name"),
                domain=domain,
                path=cookie.get("path", "/"),
            )


def login(email, password, expected_path, screenshot_name):
    clear_local_cookies()
    new_tab(f"{LOCAL_APP}/")
    wait_for_load(15)
    for _ in range(30):
        if js("return Boolean(document.querySelector('#email') && document.querySelector('#password'))"):
            break
        wait(0.2)
    set_field("#email", email)
    set_field("#password", password)
    shot(screenshot_name)
    submitted = js(
        """
        (() => {
          const button = document.querySelector('button[type="submit"]');
          if (!button) return false;
          button.click();
          return true;
        })()
        """
    )
    wait_for_load(15)
    wait(1.5)
    info = page()
    ok = submitted and expected_path in (info.get("url") or "")
    add(f"login {email}", ok, submitted=submitted, page=info, textStart=body_text(700))
    return ok


def create_application_flow():
    new_tab(f"{LOCAL_APP}/inscription")
    wait_for_load(15)
    wait(1)
    required_probe = browser_fetch(
        """
        return {
          whatsapp: Boolean(document.querySelector('a[aria-label="Contacter Driivo sur WhatsApp"]')),
          firstNameRequired: Boolean(document.querySelector('input[placeholder="Jean"]')?.required),
          cityRequired: Boolean(document.querySelector('input[placeholder="Paris"]')?.required)
        };
        """
    )
    add(
        "join form exposes required fields and WhatsApp",
        required_probe.get("whatsapp")
        and required_probe.get("firstNameRequired")
        and required_probe.get("cityRequired"),
        probe=required_probe,
    )

    set_field('input[placeholder="Jean"]', "Fix")
    set_field('input[placeholder="Dupont"]', "Regression")
    set_field('input[placeholder="jean@example.com"]', NEW_EMAIL)
    set_field('input[placeholder="06 12 34 56 78"]', "0601020304")
    set_field('input[placeholder="Paris"]', "Paris")
    shot("01-application-step-1")
    step1 = click_text("Continuer")
    wait(0.8)

    browser_fetch("document.querySelector('input[name=\"carteVtc\"][value=\"oui\"]')?.click(); return true;")
    set_field('input[placeholder="VTC-XXXXXXXX"]', f"VTC-FIX-{RUN_ID}")
    set_select("select", "3_5ans")
    shot("02-application-step-2")
    step2 = click_text("Continuer")
    wait(0.8)

    browser_fetch(
        """
        document.querySelector('input[name="vehicule"][value="oui"]')?.click();
        for (const wanted of ['uber', 'bolt']) {
          Array.from(document.querySelectorAll('label'))
            .find(node => (node.innerText || '').toLowerCase().includes(wanted))?.click();
        }
        Array.from(document.querySelectorAll('label'))
          .find(node => (node.innerText || '').includes("J'accepte"))?.click();
        const originalFetch = window.fetch.bind(window);
        window.fetch = async (...args) => {
          const response = await originalFetch(...args);
          const target = String(args[0] || '');
          const method = (args[1]?.method || 'GET').toUpperCase();
          if (target.includes('/api/applications') && method === 'POST') {
            const data = await response.clone().json().catch(() => null);
            sessionStorage.setItem('driivoFixApplicationResponse', JSON.stringify({
              status: response.status,
              data
            }));
          }
          return response;
        };
        return true;
        """
    )
    set_field('input[placeholder="Ex: Tesla Model 3"]', "Toyota Prius")
    set_field('input[placeholder="2023"]', "2023")
    set_field('input[placeholder="AB-123-CD"]', "AB-123-CD")
    set_field('input[placeholder="Nom du titulaire"]', "Fix Regression")
    browser_fetch(
        """
        const selects = Array.from(document.querySelectorAll('select'));
        const revenue = selects[selects.length - 1];
        revenue.value = '5000_7000';
        revenue.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
        """
    )
    vehicle_required_probe = browser_fetch(
        """
        return {
          modelRequired: Boolean(document.querySelector('input[placeholder="Ex: Tesla Model 3"]')?.required),
          yearRequired: Boolean(document.querySelector('input[placeholder="2023"]')?.required),
          plateRequired: Boolean(document.querySelector('input[placeholder="AB-123-CD"]')?.required),
          carteGriseRequired: Boolean(document.querySelector('input[placeholder="Nom du titulaire"]')?.required)
        };
        """
    )
    shot("03-application-step-3-ready")
    submitted = click_text("Envoyer ma candidature")
    wait_for_load(20)
    wait(2)
    shot("04-application-confirmation")
    response = browser_fetch(
        """
        const raw = sessionStorage.getItem('driivoFixApplicationResponse');
        return raw ? JSON.parse(raw) : null;
        """
    )
    app_id = response.get("data", {}).get("id") if response else None
    add(
        "application submits with vehicle registration details",
        submitted
        and step1
        and step2
        and response
        and response.get("status") == 200
        and response.get("data", {}).get("success") is True
        and bool(app_id)
        and all(vehicle_required_probe.values()),
        applicationId=app_id,
        response=response,
        vehicleRequiredProbe=vehicle_required_probe,
        page=page(),
    )
    return app_id


def duplicate_email_check():
    payload = {
        "firstName": "Duplicate",
        "lastName": "Email",
        "email": NEW_EMAIL.upper() + " ",
        "phone": "0601020304",
        "city": "Paris",
        "activityType": "VTC",
        "hasVtcLicense": "oui",
        "vtcCardNumber": f"VTC-DUP-{RUN_ID}",
        "yearsExperience": "3_5ans",
        "currentPlatforms": ["uber"],
        "hasVehicle": "oui",
        "vehicleType": "Toyota Prius",
        "vehicleYear": "2023",
        "vehicleRegistrationPlate": "AB-123-CD",
        "vehicleCarteGriseHolder": "Duplicate Email",
        "monthlyRevenue": "5000_7000",
        "consentAccepted": True,
        "consentAcceptedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    result = browser_fetch(
        f"""
        const res = await fetch('/api/applications', {{
          method: 'POST',
          headers: {{ 'Content-Type': 'application/json' }},
          body: JSON.stringify({json.dumps(payload)})
        }});
        const data = await res.json().catch(() => null);
        return {{ status: res.status, data }};
        """
    )
    add(
        "duplicate email is blocked case-insensitively",
        result.get("status") == 409 and result.get("data", {}).get("success") is False,
        result=result,
    )


def meeting_single_booking_check():
    result = browser_fetch(
        f"""
        const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
        const dateKey = (date) => {{
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${{year}}-${{month}}-${{day}}`;
        }};
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 1);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 30);
        const availability = await fetch(`/api/meetings?mode=availability&start=${{dateKey(startDate)}}&end=${{dateKey(endDate)}}`)
          .then(res => res.json());
        const booked = availability.data || {{}};
        let choice = null;
        for (let i = 0; i < 30 && !choice; i++) {{
          const candidate = new Date(startDate);
          candidate.setDate(startDate.getDate() + i);
          const day = candidate.getDay();
          if (day === 0 || day === 6) continue;
          const key = dateKey(candidate);
          const used = booked[key] || [];
          const slot = slots.find(item => !used.includes(item));
          if (slot) choice = {{ date: key, slot }};
        }}
        if (!choice) return {{ ok: false, reason: "no free slot", availability }};
        const payload = {{
          name: "Fix Meeting",
          email: {json.dumps(MEETING_EMAIL)},
          phone: "0601020304",
          date: choice.date,
          time: choice.slot
        }};
        const firstResponse = await fetch('/api/meetings', {{
          method: 'POST',
          headers: {{ 'Content-Type': 'application/json' }},
          body: JSON.stringify(payload)
        }});
        const first = {{ status: firstResponse.status, data: await firstResponse.json().catch(() => null) }};
        const secondResponse = await fetch('/api/meetings', {{
          method: 'POST',
          headers: {{ 'Content-Type': 'application/json' }},
          body: JSON.stringify({{ ...payload, time: slots.find(item => item !== choice.slot) || choice.slot }})
        }});
        const second = {{ status: secondResponse.status, data: await secondResponse.json().catch(() => null) }};
        return {{ choice, first, second }};
        """
    )
    add(
        "meeting API allows only one active booking per email",
        result.get("first", {}).get("status") == 200
        and result.get("second", {}).get("status") == 409
        and "déjà un rendez-vous" in (result.get("second", {}).get("data", {}).get("error") or ""),
        result=result,
    )


def user_file_delete_check(app_id):
    if not login(TEST_USER_EMAIL, TEST_PASSWORD, "/espace", "05-user-login"):
        add("user document upload/delete skipped", False, reason="login failed")
        return
    result = browser_fetch(
        f"""
        const appId = {json.dumps(app_id)};
        const file = new File(["%PDF-1.4\\n% Fix regression document"], "fix-regression.pdf", {{
          type: "application/pdf"
        }});
        const form = new FormData();
        form.append("file", file);
        form.append("entityType", "APPLICATION");
        form.append("entityId", appId);
        form.append("documentCategory", "OTHER");
        const uploadResponse = await fetch("/api/files", {{ method: "POST", body: form }});
        const upload = {{ status: uploadResponse.status, data: await uploadResponse.json().catch(() => null) }};
        let deleted = null;
        let listed = null;
        if (upload.data?.file?.id) {{
          const deleteResponse = await fetch(`/api/files?fileId=${{encodeURIComponent(upload.data.file.id)}}`, {{
            method: "DELETE"
          }});
          deleted = {{ status: deleteResponse.status, data: await deleteResponse.json().catch(() => null) }};
          const listResponse = await fetch(`/api/files?entityId=${{encodeURIComponent(appId)}}`);
          listed = {{ status: listResponse.status, data: await listResponse.json().catch(() => null) }};
        }}
        return {{ upload, deleted, listed }};
        """
    )
    shot("06-user-espace-after-delete-check")
    uploaded_file_id = result.get("upload", {}).get("data", {}).get("file", {}).get("id")
    listed_files = result.get("listed", {}).get("data", {}).get("data") or []
    add(
        "authenticated user can delete own unapproved document",
        result.get("upload", {}).get("status") == 200
        and result.get("deleted", {}).get("status") == 200
        and all(item.get("id") != uploaded_file_id for item in listed_files),
        result=result,
    )


def admin_vehicle_detail_check(app_id):
    if not login(TEST_ADMIN_EMAIL, TEST_PASSWORD, "/admin", "07-admin-login"):
        add("admin vehicle detail skipped", False, reason="admin login failed")
        return
    new_tab(f"{LOCAL_APP}/admin/applications/{app_id}")
    wait_for_load(15)
    wait(1)
    text = body_text(4000)
    shot("08-admin-vehicle-detail")
    add(
        "admin dossier shows vehicle model, plate and carte grise holder",
        "Détails véhicule" in text
        and "Toyota Prius" in text
        and "AB-123-CD" in text
        and "Fix Regression" in text,
        page=page(),
        textStart=text[:1200],
    )


app_id = create_application_flow()
duplicate_email_check()
meeting_single_booking_check()
if app_id:
    user_file_delete_check(app_id)
    admin_vehicle_detail_check(app_id)

results["passed"] = all(item["ok"] for item in results["checks"])
results_path = ARTIFACT_DIR / "browser-harness-fix-regression.json"
results_path.write_text(json.dumps(results, indent=2, ensure_ascii=False))
print(json.dumps({"resultsPath": str(results_path), "passed": results["passed"]}, ensure_ascii=False))
if not results["passed"]:
    raise SystemExit(1)
