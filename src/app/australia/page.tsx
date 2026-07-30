import type { Metadata } from "next";
import CountryJobLandingPage, {
  buildCountryLandingMetadata,
} from "@/components/CountryJobLandingPage";
import { countryJobMarketsBySlug } from "@/lib/country-job-markets";
const market = countryJobMarketsBySlug.australia;

export const metadata: Metadata = buildCountryLandingMetadata(market);

export default function AustraliaLandingPage() {
  return <CountryJobLandingPage market={market} />;
}
