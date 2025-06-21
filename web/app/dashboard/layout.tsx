'use client';

import React, { useState, useEffect } from 'react';
import { AppShell, Burger, Group, NavLink, rem, Text, Button, Stack, Divider, Box, ThemeIcon, Paper, Avatar, Menu } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconLogout, IconSettings, IconLink } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthProvider from '@/providers/auth-provider';
import { useMediaQuery } from '@mantine/hooks';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [opened, setOpened] = useState(false);
    const [userEmail, setUserEmail] = useState<string>('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width: 48em)');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserEmail(data.user.email);
                }
            } catch (error) {
            }
        };

        fetchUserData();
    }, []);

    const navItems = [
        { icon: IconQrcode, label: 'QR Kodlarım', href: '/dashboard', color: '#228be6' },
        { icon: IconWifi, label: 'WiFi QR Kod', href: '/dashboard/wifi', color: '#40c057' },
        { icon: IconMail, label: 'E-posta QR Kod', href: '/dashboard/email', color: '#fd7e14' },
        { icon: IconMessage, label: 'SMS QR Kod', href: '/dashboard/sms', color: '#fa5252' },
        { icon: IconAddressBook, label: 'vCard QR Kod', href: '/dashboard/vcard', color: '#7950f2' },
        { icon: IconLink, label: 'URL QR Kod', href: '/dashboard/url', color: '#15aabf' },
    ];

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            const response = await fetch(`${apiUrl}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            if (response.status === 200) {
                router.push('/login');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <AuthProvider>
            <AppShell
                header={{ height: 70 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
                padding="md"
            >
                <AppShell.Header style={{ background: 'white', borderBottom: `1px solid #e9ecef` }}>
                    <Group h="100%" px="md" justify="space-between">
                        <Group>
                            <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" size="sm" />
                            <Group gap="xs" align="center">
                                <ThemeIcon size={40} radius="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                                    <IconQrcode size={24} />
                                </ThemeIcon>
                                <Text fw={800} size="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 45 }}>VunQR</Text>
                            </Group>
                        </Group>

                        <Menu shadow="md" width={240} position="bottom-end" withArrow>
                            <Menu.Target>
                                <Group gap="xs" style={{ cursor: 'pointer' }}>
                                    <Avatar color="blue" radius="xl">
                                        {userEmail ? userEmail.charAt(0).toUpperCase() : ''}
                                    </Avatar>
                                    <Box visibleFrom="sm">
                                        <Text size="sm" fw={600} truncate>
                                            {userEmail}
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            Kullanıcı
                                        </Text>
                                    </Box>
                                </Group>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Hesap</Menu.Label>
                                <Menu.Item
                                    component={Link}
                                    href="/dashboard/settings"
                                    leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}
                                >
                                    Ayarlar
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    color="red"
                                    leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} />}
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut ? 'Çıkış yapılıyor...' : 'Çıkış Yap'}
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </AppShell.Header>

                <AppShell.Navbar p="md" style={{ background: 'white' }}>
                    <Stack h="100%" justify="space-between">
                        <div>
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.href}
                                    component={Link}
                                    href={item.href}
                                    label={item.label}
                                    leftSection={
                                        <ThemeIcon size={34} radius="md" color={item.color}>
                                            <item.icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                                        </ThemeIcon>
                                    }
                                    active={pathname === item.href}
                                    style={{
                                        borderRadius: 'md',
                                        marginBottom: '0.5rem',
                                        transition: 'all 0.2s ease',
                                        backgroundColor: pathname === item.href ? `${item.color}15` : 'transparent',
                                        color: pathname === item.href ? item.color : 'inherit',
                                        '&:hover': {
                                            backgroundColor: `${item.color}15`,
                                            color: item.color,
                                        }
                                    }}
                                    onClick={() => { if (isMobile) setOpened(false); }}
                                />
                            ))}
                        </div>
                        <div>
                        </div>
                    </Stack>
                </AppShell.Navbar>

                <AppShell.Main style={{ background: '#f8f9fa' }}>
                    <Box p="md">
                        {children}
                    </Box>
                </AppShell.Main>
            </AppShell>
        </AuthProvider>
    );
}