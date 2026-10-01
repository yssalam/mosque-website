import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

/* Password */

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

/* JWT */

export interface TokenPayload extends JWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function createToken(payload: {
  id: string;
  email: string;
  name: string;
  role: string;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, secret);

  return {
    ...payload,
    id: payload.id as string,
    email: payload.email as string,
    name: payload.name as string,
    role: payload.role as string,
  };
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const payload = await verifyToken(token);
    return {
      id: payload.id as string,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}
