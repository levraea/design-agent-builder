
import React from 'react';

// Utility function to convert markdown to HTML
export const renderMarkdownToHtml = (text: string): string => {
  if (!text) return '';
  
  return text
    // Convert **bold** to <strong>
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Convert *italic* to <em>
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Convert bullet points (- or *) to <li> items and wrap in <ul>
    .replace(/^[\s]*[-*]\s+(.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> items in <ul>
    .replace(/(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)*)/gs, '<ul>$1</ul>')
    // Convert line breaks to proper HTML structure
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n(?!<\/li>|<li>|<\/ul>|<ul>)/g, '<br>')
    // Wrap content in paragraph tags if not already wrapped
    .replace(/^(?!<p>|<ul>|<li>)(.+?)(?=<\/p>|<ul>|$)/gm, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    // Clean up paragraphs that only contain list items
    .replace(/<p>(<ul>.*?<\/ul>)<\/p>/gs, '$1')
    // Clean up any duplicate ul tags
    .replace(/<ul>\s*<ul>/g, '<ul>')
    .replace(/<\/ul>\s*<\/ul>/g, '</ul>');
};

// React component to safely render HTML content
export const MarkdownRenderer = ({ content }: { content: string }) => {
  const htmlContent = renderMarkdownToHtml(content);
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className="prose prose-sm max-w-none [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mt-2 [&>strong]:font-bold [&>em]:italic [&>p]:mb-2"
    />
  );
};
