'use client';

import React, { useState, useEffect } from 'react';
import { AppShell, Burger, Group, NavLink, rem, Text, Button, Stack, Divider, Box, ThemeIcon, Paper, Avatar, Menu } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconLogout, IconSettings, IconLink, IconList, IconHome, IconStar, IconGift, IconChartBar, IconUsers, IconClipboardList } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthProvider from '@/providers/auth-provider';
import { useMediaQuery } from '@mantine/hooks';
import { Inter, Outfit, Plus_Jakarta_Sans, Albert_Sans } from 'next/font/google';
import './dashboard.css';
import FontSelector from '@/components/FontSelector';

// Font tanımlamaları
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-albert',
  display: 'swap',
});

// Nav item tipi tanımı
interface NavChild {
    icon: any;
    label: string;
    href: string;
    color: string;
    disabled?: boolean;
    group?: string; // Yeni eklenen grup özelliği
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
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [selectedFont, setSelectedFont] = useState('outfit');
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width: 48em)');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoadingUser(true);
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
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoadingUser(false);
            }
        };

        fetchUserData();
    }, []);

    // Font tercihini localStorage'dan yükle
    useEffect(() => {
        const savedFont = localStorage.getItem('dashboard-font') || 'outfit';
        setSelectedFont(savedFont);
        const dashboardContainer = document.querySelector('.dashboard-container');
        if (dashboardContainer) {
            dashboardContainer.setAttribute('data-font', savedFont);
        }
    }, []);

    const navGroups: { label: string; items: NavItem[] }[] = [
        {
            label: '',
            items: [
                { icon: IconHome, label: 'Anasayfa', href: '/dashboard', color: '#228be6' },
            ],
        },
        {
            label: 'QR Kodlar',
            items: [
                {
                    icon: IconQrcode,
                    label: 'QR Kod Oluştur',
                    href: '#',
                    color: '#228be6',
                    children: [
                        { icon: IconLink, label: 'URL QR Kod', href: '/dashboard/url', color: '#15aabf', group: 'dinamik' },
                        { icon: IconStar, label: 'Google Yorum QR', href: '/dashboard/google-review', color: '#fab005', group: 'dinamik' },
                        { icon: IconWifi, label: 'WiFi QR', href: '/dashboard/wifi', color: '#40c057', group: 'statik' },
                        { icon: IconMail, label: 'E-posta QR', href: '/dashboard/email', color: '#fd7e14', group: 'statik' },
                        { icon: IconMessage, label: 'SMS QR', href: '/dashboard/sms', color: '#fa5252', group: 'statik' },
                        { icon: IconAddressBook, label: 'vCard QR', href: '/dashboard/vcard', color: '#7950f2', group: 'statik' },
                    ]
                },
                { icon: IconList, label: 'Tüm QR Kodlar', href: '/dashboard/qr-codes', color: '#228be6' },
            ],
        },
        {
            label: 'İstatistikler',
            items: [
                { icon: IconChartBar, label: 'İstatistikler', href: '/dashboard/statistics', color: '#40c057' },
            ],
        },
        {
            label: 'Dijital İçerikler',
            items: [
                { icon: IconLink, label: 'Link in Bio', href: '/dashboard/link-in-bio', color: '#e64980' },
                { icon: IconSettings, label: 'Menü Oluştur', href: '/dashboard/menu', color: '#fab005' },
                { 
                    icon: IconGift, 
                    label: userPlan === 'free' ? 'Kampanya Yönetimi (PRO)' : 'Kampanya Yönetimi', 
                    href: '/dashboard/campaigns', 
                    color: '#e64980',
                    disabled: false
                },
            ],
        },
        {
            label: 'Yeni Modüller',
            items: [
                { icon: IconClipboardList, label: 'Hızlı Talep', href: '/dashboard/quick-request', color: '#228be6' },
                { icon: IconList, label: 'Form QR (yakında)', href: '#', color: '#adb5bd', disabled: true },
                { icon: IconList, label: 'Rezervasyon QR (yakında)', href: '#', color: '#adb5bd', disabled: true },
                { icon: IconList, label: 'Etkinlik QR (yakında)', href: '#', color: '#adb5bd', disabled: true },
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

    const handleFontChange = (font: string) => {
        setSelectedFont(font);
        // CSS değişkenlerini güncelle
        const dashboardContainer = document.querySelector('.dashboard-container');
        if (dashboardContainer) {
            dashboardContainer.setAttribute('data-font', font);
        }
    };

    return (
        <AuthProvider>
            <div className={`${inter.variable} ${outfit.variable} ${plusJakartaSans.variable} ${albertSans.variable} dashboard-container`}>
                <AppShell
                    header={{ height: 70 }}
                    navbar={{
                        width: 300,
                        breakpoint: 'sm',
                        collapsed: { mobile: !opened, desktop: !opened },
                    }}
                    padding="md"
                >
                <AppShell.Header style={{ background: 'white', borderBottom: `1px solid #e9ecef` }}>
                    <Group h="100%" px="md" justify="space-between">
                        <Group>
                            <Burger opened={opened} onClick={() => setOpened(!opened)} size="sm" />
                            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                                <Group gap="xs" align="center" style={{ cursor: 'pointer' }}>
                                    <ThemeIcon size={40} radius="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                                        <IconQrcode size={24} />
                                    </ThemeIcon>
                                    <Text fw={800} size="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 45 }}>VunQR</Text>
                                </Group>
                            </Link>
                        </Group>

                        <Group gap="md">
                            <FontSelector 
                                onFontChange={handleFontChange}
                                currentFont={selectedFont}
                            />
                            <Menu shadow="md" width={240} position="bottom-end" withArrow>
                                <Menu.Target>
                                    <Group gap="xs" style={{ cursor: 'pointer' }}>
                                        <Avatar color="blue" radius="xl">
                                            {isLoadingUser ? '' : (userEmail ? userEmail.charAt(0).toUpperCase() : '')}
                                        </Avatar>
                                        <Box visibleFrom="sm">
                                            <Text size="sm" fw={600} truncate>
                                                {isLoadingUser ? 'Yükleniyor...' : userEmail}
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                {isLoadingUser ? 'Yükleniyor...' : (userPlan === 'free' ? 'Ücretsiz Plan' : userPlan === 'basic' ? 'Basit Plan' : userPlan === 'pro' ? 'Pro Plan' : 'Kullanıcı')}
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
                    </Group>
                </AppShell.Header>

                <AppShell.Navbar p="md" style={{ background: 'white' }}>
                    <Stack h="100%" justify="space-between">
                        <div style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
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
                                                        active={item.children.some((child: { href: string }) => pathname === child.href)}
                                                        style={{
                                                            borderRadius: 'md',
                                                            marginBottom: '0.5rem',
                                                            transition: 'all 0.2s ease',
                                                            backgroundColor: item.children.some((child: { href: string }) => pathname === child.href) ? `${item.color}15` : 'transparent',
                                                            color: item.children.some((child: { href: string }) => pathname === child.href) ? item.color : 'inherit',
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
                                                        {/* Statik QR Kodlar */}
                                                        <Text size="xs" fw={700} c="dimmed" mb={2} pl={12}>Statik QR Kodlar</Text>
                                                        {item.children.filter(child => child.group === 'statik').map((child) => (
                                                            <NavLink
                                                                key={child.href}
                                                                component={Link}
                                                                href={child.href!}
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
                                                        {/* Dinamik QR Kodlar */}
                                                        <Text size="xs" fw={700} c="dimmed" mb={2} pl={12} mt={8}>Dinamik QR Kodlar</Text>
                                                        {item.children.filter(child => child.group === 'dinamik').map((child) => (
                                                            <NavLink
                                                                key={child.href}
                                                                component={Link}
                                                                href={child.href!}
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
                                            if (!item.disabled && item.href) {
                                                return (
                                                    <NavLink
                                                        key={item.href + '-' + item.label}
                                                        component={Link}
                                                        href={item.href!}
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
                                            } else {
                                                return (
                                                    <NavLink
                                                        key={item.href + '-' + item.label}
                                                        label={item.label}
                                                        leftSection={
                                                            <ThemeIcon size={34} radius="md" color={item.color}>
                                                                <item.icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                                                            </ThemeIcon>
                                                        }
                                                        style={{
                                                            borderRadius: 'md',
                                                            marginBottom: '0.5rem',
                                                            transition: 'all 0.2s ease',
                                                            backgroundColor: 'transparent',
                                                            color: 'inherit',
                                                            overflow: 'hidden',
                                                            whiteSpace: 'nowrap',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '100%',
                                                            opacity: 0.5,
                                                            cursor: 'not-allowed',
                                                        }}
                                                        disabled
                                                    />
                                                );
                                            }
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
            </div>
        </AuthProvider>
    );
}