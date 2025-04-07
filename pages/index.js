import Head from 'next/head';
import { useState } from 'react';
import ArticleCard from '../components/article/ArticleCard';
import SearchBar from '../components/ui/SearchBar';
import { getAllArticles } from '../lib/utils/mdx';

// Import components directly
let MotionDiv, MotionMain, MotionH1;

// Try to import from framer-motion, fall back to regular HTML elements
try {
  const { motion } = require('framer-motion');
  MotionDiv = motion.div;
  MotionMain = motion.main;
  MotionH1 = motion.h1;
} catch (e) {
  // Simple fallbacks that just render the children
  MotionDiv = ({ children, ...props }) => <div {...props}>{children}</div>;
  MotionMain = ({ children, ...props }) => <main {...props}>{children}</main>;
  MotionH1 = ({ children, ...props }) => <h1 {...props}>{children}</h1>;
}

export default function Home({ articles }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Philosophy', 'Book', 'Science & Technology', 'Opinion', 'Partisan', 'Politics', 'History', 'Economy'];
  
  const filteredArticles = articles.filter(article => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || (
      (article?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
      (article?.excerpt?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false)
    );
    
    // Filter by category - show all articles when "All" is selected
    const matchesCategory = 
      activeCategory === 'All' || 
      (article?.categories && Array.isArray(article.categories) && article.categories.includes(activeCategory));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>Articles | LiloMelawan</title>
        <meta name="description" content="Book reviews and thoughtful articles" />
        <meta property="og:title" content="Articles | LiloMelawan" />
        <meta property="og:description" content="Book reviews and thoughtful articles" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lilomelawan.com" />
      </Head>

      <MotionMain 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container-narrow py-16"
      >
        <MotionH1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl md:text-5xl font-bold mb-12 font-serif text-gray-900 dark:text-white"
        >
          Take a minute and imagine
        </MotionH1>
        
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Explore Topics</h2>
          <div className="category-slider">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-pill ${
                  activeCategory === category
                    ? 'category-pill-active'
                    : 'category-pill-inactive'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <SearchBar 
          placeholder="Search articles..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="mb-10"
        />
        
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredArticles.map((article, index) => (
              <MotionDiv
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ArticleCard article={article} />
              </MotionDiv>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">
              No articles found matching your search.
            </p>
          </div>
        )}
      </MotionMain>
    </>
  );
}

export async function getStaticProps() {
  const articles = getAllArticles([
    'title',
    'slug',
    'date',
    'excerpt',
    'coverImage',
    'readingTime',
    'categories'
  ]);

  return {
    props: { articles },
  };
}