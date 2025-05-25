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
  container,
  footer,
  h1,
  link,
  list,
  listItem,
  main,
  text,
} from './styles'

interface WelcomeEmailProps {
  name: string
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Witaj w TravelKit! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Witaj w TravelKit! 🎉</Heading>
          <Text style={text}>Cześć {name},</Text>
          <Text style={text}>
            Dziękujemy za dołączenie do TravelKit! Jesteśmy podekscytowani, że
            będziesz z nami planować swoje podróże.
          </Text>
          <Text style={text}>
            Aby rozpocząć korzystanie z TravelKit, pobierz naszą aplikację
            mobilną:
          </Text>
          <Text style={text}>
            <Link href="https://apps.apple.com/app/travelkit" style={link}>
              Pobierz z App Store
            </Link>
          </Text>
          <Text style={text}>
            <Link
              href="https://play.google.com/store/apps/details?id=com.travelkit.app"
              style={link}
            >
              Pobierz z Google Play
            </Link>
          </Text>
          <Text style={text}>
            W aplikacji mobilnej znajdziesz wszystkie funkcje potrzebne do
            planowania podróży:
          </Text>
          <ul style={list}>
            <li style={listItem}>
              Tworzenie i zarządzanie listami rzeczy do spakowania
            </li>
            <li style={listItem}>Planowanie trasy podróży</li>
            <li style={listItem}>Śledzenie wydatków</li>
            <li style={listItem}>Udostępnianie planów podróży</li>
          </ul>
          <Text style={text}>
            Jeśli masz jakieś pytania lub potrzebujesz pomocy, nie wahaj się
            skontaktować z naszym zespołem wsparcia.
          </Text>
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

export default WelcomeEmail
