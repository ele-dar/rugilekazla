/**
 * The one place the practice's contact details are written. Every page reads them from here
 * — including the link forms below — so a changed number or address is a single edit.
 */
const email = "rugile.kazlauskiene@gmail.com";
/** Written with spaces, for reading. */
const phone = "+370 629 49815";
const address = "Maironio g. 11, Kaunas";

export const contactDetails = {
  email,
  phone,
  address,
  emailHref: `mailto:${email}`,
  /** `tel:` takes no spaces. */
  phoneHref: `tel:${phone.replace(/\s+/g, "")}`,
  /**
   * Where the map image on the contacts page links to. A plain Google Maps search link
   * (opens the Maps app on phones), not an embed: an embedded map would set Google's
   * cookies for every visitor, which needs consent in the EU.
   */
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
};
