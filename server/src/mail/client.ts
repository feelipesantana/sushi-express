import { Resend } from "resend";
import { env } from "../env";

export const resent = new Resend(env.RESEND_API_KEY);
