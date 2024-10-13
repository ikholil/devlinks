import { Site } from "./Select";

const SiteLink = ({ link, site }: { link: string; site: Site }) => {
  return (
    <a
      href={link}
      style={{ backgroundColor: site?.color }}
      className="rounded-lg px-3 py-[11px] flex justify-between items-center">
      <div className="flex items-center gap-2 text-white">
        <i className={site?.icon}></i>
        <span>{site?.label}</span>
      </div>
      <i className="ti ti-arrow-right text-white"></i>
    </a>
  );
};

export default SiteLink;
