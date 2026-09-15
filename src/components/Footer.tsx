const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} CRMFlow</p>

        <p>CRM Management Platform</p>
      </div>
    </footer>
  );
};

export default Footer;