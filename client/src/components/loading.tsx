import { Center, Loader, Text, Stack } from '@mantine/core';

export default function Loading() {
  return (
    <Center h="100vh">
      <Stack align="center" gap="md">
        <Loader size="md" />
        <Text size="md" fw={500}>
          Yükleniyor...
        </Text>
      </Stack>
    </Center>
  );
}
