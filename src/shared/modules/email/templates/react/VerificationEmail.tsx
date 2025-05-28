import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import {
  button,
  container,
  footer,
  h1,
  list,
  listItem,
  main,
  text,
} from './styles'

interface VerificationEmailProps {
  verificationUrl: string
}

export const VerificationEmail = ({
  verificationUrl,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Weryfikacja adresu email w TravelKit</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Weryfikacja adresu email</Heading>
          <Text style={text}>
            Cześć! Dziękujemy za rejestrację w TravelKit. Aby aktywować swoje
            konto, kliknij w poniższy link:
          </Text>
          <Link href={verificationUrl} style={button}>
            Weryfikuj adres email
          </Link>
          <Text style={text}>
            Link jest ważny przez 24 godziny. Jeśli nie utworzyłeś konta w
            TravelKit, możesz zignorować ten email.
          </Text>
          <Text style={text}>
            Po weryfikacji adresu email, będziesz mógł korzystać ze wszystkich
            funkcji TravelKit, w tym:
          </Text>
          <ul style={list}>
            <li style={listItem}>
              Tworzenie i zarządzanie listami rzeczy do spakowania
            </li>
            <li style={listItem}>Planowanie trasy podróży</li>
            <li style={listItem}>Śledzenie wydatków</li>
            <li style={listItem}>Udostępnianie planów podróży</li>
          </ul>
          <Text style={text}>Życzymy udanych podróży! 🌍✈️</Text>
          <Text style={text}>Zespół TravelKit</Text>
          <Text style={footer}>
            Ten email został wysłany automatycznie. Prosimy nie odpowiadać na
            ten adres.
            <br />© 2024 TravelKit. Wszelkie prawa zastrzeżone.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default VerificationEmail
