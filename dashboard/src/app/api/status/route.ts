import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Bridge to the Aegis Engine mission telemetry
const STATUS_FILE = path.join(process.cwd(), '..', 'aegis', 'state', 'mission_status.json');

export async function GET() {
  try {
    if (!fs.existsSync(STATUS_FILE)) {
      return NextResponse.json({ 
        status: 'OFFLINE', 
        current_phase: 'DISCONNECTED', 
        findings: [],
        mission_id: 'N/A'
      });
    }
    const data = fs.readFileSync(STATUS_FILE, 'utf-8');
    const status = JSON.parse(data);
    return NextResponse.json(status);
  } catch (error) {
    console.error('Status API Error:', error);
    return NextResponse.json({ error: 'Failed to read mission status' }, { status: 500 });
  }
}
