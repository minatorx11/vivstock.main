<template>
  <div class="blog-section bg-transparent py-8 px-4">
    <h2 class="section-title text-3xl font-bold text-purple-500 mb-8 text-center relative left-[-70px]">
      Latest News
    </h2>
    <div class="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PostCard from './PostCard.vue'

const posts = ref([
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
    title: "Understanding Cryptocurrency Trading",
    date: "Feb 15, 2024",
    author: "John Smith",
    category: "Trading",
    excerpt: "Learn the fundamentals of cryptocurrency trading and how to analyze market trends effectively."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d",
    title: "Blockchain Technology Explained",
    date: "Feb 14, 2024",
    author: "Sarah Johnson",
    category: "Technology",
    excerpt: "Discover how blockchain technology is revolutionizing various industries beyond cryptocurrency."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1516245834210-c4c142787335",
    title: "Investment Strategies for 2024",
    date: "Feb 13, 2024",
    author: "Mike Williams",
    category: "Investment",
    excerpt: "Expert insights on the most effective investment strategies for the current market conditions."
  }
])
</script>