"use client";

import Link from 'next/link';
import { Box, Container, Title, Text, Paper, Group, Pagination } from '@mantine/core';
import { useState } from 'react';

const bannerText = {
  title: 'Vunqr Blog',
  desc: 'Burada güncel yazılarımızı, ipuçlarını ve ilham veren içerikleri paylaşıyoruz.'
};

function getTodayTR() {
  return new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

const BLOGS_PER_PAGE = 5;

export default function BlogList({ blogs }: { blogs: string[] }) {
  const [activePage, setPage] = useState(1);
  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = blogs.slice((activePage - 1) * BLOGS_PER_PAGE, activePage * BLOGS_PER_PAGE);

  return (
    <Box>
      {/* Blue Banner */}
      <Box style={{ background: 'linear-gradient(135deg, #228be6 0%, #4dabf7 100%)', color: 'white', padding: '2.5rem 0 2rem 0', textAlign: 'center', marginBottom: '2.5rem' }}>
        <Title order={1} style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: '-1px', marginBottom: 8 }}>
          {bannerText.title}
        </Title>
        <Text size="lg" style={{ opacity: 0.92, maxWidth: 600, margin: '0 auto' }}>
          {bannerText.desc}
        </Text>
      </Box>
      <Container size="sm" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box style={{ width: '100%', maxWidth: 500 }}>
          {blogs.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#a0aec0' }}>Henüz blog yazısı yok.</Text>
          ) : (
            paginatedBlogs.map((slug) => (
              <Paper key={slug} shadow="xs" radius="md" p="md" mb="lg" style={{ transition: 'background 0.2s', cursor: 'pointer' }}>
                <Link href={`/blogs/${slug}`} style={{ textDecoration: 'none' }}>
                  <Group justify="space-between" align="center" mb={4}>
                    <Title
                      order={3}
                      style={{
                        color: '#228be6',
                        fontWeight: 700,
                        fontSize: '1.3rem',
                        marginBottom: 0,
                        transition: 'color 0.2s, textDecoration 0.2s',
                      }}
                      onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      {slug.replace(/-/g, ' ')}
                    </Title>
                    <Text size="xs" style={{ color: '#4a5568', fontWeight: 500 }}>
                      {getTodayTR()}
                    </Text>
                  </Group>
                  <Text size="sm" style={{ color: '#4a5568' }}>
                    {slug.replace(/-/g, ' ')} hakkında kısa bir yazı.
                  </Text>
                </Link>
              </Paper>
            ))
          )}
        </Box>
        {totalPages > 1 && (
          <Pagination
            value={activePage}
            onChange={setPage}
            total={totalPages}
            mt="lg"
            color="blue"
            size="md"
            radius="md"
            withEdges
          />
        )}
      </Container>
    </Box>
  );
}