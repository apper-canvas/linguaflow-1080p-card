const Text = ({ 
  children, 
  variant = 'body', 
  size = 'base', 
  weight = 'normal',
  color = 'default',
  align = 'left',
  className = '',
  as = 'p',
  ...props 
}) => {
  const variants = {
    display: 'font-heading',
    heading: 'font-heading',
    body: 'font-sans',
    caption: 'font-sans'
  };

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const colors = {
    default: 'text-surface-900',
    muted: 'text-surface-600',
    light: 'text-surface-500',
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    accent: 'text-accent-600',
    white: 'text-white',
    error: 'text-red-500',
    success: 'text-green-500'
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  const Component = as;
  const classes = `${variants[variant]} ${sizes[size]} ${weights[weight]} ${colors[color]} ${alignments[align]} ${className}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Text;