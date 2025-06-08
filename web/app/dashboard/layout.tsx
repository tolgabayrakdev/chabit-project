'use client';

import React, { useState } from 'react';
import { AppShell, Burger, Group, NavLink, rem } from '@mantine/core';
import { IconQrcode, IconWifi, IconMail, IconMessage, IconAddressBook, IconMenu2 } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [opened, setOpened] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { icon: IconQrcode, label: 'QR Kodlarım', href: '/dashboard' },
        { icon: IconWifi, label: 'WiFi QR Kod', href: '/dashboard/wifi' },
        { icon: IconMail, label: 'E-posta QR Kod', href: '/dashboard/email' },
        { icon: IconMessage, label: 'SMS QR Kod', href: '/dashboard/sms' },
        { icon: IconAddressBook, label: 'vCard QR Kod', href: '/dashboard/vcard' },
    ];

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
                    <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" size="sm" />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
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
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}