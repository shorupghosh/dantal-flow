# 🧪 Contact Form Testing Guide — DentalFlow AI
### Purpose: Verify that the contact form and chatbot capture leads correctly

---

> **Who should do this:** You (Shorup) or the sister before any client demo
> **Goal:** Confirm leads flow into Supabase CRM, emails are sent, and the system works perfectly
> **When:** Run this checklist after any major update to the app

---

## ─── PART 1: CHATBOT FLOW TEST ───

> Open: **https://dantal-flow.vercel.app/**
> Then open the **AI chatbot** (click the chat icon or widget at the bottom)

---

### Test 1: Basic Greeting Response
**Action:** Open the chatbot and wait for the first message.
**Question to confirm:** Does the AI send a welcome message automatically?
- [ ] ✅ Yes, AI greets the user immediately
- [ ] ❌ No — **Report this as a bug**

---

### Test 2: Treatment Question (Free Chat)
**Action:** Type: *"What treatments do you offer?"*
**Question to confirm:** Does the AI respond with a list of treatments?
- [ ] ✅ Yes, AI gives a relevant answer
- [ ] ❌ No or irrelevant answer — **Report this as a bug**

---

### Test 3: Pricing Question
**Action:** Type: *"How much does a dental implant cost?"*
**Question to confirm:** Does the AI respond with pricing information?
- [ ] ✅ Yes, AI mentions pricing or price range
- [ ] ❌ No — **Report this as a bug**

---

### Test 4: Booking Intent Trigger
**Action:** Type: *"I want to book an appointment"* OR tap the "Book Consultation" button
**Question to confirm:** Does the chatbot switch to a lead capture form?
- [ ] ✅ Yes, a form appears asking for Name, Phone, Treatment
- [ ] ❌ No, it just keeps chatting — **Report this as a bug**

---

### Test 5: Lead Form Submission
**Action:** Fill in the lead capture form with:
- Name: `Test Patient`
- Phone: `9999999999`
- Treatment: Select any treatment

**Question to confirm:** Does the form accept the submission and move forward?
- [ ] ✅ Yes, it moves to the calendar/slot selection
- [ ] ❌ No, form errors or nothing happens — **Report this as a bug**

---

### Test 6: Calendar Display
**Action:** After submitting the lead form, look at the calendar widget.
**Questions to confirm:**
- [ ] ✅ Calendar shows the next 14 days of available dates
- [ ] ✅ Sundays are **not shown** or are greyed out/disabled
- [ ] ✅ You can select a doctor from a dropdown
- [ ] ✅ Time slots appear (Morning / Afternoon / Evening)
- [ ] ❌ Any of the above missing — **Report specifically which one**

---

### Test 7: Appointment Booking Confirmation
**Action:** Select a date, doctor, and time slot. Confirm the booking.
**Questions to confirm:**
- [ ] ✅ A confirmation message appears (animated checkmark or success card)
- [ ] ✅ Booking summary shows: patient name, treatment, date, time, doctor
- [ ] ❌ Error or blank screen — **Report this as a bug**

---

## ─── PART 2: CRM / DATABASE TEST ───

> **For Shorup only:** Access the Admin Dashboard after completing the chatbot flow above.

---

### Test 8: Lead Appears in CRM
**Action:** Open the Admin Dashboard → go to Leads section
**Question to confirm:** Does the test patient's lead appear immediately?
- [ ] ✅ Yes, "Test Patient" is visible in the leads table
- [ ] ❌ No — **Check Supabase connection. Report as a bug.**

---

### Test 9: Appointment Appears in CRM
**Action:** Open the Admin Dashboard → go to Appointments section
**Question to confirm:** Does the booked appointment appear with the correct details?
- [ ] ✅ Yes, appointment shows: patient name, treatment, date, time, doctor, status = "Pending"
- [ ] ❌ No — **Check Supabase appointments table. Report as a bug.**

---

### Test 10: Real-Time Update (No Page Refresh)
**Action:** Keep the Admin Dashboard open in one tab. Complete a chatbot booking in another tab.
**Question to confirm:** Does the new lead/appointment appear in the dashboard WITHOUT refreshing the page?
- [ ] ✅ Yes, it appears automatically (real-time sync)
- [ ] ❌ Only shows after page refresh — **Report as a bug**

---

## ─── PART 3: EMAIL NOTIFICATION TEST ───

> **For Shorup only:** Check email inboxes after completing a test booking.

---

### Test 11: Patient Confirmation Email
**Action:** After completing a booking (use a real email address in the test)
**Question to confirm:** Does the patient receive a confirmation email?
- [ ] ✅ Yes, email received with booking details, clinic address, contact info
- [ ] ❌ No email received — **Check Resend API key and email configuration**

---

### Test 12: Doctor/Clinic Alert Email
**Action:** Check the doctor's email or clinic admin email after a test booking
**Question to confirm:** Does the clinic receive an alert email for the new booking?
- [ ] ✅ Yes, email received with patient name, treatment, phone, and time slot
- [ ] ❌ No email received — **Check Resend API and doctor email setting**

---

## ─── PART 4: CONTACT FORM TEST (Website Page) ───

> Look for a **Contact Us** page or form on the website (not the chatbot)

---

### Test 13: Contact Form Exists and Is Visible
**Question to confirm:** Is there a contact form visible on the website?
- [ ] ✅ Yes — proceed with testing below
- [ ] ❌ No — note this as a missing feature

---

### Test 14: Contact Form Fields
**Question to confirm:** Does the contact form have the right fields?
- [ ] ✅ Full Name field
- [ ] ✅ Phone Number field
- [ ] ✅ Email field (optional)
- [ ] ✅ Message / Inquiry field
- [ ] ✅ Submit button
- [ ] ❌ Any field missing — **Note which ones**

---

### Test 15: Contact Form Submission
**Action:** Fill in the contact form with test data and submit.
**Questions to confirm:**
- [ ] ✅ Success message appears after submission
- [ ] ✅ Lead appears in Admin CRM dashboard
- [ ] ❌ Error on submit — **Note the error message and report**

---

## ─── QUICK BUG REPORT FORMAT ───

> If you find a bug, report it using this format via WhatsApp to Shorup:

```
BUG REPORT:
Test #: [number]
What I did: [action taken]
What happened: [what I saw]
What should have happened: [expected result]
Screenshot: [attach if possible]
```

---

## ─── TEST COMPLETION CHECKLIST ───

| Test | Status |
|------|--------|
| 1. Greeting response | ☐ |
| 2. Treatment question | ☐ |
| 3. Pricing question | ☐ |
| 4. Booking intent trigger | ☐ |
| 5. Lead form submission | ☐ |
| 6. Calendar display | ☐ |
| 7. Booking confirmation | ☐ |
| 8. Lead in CRM | ☐ |
| 9. Appointment in CRM | ☐ |
| 10. Real-time update | ☐ |
| 11. Patient email | ☐ |
| 12. Doctor alert email | ☐ |
| 13. Contact form visible | ☐ |
| 14. Form fields complete | ☐ |
| 15. Form submission | ☐ |

**All 15 tests passed = System is demo-ready ✅**

---

*SmartDocSystem — AI Growth Systems for Dental Clinics*
*Live Demo: dantal-flow.vercel.app*
