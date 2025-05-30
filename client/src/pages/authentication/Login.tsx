import { TextInput, PasswordInput, Button, Paper, Title, Text, Anchor, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-router';

export default function Login() {
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

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    // Burada login işlemlerinizi gerçekleştirebilirsiniz
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
