"use client"
import React, { useState, useEffect, FC, useRef } from 'react';
import {
  Stack,
  Avatar,
  Text,
  Paper,
  Button,
  Group,
  Badge,
  Box,
  Image,
  Card,
  Divider,
  ActionIcon,
  Center,
  Loader,
  Modal,
  SimpleGrid,
  Title,
  ThemeIcon,
  Textarea,
  TextInput,
  Select
} from '@mantine/core';
import {
  IconExternalLink,
  IconPencil,
} from '@tabler/icons-react';
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaSnapchat,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaLink,
  FaTiktok
} from 'react-icons/fa6';
import { useRouter, useParams } from 'next/navigation';
import { IconType } from 'react-icons';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

type Link = {
  label: string;
  url: string;
  value?: string;
};


type MediaItem = {
  type: 'image' | 'gif';
  url: string;
  caption?: string;
};

type Platform = {
  value: string;
  label: string;
  icon: IconType;
  color: string;
};

type Profile = {
  id: string;
  user_id: string;
  username: string;
  bio_text: string;
  links: Link[];
  media: MediaItem[];
  profile_image: string;
  created_at: string;
  isOwner: boolean;
};

const SOCIAL_PLATFORMS: Platform[] = [
  { value: 'instagram', label: 'Instagram', icon: FaInstagram, color: '#E4405F' },
  { value: 'x', label: 'X (Twitter)', icon: FaXTwitter, color: '#000000' },
  { value: 'youtube', label: 'YouTube', icon: FaYoutube, color: '#FF0000' },
  { value: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2' },
  { value: 'github', label: 'GitHub', icon: FaGithub, color: '#181717' },
  { value: 'tiktok', label: 'TikTok', icon: FaTiktok, color: '#000000' },
  { value: 'snapchat', label: 'Snapchat', icon: FaSnapchat, color: '#FFFC00' },
  { value: 'email', label: 'E-posta', icon: FaEnvelope, color: '#EA4335' },
  { value: 'phone', label: 'Telefon', icon: FaPhone, color: '#25D366' },
  { value: 'website', label: 'Web Sitesi', icon: FaGlobe, color: '#4285F4' },
  { value: 'other', label: 'Diğer', icon: FaLink, color: '#718096' }
];

interface LinkCardProps {
  link: Link;
  onClick: (url: string) => void;
}

const LinkCard: FC<LinkCardProps> = ({ link, onClick }) => {
  const detectPlatform = (label: string, url: string, value?: string): Platform => {
    if (value) {
      const platformByValue = SOCIAL_PLATFORMS.find(p => p.value === value);
      if (platformByValue) return platformByValue;
    }
    const urlLower = url.toLowerCase();
    if (urlLower.includes('instagram.com')) return SOCIAL_PLATFORMS[0];
    if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) return SOCIAL_PLATFORMS[1];
    if (urlLower.includes('youtube.com')) return SOCIAL_PLATFORMS[2];
    if (urlLower.includes('linkedin.com')) return SOCIAL_PLATFORMS[3];
    if (urlLower.includes('github.com')) return SOCIAL_PLATFORMS[4];
    if (urlLower.includes('tiktok.com')) return SOCIAL_PLATFORMS[5];
    if (urlLower.includes('snapchat.com')) return SOCIAL_PLATFORMS[6];
    if (urlLower.startsWith('mailto:')) return SOCIAL_PLATFORMS[7];
    if (urlLower.startsWith('tel:')) return SOCIAL_PLATFORMS[8];
    const platformByLabel = SOCIAL_PLATFORMS.find(p => p.label.toLowerCase() === label.toLowerCase());
    if (platformByLabel) return platformByLabel;
    return SOCIAL_PLATFORMS[9];
  };
  
  const platform = detectPlatform(link.label, link.url, link.value);
  const Icon = platform.icon;
  
  return (
    <Paper
      p="md"
      radius="md"
      shadow="sm"
      style={{ cursor: 'pointer', transition: 'all 0.2s ease', border: '1px solid #e9ecef', background: '#fff' }}
      onClick={() => onClick(link.url)}
      className="hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
    >
      <Group gap="md" align="center">
        <ThemeIcon 
          variant="light" 
          radius="md" 
          size="lg"
          style={{ 
            backgroundColor: `${platform.color}15`,
            color: platform.color 
          }}
        >
          <Icon size={20} />
        </ThemeIcon>
        <Box style={{ flex: 1 }}>
          <Text size="lg" fw={600} c="dark">{platform.label}</Text>
        </Box>
        <ActionIcon variant="subtle" style={{ color: platform.color }}>
          <IconExternalLink size={16} />
        </ActionIcon>
      </Group>
    </Paper>
  );
};

// ResponsiveGif bileşeni: GIF'in oranını otomatik ayarlar ve fit="contain" ile gösterir
const ResponsiveGif: FC<{ url: string; alt?: string }> = ({ url, alt }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setAspectRatio(img.width / img.height || 1);
    };
    img.src = url;
  }, [url]);

  return (
    <Box
      style={{
        width: '100%',
        aspectRatio: `${aspectRatio}`,
        background: '#f8f8f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 600,
        margin: '0 auto'
      }}
    >
      <Image
        src={url}
        alt={alt}
        fit="contain"
        width="100%"
        height="100%"
        style={{ maxHeight: '100%', maxWidth: '100%' }}
      />
    </Box>
  );
};

interface MediaGalleryProps {
  media: MediaItem[];
}

const MediaGallery: FC<MediaGalleryProps> = ({ media }) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const handleMediaClick = (mediaItem: MediaItem) => {
    setSelectedMedia(mediaItem);
    setModalOpened(true);
  };

  return (
    <>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2 }}
        spacing="xl"
      >
        {media.map((item, index) => (
          <Card
            key={index}
            p={0}
            radius="md"
            style={{ cursor: 'pointer', overflow: 'hidden', width: '100%', maxWidth: 600, margin: '0 auto' }}
            onClick={() => handleMediaClick(item)}
            className="hover:shadow-lg transition-all duration-200"
          >
            {item.type === 'gif' ? (
              <ResponsiveGif url={item.url} alt={item.caption || 'Media'} />
            ) : (
              <Box style={{ position: 'relative', aspectRatio: '1/1', width: '100%', maxWidth: 600, margin: '0 auto' }}>
                <Image
                  src={item.url}
                  alt={item.caption || 'Media'}
                  fit="cover"
                  height="100%"
                  width="100%"
                />
              </Box>
            )}
            {item.type === 'gif' && (
              <Box
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  background: 'rgba(0,0,0,0.7)',
                  borderRadius: '4px',
                  padding: '2px 6px'
                }}
              >
                <Text size="xs" c="white" fw={600}>GIF</Text>
              </Box>
            )}
          </Card>
        ))}
      </SimpleGrid>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="lg"
        centered
        padding="md"
      >
        {selectedMedia && (
          <Stack gap="md">
            <Image
              src={selectedMedia.url}
              alt={selectedMedia.caption}
              fit="contain"
              radius="md"
            />
            {selectedMedia.caption && (
              <Text ta="center" c="dimmed">
                {selectedMedia.caption}
              </Text>
            )}
          </Stack>
        )}
      </Modal>
    </>
  );
};

// Linkleri normalize et: value ve label'ı SOCIAL_PLATFORMS ile birebir eşleştir
const normalizeLinks = (links: Link[]): Link[] => {
  return links.map(link => {
    let result: Link;
    if (link.value && SOCIAL_PLATFORMS.some(p => p.value === link.value)) {
      const platform = SOCIAL_PLATFORMS.find(p => p.value === link.value)!;
      result = { ...link, value: platform.value, label: platform.label };
    } else {
      const urlLower = link.url?.toLowerCase() || '';
      let platform: Platform | undefined;
      if (urlLower.includes('instagram.com')) platform = SOCIAL_PLATFORMS.find(p => p.value === 'instagram');
      else if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) platform = SOCIAL_PLATFORMS.find(p => p.value === 'x');
      else if (urlLower.includes('youtube.com')) platform = SOCIAL_PLATFORMS.find(p => p.value === 'youtube');
      else if (urlLower.includes('linkedin.com')) platform = SOCIAL_PLATFORMS.find(p => p.value === 'linkedin');
      else if (urlLower.includes('github.com')) platform = SOCIAL_PLATFORMS.find(p => p.value === 'github');
      else if (urlLower.includes('tiktok.com')) platform = SOCIAL_PLATFORMS.find(p => p.value === 'tiktok');
      else if (urlLower.includes('snapchat.com')) platform = SOCIAL_PLATFORMS.find(p => p.value === 'snapchat');
      else if (urlLower.startsWith('mailto:')) platform = SOCIAL_PLATFORMS.find(p => p.value === 'email');
      else if (urlLower.startsWith('tel:')) platform = SOCIAL_PLATFORMS.find(p => p.value === 'phone');
      if (!platform) {
        platform = SOCIAL_PLATFORMS.find(p => p.label.toLowerCase() === link.label.toLowerCase()) || SOCIAL_PLATFORMS.find(p => p.value === 'other');
      }
      const safePlatform = platform || SOCIAL_PLATFORMS.find(p => p.value === 'other')!;
      result = { ...link, value: safePlatform.value, label: safePlatform.label };
    }
    return result;
  });
};

export default function LinkInBioPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [bioText, setBioText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editLinksModalOpen, setEditLinksModalOpen] = useState(false);
  const [editMediaModalOpen, setEditMediaModalOpen] = useState(false);
  const [linksDraft, setLinksDraft] = useState<Link[]>([]);
  const [mediaDraft, setMediaDraft] = useState<MediaItem[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [rawImageUrl, setRawImageUrl] = useState<string | null>(null);
  const [linkErrors, setLinkErrors] = useState<{ label?: string; url?: string }[]>([]);
  const [mediaErrors, setMediaErrors] = useState<{ type?: string; url?: string }[]>([]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetch(`/api/link-in-bio/${slug}`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error("Profil bulunamadı.");
        return res.json();
      })
      .then((profileData: Profile) => {
        const normalizedProfile: Profile = {
          ...profileData,
          links: normalizeLinks(profileData.links || [])
        };
        setProfile(normalizedProfile);
        setIsOwner(!!profileData.isOwner);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const openEditModal = () => {
    if (!profile) return;
    setBioText(profile.bio_text);
    setImageFile(null);
    setEditModalOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      let updatedProfile;
      if (imageFile) {
        const formData = new FormData();
        formData.append('bio_text', bioText);
        formData.append('image', imageFile);
        const response = await fetch('/api/link-in-bio', {
          method: 'PUT',
          body: formData,
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Profil güncellenemedi.');
        updatedProfile = await response.json();
      } else {
        const response = await fetch('/api/link-in-bio', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bio_text: bioText }),
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Profil güncellenemedi.');
        updatedProfile = await response.json();
      }
      const normalizedProfile: Profile = {
        ...updatedProfile,
        links: normalizeLinks(updatedProfile.links || [])
      };
      setProfile(normalizedProfile);
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const openEditLinksModal = () => {
    if (!profile) return;
    const normalizedLinks = profile.links.map(link => {
      if (link.value) return link;
      const platform = SOCIAL_PLATFORMS.find(p => p.label === link.label);
      return platform ? { ...link, value: platform.value } : { ...link, value: 'other' };
    });
    setLinksDraft(normalizedLinks);
    setEditLinksModalOpen(true);
  };

  const openEditMediaModal = () => {
    if (!profile) return;
    setMediaDraft(profile.media);
    setEditMediaModalOpen(true);
  };

  const addLink = () => setLinksDraft([...linksDraft, { label: 'Diğer', url: '', value: 'other' }]);
  const removeLink = (index: number) => setLinksDraft(linksDraft.filter((_, i) => i !== index));
  const updateLink = (index: number, updates: Partial<Link>) => {
    setLinksDraft(linksDraft => linksDraft.map((link, i) => i === index ? { ...link, ...updates } : link));
  };

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    setLinksDraft(links => {
      const newLinks = [...links];
      const [removed] = newLinks.splice(draggedIndex, 1);
      newLinks.splice(index, 0, removed);
      return newLinks;
    });
    setDraggedIndex(null);
  };

  const validateLinks = () => {
    return linksDraft.map(link => {
      const errors: { label?: string; url?: string } = {};
      if (!link.label || link.label.trim() === "") {
        errors.label = "Link etiketi boş bırakılamaz.";
      } else if (link.label.length > 50) {
        errors.label = "Link etiketi en fazla 50 karakter olabilir.";
      }
      if (!link.url || link.url.trim() === "") {
        errors.url = "URL boş bırakılamaz.";
      } else {
        try {
          new URL(link.url);
        } catch {
          errors.url = "Geçerli bir URL girin.";
        }
      }
      return errors;
    });
  };

  const handleSaveLinks = async () => {
    if (!profile) return;
    const errors = validateLinks();
    setLinkErrors(errors);
    const hasError = errors.some(e => e.label || e.url);
    if (hasError) return;
    setIsSaving(true);
    try {
      const linksToSend = linksDraft.map(({ url, label }) => ({ url, label }));
      const response = await fetch('/api/link-in-bio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          links: linksToSend,
        }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Linkler güncellenemedi.');
      const updatedProfile = await response.json();
      const normalizedProfile: Profile = {
        ...updatedProfile,
        links: normalizeLinks(updatedProfile.links || [])
      };
      setProfile(normalizedProfile);
      setEditLinksModalOpen(false);
    } catch (error) {
    } finally {
      setIsSaving(false);
    }
  };

  const addMedia = () => setMediaDraft([...mediaDraft, { type: 'image', url: '', caption: '' }]);
  const removeMedia = (index: number) => setMediaDraft(mediaDraft.filter((_, i) => i !== index));
  const updateMedia = (index: number, key: keyof MediaItem, value: string) => {
    setMediaDraft(mediaDraft.map((item, i) => i === index ? { ...item, [key]: value } : item));
  };

  const validateMedia = () => {
    return mediaDraft.map(item => {
      const errors: { type?: string; url?: string } = {};
      if (!item.type || !["gif", "image", "video"].includes(item.type)) {
        errors.type = "Medya türü gif, image veya video olabilir.";
      }
      if (!item.url || item.url.trim() === "") {
        errors.url = "Medya URL'si boş bırakılamaz.";
      } else {
        try {
          new URL(item.url);
        } catch {
          errors.url = "Geçerli bir medya URL'si girin.";
        }
      }
      return errors;
    });
  };

  const handleSaveMedia = async () => {
    if (!profile) return;
    const errors = validateMedia();
    setMediaErrors(errors);
    const hasError = errors.some(e => e.type || e.url);
    if (hasError) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/link-in-bio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          media: mediaDraft,
        }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Medya güncellenemedi.');
      const updatedProfile = await response.json();
      const normalizedProfile: Profile = {
        ...updatedProfile,
        links: normalizeLinks(updatedProfile.links || [])
      };
      setProfile(normalizedProfile);
      setEditMediaModalOpen(false);
    } catch (error) {
    } finally {
      setIsSaving(false);
    }
  };

  // Crop helper
  async function getCroppedImg(imageSrc: string, croppedAreaPixels: any): Promise<Blob> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No 2d context');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas is empty'));
      }, 'image/jpeg');
    });
  }
  function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });
  }

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: '100vh' }}>
        <Stack align="center" gap="md">
          <ThemeIcon size={48} radius="xl" variant="light" color="red">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#ffe5e5"/>
              <path d="M9.17 9.17L12 12m0 0l2.83 2.83M12 12l2.83-2.83M12 12l-2.83 2.83" stroke="#e03131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ThemeIcon>
          <Title order={2} c="red" style={{ fontWeight: 800, letterSpacing: 1 }}>Profil Bulunamadı</Title>
          <Text c="dimmed" ta="center" size="md" style={{ maxWidth: 340 }}>
            Üzgünüz, aradığınız profil bulunamadı.<br />
            Ana sayfaya dönmek için aşağıdaki butonu kullanabilirsiniz.
          </Text>
          <Button variant="filled" color="blue" size="md" onClick={() => router.push('/')}>Ana Sayfaya Dön</Button>
        </Stack>
      </Center>
    );
  }

  if (!profile) return null;

  return (
    <Box
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#f8faff',
        padding: '2rem',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          padding: '3rem',
          opacity: 0.1,
          transform: 'rotate(-15deg) scale(1.2)',
          pointerEvents: 'none',
          zIndex: 0,
          color: '#2563eb',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        {Array(50).fill('vunqr').map((text, i) => (
          <Text key={i} size="xl" fw={900} style={{ letterSpacing: '1px' }}>
            {text}
          </Text>
        ))}
      </Box>
      
      <Stack 
        gap="xl" 
        align="center" 
        style={{ 
          position: 'relative', 
          zIndex: 1,
          maxWidth: '640px',
          margin: '0 auto',
          width: '100%',
          padding: '0 1rem'
        }}
      >
        {isOwner && (
          <Button
            leftSection={<IconPencil size={16} />}
            variant="light"
            onClick={openEditModal}
          >
            Profili Düzenle
          </Button>
        )}
        <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
          <Avatar
            size={120}
            radius="xl"
            src={croppedImage ? URL.createObjectURL(croppedImage) : imageFile ? URL.createObjectURL(imageFile) : profile.profile_image || '/default-avatar.png'}
            alt={profile.username}
            style={{ border: '4px solid #e9ecef', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
          />
          <Stack gap="xs" align="center">
            <Group gap="xs" align="center">
              <Text size="xl" fw={700} c="dark">@{profile.username}</Text>
            </Group>
            <Text size="md" c="dimmed" style={{ whiteSpace: 'pre-line', lineHeight: 1.6, maxWidth: '400px' }}>
              {profile.bio_text}
            </Text>
          </Stack>
        </Stack>
        <Divider style={{ width: '100%' }} />
        <Stack gap="md" style={{ width: '100%' }}>
          <Group justify="space-between" align="center">
            <Text size="lg" fw={600} c="dark">Bağlantılar</Text>
            {isOwner && (
              <Button
                size="xs"
                variant="subtle"
                leftSection={<IconPencil size={14} />}
                onClick={openEditLinksModal}
              >
                Düzenle
              </Button>
            )}
          </Group>
          <Stack gap="sm">
            {profile.links.map((link, index) => (
              <LinkCard key={index} link={link} onClick={(url) => window.open(url, '_blank')} />
            ))}
          </Stack>
        </Stack>
        
        <Divider style={{ width: '100%' }} />
        <Stack gap="md" style={{ width: '100%' }}>
          <Group justify="space-between" align="center">
            <Text size="lg" fw={600} c="dark">
              Medya Galerisi
            </Text>
            <Group>
              {isOwner && (
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconPencil size={14} />}
                  onClick={openEditMediaModal}
                >
                  Düzenle
                </Button>
              )}
              {profile.media && profile.media.length > 0 && (
                <Badge variant="light" color="grape">
                  {profile.media.length} öğe
                </Badge>
              )}
            </Group>
          </Group>
          {profile.media && profile.media.length > 0 ? (
            <MediaGallery media={profile.media} />
          ) : (
            <Text c="dimmed" ta="center" py="xl">
              Henüz medya eklenmemiş
            </Text>
          )}
        </Stack>

        <Box mt="xl" pt="xl" style={{ borderTop: '1px solid #e9ecef', width: '100%' }}>
          <Text size="sm" c="dimmed" ta="center">
            vunqr.com tarafından oluşturuldu
          </Text>
        </Box>
      </Stack>

      <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title="Profili Düzenle" centered>
        <Stack gap="md">
          <Avatar
            size={80}
            radius="xl"
            src={imageFile ? URL.createObjectURL(imageFile) : profile?.profile_image || '/default-avatar.png'}
            alt={profile?.username}
            style={{ alignSelf: 'center', border: '2px solid #e9ecef' }}
          />
          <Button
            variant="light"
            onClick={() => fileInputRef.current?.click()}
            style={{ alignSelf: 'center' }}
          >
            Profil Resmi Seç
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={async e => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const url = URL.createObjectURL(file);
                setRawImageUrl(url);
                setCropModalOpen(true);
              }
            }}
          />
          <Textarea
            label="Profil Açıklaması (Bio)"
            placeholder="Kendinizi tanıtın..."
            value={bioText}
            onChange={(event) => setBioText(event.currentTarget.value)}
            autosize
            minRows={3}
          />
          <Button onClick={handleSaveChanges} loading={isSaving}>
            Değişiklikleri Kaydet
          </Button>
        </Stack>
      </Modal>

      <Modal opened={editLinksModalOpen} onClose={() => setEditLinksModalOpen(false)} title="Linkleri Düzenle" centered size="lg">
        <Stack gap="md">
          {linksDraft.map((link, idx) => (
            <Group
              key={idx}
              align="center"
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(idx)}
              style={{
                opacity: draggedIndex === idx ? 0.5 : 1,
                border: draggedIndex === idx ? '1px dashed #aaa' : undefined,
                cursor: 'grab',
                background: draggedIndex === idx ? '#f8f9fa' : undefined,
                borderRadius: 8,
                padding: 4,
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 8,
              }}
              className="link-edit-group"
            >
              <span style={{ fontSize: 18, cursor: 'grab', userSelect: 'none' }}>☰</span>
              <Select
                value={link.value}
                onChange={(val) => {
                  const platform = SOCIAL_PLATFORMS.find(p => p.value === val);
                  if (platform) {
                    let defaultUrl = '';
                    switch (platform.value) {
                      case 'instagram':
                        defaultUrl = 'https://instagram.com/';
                        break;
                      case 'x':
                        defaultUrl = 'https://x.com/';
                        break;
                      case 'youtube':
                        defaultUrl = 'https://youtube.com/';
                        break;
                      case 'linkedin':
                        defaultUrl = 'https://linkedin.com/in/';
                        break;
                      case 'github':
                        defaultUrl = 'https://github.com/';
                        break;
                      case 'tiktok':
                        defaultUrl = 'https://tiktok.com/';
                        break;
                      case 'snapchat':
                        defaultUrl = 'https://snapchat.com/add/';
                        break;
                      case 'email':
                        defaultUrl = 'mailto:';
                        break;
                      case 'phone':
                        defaultUrl = 'tel:+90';
                        break;
                      default:
                        defaultUrl = '';
                    }
                    updateLink(idx, { label: platform.label, value: platform.value, url: defaultUrl });
                  }
                }}
                data={SOCIAL_PLATFORMS.map(p => ({ value: p.value, label: p.label }))}
                style={{ flex: 1, minWidth: 120 }}
                error={linkErrors[idx]?.label}
              />
              <TextInput
                value={link.url}
                onChange={e => updateLink(idx, { url: e.currentTarget.value })}
                placeholder={
                  link.label === 'E-posta' ? "mailto:ornek@email.com" :
                  link.label === 'Telefon' ? "tel:+905551234567" :
                  "https://..."
                }
                style={{ flex: 2, minWidth: 120 }}
                error={linkErrors[idx]?.url}
              />
              <Button color="red" size="xs" onClick={() => removeLink(idx)}>Sil</Button>
            </Group>
          ))}
          <Button onClick={addLink} variant="light">Yeni Link Ekle</Button>
          <Button onClick={handleSaveLinks} loading={isSaving}>Kaydet</Button>
        </Stack>
      </Modal>

      <Modal opened={editMediaModalOpen} onClose={() => setEditMediaModalOpen(false)} title="Medya Galerisini Düzenle" centered size="lg">
        <Stack gap="md">
          <Text size="xs" c="dimmed" ta="center">
            GIF bulmak için <a href="https://giphy.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#0A66C2', textDecoration: 'underline' }}>Giphy</a>'yi ziyaret edebilirsiniz.
          </Text>
          {mediaDraft.map((item, idx) => (
            <Group key={idx} align="center" className="media-edit-group" style={{ flexWrap: 'wrap', gap: 8 }}>
              <Select
                value={item.type}
                onChange={val => updateMedia(idx, 'type', val || 'image')}
                data={[
                  { value: 'image', label: 'Resim' },
                  { value: 'gif', label: 'GIF' },
                ]}
                style={{ minWidth: 100, flex: 1 }}
                error={mediaErrors[idx]?.type}
              />
              <TextInput
                value={item.url}
                onChange={e => updateMedia(idx, 'url', e.currentTarget.value)}
                placeholder="URL"
                style={{ flex: 2, minWidth: 120 }}
                error={mediaErrors[idx]?.url}
              />
              <TextInput
                value={item.caption || ''}
                onChange={e => updateMedia(idx, 'caption', e.currentTarget.value)}
                placeholder="Açıklama"
                style={{ flex: 2, minWidth: 120 }}
              />
              <Button color="red" size="xs" onClick={() => removeMedia(idx)}>Sil</Button>
            </Group>
          ))}
          <Button onClick={addMedia} variant="light">Yeni Medya Ekle</Button>
          <Button onClick={handleSaveMedia} loading={isSaving}>Kaydet</Button>
        </Stack>
      </Modal>

      {/* Crop Modal for profile image */}
      <Modal opened={cropModalOpen} onClose={() => setCropModalOpen(false)} title="Profil Fotoğrafını Kırp" centered size="lg">
        <div style={{ position: 'relative', width: '100%', height: 300, background: '#222' }}>
          {rawImageUrl && (
            <Cropper
              image={rawImageUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_: Area, croppedAreaPixels: Area) => setCroppedAreaPixels(croppedAreaPixels)}
            />
          )}
        </div>
        <Group mt="md" justify="center">
          <Button
            onClick={async () => {
              if (rawImageUrl && croppedAreaPixels) {
                const blob = await getCroppedImg(rawImageUrl, croppedAreaPixels);
                setCroppedImage(blob);
                setImageFile(new File([blob], 'profile.jpg', { type: 'image/jpeg' }));
                setCropModalOpen(false);
              }
            }}
          >
            Kırp ve Kullan
          </Button>
          <Button variant="light" color="red" onClick={() => setCropModalOpen(false)}>
            İptal
          </Button>
        </Group>
      </Modal>

      {/* Responsive mobil için: Group'ları column yap */}
      <style jsx global>{`
        @media (max-width: 600px) {
          .link-edit-group, .media-edit-group {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
          }
          .link-edit-group > *, .media-edit-group > * {
            width: 100% !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </Box>
  );
}