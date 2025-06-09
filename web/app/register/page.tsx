"use client";
import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'İsim en az 2 karakter olmalıdır' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçerli bir email adresi giriniz'),
      password: (value) => (value.length < 6 ? 'Şifre en az 6 karakter olmalıdır' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Şifreler eşleşmiyor' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    console.log(values);
    try {
      const response = await fetch('http://localhost:1234/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.status === 201) {
        setTimeout(() => {
          setLoading(false);
          router.push('/login');
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
        Hesap Oluştur
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Zaten hesabınız var mı?{' '}
        <Link className='text-blue-500 hover:underline' href="/login" passHref>
          Giriş Yap
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="İsim"
            placeholder="İsminizi giriniz"
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="ornek@email.com"
            required
            mt="md"
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
