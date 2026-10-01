import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  formula,
  displayMode = true,
  className = ''
}) => {
  // If the string is purely descriptive prose without LaTeX or math syntax, render clean text
  const isPlainSentence = useMemo(() => {
    if (!formula) return true;
    const hasLatex = /\\|\$|\^|_|\\frac|\\Delta|\\pm|\\times/.test(formula);
    if (!hasLatex && (formula.includes(' ') && formula.length > 25)) {
      return true;
    }
    return false;
  }, [formula]);

  const html = useMemo(() => {
    if (isPlainSentence || !formula) {
      return null;
    }

    try {
      // Strip leading/trailing dollar signs if present
      let clean = formula.trim();
      if (clean.startsWith('$') && clean.endsWith('$') && clean.length > 2) {
        clean = clean.slice(1, -1).trim();
      }

      // Clean up double slashes
      clean = clean.replace(/\\\\/g, '\\').trim();

      return katex.renderToString(clean, {
        displayMode,
        throwOnError: false,
        strict: false
      });
    } catch (err) {
      console.warn('KaTeX render error:', err);
      // Fallback clean formatting
      return formula
        .replace(/\\Delta/g, 'Δ')
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1/$2)')
        .replace(/\\pm/g, '±')
        .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
        .replace(/\\times/g, '×')
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\^2/g, '²')
        .replace(/\^3/g, '³')
        .replace(/_i/g, 'ᵢ')
        .replace(/_f/g, '𝒻')
        .replace(/_1/g, '₁')
        .replace(/_2/g, '₂');
    }
  }, [formula, displayMode, isPlainSentence]);

  if (isPlainSentence) {
    return (
      <span className={`inline-block font-sans text-stone-200 leading-relaxed ${className}`}>
        {formula}
      </span>
    );
  }

  return (
    <span
      className={`inline-block overflow-x-auto max-w-full align-middle ${className}`}
      dangerouslySetInnerHTML={{ __html: html || formula }}
    />
  );
};

