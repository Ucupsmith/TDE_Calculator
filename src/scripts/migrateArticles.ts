import { articles } from '../data/articles';
import { createArticle } from '../services/articleService';
import fs from 'fs';
import path from 'path';

async function migrateArticles() {
  console.log('Starting article migration...');
  
  for (const article of articles) {
    try {
      // Create FormData object
      const formData = new FormData();
      
      // Add article data
      formData.append('title', article.title);
      formData.append('content', article.content);
      formData.append('category', article.category);
      formData.append('author_id', article.author_id.toString());
      formData.append('status', article.status);

      // Handle image
      if (article.image_path) {
        const imagePath = path.join(process.cwd(), 'public', article.image_path);
        if (fs.existsSync(imagePath)) {
          const imageBuffer = fs.readFileSync(imagePath);
          const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' });
          formData.append('image', imageBlob, path.basename(article.image_path));
        } else {
          console.warn(`Image not found: ${imagePath}`);
        }
      }

      // Create article in backend
      const response = await createArticle(formData);
      console.log(`Successfully migrated article: ${article.title}`);
      console.log('Response:', response);

    } catch (error) {
      console.error(`Failed to migrate article: ${article.title}`);
      console.error('Error:', error);
    }
  }

  console.log('Article migration completed!');
}

// Run migration
migrateArticles().catch(console.error); 