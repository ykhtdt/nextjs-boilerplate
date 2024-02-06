import ScrollContainer from "@/components/layout/scroll-container";

import IntroSection from "./_ui/sections/intro";
import FeatureSection from "./_ui/sections/feature";
import StartSection from "./_ui/sections/start";

export default function HomePage() {
  return (
    <ScrollContainer>
      <main id="content">
        <IntroSection />
        <FeatureSection />
        {/* <StartSection />  */}
      </main>
    </ScrollContainer>
  );
}
