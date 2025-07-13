'use client';

import React, { useState, useEffect } from 'react';
import { ActionIcon, Menu, Text, Group, Box, Tooltip } from '@mantine/core';
import { IconTypography, IconChevronDown, IconPalette } from '@tabler/icons-react';

interface FontOption {
  name: string;
  value: string;
  displayName: string;
  description: string;
}

const fontOptions: FontOption[] = [
  {
    name: 'Outfit',
    value: 'outfit',
    displayName: 'Outfit',
    description: 'Modern ve minimalist'
  },
  {
    name: 'Plus Jakarta Sans',
    value: 'plus-jakarta',
    displayName: 'Plus Jakarta',
    description: 'Profesyonel ve modern'
  },
  {
    name: 'Albert Sans',
    value: 'albert',
    displayName: 'Albert Sans',
    description: 'Temiz ve okunabilir'
  },
  {
    name: 'Inter',
    value: 'inter',
    displayName: 'Inter',
    description: 'Klasik ve güvenilir'
  }
];

interface FontSelectorProps {
  onFontChange: (font: string) => void;
  currentFont: string;
}

export default function FontSelector({ onFontChange, currentFont }: FontSelectorProps) {
  const [selectedFont, setSelectedFont] = useState(currentFont);

  useEffect(() => {
    // localStorage'dan font tercihini al
    const savedFont = localStorage.getItem('dashboard-font') || 'outfit';
    setSelectedFont(savedFont);
  }, []);

  const handleFontSelect = (fontValue: string) => {
    setSelectedFont(fontValue);
    localStorage.setItem('dashboard-font', fontValue);
    onFontChange(fontValue);
  };

  const getCurrentFontName = () => {
    const font = fontOptions.find(f => f.value === selectedFont);
    return font ? font.displayName : 'Outfit';
  };

  return (
    <Menu shadow="md" width={280} position="bottom-end" withArrow>
      <Menu.Target>
        <Tooltip label="Font Seçimi" position="bottom">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              border: '1px solid #e7f5ff',
              borderRadius: '12px',
              transition: 'all 0.2s ease',
              backgroundColor: '#f8f9ff',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e7f5ff';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9ff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Group gap="xs" align="center">
              <IconPalette size={16} color="#228be6" />
              <Text 
                size="sm" 
                fw={600} 
                style={{ 
                  fontFamily: 'var(--font-inter)',
                  color: '#228be6',
                  letterSpacing: '0.02em'
                }}
              >
                {getCurrentFontName()}
              </Text>
              <IconChevronDown size={14} color="#228be6" style={{ opacity: 0.7 }} />
            </Group>
          </div>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown style={{ borderRadius: '12px', border: '1px solid #e9ecef', width: '240px' }}>
        <Menu.Label style={{ 
          fontSize: '11px', 
          fontWeight: 700, 
          color: '#495057',
          padding: '10px 14px 6px',
          borderBottom: '1px solid #f1f3f4'
        }}>
          🎨 Dashboard Fontu
        </Menu.Label>
        {fontOptions.map((font) => (
          <Menu.Item
            key={font.value}
            onClick={() => handleFontSelect(font.value)}
            style={{
              fontFamily: `var(--font-${font.value})`,
              backgroundColor: selectedFont === font.value ? '#e7f5ff' : 'transparent',
              fontWeight: selectedFont === font.value ? 600 : 400,
              borderRadius: '6px',
              margin: '3px 6px',
              padding: '10px 12px',
              transition: 'all 0.2s ease',
              border: selectedFont === font.value ? '1px solid #228be6' : '1px solid transparent',
              width: 'calc(100% - 12px)',
              boxSizing: 'border-box',
              '&:hover': {
                backgroundColor: selectedFont === font.value ? '#e7f5ff' : '#f8f9fa',
                transform: 'translateX(2px)'
              }
            }}
          >
            <Box style={{ width: '100%', paddingRight: '6px' }}>
              <Group gap="xs" align="center" style={{ width: '100%' }}>
                <div style={{ 
                  width: '5px', 
                  height: '5px', 
                  borderRadius: '50%', 
                  backgroundColor: selectedFont === font.value ? '#228be6' : 'transparent',
                  flexShrink: 0,
                  marginRight: '6px'
                }} />
                <div style={{ flex: 1, minWidth: 0, maxWidth: '100%' }}>
                  <Text 
                    fw={600} 
                    size="sm" 
                    style={{ 
                      fontFamily: `var(--font-${font.value})`,
                      color: selectedFont === font.value ? '#228be6' : '#495057',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%'
                    }}
                  >
                    {font.displayName}
                  </Text>
                  <Text 
                    size="xs" 
                    style={{ 
                      fontFamily: 'var(--font-inter)',
                      color: selectedFont === font.value ? '#74c0fc' : '#868e96',
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%'
                    }}
                  >
                    {font.description}
                  </Text>
                </div>
              </Group>
            </Box>
          </Menu.Item>
        ))}
        <Menu.Divider style={{ margin: '6px 0' }} />
        <Menu.Label style={{ 
          fontSize: '10px', 
          color: '#adb5bd',
          padding: '6px 12px 10px',
          textAlign: 'center',
          fontFamily: 'var(--font-inter)'
        }}>
          ✨ Seçiminiz otomatik olarak kaydedilir
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
} 