'use client';

import React, { useEffect, useState } from 'react';
import { Container, Title, SimpleGrid, Card, Text, rem, Group, Badge, Stack, Center, Loader, Paper, RingProgress, Divider } from '@mantine/core';
import { LineChart, BarChart, PieChart, AreaChart } from '@mantine/charts';
import { IconQrcode, IconMapPin, IconGlobe, IconTrendingUp, IconUsers, IconEye } from '@tabler/icons-react';

interface DailyStats {
    day: string;
    count: string;
}

interface QRCounts {
    label: string | null;
    id: string;
    count: string;
    is_tracking_enabled?: boolean;
}

interface TopCities {
    city: string;
    count: string;
}

interface TopCountries {
    country: string;
    count: string;
}

interface TypeDistribution {
    type: string;
    count: string;
}

interface OSDistribution {
    os_name: string;
    count: number;
}

interface StatisticsData {
    total_scans: number;
    daily_stats: DailyStats[];
    qr_counts: QRCounts[];
    top_cities: TopCities[];
    top_countries: TopCountries[];
    type_distribution: TypeDistribution[];
    os_distribution: OSDistribution[];
}

const getTypeLabel = (type: string) => {
    switch (type) {
        case 'wifi':
            return 'WiFi';
        case 'mail':
            return 'E-posta';
        case 'sms':
            return 'SMS';
        case 'vcard':
            return 'vCard';
        case 'url':
            return 'URL';
        case 'iban_text':
            return 'IBAN';
        case 'google_review':
            return 'Google Yorum';
        default:
            return type;
    }
};

export default function StatisticsPage() {
    const [data, setData] = useState<StatisticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/qr-tracking/qr-codes/stats', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const statsData = await response.json();
                    setData(statsData);
                } else {
                    setError('İstatistikler yüklenirken bir hata oluştu');
                }
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError('İstatistikler yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) {
        return (
            <Container size="lg">
                <Center style={{ minHeight: 400 }}>
                    <Loader size="xl" />
                </Center>
            </Container>
        );
    }

    if (error || !data) {
        return (
            <Container size="lg">
                <Center style={{ minHeight: 400 }}>
                    <Text c="red" size="lg">{error || 'Veri bulunamadı'}</Text>
                </Center>
            </Container>
        );
    }

    // Prepare chart data
    const dailyChartData = data.daily_stats.map(stat => ({
        date: new Date(stat.day).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' }),
        tarama: parseInt(stat.count)
    }));

    const qrChartData = data.qr_counts
        .filter(qr => parseInt(qr.count) > 0)
        .sort((a, b) => parseInt(b.count) - parseInt(a.count))
        .slice(0, 10)
        .map(qr => ({
            name: qr.label || 'Etiket Yok',
            tarama: parseInt(qr.count)
        }));



    const citiesChartData = data.top_cities.map(city => ({
        name: city.city,
        tarama: parseInt(city.count)
    }));

    const countriesChartData = data.top_countries.map(country => ({
        name: country.country,
        tarama: parseInt(country.count)
    }));

    // Calculate percentages for cities and countries
    const totalCityScans = citiesChartData.reduce((sum, city) => sum + city.tarama, 0);
    const totalCountryScans = countriesChartData.reduce((sum, country) => sum + country.tarama, 0);

    const citiesPieData = citiesChartData.map((city, index) => ({
        name: city.name,
        value: city.tarama,
        color: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'][index % 6]
    }));

    const countriesPieData = countriesChartData.map((country, index) => ({
        name: country.name,
        value: country.tarama,
        color: ['#7367f0', '#9c88ff', '#a8caba', '#ffd3b6', '#ffaaa5', '#dcedc1'][index % 6]
    }));

    const osChartData = data.os_distribution
        .filter(os => os.os_name !== 'Bilinmeyen' && os.count > 0)
        .map(os => ({
            name: os.os_name,
            tarama: os.count
        }));

    // Calculate percentages for OS distribution
    const totalOSScans = osChartData.reduce((sum, os) => sum + os.tarama, 0);

    const osPieData = osChartData.map((os, index) => ({
        name: os.name,
        value: os.tarama,
        color: ['#ff9f43', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][index % 6]
    }));

    return (
        <Container size="lg">
            <Title order={2} mb="lg">QR Kod İstatistikleri</Title>

            {/* Overview Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="lg">
                <Card withBorder p="md" radius="md" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(34, 139, 230, 0.06)' }}>
                    <Stack gap="xs" align="center" style={{ textAlign: 'center' }}>
                        <IconEye size={24} color="#228be6" />
                        <Text size="xs" c="dimmed">Toplam Tarama</Text>
                        <Title order={3} c="#228be6">{data.total_scans.toLocaleString('tr-TR')}</Title>
                    </Stack>
                </Card>

                <Card withBorder p="md" radius="md" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(40, 199, 111, 0.06)' }}>
                    <Stack gap="xs" align="center" style={{ textAlign: 'center' }}>
                        <IconQrcode size={24} color="#28c76f" />
                        <Text size="xs" c="dimmed">Aktif QR Kod</Text>
                        <Title order={3} c="#28c76f">{data.qr_counts.filter(qr => String(qr.is_tracking_enabled) === "true").length}</Title>
                    </Stack>
                </Card>

                <Card withBorder p="md" radius="md" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(255, 159, 67, 0.06)' }}>
                    <Stack gap="xs" align="center" style={{ textAlign: 'center' }}>
                        <IconMapPin size={24} color="#ff9f43" />
                        <Text size="xs" c="dimmed">Şehir Sayısı</Text>
                        <Title order={3} c="#ff9f43">{data.top_cities.length}</Title>
                    </Stack>
                </Card>

                <Card withBorder p="md" radius="md" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(234, 84, 85, 0.06)' }}>
                    <Stack gap="xs" align="center" style={{ textAlign: 'center' }}>
                        <IconGlobe size={24} color="#ea5455" />
                        <Text size="xs" c="dimmed">Ülke Sayısı</Text>
                        <Title order={3} c="#ea5455">{data.top_countries.length}</Title>
                    </Stack>
                </Card>
            </SimpleGrid>

            {/* Charts Grid */}
            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg" mb="lg">
                {/* Daily Scans Chart */}
                <Card withBorder p="md" radius="md" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(34, 139, 230, 0.06)' }}>
                    <Title order={4} mb="sm">Günlük Tarama Sayısı</Title>
                    {dailyChartData.length > 0 ? (
                        <LineChart
                            h={250}
                            data={dailyChartData}
                            dataKey="date"
                            series={[{ name: 'tarama', color: '#228be6' }]}
                            tickLine="y"
                            gridAxis="x"
                        />
                    ) : (
                        <Center style={{ height: 250 }}>
                            <Text c="dimmed">Henüz tarama verisi bulunmuyor</Text>
                        </Center>
                    )}
                </Card>

                {/* QR Code Performance Chart */}
                <Card withBorder p="md" radius="md" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(40, 199, 111, 0.06)' }}>
                    <Title order={4} mb="sm">QR Kod Performansı</Title>
                    {qrChartData.length > 0 ? (
                        <BarChart
                            h={250}
                            data={qrChartData}
                            dataKey="name"
                            series={[{ name: 'tarama', color: '#28c76f' }]}
                            tickLine="y"
                            gridAxis="x"
                        />
                    ) : (
                        <Center style={{ height: 250 }}>
                            <Text c="dimmed">Henüz QR kod verisi bulunmuyor</Text>
                        </Center>
                    )}
                </Card>
            </SimpleGrid>

            {/* Distribution Charts */}
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg" mb="lg">
                {/* Top Cities */}
                <Card withBorder p="md" radius="md" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(102, 126, 234, 0.06)' }}>
                    <Title order={4} mb="sm">Şehir Dağılımı</Title>
                    {citiesPieData.length > 0 ? (
                        <Stack gap="md">
                            <PieChart
                                h={200}
                                data={citiesPieData}
                                withLabels
                                withTooltip
                            />
                            <Stack gap="xs">
                                {citiesPieData.map((city) => {
                                    const percentage = totalCityScans > 0 ? ((city.value / totalCityScans) * 100).toFixed(1) : '0';
                                    return (
                                        <Group key={city.name} justify="space-between" align="center">
                                            <Group gap="xs">
                                                <div style={{ width: 12, height: 12, backgroundColor: city.color, borderRadius: 2 }} />
                                                <Text size="sm">{city.name}</Text>
                                            </Group>
                                            <Text size="sm" fw={500}>{percentage}% ({city.value})</Text>
                                        </Group>
                                    );
                                })}
                            </Stack>
                        </Stack>
                    ) : (
                        <Center style={{ height: 250 }}>
                            <Text c="dimmed">Henüz şehir verisi bulunmuyor</Text>
                        </Center>
                    )}
                </Card>

                {/* Top Countries */}
                <Card withBorder p="md" radius="md" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(115, 103, 240, 0.06)' }}>
                    <Title order={4} mb="sm">Ülke Dağılımı</Title>
                    {countriesPieData.length > 0 ? (
                        <Stack gap="md">
                            <PieChart
                                h={200}
                                data={countriesPieData}
                                withLabels
                                withTooltip
                            />
                            <Stack gap="xs">
                                {countriesPieData.map((country) => {
                                    const percentage = totalCountryScans > 0 ? ((country.value / totalCountryScans) * 100).toFixed(1) : '0';
                                    return (
                                        <Group key={country.name} justify="space-between" align="center">
                                            <Group gap="xs">
                                                <div style={{ width: 12, height: 12, backgroundColor: country.color, borderRadius: 2 }} />
                                                <Text size="sm">{country.name}</Text>
                                            </Group>
                                            <Text size="sm" fw={500}>{percentage}% ({country.value})</Text>
                                        </Group>
                                    );
                                })}
                            </Stack>
                        </Stack>
                    ) : (
                        <Center style={{ height: 250 }}>
                            <Text c="dimmed">Henüz ülke verisi bulunmuyor</Text>
                        </Center>
                    )}
                </Card>

                {/* Operating System Distribution */}
                <Card withBorder p="md" radius="md" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(255, 159, 67, 0.06)' }}>
                    <Title order={4} mb="sm">İşletim Sistemi Dağılımı</Title>
                    {osPieData.length > 0 ? (
                        <Stack gap="md">
                            <PieChart
                                h={200}
                                data={osPieData}
                                withLabels
                                withTooltip
                            />
                            <Stack gap="xs">
                                {osPieData.map((os) => {
                                    const percentage = totalOSScans > 0 ? ((os.value / totalOSScans) * 100).toFixed(1) : '0';
                                    return (
                                        <Group key={os.name} justify="space-between" align="center">
                                            <Group gap="xs">
                                                <div style={{ width: 12, height: 12, backgroundColor: os.color, borderRadius: 2 }} />
                                                <Text size="sm">{os.name}</Text>
                                            </Group>
                                            <Text size="sm" fw={500}>{percentage}% ({os.value})</Text>
                                        </Group>
                                    );
                                })}
                            </Stack>
                        </Stack>
                    ) : (
                        <Center style={{ height: 250 }}>
                            <Text c="dimmed">Henüz işletim sistemi verisi bulunmuyor</Text>
                        </Center>
                    )}
                </Card>
            </SimpleGrid>

            {/* Detailed QR Codes Table */}
            <Card withBorder p="md" radius="md" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(34, 139, 230, 0.06)' }}>
                <Title order={4} mb="sm">QR Kod Detaylarıtü</Title>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 600, fontSize: '14px' }}>QR Kod</th>
                                <th style={{ padding: '8px', textAlign: 'center', fontWeight: 600, fontSize: '14px' }}>Tarama Sayısı</th>
                                <th style={{ padding: '8px', textAlign: 'center', fontWeight: 600, fontSize: '14px' }}>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.qr_counts
                                .sort((a, b) => parseInt(b.count) - parseInt(a.count))
                                .map((qr, index) => (
                                    <tr key={qr.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                                        <td style={{ padding: '8px' }}>
                                            <Text fw={500} size="sm">{qr.label || 'Etiket Yok'}</Text>
                                            <Text size="xs" c="dimmed">ID: {qr.id.slice(0, 8)}...</Text>
                                        </td>
                                        <td style={{ padding: '8px', textAlign: 'center' }}>
                                            {String(qr.is_tracking_enabled) === "true"
                                                ? (
                                                    <Badge size="sm" variant="light" color={parseInt(qr.count) > 0 ? 'green' : 'gray'}>
                                                        {parseInt(qr.count).toLocaleString('tr-TR')}
                                                    </Badge>
                                                )
                                                : null}
                                        </td>
                                        <td style={{ padding: '8px', textAlign: 'center' }}>
                                            {String(qr.is_tracking_enabled) === "true"
                                                ? (
                                                    <Badge color="green" variant="light" size="sm">Dinamik Kod</Badge>
                                                )
                                                : (
                                                    <Badge color="gray" variant="light" size="sm">Statik Kod</Badge>
                                                )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Container>
    );
}
