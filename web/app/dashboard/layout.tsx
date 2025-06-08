'use client';

import React, { useState } from 'react';
import { AppShell, Burger, Group, NavLink, rem, Text, Button, Stack, Divider } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconLogout } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [opened, setOpened] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Bu kısmı daha sonra gerçek kullanıcı bilgisiyle değiştireceğiz
    const userEmail = "kullanici@email.com";

    const navItems = [
        { icon: IconQrcode, label: 'QR Kodlarım', href: '/dashboard' },
        { icon: IconWifi, label: 'WiFi QR Kod', href: '/dashboard/wifi' },
        { icon: IconMail, label: 'E-posta QR Kod', href: '/dashboard/email' },
        { icon: IconMessage, label: 'SMS QR Kod', href: '/dashboard/sms' },
        { icon: IconAddressBook, label: 'vCard QR Kod', href: '/dashboard/vcard' },
    ];

    const handleLogout = () => {
        // Burada çıkış işlemlerini gerçekleştireceğiz
        console.log('Çıkış yapılıyor...');
        router.push('/login');
    };

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    logo
                    <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" size="sm" />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Stack h="100%" justify="space-between">
                    <div>
                        <Text size="sm" c="dimmed" mb="md">
                            Hoş Geldiniz
                        </Text>
                        <Text fw={500} mb="xl">
                            {userEmail}
                        </Text>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.href}
                                component={Link}
                                href={item.href}
                                label={item.label}
                                leftSection={<item.icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
                                active={pathname === item.href}
                            />
                        ))}
                    </div>
                    <div>
                        <Divider my="md" />
                        <Button
                            variant="subtle"
                            color="red"
                            leftSection={<IconLogout style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
                            onClick={handleLogout}
                            fullWidth
                        >
                            Çıkış Yap
                        </Button>
                    </div>
                </Stack>
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}