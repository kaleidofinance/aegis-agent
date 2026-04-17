import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Bridge to the Aegis Engine state
const DIRECTIVE_FILE = path.join(process.cwd(), '..', 'aegis', 'state', 'directives.json');

export async function GET() {
  try {
    if (!fs.existsSync(DIRECTIVE_FILE)) {
      return NextResponse.json({});
    }
    const data = fs.readFileSync(DIRECTIVE_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read directives' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { mission_id, phase_id, action } = await request.json();
    
    let directives: Record<string, string> = {};
    if (fs.existsSync(DIRECTIVE_FILE)) {
      directives = JSON.parse(fs.readFileSync(DIRECTIVE_FILE, 'utf-8'));
    } else {
      const dir = path.dirname(DIRECTIVE_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    }

    const key = `${mission_id}_${phase_id}`;
    if (action === 'GRANT') {
      directives[key] = 'GRANTED';
    } else {
      directives[key] = 'DENIED';
    }

    fs.writeFileSync(DIRECTIVE_FILE, JSON.stringify(directives, null, 2));
    return NextResponse.json({ status: 'success', key, directive: directives[key] });
  } catch (error) {
    console.error('Directive API Error:', error);
    return NextResponse.json({ error: 'Failed to update directive' }, { status: 500 });
  }
}
