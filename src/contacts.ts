/**
 * Rugilė's contact details, shown on the contacts page.
 *
 * Alongside src/socials.ts rather than in the CMS: there are three of them, they change
 * rarely, and a typo in the email would be invisible until someone failed to reach her.
 */
export const contactDetails = {
  email: "rugile.kazlauskiene@gmail.com",
  phone: "+370 629 49815",
  address: "Maironio g. 11, Kaunas",

  /**
   * `src` for the map frame — an *embed* URL, not the URL of a normal map page. Set it to
   * `null` to drop back to the placeholder panel.
   *
   * Google geocodes the `q` address itself, so this is the one place the office address is
   * written for the map and it stays in step with `address` above. `output=embed` needs no
   * API key. Note that Google sets cookies for everyone who loads the page.
   */
  mapEmbedUrl:
    "https://www.google.com/maps?q=Maironio+g.+11,+Kaunas&output=embed" as string | null,

};

/**
 * A detail still waiting to be filled in, written in brackets the way the design mocks it
 * up. Those are rendered as plain text — a `mailto:[email@domain.com]` link would look
 * real and go nowhere. Replacing the value with the real one turns the link on by itself.
 */
export const isPlaceholder = (value: string) => value.startsWith("[");
