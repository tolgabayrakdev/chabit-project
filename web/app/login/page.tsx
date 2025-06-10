'use client';
import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
    setLoading(true);
    console.log(values);
    try {
      const response = await fetch('http://localhost:1234/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        setTimeout(() => {
          setLoading(false);
          router.push('/dashboard');
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2}>
        Hoş Geldiniz!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Hesabınız yok mu?{' '}
        <Link className='text-blue-500 hover:underline' href="/register" passHref>
          Kayıt Ol
        </Link>
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
          <Button loading={loading} fullWidth mt="xl" type="submit">
            Giriş Yap
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
