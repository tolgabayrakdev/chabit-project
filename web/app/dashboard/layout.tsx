'use client';

import React, { useState, useEffect } from 'react';
import { AppShell, Burger, Group, NavLink, rem, Text, Button, Stack, Divider, Box, ThemeIcon, Paper, Avatar, Menu } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconLogout, IconSettings, IconLink, IconList, IconHome, IconStar, IconGift } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthProvider from '@/providers/auth-provider';
import { useMediaQuery } from '@mantine/hooks';

// Nav item tipi tanımı
interface NavChild {
    icon: any;
    label: string;
    href: string;
    color: string;
    disabled?: boolean;
}
interface NavItem extends NavChild {
    children?: NavChild[];
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [opened, setOpened] = useState(false);
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPlan, setUserPlan] = useState<string>('free');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width: 48em)');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserEmail(data.user.email);
                    setUserPlan(data.user.plan || 'free');
                }
            } catch (error) {
            }
        };

        fetchUserData();
    }, []);

    const navGroups: { label: string; items: NavItem[] }[] = [
        {
            label: '',
            items: [
                { icon: IconHome, label: 'Anasayfa', href: '/dashboard', color: '#228be6' },
            ],
        },
        {
            label: 'QR Kodlarım',
            items: [
                {
                    icon: IconQrcode,
                    label: 'QR Kodlarım',
                    href: '/dashboard',
                    color: '#228be6',
                    children: [
                        { icon: IconList, label: 'Tüm QR Kodlar', href: '/dashboard/qr-codes', color: '#228be6' },
                        { icon: IconWifi, label: 'WiFi QR Kod', href: '/dashboard/wifi', color: '#40c057' },
                        { icon: IconMail, label: 'E-posta QR Kod', href: '/dashboard/email', color: '#fd7e14' },
                        { icon: IconMessage, label: 'SMS QR Kod', href: '/dashboard/sms', color: '#fa5252' },
                        { icon: IconAddressBook, label: 'vCard QR Kod', href: '/dashboard/vcard', color: '#7950f2' },
                        { icon: IconLink, label: 'URL QR Kod', href: '/dashboard/url', color: '#15aabf' },
                        { icon: IconStar, label: 'Google Yorum QR Kod', href: '/dashboard/google-review', color: '#fab005' },
                    ]
                },
            ],
        },
        {
            label: 'Link in Bio',
            items: [
                { icon: IconLink, label: 'Link in Bio', href: '/dashboard/link-in-bio', color: '#e64980' },
            ],
        },
        {
            label: 'Menü Oluşturma',
            items: [
                { icon: IconSettings, label: 'Menü Oluştur', href: '/dashboard/menu', color: '#fab005' },
            ],
        },
        {
            label: 'Kampanyalar',
            items: [
                { 
                    icon: IconGift, 
                    label: userPlan === 'free' ? 'Kampanya Yönetimi (PRO)' : 'Kampanya Yönetimi', 
                    href: '/dashboard/campaigns', 
                    color: '#e64980',
                    disabled: false
                },
            ],
        },
    ];

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            const response = await fetch(`/api/auth/logout`, {
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
                            {navGroups.map((group, idx) => (
                                <Box key={group.label} mb="sm">
                                    <Text size="xs" fw={700} c="dimmed" mb={4} pl={4}>{group.label}</Text>
                                    {group.items.map((item) => {
                                        if (item.children) {
                                            return (
                                                <React.Fragment key={item.href}>
                                                    <NavLink
                                                        label={item.label}
                                                        leftSection={
                                                            <ThemeIcon size={34} radius="md" color={item.color}>
                                                                <item.icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                                                            </ThemeIcon>
                                                        }
                                                        active={pathname !== '/dashboard' && (pathname === item.href || item.children.some((child: { href: string }) => pathname === child.href))}
                                                        style={{
                                                            borderRadius: 'md',
                                                            marginBottom: '0.5rem',
                                                            transition: 'all 0.2s ease',
                                                            backgroundColor: pathname !== '/dashboard' && (pathname === item.href || item.children.some((child: { href: string }) => pathname === child.href)) ? `${item.color}15` : 'transparent',
                                                            color: pathname !== '/dashboard' && (pathname === item.href || item.children.some((child: { href: string }) => pathname === child.href)) ? item.color : 'inherit',
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '100%',
                                                            '&:hover': {
                                                                backgroundColor: `${item.color}15`,
                                                                color: item.color,
                                                            }
                                                        }}
                                                        defaultOpened={item.children.some((child: { href: string }) => pathname === child.href)}
                                                    >
                                                        {item.children.map((child: { icon: any; label: string; href: string; color: string }) => (
                                                            <NavLink
                                                                key={child.href}
                                                                component={Link}
                                                                href={child.href}
                                                                label={child.label}
                                                                leftSection={
                                                                    <ThemeIcon size={28} radius="md" color={child.color}>
                                                                        <child.icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                                                    </ThemeIcon>
                                                                }
                                                                active={pathname === child.href}
                                                                style={{
                                                                    borderRadius: 'md',
                                                                    marginBottom: '0.3rem',
                                                                    marginLeft: '1.5rem',
                                                                    backgroundColor: pathname === child.href ? `${child.color}15` : 'transparent',
                                                                    color: pathname === child.href ? child.color : 'inherit',
                                                                    overflow: 'hidden',
                                                                    whiteSpace: 'nowrap',
                                                                    textOverflow: 'ellipsis',
                                                                    maxWidth: '90%',
                                                                    '&:hover': {
                                                                        backgroundColor: `${child.color}15`,
                                                                        color: child.color,
                                                                    }
                                                                }}
                                                                onClick={() => { if (isMobile) setOpened(false); }}
                                                            />
                                                        ))}
                                                    </NavLink>
                                                </React.Fragment>
                                            );
                                        } else {
                                            return (
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
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '100%',
                                                        opacity: userPlan === 'free' && item.label.includes('(PRO)') ? 0.6 : 1,
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: `${item.color}15`,
                                                            color: item.color,
                                                        }
                                                    }}
                                                    onClick={() => { 
                                                        if (isMobile) setOpened(false); 
                                                    }}
                                                />
                                            );
                                        }
                                    })}
                                    {idx < navGroups.length - 1 && <Divider my="xs" />}
                                </Box>
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