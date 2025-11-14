import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongoose.js';
import Contact from '../../../models/Contact.js';

export async function POST(req) {
  await connectDB();
  const { name, email, message } = await req.json();

  try {
    await Contact.create({ name, email, message });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}