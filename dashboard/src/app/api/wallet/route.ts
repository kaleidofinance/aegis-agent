import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import path from 'path';

/**
 * Sovereign Wallet Explorer API Bridge
 * Connects the Dashboard to the Python AegisWallet logic.
 */
export async function GET() {
  try {
    const pythonPath = path.join(process.cwd(), '..', 'aegis', 'main.py');
    const aegisDir = path.join(process.cwd(), '..');
    
    // Execute CLI to list wallets
    const output = execSync(`python3 -m aegis.main wallet list`, {
      cwd: aegisDir,
      env: { ...process.env, PYTHONPATH: aegisDir, AEGIS_VAULT_KEY: process.env.AEGIS_VAULT_KEY }
    }).toString();

    // Parse the table-like output or refactor wallet list to return JSON
    // For now, we'll refactor the wallet list to support a --json flag in Python
    // but in this bridge, let's assume we convert it
    return NextResponse.json({ status: 'success', raw: output });
  } catch (error) {
    console.error('Wallet API Error:', error);
    return NextResponse.json({ error: 'Failed to retrieve wallets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { action, mode, count, prefix } = await request.json();
    const aegisDir = path.join(process.cwd(), '..');
    
    let cmd = '';
    if (action === 'INIT') {
      cmd = `python3 -m aegis.main wallet init ${mode === 'hd' ? '--hd' : ''}`;
    } else if (action === 'GENERATE') {
      cmd = `python3 -m aegis.main wallet generate --count ${count || 1} --prefix ${prefix || 'audit'}`;
    }

    const output = execSync(cmd, {
      cwd: aegisDir,
      env: { ...process.env, PYTHONPATH: aegisDir, AEGIS_VAULT_KEY: process.env.AEGIS_VAULT_KEY }
    }).toString();

    return NextResponse.json({ status: 'success', output });
  } catch (error) {
    console.error('Wallet Action Error:', error);
    return NextResponse.json({ error: 'Action failed: ' + (error as any).message }, { status: 500 });
  }
}
