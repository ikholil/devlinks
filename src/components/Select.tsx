import React from "react";
import Select, {
  ActionMeta,
  components,
  MultiValue,
  OptionProps,
  SingleValue,
  SingleValueProps,
} from "react-select";
import { cn } from "../utils/cn";

export interface Site {
  id: number;
  label: string;
  icon: string;
  value: string;
  color: string;
}
const siteList: Site[] = [
  {
    id: 1,
    label: "Github",
    value: "Github",
    icon: "ti ti-brand-github",
    color: "#333",
  },
  {
    id: 2,
    label: "Facebook",
    value: "Facebook",
    icon: "ti ti-brand-facebook",
    color: "#1877F2",
  },
  {
    id: 3,
    label: "Linkedin",
    value: "Linkedin",
    icon: "ti ti-brand-linkedin",
    color: "#0077B5",
  },
  {
    id: 4,
    label: "Instagram",
    value: "Instagram",
    icon: "ti ti-brand-instagram",
    color: "#E1306C",
  },
  {
    id: 5,
    label: "Twitter",
    value: "Twitter",
    icon: "ti ti-brand-twitter",
    color: "#1DA1F2",
  },
  {
    id: 6,
    label: "Youtube",
    value: "Youtube",
    icon: "ti ti-brand-youtube",
    color: "#FF0000",
  },
  {
    id: 7,
    label: "Reddit",
    value: "Reddit",
    icon: "ti ti-brand-reddit",
    color: "#FF5700",
  },
  {
    id: 8,
    label: "Pinterest",
    value: "Pinterest",
    icon: "ti ti-brand-pinterest",
    color: "#E60023",
  },
  {
    id: 10,
    label: "Twitch",
    value: "Twitch",
    icon: "ti ti-brand-twitch",
    color: "#9146FF",
  },
  {
    id: 11,
    label: "WhatsApp",
    value: "WhatsApp",
    icon: "ti ti-brand-whatsapp",
    color: "#25D366",
  },
  {
    id: 12,
    label: "TikTok",
    value: "TikTok",
    icon: "ti ti-brand-tiktok",
    color: "#000000",
  },
];

const SiteOption: React.FC<OptionProps<Site>> = (props) => {
  return (
    <components.Option
      {...props}
      className={cn(
        "!flex items-center gap-2 hover:bg-primary/10 focus:!border-none",
        props.isSelected && "!bg-primary hover:!bg-primary"
      )}>
      <span className="">
        <i className={props.data.icon}></i>
      </span>
      {props.data.label}
    </components.Option>
  );
};

const SiteSingleValue: React.FC<SingleValueProps<Site>> = (props) => {
  return (
    <components.SingleValue
      {...props}
      className={cn(
        "!flex items-center dark:text-neutral-20 gap-2 !py-1 !rounded-xl "
      )}>
      <span className="">
        <i className={props.data.icon}></i>
      </span>
      {props.data.label}
    </components.SingleValue>
  );
};

const SiteSelect = ({
  defaultValue,
  className,
  onChange,
}: {
  defaultValue?: SingleValue<Site> | MultiValue<Site> | null;
  className?: string;
  onChange: (
    value: SingleValue<Site> | MultiValue<Site>,
    actionMeta: ActionMeta<Site>
  ) => void;
}) => {
  return (
    <Select
      classNames={{
        control: (state) => {
          return cn(
            "bg-neutral-0  px-2 xl:py-1 !rounded-lg !border-neutral-300 focus:!outline-none hover:!border-primary",
            state.isFocused && "!shadow-none !border-primary",
            className
          );
        },
        menu: () => {
          return "bg-neutral-0";
        },
      }}
      options={siteList}
      onChange={onChange}
      components={{
        Option: SiteOption,
        SingleValue: SiteSingleValue,
        IndicatorSeparator: () => null,
      }}
      defaultValue={defaultValue}
    />
  );
};

export default SiteSelect;
