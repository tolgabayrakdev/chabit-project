import { Container, Title, Text, Button, Group, Stack, rem, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router';
import { useMediaQuery } from '@mantine/hooks';

export default function Home() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container size="lg" py={isMobile ? 40 : 80}>
       

        <Stack gap="xl" align="center" mt={isMobile ? 30 : 50}>
          <Title order={1} size={isMobile ? rem(36) : rem(48)} style={{ lineHeight: 1.2, textAlign: 'center' }}>
            Alışkanlıklarınızı<br />
            <Text component="span" c="blue" inherit>Takip Edin</Text>
          </Title>
          <Text size={isMobile ? 'lg' : 'xl'} c="dimmed" maw={600} ta="center">
            Günlük rutinlerinizi, hedeflerinizi ve alışkanlıklarınızı kolayca takip edin. 
            Daha üretken ve sağlıklı bir yaşam için ilk adımı atın.
          </Text>
          <Group mt={30} wrap="wrap" gap="md" justify="center">
            <Button 
              size={isMobile ? 'md' : 'lg'} 
              component={Link} 
              to="/register"
              fullWidth={isMobile}
            >
              Hemen Başla
            </Button>
            <Button 
              size={isMobile ? 'md' : 'lg'} 
              variant="outline"
              fullWidth={isMobile}
            >
              Daha Fazla Bilgi
            </Button>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}
