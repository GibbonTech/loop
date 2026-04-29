import json
import os
import time
import urllib.request
from pathlib import Path

ARTIFACT_DIR = Path("/home/rick/Documents/websites/driivo/screens/live-demo-walkthrough-2026-04-29")
APP = "https://app.driivo.fr"
SITE = "https://driivo.fr"
USER_EMAIL = "mehdi.aouad@example.com"
USER_PASSWORD = os.environ["DRIIVO_DEMO_USER_PASSWORD"]
ADMIN_EMAIL = "demo.admin@driivo.fr"
ADMIN_PASSWORD = os.environ["DRIIVO_DEMO_ADMIN_PASSWORD"]
NEW_EMAIL = f"demo.walkthrough.{int(time.time())}@example.com"
PERIOD = "2026-05"

results = {
    "startedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "tool": "browser-harness",
    "site": SITE,
    "app": APP,
    "newApplicationEmail": NEW_EMAIL,
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


def text(limit=2000):
    return js(f"return (document.body ? document.body.innerText : '').slice(0, {limit})")


def page():
    info = page_info()
    return {"url": info.get("url"), "title": info.get("title"), "w": info.get("w"), "h": info.get("h")}


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


def browser_fetch(expression):
    return js(
        f"""
        (async () => {{
          {expression}
        }})()
        """
    )


def clear_driivo_cookies():
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


def login(email, password, expected_path, screenshot_name):
    clear_driivo_cookies()
    new_tab(APP)
    wait_for_load(15)
    wait(1)
    set_field("#email", email)
    set_field("#password", password)
    shot(screenshot_name)
    submitted = click_text("Se connecter|Connexion")
    wait_for_load(15)
    wait(2)
    info = page()
    ok = expected_path in (info.get("url") or "")
    add(f"login {email}", ok, submitted=submitted, page=info, textStart=text(900))
    return ok


def public_application_flow():
    new_tab(SITE)
    wait_for_load(15)
    wait(1)
    shot("01-public-home")
    home = text(1600)
    add("public landing page renders and has primary CTAs", "Simulez vos revenus" in home and "Rejoindre" in home, page=page())

    clicked_simulator = click_text("Simulez vos revenus")
    wait_for_load(15)
    wait(1)
    shot("02-simulator")
    simulator_text = text(1600)
    simulator_page = page()
    add(
        "simulator page opens from landing CTA",
        clicked_simulator
        and "/simulateur" in (simulator_page.get("url") or "")
        and "Simulateur" in (simulator_page.get("title") or simulator_text),
        page=simulator_page,
    )

    new_tab(f"{APP}/inscription")
    wait_for_load(15)
    wait(1)
    set_field('input[placeholder="Jean"]', "Lucie")
    set_field('input[placeholder="Dupont"]', "Martin")
    set_field('input[placeholder="jean@example.com"]', NEW_EMAIL)
    set_field('input[placeholder="06 12 34 56 78"]', "0611223344")
    set_field('input[placeholder="Paris"]', "Paris")
    shot("03-application-step-1-filled")
    clicked_step_1 = click_text("Continuer")
    wait(1)

    browser_fetch(
        """
        document.querySelector('input[name="carteVtc"][value="oui"]')?.click();
        return true;
        """
    )
    set_field('input[placeholder="VTC-XXXXXXXX"]', "VTC-DEMO-2026")
    set_field("select", "3_5ans")
    shot("04-application-step-2-filled")
    clicked_step_2 = click_text("Continuer")
    wait(1)

    browser_fetch(
        """
        document.querySelector('input[name="vehicule"][value="oui"]')?.click();
        const labels = Array.from(document.querySelectorAll('label'));
        for (const wanted of ['uber', 'bolt']) {
          const label = labels.find(node => (node.innerText || '').toLowerCase().includes(wanted));
          label?.click();
        }
        const consent = labels.find(node => (node.innerText || '').includes("J'accepte"));
        consent?.click();
        return true;
        """
    )
    set_field('input[placeholder="Ex: Tesla Model 3"]', "Tesla Model 3")
    browser_fetch(
        """
        const selects = Array.from(document.querySelectorAll('select'));
        const revenue = selects[selects.length - 1];
        revenue.value = '5000_7000';
        revenue.dispatchEvent(new Event('change', { bubbles: true }));
        sessionStorage.removeItem('driivoWalkthroughApplicationResponse');
        const originalFetch = window.fetch.bind(window);
        window.fetch = async (...args) => {
          const response = await originalFetch(...args);
          const target = String(args[0] || '');
          const method = (args[1]?.method || 'GET').toUpperCase();
          if (target.includes('/api/applications') && method === 'POST') {
            const data = await response.clone().json().catch(() => null);
            sessionStorage.setItem('driivoWalkthroughApplicationResponse', JSON.stringify({
              status: response.status,
              data
            }));
          }
          return response;
        };
        return true;
        """
    )
    shot("05-application-step-3-ready")
    submitted = click_text("Envoyer ma candidature")
    wait_for_load(20)
    wait(2)
    shot("06-application-confirmation")
    response = browser_fetch(
        """
        const raw = sessionStorage.getItem('driivoWalkthroughApplicationResponse');
        return raw ? JSON.parse(raw) : null;
        """
    )
    app_id = response.get("data", {}).get("id") if response else None
    add(
        "new candidature submitted from UI and account auto-created",
        submitted
        and "/confirmation" in (page().get("url") or "")
        and response
        and response.get("status") == 200
        and response.get("data", {}).get("success") is True
        and response.get("data", {}).get("hasAccount") is True
        and bool(app_id),
        clickedStep1=clicked_step_1,
        clickedStep2=clicked_step_2,
        response=response,
    )
    return app_id


def seeded_user_flow():
    if not login(USER_EMAIL, USER_PASSWORD, "/espace", "07-user-login-filled"):
        return

    shot("08-user-dashboard")
    dashboard = text(2000)
    add("seeded user dashboard is viewable", "Bonjour Mehdi" in dashboard and "Candidature approuvée" in dashboard, page=page())

    clicked_ops = click_text("Opérations")
    wait(1)
    shot("09-user-operations")
    operations_text = text(3200)
    add(
        "seeded user post-approval operations are clickable/viewable",
        clicked_ops and all(token in operations_text for token in ["Contrat", "Activités", "Factures", "Bulletins"]),
        textStart=operations_text[:1000],
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
            notes: 'Déclaration walkthrough live'
          }})
        }});
        const data = await r.json();
        return {{ status: r.status, success: data.success, activityCount: data.data?.monthlyActivities?.length || 0 }};
        """
    )
    add("user can submit monthly activity declaration", activity.get("status") == 200 and activity.get("success"), response=activity)

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
            description: 'Recharge walkthrough live'
          })
        });
        const data = await r.json();
        return { status: r.status, success: data.success, expenseCount: data.data?.expenses?.length || 0 };
        """
    )
    add("user can submit expense", expense.get("status") == 200 and expense.get("success"), response=expense)

    r2_upload = browser_fetch(
        """
        const blob = new Blob(['Driivo walkthrough R2 upload smoke'], { type: 'application/pdf' });
        const file = new File([blob], 'walkthrough-r2-smoke.pdf', { type: 'application/pdf' });
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
                r2_download_ok = response.status == 200 and b"Driivo walkthrough R2 upload smoke" in body
        except Exception as error:
            r2_download_status = str(error)
    add(
        "R2 document upload and signed download work",
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
    shot("10-user-documents-after-upload")


def admin_flow(new_app_id):
    if not login(ADMIN_EMAIL, ADMIN_PASSWORD, "/admin", "11-admin-login-filled"):
        return

    shot("12-admin-dashboard")
    admin_text = text(2600)
    add(
        "admin dashboard is viewable with seeded and new candidates",
        all(name in admin_text for name in ["Amine", "Sarah", "Mehdi"]) and "Candidatures" in admin_text,
        textStart=admin_text[:1000],
    )

    if not new_app_id:
        lookup = browser_fetch(
            f"""
            const r = await fetch('/api/applications');
            const data = await r.json();
            const found = (data.data || []).find(app => app.email === {json.dumps(NEW_EMAIL)});
            return {{ status: r.status, success: data.success, id: found?.id, statusValue: found?.status }};
            """
        )
        new_app_id = lookup.get("id")
        add("admin can find newly submitted application", lookup.get("status") == 200 and bool(new_app_id), response=lookup)

    if new_app_id:
        goto_url(f"{APP}/admin/applications/{new_app_id}")
        wait_for_load(15)
        wait(2)
        shot("13-admin-new-application-detail")
        detail = text(2600)
        add(
            "admin can open new application detail",
            NEW_EMAIL in detail and "Complétude du dossier" in detail,
            applicationId=new_app_id,
            textStart=detail[:1000],
        )
        approve = browser_fetch(
            f"""
            const patch = await fetch('/api/applications', {{
              method: 'PATCH',
              headers: {{ 'Content-Type': 'application/json' }},
              body: JSON.stringify({{ id: {json.dumps(new_app_id)}, status: 'APPROVED', notes: 'Approuvé pendant walkthrough live' }})
            }});
            const patchData = await patch.json();
            const activate = await fetch('/api/operations', {{
              method: 'POST',
              headers: {{ 'Content-Type': 'application/json' }},
              body: JSON.stringify({{ action: 'activateProfile', applicationId: {json.dumps(new_app_id)} }})
            }});
            const activateData = await activate.json();
            return {{
              patchStatus: patch.status,
              patchSuccess: patchData.success,
              activateStatus: activate.status,
              activateSuccess: activateData.success,
              profileStatus: activateData.data?.profile?.status,
              taskCount: activateData.data?.onboardingTasks?.length || 0
            }};
            """
        )
        add(
            "admin can approve and activate new account/application",
            approve.get("patchStatus") == 200 and approve.get("patchSuccess") and approve.get("activateStatus") == 200 and approve.get("activateSuccess") and approve.get("taskCount", 0) >= 7,
            response=approve,
        )
        goto_url(f"{APP}/admin/applications/{new_app_id}")
        wait_for_load(15)
        wait(2)
        shot("14-admin-new-application-activated")

    goto_url(f"{APP}/admin/applications/demo-app-mehdi")
    wait_for_load(15)
    wait(2)
    shot("15-admin-mehdi-operations")
    mehdi_text = text(3600)
    add(
        "admin/accountant can view active client operations",
        all(token in mehdi_text for token in ["Opérations client manuelles", "Contrat", "Activité mensuelle", "Factures", "Paie"]) and "SIGNED" in mehdi_text,
        textStart=mehdi_text[:1200],
    )

    csv = browser_fetch(
        f"""
        const r = await fetch('/api/operations?export=accounting&period={PERIOD}');
        const body = await r.text();
        return {{ status: r.status, hasHeader: body.includes('driver_email'), hasMehdi: body.includes('mehdi.aouad@example.com'), bodyStart: body.slice(0, 500) }};
        """
    )
    add("admin/accountant accounting CSV export works", csv.get("status") == 200 and csv.get("hasHeader") and csv.get("hasMehdi"), response=csv)

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
    driivo_domain = next((domain for domain in (resend.get("domains") or []) if domain.get("name") == "driivo.fr"), None)
    add("R2 integration health check passes", integration.get("status") == 200 and r2.get("configured") is True and r2.get("ok") is True, response=r2)
    add("Resend API is reachable", integration.get("status") == 200 and resend.get("configured") is True and resend.get("ok") is True, response=resend)
    add("Resend driivo.fr sending domain is verified", bool(driivo_domain) and driivo_domain.get("status") == "verified", response=driivo_domain)


new_app_id = public_application_flow()
seeded_user_flow()
admin_flow(new_app_id)

results["finishedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
out = ARTIFACT_DIR / "browser-harness-demo-walkthrough.json"
out.write_text(json.dumps(results, ensure_ascii=False, indent=2))
print("BH_DEMO_WALKTHROUGH_START")
print(json.dumps(results, ensure_ascii=False, indent=2))
print("BH_DEMO_WALKTHROUGH_END")
