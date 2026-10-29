import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Netlify sets CONTEXT: production, deploy-preview, branch-deploy. Local builds have none.
export const isProduction = process.env.CONTEXT === 'production';

// Labeled placeholders ([BRACKETS], .ph blocks) show on previews and local builds so
// what's owed stays visible. Production never renders them: null values are omitted.
export const showPlaceholders = !isProduction;

// True when a file is in public/, e.g. publicFileExists('/press/x.pdf').
export const publicFileExists = (p: string) => existsSync(join(process.cwd(), 'public', p));
