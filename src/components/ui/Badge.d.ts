declare module './Badge' {
  const Badge: React.FC<{
    variant?: 'default' | 'secondary' | 'destructive';
    className?: string;
    children: React.ReactNode;
  }>;
  export default Badge;
}
