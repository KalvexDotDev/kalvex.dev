import { env } from '$env/dynamic/private';

export async function verifyToken(token: string): Promise<boolean> {
  const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `response=${token}&secret=${env.HCAPTCHA_SECRET_KEY}`
  });

  const data = await response.json();
  return data.success;
}