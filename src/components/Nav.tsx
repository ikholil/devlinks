const Nav = ({
  activeTab,
  setActiveTab,
  preview,
  setPreview,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  preview: boolean;
  setPreview: (preview: boolean) => void;
}) => {
  return (
    <div className="bg-white">
      <nav className="container flex justify-between items-center py-3 xl:py-4 xxl:py-5 bg-white">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1.5 rounded-lg bg-primary text-white">
            <i className="ti ti-link"></i>
          </span>
          <span className="font-bold text-3xl text-heading max-md:hidden">
            Devlinks
          </span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("links")}
            className={`px-5 py-2 font-semibold rounded-xl flex items-center text-heading  gap-3 ${
              activeTab == "links" && "bg-primary/10 text-primary"
            }`}>
            <i className="ti ti-link"></i>
            <span className="max-md:hidden">Links</span>
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-5 py-2 font-semibold rounded-xl flex items-center  text-heading gap-3 ${
              activeTab == "details" && "bg-primary/10 text-primary"
            }`}>
            <i className="ti ti-user"></i>
            <span className="max-md:hidden">Profile Details</span>
          </button>
        </div>

        <button
          onClick={() => setPreview(!preview)}
          className="px-5 py-2.5 rounded-lg border border-primary text-primary font-semibold flex items-center gap-3">
          <i className="ti ti-eye md:hidden"></i>
          <span className="max-md:hidden">Preview</span>
        </button>
      </nav>
    </div>
  );
};

export default Nav;
