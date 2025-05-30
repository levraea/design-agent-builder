
// Utility function to convert markdown to HTML
export const renderMarkdownToHtml = (text: string): string => {
  if (!text) return '';
  
  return text
    // Convert **bold** to <strong>
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Convert *italic* to <em>
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Convert bullet points (- or *) to <li> items
    .replace(/^[\s]*[-*]\s+(.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> items in <ul>
    .replace(/(<li>.*<\/li>)/gs, (match) => {
      // Only wrap if not already wrapped
      if (!match.includes('<ul>')) {
        return `<ul>${match}</ul>`;
      }
      return match;
    })
    // Convert line breaks to <br> tags
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraph tags if not already wrapped
    .replace(/^(?!<p>|<ul>|<li>)(.+)(?!<\/p>|<\/ul>|<\/li>)$/gm, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    // Clean up paragraphs that only contain list items
    .replace(/<p>(<ul>.*<\/ul>)<\/p>/gs, '$1');
};

// React component to safely render HTML content
export const MarkdownRenderer = ({ content }: { content: string }) => {
  const htmlContent = renderMarkdownToHtml(content);
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className="prose prose-sm max-w-none"
    />
  );
};
