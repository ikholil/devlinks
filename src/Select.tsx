import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaPinterest,
  FaRedditAlien,
  FaSnapchatGhost,
  FaTiktok,
  FaTwitch,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Select, {
  ActionMeta,
  components,
  MultiValue,
  OptionProps,
  SingleValue,
  SingleValueProps,
} from "react-select";
import { cn } from "./utils/cn";

export interface Site {
  id: number;
  label: string;
  icon: React.ReactElement;
  value: string;
  color: string;
}
const siteList: Site[] = [
  {
    id: 1,
    label: "Github",
    value: "Github",
    icon: <FaGithub />,
    color: "#333",
  },
  {
    id: 2,
    label: "Facebook",
    value: "Facebook",
    icon: <FaFacebook />,
    color: "#1877F2",
  },
  {
    id: 3,
    label: "Linkedin",
    value: "Linkedin",
    icon: <FaLinkedinIn />,
    color: "#0077B5",
  },
  {
    id: 4,
    label: "Instagram",
    value: "Instagram",
    icon: <FaInstagram />,
    color: "#E1306C",
  },
  {
    id: 5,
    label: "X",
    value: "x",
    icon: <FaXTwitter />,
    color: "#1DA1F2",
  },
  {
    id: 6,
    label: "Youtube",
    value: "Youtube",
    icon: <FaYoutube />,
    color: "#FF0000",
  },
  {
    id: 7,
    label: "Reddit",
    value: "Reddit",
    icon: <FaRedditAlien />,
    color: "#FF5700",
  },
  {
    id: 8,
    label: "Pinterest",
    value: "Pinterest",
    icon: <FaPinterest />,
    color: "#E60023",
  },
  {
    id: 9,
    label: "Snapchat",
    value: "Snapchat",
    icon: <FaSnapchatGhost />,
    color: "#FFFC00",
  },
  {
    id: 10,
    label: "Twitch",
    value: "Twitch",
    icon: <FaTwitch />,
    color: "#9146FF",
  },
  {
    id: 11,
    label: "WhatsApp",
    value: "WhatsApp",
    icon: <FaWhatsapp />,
    color: "#25D366",
  },
  {
    id: 12,
    label: "TikTok",
    value: "TikTok",
    icon: <FaTiktok />,
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
      <span className="">{props.data.icon}</span>
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
      <span className="">{props.data.icon}</span>
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
