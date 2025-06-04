import { TextInput, PasswordInput, Button, Paper, Title, Text, Anchor, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';

export default function Login() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
      password: (value) => (value.length < 6 ? 'Şifre en az 6 karakter olmalıdır' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await fetch('http://localhost:1234/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (res.status === 200) {
        notifications.show({
          title: 'Başarılı!',
          message: 'Giriş başarılı. Ana sayfaya yönlendiriliyorsunuz.',
          color: 'green',
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const data = await res.json();
        notifications.show({
          title: 'Hata!',
          message: data.message || 'Email veya şifre hatalı.',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Hata!',
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        color: 'red',
      });
      console.error(error);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2}>
        Hoş Geldiniz!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Hesabınız yok mu?{' '}
        <Anchor component={Link} to="/register" size="sm">
          Kayıt Ol
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="ornek@email.com"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Şifre"
            placeholder="Şifrenizi giriniz"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" type="submit">
            Giriş Yap
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
