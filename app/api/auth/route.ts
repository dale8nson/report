import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const bcrypt =  require('bcrypt');

export const GET = async (req: Request) => {
  const code = req.headers.get('code');
  const client = await clientPromise;
  const admin = client.db().admin();
  const db = client.db('report');
  const password = db.collection('password');
  const document = await password.findOne({user:'barbur'});
  const hash = document?.hash;
  const valid = await bcrypt.compare(code, hash);
  const json = {valid:false};
  const sessions = db.collection('sessions');
  sessions.updateOne({user: 'barbur'}, {$set: { passwordValidated: "false"}});
  if(valid) { 
    json.valid = true;
    sessions.updateOne({user: 'barbur'}, {$set:{ passwordValidated: "true"}});
  }
  
  return NextResponse.json(json, {status:200});
}

export const POST = (request: NextRequest) =>{
  return fetch(request.nextUrl);
}