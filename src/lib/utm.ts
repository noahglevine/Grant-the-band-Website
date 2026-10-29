export const BIO_UTM = 'utm_source=instagram&utm_medium=bio';

// Tag outbound links only. Internal links keep their clean paths.
export function withUtm(url: string, params = BIO_UTM): string {
  if (!/^https?:\/\//.test(url)) return url;
  const [base, hash] = url.split('#');
  const tagged = `${base}${base.includes('?') ? '&' : '?'}${params}`;
  return hash ? `${tagged}#${hash}` : tagged;
}
