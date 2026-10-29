import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface AttachmentPayload {
  filename: string;
  content: string; // base64 string
  contentType?: string;
}

interface RecruitRequestBody {
  companyName: string;
  contactRep: string;
  corporateEmail: string;
  phone?: string;
  engagementType: string;
  preferredDate?: string;
  additionalReqs?: string;
  attachedFiles?: string[];
  attachments?: AttachmentPayload[];
}

// Target recipients specified by the user
const TARGET_RECIPIENTS = ["jeffreyjat@gmail.com", "mukidvm@gmail.com"];

export async function POST(request: Request) {
  try {
    const body: RecruitRequestBody = await request.json();

    const {
      companyName,
      contactRep,
      corporateEmail,
      phone,
      engagementType,
      preferredDate,
      additionalReqs,
      attachedFiles = [],
      attachments = [],
    } = body;

    // Validate required fields
    if (!companyName?.trim() || !contactRep?.trim() || !corporateEmail?.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide Company Name, Contact Representative, and Corporate Email." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(corporateEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid corporate email address format." },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpSecure = process.env.SMTP_SECURE === "false" ? false : smtpPort === 465;

    const formattedDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const fileListDisplay = attachedFiles.length > 0 
      ? attachedFiles.join(", ") 
      : (attachments.length > 0 ? attachments.map(a => a.filename).join(", ") : "None");

    // Formatted Plain Text
    const plainText = `
============================================================
NEW CAMPUS RECRUITMENT INQUIRY
Government College of Engineering, Srirangam (GCES)
Department of Computer Science & Engineering - Placement Cell
============================================================

Submission Time (IST): ${formattedDate}

COMPANY & REPRESENTATIVE DETAILS:
------------------------------------------------------------
Company / Organization  : ${companyName}
Contact Representative  : ${contactRep}
Corporate Email         : ${corporateEmail}
Phone Number            : ${phone || "Not provided"}

RECRUITMENT ENGAGEMENT DETAILS:
------------------------------------------------------------
Engagement Type         : ${engagementType || "Full-Time Recruitment Drive"}
Preferred Drive Date    : ${preferredDate || "Flexible / To be confirmed"}

ADDITIONAL REQUIREMENTS & ROLES OFFERED:
------------------------------------------------------------
${additionalReqs || "None specified"}

ATTACHED DOCUMENTS:
------------------------------------------------------------
${fileListDisplay}

============================================================
Recipients: ${TARGET_RECIPIENTS.join(", ")}
Reply directly to this email to contact ${contactRep} (${corporateEmail}).
============================================================
`.trim();

    // Formatted High-Tech HTML Template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Placement Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #05060a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #05060a; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #0c0f1d; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #f59e0b, #ec4899, #38bdf8);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #1e293b;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <div style="font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; font-size: 11px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                      ✦ GCES CSE PLACEMENT DESK INQUIRY
                    </div>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Campus Recruitment Inquiry
                    </h1>
                    <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">
                      Received on ${formattedDate} (IST)
                    </p>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; padding: 6px 12px; background-color: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 100px; font-family: ui-monospace, monospace; font-size: 10px; font-weight: 700; color: #fbbf24; text-transform: uppercase;">
                      NEW LEAD
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Key Summary Cards -->
          <tr>
            <td style="padding: 24px 32px 12px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 16px; background-color: #13182b; border: 1px solid #1e293b; border-radius: 12px; margin-bottom: 12px;">
                    <div style="font-family: ui-monospace, monospace; font-size: 10px; text-transform: uppercase; color: #64748b; letter-spacing: 1px;">Company / Organization</div>
                    <div style="font-size: 18px; font-weight: 800; color: #f8fafc; margin-top: 4px;">${companyName}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Detailed Information Grid -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f1324; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden;">
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #94a3b8; width: 38%; font-weight: 600;">
                    Contact Representative
                  </td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #f1f5f9; font-weight: 600;">
                    ${contactRep}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #94a3b8; font-weight: 600;">
                    Corporate Email
                  </td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px;">
                    <a href="mailto:${corporateEmail}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${corporateEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #94a3b8; font-weight: 600;">
                    Phone Number
                  </td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #f1f5f9;">
                    ${phone ? `<a href="tel:${phone}" style="color: #34d399; text-decoration: none;">${phone}</a>` : '<span style="color: #64748b;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #94a3b8; font-weight: 600;">
                    Engagement Type
                  </td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #fbbf24; font-weight: 700;">
                    ${engagementType || "Full-Time Recruitment Drive"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #94a3b8; font-weight: 600;">
                    Preferred Drive Date
                  </td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #f1f5f9;">
                    ${preferredDate || '<span style="color: #64748b;">Flexible / To be confirmed</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; font-size: 13px; color: #94a3b8; font-weight: 600;" valign="top">
                    Attached Files
                  </td>
                  <td style="padding: 14px 20px; font-size: 13px; color: #e2e8f0;">
                    ${
                      attachedFiles.length > 0 || attachments.length > 0
                        ? `<div style="font-family: ui-monospace, monospace; font-size: 12px; color: #fbbf24;">📎 ${fileListDisplay}</div>`
                        : '<span style="color: #64748b;">No files attached</span>'
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Additional Requirements Block -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <div style="font-family: ui-monospace, monospace; font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px; margin-bottom: 8px;">
                Additional Requirements / Roles Offered
              </div>
              <div style="background-color: #0f1324; border: 1px solid #1e293b; border-radius: 12px; padding: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.6; white-space: pre-wrap;">${
                additionalReqs ? additionalReqs.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '<span style="color: #64748b; font-style: italic;">No additional requirements provided.</span>'
              }</div>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 0 32px 32px 32px;" align="center">
              <a href="mailto:${corporateEmail}?subject=Re:%20Campus%20Recruitment%20Drive%20-%20GCES%20CSE" style="display: inline-block; background-color: #f59e0b; color: #000000; font-weight: 800; font-size: 13px; text-decoration: none; padding: 12px 28px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);">
                Reply Directly to Recruiter &rarr;
              </a>
            </td>
          </tr>

          <!-- Email Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #070913; border-top: 1px solid #1e293b; text-align: center;">
              <div style="font-size: 11px; color: #64748b; line-height: 1.5;">
                Sent to <strong style="color: #cbd5e1;">jeffreyjat@gmail.com</strong> &amp; <strong style="color: #cbd5e1;">mukidvm@gmail.com</strong><br />
                Department of Computer Science &amp; Engineering &bull; Government College of Engineering, Srirangam (GCES)
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

    // Prepare nodemailer attachments if any were passed
    const mailAttachments = attachments.map((att) => ({
      filename: att.filename,
      content: Buffer.from(att.content, "base64"),
      contentType: att.contentType,
    }));

    // If SMTP credentials are configured, send the live email
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        service: smtpHost.includes("gmail") ? "gmail" : undefined,
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${contactRep} (via GCES Placement)" <${smtpUser}>`,
        to: TARGET_RECIPIENTS,
        replyTo: corporateEmail,
        subject: `[Placement Inquiry] Campus Recruitment Drive — ${companyName}`,
        text: plainText,
        html: htmlContent,
        attachments: mailAttachments,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Recruit API] Successfully dispatched email to ${TARGET_RECIPIENTS.join(", ")}`);

      return NextResponse.json({
        success: true,
        delivered: true,
        message: "Inquiry successfully sent to placement officers.",
      });
    } else {
      // SMTP credentials not yet provided in .env.local: Log to console cleanly
      console.log("============================================================");
      console.log("[RECRUIT API] EMAIL NOT SENT: SMTP credentials not set in .env.local");
      console.log("Target Recipients:", TARGET_RECIPIENTS.join(", "));
      console.log("Inquiry Payload:\n", plainText);
      console.log("------------------------------------------------------------");
      console.log("To enable live email dispatch, add your Gmail App Password to .env.local:");
      console.log("SMTP_USER=your_email@gmail.com");
      console.log("SMTP_PASS=your_16_char_app_password");
      console.log("============================================================");

      return NextResponse.json({
        success: true,
        delivered: false,
        warning: "SMTP credentials not configured in environment. Details logged to server console.",
        message: "Inquiry received and logged successfully.",
      });
    }
  } catch (error: any) {
    console.error("[Recruit API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process recruiter inquiry. Please try again later.",
      },
      { status: 500 }
    );
  }
}

