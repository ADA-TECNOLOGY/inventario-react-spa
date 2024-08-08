export function formatEmailSecurity (email: any)  {
    const [localPart, domain] = email.split("@");
    const localPartMasked = localPart[0] + "*".repeat(localPart.length - 1);
    const domainMasked = domain[0] + "*".repeat(domain.length - 3) + domain.slice(-2);
    return `${localPartMasked}@${domainMasked}`;
  }