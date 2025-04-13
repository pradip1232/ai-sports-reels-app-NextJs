import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const metadataPath = path.join(process.cwd(), 'public', 'metadata.json');
  const data = JSON.parse(fs.readFileSync(metadataPath));
  res.status(200).json(data);
}
