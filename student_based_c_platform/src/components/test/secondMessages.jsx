// components/SecondMessages.jsx
import React from 'react';
import { request } from '../../axios_helper';

export default class SecondMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    request('GET', '/secondMessages', {})
      .then((response) => {
        // Simulate blog data from the API response
        const blogData = this.simulateBlogData(response.data);
        this.setState({
          blogs: blogData,
          loading: false
        });
      })
      .catch((error) => {
        console.error('Error fetching second messages:', error);
        this.setState({
          error: error.message,
          loading: false
        });
      });
  }

  // Simulate converting API response to blog format
  simulateBlogData = (apiData) => {
    const blogTitles = [
      "Getting Started with React Development",
      "Understanding Spring Boot Architecture", 
      "Best Practices for Full-Stack Development",
      "Building Scalable Web Applications",
      "Modern JavaScript Frameworks Comparison"
    ];

    const authors = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Alex Chen"];
    const categories = ["React", "Spring Boot", "JavaScript", "Web Development", "Tutorial"];
    const images = [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400", 
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400"
    ];

    return apiData.map((message, index) => ({
      id: index + 1,
      title: blogTitles[index % blogTitles.length],
      excerpt: `${message}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      content: `${message}. This is a detailed blog post about web development. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      author: authors[index % authors.length],
      category: categories[index % categories.length],
      publishDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      readTime: Math.floor(Math.random() * 10) + 3,
      image: images[index % images.length],
      likes: Math.floor(Math.random() * 100) + 10,
      comments: Math.floor(Math.random() * 20) + 1
    }));
  };

  render() {
    const { blogs, loading, error } = this.state;

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading blog posts...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <div className="text-center text-red-500">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="mb-2 text-lg font-semibold">Error Loading Blogs</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900">Developer Blog</h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-600">
                Insights, tutorials, and best practices for modern web development
              </p>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article key={blog.id} className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                {/* Blog Image */}
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <h2 className="mb-3 text-xl font-bold text-gray-900 cursor-pointer line-clamp-2 hover:text-blue-600">
                    {blog.title}
                  </h2>
                  
                  <p className="mb-4 text-gray-600 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Author and Meta Info */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                        <span className="text-xs font-semibold text-white">
                          {blog.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium">{blog.author}</span>
                    </div>
                    <span>{blog.readTime} min read</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{blog.publishDate}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>{blog.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{blog.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="px-6 pb-6">
                  <button className="w-full px-4 py-2 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Section */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 font-semibold text-gray-800 transition-colors duration-200 bg-gray-200 rounded-lg hover:bg-gray-300">
              Load More Posts
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 bg-white border-t">
          <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2024 Developer Blog. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}