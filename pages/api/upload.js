import { uploadToS3 } from '../../lib/s3';
import { generateScript, generateSpeech } from '../../lib/aiGenerator';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { athlete } = req.body;
  const script = await generateScript(athlete);
  const audio = await generateSpeech(script);

  const fileName = `${athlete.replace(/ /g, '_')}_${Date.now()}.mp3`;
  const url = await uploadToS3(audio, fileName, 'audio/mpeg');

  // Mock metadata save (in production, store in DB)
  const metadataPath = path.join(process.cwd(), 'public', 'metadata.json');
  const existing = JSON.parse(fs.readFileSync(metadataPath));
  existing.push({ athlete, script, url, date: new Date().toISOString() });
  fs.writeFileSync(metadataPath, JSON.stringify(existing));

  res.status(200).json({ success: true, url });
}
