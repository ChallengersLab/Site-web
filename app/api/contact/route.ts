import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENTS = [
  "a.brakha@challengerslab.com",
  "a.bekkali@challengerslab.com",
  "b.krafat@challengerslab.com",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const companyLabel = company || "Non renseigné";

    const { error } = await resend.emails.send({
      from: "ChallengersLab <contact@challengerslab.com>",
      to: RECIPIENTS,
      replyTo: email,
      subject: `Nouveau lead : ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #0a0a0a; color: #e8e8e8;">
          <div style="border-bottom: 2px solid #7B5EFF; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 22px; color: #ffffff;">Nouveau contact depuis le site</h1>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 12px; color: #888; font-size: 13px; width: 120px; vertical-align: top;">Nom</td>
              <td style="padding: 10px 12px; color: #fff; font-size: 15px; font-weight: 600;">${name}</td>
            </tr>
            <tr style="background: #111;">
              <td style="padding: 10px 12px; color: #888; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 10px 12px;"><a href="mailto:${email}" style="color: #7B5EFF; text-decoration: none; font-size: 15px;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; color: #888; font-size: 13px; vertical-align: top;">Entreprise</td>
              <td style="padding: 10px 12px; color: #fff; font-size: 15px;">${companyLabel}</td>
            </tr>
          </table>

          <div style="background: #111; border-left: 3px solid #7B5EFF; padding: 16px 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px; color: #888; font-size: 13px;">Message</p>
            <p style="margin: 0; color: #fff; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center; padding-top: 16px; border-top: 1px solid #222;">
            <a href="mailto:${email}" style="display: inline-block; padding: 12px 28px; background: #7B5EFF; color: #fff; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 6px;">Repondre a ${name}</a>
          </div>

          <p style="text-align: center; color: #555; font-size: 12px; margin-top: 24px;">
            Envoi automatique depuis challengerslab.com
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          error:
            "Erreur lors de l\u2019envoi. Réessayez ou contactez-nous directement.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error:
          "Erreur lors de l\u2019envoi. Réessayez ou contactez-nous directement.",
      },
      { status: 500 }
    );
  }
}
