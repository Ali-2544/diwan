import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/config/site";

export default function NotFound() {
  return (
    <Section surface="darkest" padding="loose" className="pt-34">
      <div className="flex min-h-[40vh] flex-col justify-center gap-6">
        <Eyebrow>404</Eyebrow>
        <h1 className="max-w-2xl text-balance font-display text-display-lg font-medium">
          That page isn&rsquo;t here.
        </h1>
        <p className="max-w-md text-body-lg text-text-on-dark-muted">
          The link may be out of date. Head back to the homepage, or book a demo
          and we&rsquo;ll walk you through the product directly.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/">Back to home</Button>
          <Button href={CTA.primary.href} variant="ghost" withArrow>
            {CTA.primary.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
