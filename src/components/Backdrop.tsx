function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50">
      {children}
    </div>
  );
}

export default Backdrop;
