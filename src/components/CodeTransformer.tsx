
import { useState, useEffect } from 'react';

interface CodeTransformerProps {
  code: string;
  onTransformed: (transformedCode: string) => void;
  onError: (error: string) => void;
}

export const CodeTransformer = ({ code, onTransformed, onError }: CodeTransformerProps) => {
  const [isTransforming, setIsTransforming] = useState(false);

  const transformCode = async (sourceCode: string): Promise<string> => {
    try {
      // Basic JSX to JavaScript transformation
      let transformed = sourceCode;

      // Transform JSX elements to React.createElement calls
      transformed = transformed.replace(
        /<(\w+)([^>]*?)>(.*?)<\/\1>/gs,
        (match, tag, attrs, children) => {
          const propsString = attrs.trim() ? `, ${parseAttributes(attrs)}` : '';
          const childrenString = children.trim() ? `, ${JSON.stringify(children)}` : '';
          return `React.createElement('${tag}'${propsString}${childrenString})`;
        }
      );

      // Transform self-closing JSX elements
      transformed = transformed.replace(
        /<(\w+)([^>]*?)\/>/g,
        (match, tag, attrs) => {
          const propsString = attrs.trim() ? `, ${parseAttributes(attrs)}` : '';
          return `React.createElement('${tag}'${propsString})`;
        }
      );

      // Transform arrow functions with JSX
      transformed = transformed.replace(
        /const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\(/g,
        'const $1 = () => React.createElement('
      );

      return transformed;
    } catch (error) {
      throw new Error(`Transformation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const parseAttributes = (attrs: string): string => {
    // Simple attribute parsing - in production, you'd want a proper parser
    const cleaned = attrs.trim();
    if (!cleaned) return '{}';
    
    // Basic className handling
    const classNameMatch = cleaned.match(/className="([^"]*)"/);
    if (classNameMatch) {
      return `{ className: "${classNameMatch[1]}" }`;
    }
    
    return '{}';
  };

  useEffect(() => {
    if (!code.trim()) return;

    const performTransformation = async () => {
      setIsTransforming(true);
      try {
        const transformed = await transformCode(code);
        onTransformed(transformed);
      } catch (error) {
        onError(error instanceof Error ? error.message : 'Transformation failed');
      } finally {
        setIsTransforming(false);
      }
    };

    const timeoutId = setTimeout(performTransformation, 100);
    return () => clearTimeout(timeoutId);
  }, [code]);

  return null;
};
