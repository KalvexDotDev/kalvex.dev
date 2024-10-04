// src/lib/linkResolver.js

export default function linkResolver(doc) {
    if (doc.type === 'blog_post') {
      return `/blog/${doc.uid}`
    }
    if (doc.type === 'case_study') {
      return `/case-studies/${doc.uid}`
    }
    // Add more conditions for other document types as needed
    return '/'
  }