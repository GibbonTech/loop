# 🎯 Driivo Admin Dashboard — Onboarding Guide

**Last Updated:** March 11, 2026  
**Platform Version:** Production v1.0

---

## 📋 Table of Contents

1. [Admin Access & Login](#admin-access--login)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Applications](#managing-applications)
4. [Managing Leads](#managing-leads)
5. [Managing Meetings](#managing-meetings)
6. [Email Notifications](#email-notifications)
7. [Troubleshooting](#troubleshooting)

---

## 🔐 Admin Access & Login

### Production Login Credentials

**URL:** https://app.driivo.fr  
**Email:** `admin@loop.fr`  
**Password:** `admin123`

> ⚠️ **IMPORTANT:** Change this password after first login or contact the technical team to reset it.

### First Time Login

1. Navigate to https://app.driivo.fr
2. Enter email: `admin@loop.fr`
3. Enter password: `admin123`
4. Click **Se connecter**
5. You'll be automatically redirected to `/admin` dashboard

### Password Reset (If Needed)

If you forget your password or need to reset it, contact the technical team. They can run the reset script:

```bash
cd /home/rick/Documents/websites/driivo/loop
node reset-admin.cjs
```

This will reset the password back to `admin123`.

---

## 📊 Dashboard Overview

### Main Navigation

When you login, you'll see the admin dashboard with:

**Top Stats Bar:**
- **Total candidatures** — All applications submitted
- **En attente** — Applications waiting for review (status: SUBMITTED)
- **Approuvées** — Approved applications
- **Refusées** — Rejected applications

**Three Main Sections:**
1. **Candidatures** — Full driver applications (from inscription form)
2. **Leads** — Simulator submissions (salary calculator)
3. **Réunions** — Meeting bookings (from /reunion page)

**Search Bar:**
- Search by candidate name or email
- Real-time filtering as you type

**Filter Tabs (Applications only):**
- **Toutes** — All applications
- **En attente** — Pending review
- **Approuvées** — Approved
- **Refusées** — Rejected

---

## 📝 Managing Applications

### Application List View

Each row shows:
- **Candidate name** (with avatar initials)
- **Email address**
- **Phone number**
- **Monthly revenue target** (CA visé)
- **Submission date**
- **Status badge** (color-coded)
- **Arrow icon** — Click to view full details

### Viewing Application Details

**Click any application row** to open the detail page.

**Information Displayed:**

**Personal Info:**
- Full name
- Email address
- Phone number
- City

**VTC Details:**
- VTC license status (yes/no/in progress)
- VTC card number (if provided)
- Years of experience
- Current platforms (Uber, Bolt, Heetch, FreeNow)

**Vehicle Info:**
- Has vehicle? (yes/need one)
- Vehicle model/type

**Activity:**
- Target monthly revenue (CA)
- Submission date

**Completeness Score:**
- Shows X/8 required fields filled
- Percentage bar (e.g., "100%" if all fields complete)

**Uploaded Documents:**
- View list of attached files (if any)
- Click file name to download via presigned URL
- Documents stored in Cloudflare R2

### Status Management

**Three Status Actions Available:**

1. **✅ Approuver (Approve)**
   - Click green "Approuver" button
   - **Triggers email:** "Candidature approuvée" to driver
   - Status changes to `APPROVED` (green badge)
   - Driver can now access full platform features

2. **❌ Refuser (Reject)**
   - Click red "Refuser" button
   - **Triggers email:** "Candidature refusée" to driver (polite message)
   - Status changes to `REJECTED` (red badge)

3. **👁️ En examen (Under Review)**
   - Click gray "En examen" button
   - **Triggers email:** "En cours d'examen" status update
   - Status changes to `UNDER_REVIEW` (gray badge)
   - Use this when you need more time/info before deciding

**Email Contact:**
- Click **"Contacter"** button (envelope icon)
- Opens your default email client with driver's email pre-filled

### Adding Notes

**Internal Notes Section:**
- Located at bottom of application detail page
- Textarea for private admin notes
- **Not visible to drivers** — internal use only
- Auto-saved on blur (when you click outside the field)
- Use for:
  - Interview feedback
  - Missing documents
  - Follow-up reminders
  - Team coordination

---

## 🎯 Managing Leads

### What are Leads?

Leads are people who used the **salary simulator** on the landing page (`driivo.fr`) but haven't submitted a full application yet.

### Lead Information

Each lead shows:
- **Name** (if provided)
- **Email**
- **Phone number**
- **Monthly revenue estimate** (from simulator)
- **Estimated net salary** (calculated: CA × 0.76)
- **Source:** Usually "SIMULATEUR"
- **UTM tracking** (campaign source if available)
- **Creation date**
- **Status:** NEW by default

### Lead Actions

Currently leads are **view-only**. Future features may include:
- Converting leads to full applications
- Sending follow-up emails
- CRM integration

**Best Practice:** If a lead looks promising, reach out via email to invite them to complete the full inscription.

---

## 📅 Managing Meetings

### Meeting Bookings

Meetings are scheduled via the `/reunion` page where prospects can:
- Select a day
- Choose a time slot (10:00, 11:00, 14:00, etc.)
- Provide contact info

### Meeting Information

Each meeting shows:
- **Name**
- **Email**
- **Phone**
- **Scheduled date** (e.g., "12 mars 2026")
- **Time slot** (e.g., "10:00")
- **Status:** SCHEDULED by default

### Meeting Actions

Currently meetings are **view-only**. Use this to:
- Prepare for upcoming calls
- Check who you need to call today
- Get contact information

**Best Practice:** 
- Call the number at the scheduled time
- Duration is ~15 minutes
- Topics: answer questions, explain Driivo, calculate personalized net salary

---

## 📧 Email Notifications

### Automatic Emails Sent by the Platform

**1. Application Submitted (to driver):**
- **Subject:** "Candidature reçue - Driivo"
- **Trigger:** When driver completes inscription form
- **Content:** Confirmation + next steps + link to /reunion

**2. New Application (to admin):**
- **Subject:** "Nouvelle candidature : [Name]"
- **Recipient:** Environment variable `ADMIN_NOTIFICATION_EMAIL` or `admin@driivo.fr`
- **Content:** Driver name, email, link to application detail

**3. Password Setup (to driver):**
- **Subject:** "Créez votre mot de passe - Driivo"
- **Trigger:** Auto-sent after application submission
- **Content:** Link with token to `/set-password?token=...`
- **Expiry:** 7 days

**4. Status Change (to driver):**

When you click **Approuver:**
- **Subject:** "Candidature approuvée - Driivo"
- **Content:** Congratulations message + link to /espace

When you click **Refuser:**
- **Subject:** "Candidature - Driivo"
- **Content:** Polite rejection message

When you click **En examen:**
- **Subject:** "Votre candidature est en cours d'examen - Driivo"
- **Content:** Status update + reassurance

**5. Meeting Confirmation (to driver):**
- **Subject:** "Rendez-vous confirmé le [date] à [time] - Driivo"
- **Trigger:** When driver books a meeting
- **Content:** Date, time, duration, reminder to be available

### Email Provider

**Service:** Resend (https://resend.com)  
**Sending Domain:** `noreply@siratscolaire.fr` (verified)  
**API Key:** Configured in Coolify environment variables

**Email Logs:**
- Access Resend dashboard to see delivery status
- Check spam if driver reports not receiving email
- All emails go through Resend's infrastructure

---

## 🔧 Troubleshooting

### Driver Can't Login

**Issue:** Driver says they can't login after application approval.

**Solution:**
1. Check if password setup email was sent (check Resend logs)
2. If not received, driver may need to use "Mot de passe oublié?" button
3. They'll receive a new reset email to `/set-password`

### Application Doesn't Load

**Issue:** Clicking an application shows "Candidature introuvable"

**Solution:**
- Check URL — application ID might be malformed
- Try refreshing the dashboard
- If persists, contact technical team

### Email Not Sending

**Issue:** Status change emails not arriving.

**Check:**
1. Verify driver email is correct in application
2. Check Resend dashboard for delivery status
3. Ask driver to check spam folder
4. Verify `RESEND_API_KEY` is configured in Coolify

### Can't Approve/Reject

**Issue:** Buttons don't work or nothing happens.

**Solution:**
1. Check browser console for errors (F12)
2. Refresh the page
3. Try logging out and back in
4. Contact technical team if persists

### Search Not Working

**Issue:** Search returns no results.

**Solution:**
- Search is case-insensitive
- Searches: first name, last name, email
- Try partial name (e.g., "Marc" instead of "Marc Dupont")
- Clear search field to reset

---

## 🎓 Best Practices

### Daily Workflow

1. **Morning Check:**
   - Login to dashboard
   - Check "En attente" tab for new applications
   - Review meetings scheduled for today

2. **Application Review:**
   - Click each pending application
   - Verify completeness (8/8 fields)
   - Check for uploaded documents
   - Review VTC license and experience
   - Add internal notes if needed

3. **Decision Making:**
   - **Approve** if complete and qualified
   - **Under Review** if need to call/verify
   - **Reject** only if clearly not qualified

4. **Follow-up:**
   - Use "Contacter" to email drivers
   - Call scheduled meetings
   - Convert promising leads

### Security

- **Never share login credentials** publicly
- **Use password manager** to store credentials
- **Log out** when using shared computers
- **Change default password** after first login

### Data Privacy

- Driver data is **confidential**
- Notes are **internal only** — never shown to drivers
- Do not share personal information externally
- GDPR compliant — data stored securely

---

## 📞 Support Contacts

**Technical Issues:**
- Deployment: Coolify at `37.27.62.87`
- Database: PostgreSQL (hosted in Coolify)
- File Storage: Cloudflare R2 (`driivo-files` bucket)

**Need Help?**
- Contact technical team for:
  - Password resets
  - Platform bugs
  - Email delivery issues
  - Database queries
  - New feature requests

---

## 🚀 Quick Reference

| Action | Path | Result |
|--------|------|--------|
| Login | https://app.driivo.fr | Redirects to /admin |
| View Applications | Dashboard → Candidatures tab | List of all applications |
| View Application Detail | Click any row | Full application info |
| Approve Application | Detail page → Approuver | Email sent + status APPROVED |
| Reject Application | Detail page → Refuser | Email sent + status REJECTED |
| Set Under Review | Detail page → En examen | Email sent + status UNDER_REVIEW |
| Add Notes | Detail page → Internal notes | Saves on blur |
| Contact Driver | Detail page → Contacter | Opens email client |
| Search | Top search bar | Filters by name/email |
| View Leads | Dashboard → Leads tab | Simulator submissions |
| View Meetings | Dashboard → Réunions tab | Scheduled calls |
| Logout | Top right → Déconnexion | Returns to login page |

---

**End of Admin Onboarding Guide**

Questions? Contact the technical team.
