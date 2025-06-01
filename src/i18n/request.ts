import { getRequestConfig } from "next-intl/server";

const locales = ["en", "es"];
const defaultLocale = "en";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter exists and is valid
  const validLocale =
    locale && locales.includes(locale) ? locale : defaultLocale;

  return {
    locale: validLocale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
