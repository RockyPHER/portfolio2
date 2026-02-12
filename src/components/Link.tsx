interface LinkProps {
  href?: string;
  children: React.ReactNode;
}

function Link({ children, href }: LinkProps) {
  return (
    <div className="group relative cursor-pointer flex items-center justify-center p-2.5 sm:p-3 transition-all duration-300  hover:-translate-y-1">
      <a
        className="w-full h-full hover:scale-105 transition-transform active:scale-95"
        href={href}
        target="_blank"
      >
        {children}
      </a>
    </div>
  );
}

export default Link;
