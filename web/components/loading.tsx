import React from 'react'
import { Loader, Stack, Text, Center } from '@mantine/core';

export default function Loading() {
    return (
        <Center py="xl" style={{ minHeight: '100vh' }}>
            <Stack align="center" gap="xs">
                <Loader size="lg" color="blue" />
                <Text c="dimmed" size="md">Yükleniyor...</Text>
            </Stack>
        </Center>
    );
}
