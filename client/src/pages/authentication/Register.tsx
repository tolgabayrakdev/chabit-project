import { TextInput, PasswordInput, Button, Paper, Title, Text, Anchor, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';

export default function Register() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
      password: (value) => (value.length < 6 ? 'Şifre en az 6 karakter olmalıdır' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Şifreler eşleşmiyor' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await fetch('http://localhost:1234/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (res.status === 201) {
        notifications.show({
          title: 'Başarılı!',
          message: 'Hesabınız oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz.',
          color: 'green',
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const data = await res.json();
        notifications.show({
          title: 'Hata!',
          message: data.message || 'Kayıt işlemi sırasında bir hata oluştu.',
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
        Kayıt Ol
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Zaten hesabınız var mı?{' '}
        <Anchor component={Link} to="/login" size="sm">
          Giriş Yap
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
          <PasswordInput
            label="Şifre Tekrar"
            placeholder="Şifrenizi tekrar giriniz"
            required
            mt="md"
            {...form.getInputProps('confirmPassword')}
          />
          <Button fullWidth mt="xl" type="submit">
            Kayıt Ol
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
