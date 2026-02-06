interface LinkProps {
  href?: string;
  children: React.ReactNode;
}

function Link({ children, href }: LinkProps) {
  return (
    <a
      className="hover:scale-105 transition-transform active:scale-95 cursor-pointer"
      href={href}
      target="_blank"
    >
      {children}
    </a>
  );
}

export default Link;
