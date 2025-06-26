import fs from 'fs';
import path from 'path';
import BlogList from './BlogList';

export default function BlogsPage() {
  const blogsDir = path.join(process.cwd(), 'app/blogs');
  const blogFolders = fs
    .readdirSync(blogsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => name !== 'page.tsx');

  return <BlogList blogs={blogFolders} />;
} 