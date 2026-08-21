import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const WHATSAPP_API_TOKEN = Deno.env.get('WHATSAPP_API_TOKEN') || '';
const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID') || '';
const CAL_API_KEY = Deno.env.get('CAL_API_KEY') || '';

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: {
    id: string;
    name: string;
    email: string;
    phone: string;
    treatment_interest: string;
    ai_notes: string;
    created_at: string;
  };
  schema: string;
}

const WEBHOOK_SECRET = Deno.env.get('WEBHOOK_SECRET') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

serve(async (req) => {
  try {
    // 0. Enforce Authentication Header
    const authHeader = req.headers.get('Authorization') || req.headers.get('x-webhook-secret');
    if (WEBHOOK_SECRET && authHeader !== `Bearer ${WEBHOOK_SECRET}` && authHeader !== WEBHOOK_SECRET) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid or missing webhook authorization token.' }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }

    const payload: WebhookPayload = await req.json();
    
    // We only care about new leads
    if (payload.type !== 'INSERT' || payload.table !== 'leads') {
      return new Response(JSON.stringify({ message: 'Ignored: Not a new lead insert.' }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    const lead = payload.record;
    console.log(`Processing new lead: ${lead.name} (${lead.phone})`);

    const results = {
      email: null as any,
      whatsapp: null as any,
      calendar: null as any
    };

    // 1. Send Email via Resend (Free Tier)
    if (RESEND_API_KEY && lead.email) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'DentalFlow AI <bookings@yourclinic.com>', // MUST BE VERIFIED DOMAIN IN RESEND
            to: [lead.email],
            subject: 'Appointment Received - DentalFlow Clinic',
            html: `
              <h2>Thank you for choosing DentalFlow!</h2>
              <p>We have received your appointment request.</p>
              <p><strong>Treatment Interest:</strong> ${lead.treatment_interest}</p>
              <br>
              <p>Our team will contact you shortly to confirm the exact time.</p>
            `
          })
        });
        results.email = await resendResponse.json();
      } catch (e) {
        console.error("Email Error:", e);
      }
    }

    // 2. Send WhatsApp via Meta Cloud API (Free Tier)
    if (WHATSAPP_API_TOKEN && WHATSAPP_PHONE_NUMBER_ID && lead.phone) {
      try {
        // Strip non-numeric chars from phone
        const cleanPhone = lead.phone.replace(/\D/g, ''); 
        
        const waResponse = await fetch(`https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: cleanPhone,
            type: "template",
            template: {
              name: "appointment_received", // Must match a pre-approved template name in Meta Business Manager
              language: {
                code: "en_US"
              }
            }
          })
        });
        results.whatsapp = await waResponse.json();
      } catch (e) {
        console.error("WhatsApp Error:", e);
      }
    }

    // 3. Sync Calendar via Cal.com (Free Tier)
    // Note: This requires setting up an Event Type ID in Cal.com beforehand.
    const CAL_EVENT_TYPE_ID = Deno.env.get('CAL_EVENT_TYPE_ID');
    if (CAL_API_KEY && CAL_EVENT_TYPE_ID) {
      try {
        // We simulate booking tomorrow at 10 AM for the demo
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0);

        const calResponse = await fetch('https://api.cal.com/v1/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-cal-api-key': CAL_API_KEY
          },
          body: JSON.stringify({
            eventTypeId: parseInt(CAL_EVENT_TYPE_ID),
            start: tomorrow.toISOString(),
            responses: {
              name: lead.name,
              email: lead.email || "no-email@example.com",
              notes: lead.ai_notes
            },
            timeZone: "Asia/Kolkata"
          })
        });
        results.calendar = await calResponse.json();
      } catch (e) {
        console.error("Calendar Error:", e);
      }
    }

    return new Response(
      JSON.stringify({
        message: "Automations executed",
        lead_id: lead.id,
        results
      }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (err: any) {
    console.error("Fatal function error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
