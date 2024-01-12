import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface AuthenticationMagicLinkTemplateProps {
  userEmail: string;
  authLink: string;
}

export function AuthenticationMagicLinkTemplate({
  userEmail,
  authLink,
}: AuthenticationMagicLinkTemplateProps) {
  
	const previewText = "Do Login on Sushi Express";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px] text-center">
              <span className="text-2xl">🍣</span>
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Do login on Sushi Express
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              You requested a link to login at Sushi Express by email {userEmail}.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-sky-500 rounded text-white px-5 py-3 text-[12px] font-semibold no-underline text-center"
                href={authLink}
              >
                Login now
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy the URL below and paste in your browser: 
              <Link href={authLink} className="text-sky-500 no-underline">
                {authLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you no requested this link of authentication, just discard this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
