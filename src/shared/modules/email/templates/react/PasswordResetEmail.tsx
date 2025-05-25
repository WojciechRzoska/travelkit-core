import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import { button, container, footer, h1, main, text } from './styles'

interface PasswordResetEmailProps {
  name: string
  resetUrl: string
}

export const PasswordResetEmail = ({
  name,
  resetUrl,
}: PasswordResetEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset hasła - TravelKit</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset hasła</Heading>
          <Text style={text}>Cześć {name},</Text>
          <Text style={text}>
            Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta TravelKit.
            Aby zresetować hasło, kliknij przycisk poniżej:
          </Text>
          <Button style={button} href={resetUrl}>
            Zresetuj hasło
          </Button>
          <Text style={text}>
            Ten link jest ważny przez 24 godziny. Jeśli nie prosiłeś o reset
            hasła, możesz zignorować ten email.
          </Text>
          <Text style={text}>
            Pamiętaj, że reset hasła jest dostępny tylko w aplikacji mobilnej
            TravelKit.
          </Text>
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

export default PasswordResetEmail
