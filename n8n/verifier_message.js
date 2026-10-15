// Vérifie le message du formulaire de contact et prépare l'email (API transactionnelle Brevo).
// Sortie : { ok, erreur?, email? }. Un message invalide ou un robot ne déclenche aucun envoi.
const f = $json.body || {};
const texte = (v, max) => String(v ?? '').trim().slice(0, max);
const e = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

if (texte(f.site_web, 200)) return { ok: false, erreur: 'Demande refusée.' }; // champ piège rempli
const nom = texte(f.nom, 100).replace(/[<>]/g, '');
const email = texte(f.email, 200).toLowerCase();
const message = texte(f.message, 3000);
if (!nom) return { ok: false, erreur: 'Indiquez votre nom.' };
if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return { ok: false, erreur: 'Adresse email invalide.' };
if (message.length < 5) return { ok: false, erreur: 'Votre message est trop court.' };

const DESTINATAIRE = 'sdelruepro@gmail.com';
const corps = e(message).replace(/\n/g, '<br>');
return {
  ok: true,
  email: {
    sender: { email: 'audit@simondelrue.fr', name: 'Portfolio simondelrue.fr' },
    to: [{ email: DESTINATAIRE }],
    replyTo: { email, name: nom },
    subject: `Message de ${nom} via le portfolio`,
    htmlContent: `<!doctype html><html lang="fr"><body style="margin:0;padding:24px;background:#f2f1ee;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#111214">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden">
<tr><td style="background:#4d7cff;padding:16px 24px;color:#0a0f24;font-weight:700">Nouveau message depuis simondelrue.fr</td></tr>
<tr><td style="padding:24px">
<p style="margin:0 0 4px;font-size:13px;color:#6b6e75">De</p>
<p style="margin:0 0 18px;font-size:16px"><strong>${e(nom)}</strong>, <a href="mailto:${e(email)}" style="color:#2f5ee8">${e(email)}</a></p>
<p style="margin:0 0 4px;font-size:13px;color:#6b6e75">Message</p>
<p style="margin:0;font-size:16px;line-height:1.55">${corps}</p>
</td></tr>
<tr><td style="padding:14px 24px;background:#f6f6f4;font-size:12px;color:#6b6e75">Répondre à cet email écrit directement à ${e(nom)}.</td></tr>
</table></td></tr></table></body></html>`,
    textContent: `Nouveau message depuis simondelrue.fr\n\nDe : ${nom} <${email}>\n\n${message}\n\nRépondre à cet email écrit directement à ${nom}.`,
    tags: ['portfolio-contact'],
  },
};
