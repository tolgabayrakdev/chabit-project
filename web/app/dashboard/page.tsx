'use client';

import React from 'react';
import { Container, Title, SimpleGrid, Card, Text, rem } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook } from '@tabler/icons-react';
import Link from 'next/link';

export default function DashboardPage() {
    const features = [
        {
            icon: IconWifi,
            title: 'WiFi QR Kod',
            description: 'WiFi ağınız için QR kod oluşturun',
            href: '/dashboard/wifi',
        },
        {
            icon: IconMail,
            title: 'E-posta QR Kod',
            description: 'E-posta adresiniz için QR kod oluşturun',
            href: '/dashboard/email',
        },
        {
            icon: IconMessage,
            title: 'SMS QR Kod',
            description: 'SMS mesajı için QR kod oluşturun',
            href: '/dashboard/sms',
        },
        {
            icon: IconAddressBook,
            title: 'vCard QR Kod',
            description: 'Dijital kartvizitiniz için QR kod oluşturun',
            href: '/dashboard/vcard',
        },
    ];

    return (
        <Container size="lg">
            <Title order={2} mb="xl">QR Kod Oluşturucu</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="xl">
                {features.map((feature) => (
                    <Card
                        key={feature.title}
                        component={Link}
                        href={feature.href}
                        padding="xl"
                        radius="md"
                        withBorder
                        style={{ textDecoration: 'none' }}
                    >
                        <feature.icon style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                        <Text size="lg" fw={500} mt="md">
                            {feature.title}
                        </Text>
                        <Text size="sm" c="dimmed" mt="sm">
                            {feature.description}
                        </Text>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
}
