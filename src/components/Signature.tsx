import React from 'react';

interface SignatureProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Signature: React.FC<SignatureProps> = ({ className = '', size = 'lg' }) => {
  const sizeClasses = {
    sm: 'text-4xl md:text-5xl',
    md: 'text-5xl md:text-6xl',
    lg: 'text-7xl md:text-8xl',
    xl: 'text-8xl md:text-9xl',
  };

  return (
    <span 
      className={`inline-block pr-4 py-2 ${sizeClasses[size]} ${className}`} 
      style={{ 
        background: 'linear-gradient(to bottom, #FFF7D6 0%, #D6B47A 30%, #8B6914 60%, #DFBE73 80%, #FFF7D6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.4))'
      }}
    >
      <span style={{ fontFamily: 'var(--font-signature-a)' }}>A</span>
      <span style={{ fontFamily: 'var(--font-signature)', marginLeft: '-0.02em' }}>şkın</span>
    </span>
  );
};

export default Signature;
