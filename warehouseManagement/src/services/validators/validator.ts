import { SafeParseReturnType, z } from 'zod';
// import { sanitize } from 'dompurify';
import DOMPurify from 'dompurify';
import { LoginData } from '../../models/Auth.model.ts';

const isLettersOnly = (val: string): boolean => /^[a-zA-Z]+$/.test(val);
const isDigitsOnly = (val: string): boolean => /^[0-9]+$/.test(val);
const isLettersOrDigitsOnly = (val: string): boolean => /^[a-zA-Z0-9]+$/.test(val);

const LoginSchema = z.object({
  nick: z.string().min(5).max(30).refine(isLettersOrDigitsOnly),
  password: z.string().min(5).max(20).refine(isLettersOrDigitsOnly),
  code: z.string(),
});

export const validateLogin = (loginValues: LoginData): SafeParseReturnType<LoginData, any> => LoginSchema.safeParse(loginValues);

export const sanitizeData = (value: string): string => DOMPurify.sanitize(value, { USE_PROFILES: { html: false } });

export const validateSingleString = (value: string): boolean => value.length <= 0 || value.includes('&lt') || value.includes('&gt');
