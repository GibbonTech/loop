import json
import os
import time
import urllib.request
from pathlib import Path

ARTIFACT_DIR = Path("/home/rick/Documents/websites/driivo/screens/live-audit-2026-04-29")
APP = "https://app.driivo.fr"
SITE = "https://driivo.fr"
USER_EMAIL = "mehdi.aouad@example.com"
USER_PASSWORD = os.environ.get("DRIIVO_DEMO_USER_PASSWORD", "demo-password-123")
ADMIN_EMAIL = "demo.admin@driivo.fr"
ADMIN_PASSWORD = os.environ["DRIIVO_DEMO_ADMIN_PASSWORD"]
PERIOD = "2026-05"

results = {
    "startedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "tool": "browser-harness",
    "site": SITE,
    "app": APP,
    "checks": [],
    "screenshots": {},
}


def add(name, ok, **details):
    item = {"name": name, "ok": bool(ok), **details}
    results["checks"].append(item)
    return item


def shot(name, full=True):
    path = str(ARTIFACT_DIR / f"{name}.png")
    capture_screenshot(path, full=full, max_dim=1800)
    results["screenshots"][name] = path
    return path


def text(limit=1800):
    return js(f"return (document.body ? document.body.innerText : '').slice(0, {limit})")


def page():
    info = page_info()
    return {"url": info.get("url"), "title": info.get("title"), "w": info.get("w"), "h": info.get("h")}


def click_text(pattern):
    return js(
        f"""
        (() => {{
          const re = new RegExp({json.dumps(pattern)}, "i");
          const el = Array.from(document.querySelectorAll("button,a"))
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
          if (tag === "select") {{
            el.value = {json.dumps(value)};
            el.dispatchEvent(new Event("change", {{ bubbles: true }}));
            return true;
          }}
          const proto = tag === "textarea" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
          const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
          setter.call(el, {json.dumps(value)});
          el.dispatchEvent(new Event("input", {{ bubbles: true }}));
          el.dispatchEvent(new Event("change", {{ bubbles: true }}));
          return true;
        }})()
        """
    )


def app_logout_if_needed():
    cookies = cdp("Network.getAllCookies").get("cookies", [])
    for cookie in cookies:
        domain = cookie.get("domain", "")
        if domain == "driivo.fr" or domain.endswith(".driivo.fr"):
            cdp(
                "Network.deleteCookies",
                name=cookie.get("name"),
                domain=domain,
                path=cookie.get("path", "/"),
            )
    new_tab(APP)
    wait_for_load(15)
    wait(1)


def login(email, password, expected_path):
    app_logout_if_needed()
    goto_url(APP)
    wait_for_load(15)
    wait(1)
    set_field("#email", email)
    set_field("#password", password)
    shot(f"login-filled-{email.split('@')[0]}")
    submitted = click_text("Se connecter|Connexion")
    wait_for_load(15)
    wait(3)
    info = page()
    ok = expected_path in (info.get("url") or "")
    add(f"login {email}", ok, submitted=submitted, page=info, textStart=text(900))
    return ok


def browser_fetch(expression):
    return js(
        f"""
        (async () => {{
          {expression}
        }})()
        """
    )


# Public page smoke.
new_tab(SITE)
wait_for_load(15)
wait(1)
shot("marketing-home-desktop")
home_text = text(1200)
add("marketing home renders", "Devenez" in home_text and "Simulez vos revenus" in home_text, page=page())

# User active-driver demo.
if login(USER_EMAIL, USER_PASSWORD, "/espace"):
    shot("user-mehdi-dashboard")
    dashboard_text = text(1800)
    add("user dashboard shows seeded active client", "Bonjour Mehdi" in dashboard_text or "Mehdi" in dashboard_text, page=page(), textStart=dashboard_text[:700])

    clicked_ops = click_text("Opérations")
    wait(1.5)
    shot("user-mehdi-operations")
    ops_text = text(2600)
    add(
        "user operations panel shows portage demo data",
        all(token in ops_text for token in ["Contrat", "Activités", "Factures", "Bulletins"]) and ("SIGNED" in ops_text or "Contrat signé" in ops_text),
        clicked=clicked_ops,
        textStart=ops_text[:1000],
    )

    ops_api = browser_fetch(
        f"""
        const r = await fetch('/api/operations?applicationId=demo-app-mehdi');
        const data = await r.json();
        return {{
            status: r.status,
            success: data.success,
            profileStatus: data.data?.profile?.status,
            contractStatus: data.data?.contract?.status,
            activities: data.data?.monthlyActivities?.length || 0,
            invoices: data.data?.invoices?.length || 0,
            expenses: data.data?.expenses?.length || 0,
            payrolls: data.data?.payrollSummaries?.length || 0,
            timeline: data.data?.timeline?.length || 0
        }};
        """
    )
    add(
        "user operations API returns active bundle",
        ops_api.get("status") == 200 and ops_api.get("success") and ops_api.get("contractStatus") == "SIGNED" and ops_api.get("payrolls", 0) > 0,
        response=ops_api,
    )

    activity = browser_fetch(
        f"""
        const r = await fetch('/api/operations', {{
          method: 'POST',
          headers: {{ 'Content-Type': 'application/json' }},
          body: JSON.stringify({{
            action: 'upsertMonthlyActivity',
            applicationId: 'demo-app-mehdi',
            period: {json.dumps(PERIOD)},
            declaredRevenue: 7420,
            platformBreakdown: {{ Uber: 4820, Bolt: 2600 }},
            notes: 'Déclaration live audit Browser Harness'
          }})
        }});
        const data = await r.json();
        return {{ status: r.status, success: data.success, activityCount: data.data?.monthlyActivities?.length || 0 }};
        """
    )
    add("user submits monthly activity", activity.get("status") == 200 and activity.get("success"), response=activity)

    expense = browser_fetch(
        """
        const r = await fetch('/api/operations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'submitExpense',
            applicationId: 'demo-app-mehdi',
            category: 'Recharge',
            amount: 42,
            description: 'Recharge audit live'
          })
        });
        const data = await r.json();
        return { status: r.status, success: data.success, expenseCount: data.data?.expenses?.length || 0 };
        """
    )
    add("user submits expense", expense.get("status") == 200 and expense.get("success"), response=expense)

    r2_upload = browser_fetch(
        """
        const blob = new Blob(['Driivo Browser Harness R2 upload smoke'], { type: 'application/pdf' });
        const file = new File([blob], 'browser-harness-r2-smoke.pdf', { type: 'application/pdf' });
        const fd = new FormData();
        fd.append('file', file);
        fd.append('entityType', 'APPLICATION');
        fd.append('entityId', 'demo-app-mehdi');
        fd.append('documentCategory', 'OTHER');
        const upload = await fetch('/api/files', { method: 'POST', body: fd });
        const uploadData = await upload.json();
        let download = null;
        if (uploadData.success) {
          const urlResp = await fetch('/api/files?key=' + encodeURIComponent(uploadData.file.key));
          const urlData = await urlResp.json();
          download = { status: urlResp.status, success: urlData.success, url: urlData.url, key: uploadData.file.key, fileId: uploadData.file.id };
        }
        return { status: upload.status, success: uploadData.success, file: uploadData.file, download };
        """
    )
    r2_download_ok = False
    r2_download_status = None
    if r2_upload.get("download", {}).get("url"):
        try:
            with urllib.request.urlopen(r2_upload["download"]["url"], timeout=20) as response:
                body = response.read(200)
                r2_download_status = response.status
                r2_download_ok = response.status == 200 and b"Driivo Browser Harness R2 upload smoke" in body
        except Exception as error:
            r2_download_status = str(error)
    add(
        "R2 upload and signed download through app",
        r2_upload.get("status") == 200 and r2_upload.get("success") and r2_upload.get("download", {}).get("success") and r2_download_ok,
        upload={k: v for k, v in r2_upload.items() if k != "download"},
        download={
            **(r2_upload.get("download") or {}),
            "url": "<signed-url-redacted>",
            "bodyCheck": r2_download_ok,
            "httpStatus": r2_download_status,
        },
    )

    goto_url(f"{APP}/espace")
    wait_for_load(12)
    wait(1)
    click_text("Documents")
    wait(1)
    shot("user-mehdi-documents-after-r2-upload")

# Admin/accountant demo.
if login(ADMIN_EMAIL, ADMIN_PASSWORD, "/admin"):
    shot("admin-dashboard")
    admin_text = text(2200)
    add("admin dashboard shows seeded candidates", all(name in admin_text for name in ["Amine", "Sarah", "Karim", "Mehdi"]), page=page(), textStart=admin_text[:1000])

    integration = browser_fetch(
        """
        const r = await fetch('/api/health?integrations=1');
        const data = await r.json();
        return {
          status: r.status,
          serviceStatus: data.status,
          resend: data.integrations?.resend,
          r2: data.integrations?.r2
        };
        """
    )
    resend = integration.get("resend", {})
    r2 = integration.get("r2", {})
    resend_domains = resend.get("domains") or []
    driivo_domain = next(
        (domain for domain in resend_domains if domain.get("name") == "driivo.fr"),
        None,
    )
    add(
        "admin R2 integration smoke check",
        integration.get("status") == 200
        and r2.get("configured") is True
        and r2.get("ok") is True,
        response=r2,
    )
    add(
        "admin Resend API reachable",
        integration.get("status") == 200
        and resend.get("configured") is True
        and resend.get("ok") is True,
        response=resend,
    )
    add(
        "admin Resend driivo.fr domain verified",
        bool(driivo_domain) and driivo_domain.get("status") == "verified",
        response=driivo_domain,
    )

    goto_url(f"{APP}/admin/applications/demo-app-mehdi")
    wait_for_load(15)
    wait(2)
    shot("admin-mehdi-operations")
    detail_text = text(3200)
    add(
        "admin sees active operations modules",
        all(token in detail_text for token in ["Opérations client manuelles", "Contrat", "Activités", "Factures", "Paie"]) and "SIGNED" in detail_text,
        page=page(),
        textStart=detail_text[:1200],
    )

    csv = browser_fetch(
        f"""
        const r = await fetch('/api/operations?export=accounting&period={PERIOD}');
        const body = await r.text();
        return {{ status: r.status, bodyStart: body.slice(0, 500), hasMehdi: body.includes('mehdi.aouad@example.com') }};
        """
    )
    add("admin accounting CSV export", csv.get("status") == 200 and "driver_email" in csv.get("bodyStart", ""), response=csv)

    approve = browser_fetch(
        """
        const patch = await fetch('/api/applications', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: 'demo-app-camille', status: 'APPROVED', notes: 'Approuvé pendant audit live Browser Harness' })
        });
        const patchData = await patch.json();
        const activate = await fetch('/api/operations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'activateProfile', applicationId: 'demo-app-camille' })
        });
        const activateData = await activate.json();
        return {
          patchStatus: patch.status,
          patchSuccess: patchData.success,
          activateStatus: activate.status,
          activateSuccess: activateData.success,
          profileStatus: activateData.data?.profile?.status,
          taskCount: activateData.data?.onboardingTasks?.length || 0
        };
        """
    )
    add(
        "admin approves and activates a demo candidate",
        approve.get("patchStatus") == 200 and approve.get("patchSuccess") and approve.get("activateStatus") == 200 and approve.get("activateSuccess") and approve.get("taskCount", 0) >= 7,
        response=approve,
    )
    goto_url(f"{APP}/admin/applications/demo-app-camille")
    wait_for_load(15)
    wait(2)
    shot("admin-camille-activated")

results["finishedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
out = ARTIFACT_DIR / "browser-harness-live-demo-audit.json"
out.write_text(json.dumps(results, ensure_ascii=False, indent=2))
print("BH_LIVE_DEMO_AUDIT_START")
print(json.dumps(results, ensure_ascii=False, indent=2))
print("BH_LIVE_DEMO_AUDIT_END")
